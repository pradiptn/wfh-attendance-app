#!/bin/bash

echo "Starting all microservices..."

# Build and start services
services=("auth-service" "employee-service" "attendance-service" "api-gateway")

for service in "${services[@]}"; do
    echo "Building $service..."
    (cd $service && npm install && npm run build) &
done

wait

# Start services in background
(cd auth-service && npm start) &
(cd employee-service && npm start) &
(cd attendance-service && npm start) &
(cd api-gateway && npm start) &

echo "All services starting..."
echo "Auth Service: http://localhost:3001"
echo "Employee Service: http://localhost:3002" 
echo "Attendance Service: http://localhost:3003"
echo "API Gateway: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

wait
