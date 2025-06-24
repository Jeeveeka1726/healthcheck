const express = require('express');
const path = require('path');
const fs = require('fs');
const Booking = require('../models/Booking');
const Test = require('../models/Test');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Book a test
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { testId, bookingDate, preferredTime, notes } = req.body;

    // Check if test exists
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Create booking
    const booking = new Booking({
      patient: req.patient._id,
      test: testId,
      bookingDate: new Date(bookingDate),
      preferredTime,
      notes
    });

    await booking.save();
    await booking.populate(['patient', 'test']);

    res.status(201).json({
      message: 'Test booked successfully',
      booking
    });
  } catch (error) {
    console.error('Booking error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Server error during booking' });
  }
});

// @route   GET /api/bookings
// @desc    Get patient's bookings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.patient._id })
      .populate('test')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

// @route   GET /api/bookings/:id/report
// @desc    Download dummy report for a booking
// @access  Private
router.get('/:id/report', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      patient: req.patient._id
    }).populate(['test', 'patient']);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Generate dummy PDF content (in a real app, you'd use a PDF library)
    const reportContent = generateDummyReport(booking);
    
    // Update booking to mark report as generated
    if (!booking.reportGenerated) {
      booking.reportGenerated = true;
      booking.reportGeneratedAt = new Date();
      await booking.save();
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="report-${booking._id}.pdf"`);
    res.send(Buffer.from(reportContent));
  } catch (error) {
    console.error('Download report error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(500).json({ message: 'Server error while downloading report' });
  }
});

// Helper function to generate dummy report content
function generateDummyReport(booking) {
  const reportText = `
HEALTH CLINIC LAB REPORT
========================

Patient: ${booking.patient.firstName} ${booking.patient.lastName}
Email: ${booking.patient.email}
Phone: ${booking.patient.phone}

Test: ${booking.test.name}
Category: ${booking.test.category}
Booking Date: ${booking.bookingDate.toDateString()}
Report Generated: ${new Date().toDateString()}

RESULTS:
--------
All parameters are within normal range.
No abnormalities detected.

This is a dummy report for demonstration purposes.

Doctor's Signature: Dr. Sample
Date: ${new Date().toDateString()}
  `;
  
  return reportText;
}

module.exports = router;
