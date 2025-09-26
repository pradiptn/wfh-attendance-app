#!/bin/bash

echo "Setting up Microservices (No Docker)..."

# Create databases using existing PostgreSQL
echo "Creating databases..."
psql -U postgres -c "CREATE DATABASE auth_db;" 2>/dev/null || echo "auth_db exists"
psql -U postgres -c "CREATE DATABASE employee_db;" 2>/dev/null || echo "employee_db exists"
psql -U postgres -c "CREATE DATABASE attendance_db;" 2>/dev/null || echo "attendance_db exists"

# Install dependencies
services=("auth-service" "employee-service" "attendance-service" "api-gateway")

for service in "${services[@]}"; do
    echo "Installing $service..."
    cd $service
    npm install --silent
    cd ..
done

echo "✅ Setup complete!"
