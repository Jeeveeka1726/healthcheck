const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Test = require('./models/Test');

dotenv.config();

const sampleTests = [
  {
    name: 'Complete Blood Count (CBC)',
    description: 'A comprehensive blood test that evaluates overall health and detects various disorders.',
    price: 25.00,
    category: 'blood',
    preparationInstructions: 'No special preparation required',
    duration: '15 minutes'
  },
  {
    name: 'Lipid Profile',
    description: 'Measures cholesterol and triglyceride levels to assess cardiovascular risk.',
    price: 35.00,
    category: 'blood',
    preparationInstructions: 'Fast for 12 hours before the test',
    duration: '10 minutes'
  },
  {
    name: 'Blood Glucose Test',
    description: 'Measures blood sugar levels to screen for diabetes.',
    price: 15.00,
    category: 'blood',
    preparationInstructions: 'Fast for 8 hours before the test',
    duration: '5 minutes'
  },
  {
    name: 'Thyroid Function Test (TSH)',
    description: 'Evaluates thyroid gland function by measuring hormone levels.',
    price: 30.00,
    category: 'blood',
    preparationInstructions: 'No special preparation required',
    duration: '10 minutes'
  },
  {
    name: 'Urinalysis',
    description: 'Comprehensive urine test to detect urinary tract infections and other conditions.',
    price: 20.00,
    category: 'urine',
    preparationInstructions: 'Collect first morning urine sample',
    duration: '5 minutes'
  },
  {
    name: 'Chest X-Ray',
    description: 'Imaging test to examine the chest, lungs, and heart.',
    price: 50.00,
    category: 'imaging',
    preparationInstructions: 'Remove jewelry and metal objects',
    duration: '20 minutes'
  },
  {
    name: 'ECG (Electrocardiogram)',
    description: 'Records electrical activity of the heart to detect heart problems.',
    price: 40.00,
    category: 'cardiac',
    preparationInstructions: 'Wear loose-fitting clothing',
    duration: '15 minutes'
  },
  {
    name: 'Vitamin D Test',
    description: 'Measures vitamin D levels in the blood.',
    price: 45.00,
    category: 'blood',
    preparationInstructions: 'No special preparation required',
    duration: '10 minutes'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing tests
    await Test.deleteMany({});
    console.log('Cleared existing tests');

    // Insert sample tests
    await Test.insertMany(sampleTests);
    console.log('Sample tests inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
