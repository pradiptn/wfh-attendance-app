#!/bin/bash

echo "Starting all microservices..."

# Start services in background
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
