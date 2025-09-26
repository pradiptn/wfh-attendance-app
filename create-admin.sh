#!/bin/bash

echo "Creating default admin user..."

# Option 1: Using Node.js script
if command -v node &> /dev/null; then
    echo "Installing dependencies..."
    npm install --package-lock-only=false bcrypt pg
    echo "Running seed script..."
    node seed-admin.js
else
    echo "Node.js not found. Using SQL script instead..."
    # Option 2: Using psql directly
    if command -v psql &> /dev/null; then
        psql -h localhost -U postgres -d wfh_attendance -f seed-admin.sql
    else
        echo "Neither Node.js nor psql found. Please run one of these manually:"
        echo "1. npm install bcrypt pg && node seed-admin.js"
        echo "2. psql -h localhost -U postgres -d wfh_attendance -f seed-admin.sql"
    fi
fi

echo ""
echo "Default admin credentials:"
echo "Email: admin@wfh.com"
echo "Password: admin123"
