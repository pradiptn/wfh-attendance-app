#!/bin/bash

echo "Starting all microservices..."

# Install dependencies and required packages for each service
services=("auth-service" "employee-service" "attendance-service" "api-gateway")

for service in "${services[@]}"; do
    echo "Setting up $service..."
    cd $service
    
    # Install dependencies
    npm install --silent
    
    # Install required dev dependencies
    npm install --save-dev @nestjs/cli typescript ts-node @types/node --silent
    
    cd ..
done

echo "Dependencies installed. Starting services..."

# Start services using npx nest (which should now be available)
(cd auth-service && npx nest start --watch) &
(cd employee-service && npx nest start --watch) &
(cd attendance-service && npx nest start --watch) &
(cd api-gateway && npx nest start --watch) &

echo "All services starting..."
echo "Auth Service: http://localhost:3001"
echo "Employee Service: http://localhost:3002" 
echo "Attendance Service: http://localhost:3003"
echo "API Gateway: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

wait
