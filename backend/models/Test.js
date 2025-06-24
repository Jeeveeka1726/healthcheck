const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Test name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Test description is required']
  },
  price: {
    type: Number,
    required: [true, 'Test price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Test category is required'],
    enum: ['blood', 'urine', 'imaging', 'cardiac', 'other']
  },
  preparationInstructions: {
    type: String,
    default: 'No special preparation required'
  },
  duration: {
    type: String,
    default: '30 minutes'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Test', testSchema);
