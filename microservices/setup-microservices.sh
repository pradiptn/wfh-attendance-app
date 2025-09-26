#!/bin/bash

echo "Setting up Microservices..."

# Install dependencies for each service
services=("auth-service" "employee-service" "attendance-service" "api-gateway")

for service in "${services[@]}"; do
    echo "Installing dependencies for $service..."
    cd $service
    npm install
    cd ..
done

echo "Creating databases..."
createdb auth_db 2>/dev/null || echo "auth_db already exists"
createdb employee_db 2>/dev/null || echo "employee_db already exists"  
createdb attendance_db 2>/dev/null || echo "attendance_db already exists"

echo "Microservices setup complete!"
echo ""
echo "To start services:"
echo "1. cd auth-service && npm run start:dev"
echo "2. cd employee-service && npm run start:dev"
echo "3. cd attendance-service && npm run start:dev"
echo "4. cd api-gateway && npm run start:dev"
echo ""
echo "Or use: docker-compose up"
