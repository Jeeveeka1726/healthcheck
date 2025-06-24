const express = require('express');
const Test = require('../models/Test');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tests
// @desc    Get all available tests
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const tests = await Test.find({ isActive: true }).sort({ category: 1, name: 1 });
    res.json({ tests });
  } catch (error) {
    console.error('Get tests error:', error);
    res.status(500).json({ message: 'Server error while fetching tests' });
  }
});

// @route   GET /api/tests/:id
// @desc    Get single test by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({ test });
  } catch (error) {
    console.error('Get test error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(500).json({ message: 'Server error while fetching test' });
  }
});

module.exports = router;
