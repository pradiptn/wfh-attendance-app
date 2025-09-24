#!/bin/bash

echo "Setting up WFH Attendance Application..."

# Create uploads directory
mkdir -p backend/uploads

# Install dependencies
echo "Installing backend dependencies..."
cd backend && npm install

echo "Installing frontend dependencies..."
cd ../frontend && npm install

echo "Setup complete!"
echo ""
echo "To run the application:"
echo "1. Start PostgreSQL server and create database 'wfh_attendance'"
echo "2. Update database credentials in backend/src/app.module.ts"
echo "3. Run backend: cd backend && npm run start:dev"
echo "4. Run frontend: cd frontend && npm start"
