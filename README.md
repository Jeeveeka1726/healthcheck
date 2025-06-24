# Patient Portal - Digital Health Clinic

A comprehensive patient-facing portal for a digital health clinic built with React frontend and Node.js backend..

## Features

### Patient Features
- **Patient Registration**: Secure registration with form validation
- **Authentication**: JWT-based login/logout system
- **Lab Tests Catalog**: Browse available diagnostic tests
- **Test Booking**: Book tests with preferred date and time
- **Booking History**: View all past and current bookings
- **Report Download**: Download dummy test reports (PDF format)

### Technical Features
- **Frontend**: React with TypeScript, Tailwind CSS for styling
- **Backend**: Node.js with Express framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with secure middleware
- **API**: RESTful endpoints with proper error handling
- **Validation**: Form validation on both frontend and backend

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── Patient.js           # Patient schema
│   │   ├── Test.js              # Test schema
│   │   └── Booking.js           # Booking schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── tests.js             # Test catalog routes
│   │   └── bookings.js          # Booking management routes
│   ├── server.js                # Main server file
│   ├── seed.js                  # Database seeding script
│   └── .env                     # Environment variables
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.tsx         # Login component
    │   │   ├── Register.tsx      # Registration component
    │   │   ├── LabTests.tsx      # Tests catalog component
    │   │   ├── Bookings.tsx      # Bookings history component
    │   │   ├── Navbar.tsx        # Navigation component
    │   │   └── ProtectedRoute.tsx # Route protection
    │   ├── contexts/
    │   │   └── AuthContext.tsx   # Authentication context
    │   └── App.tsx               # Main app component
    └── tailwind.config.js        # Tailwind CSS configuration
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Update the `.env` file with your MongoDB connection string:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/health-clinic
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB (Optional for Demo):**
   Make sure MongoDB is running on your system. The application will run without MongoDB for demonstration purposes, but database functionality will be limited.

5. **Seed the database with sample tests (Optional):**
   ```bash
   node seed.js
   ```
   Note: This requires MongoDB to be running.

6. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new patient
- `POST /api/auth/login` - Patient login
- `GET /api/auth/me` - Get current patient profile

### Tests
- `GET /api/tests` - Get all available tests
- `GET /api/tests/:id` - Get specific test details

### Bookings
- `POST /api/bookings` - Book a test
- `GET /api/bookings` - Get patient's bookings
- `GET /api/bookings/:id/report` - Download test report

## Usage Guide

1. **Registration**: New patients can register by providing personal information
2. **Login**: Existing patients can log in with email and password
3. **Browse Tests**: View available lab tests with details and pricing
4. **Book Tests**: Select tests, choose preferred date/time, and book
5. **View Bookings**: Check booking history and status
6. **Download Reports**: Download dummy test reports for completed tests

## Sample Test Data

The application includes sample tests in various categories:
- **Blood Tests**: CBC, Lipid Profile, Blood Glucose, Thyroid Function, Vitamin D
- **Urine Tests**: Urinalysis
- **Imaging**: Chest X-Ray
- **Cardiac**: ECG

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration for cross-origin requests

## Development Notes

- The application uses dummy PDF reports for demonstration
- All test data is seeded automatically
- Frontend includes form validation and error handling
- Backend includes comprehensive error handling and logging

## Future Enhancements

- Real PDF report generation
- Email notifications
- Payment integration
- Appointment scheduling
- Doctor portal
- Real-time notifications

## Technologies Used

**Frontend:**
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## License

This project is for educational and demonstration purposes.
