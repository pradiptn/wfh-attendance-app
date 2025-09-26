#!/bin/bash

echo "Starting all microservices..."

# Install dependencies for each service
services=("auth-service" "employee-service" "attendance-service" "api-gateway")

for service in "${services[@]}"; do
    echo "Installing dependencies for $service..."
    cd $service
    npm install --silent
    cd ..
done

echo "Dependencies installed. Starting services..."

# Start services
(cd auth-service && npm run start:dev) &
(cd employee-service && npm run start:dev) &
(cd attendance-service && npm run start:dev) &
(cd api-gateway && npm run start:dev) &

echo "All services starting..."
echo "Auth Service: http://localhost:3001"
echo "Employee Service: http://localhost:3002" 
echo "Attendance Service: http://localhost:3003"
echo "API Gateway: http://localhost:4000"
echo ""
echo "Press Ctrl+C to stop all services"

wait
