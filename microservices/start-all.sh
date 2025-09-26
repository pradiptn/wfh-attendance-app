#!/bin/bash

echo "Starting all microservices..."

# Install dependencies first
services=("auth-service" "employee-service" "attendance-service" "api-gateway")

for service in "${services[@]}"; do
    echo "Installing dependencies for $service..."
    (cd $service && npm install --silent)
done

# Start services in development mode using ts-node
(cd auth-service && npx ts-node src/main.ts) &
(cd employee-service && npx ts-node src/main.ts) &
(cd attendance-service && npx ts-node src/main.ts) &
(cd api-gateway && npx ts-node src/main.ts) &

echo "All services starting..."
echo "Auth Service: http://localhost:3001"
echo "Employee Service: http://localhost:3002" 
echo "Attendance Service: http://localhost:3003"
echo "API Gateway: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

wait
