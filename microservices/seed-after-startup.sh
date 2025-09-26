#!/bin/bash

echo "Waiting for services to start and create tables..."
echo "This may take a few minutes..."

# Wait for services to be ready
sleep 30

echo "Running admin seed script..."

docker run --rm \
  --network microservices_default \
  -v $(pwd)/wait-and-seed.js:/app/wait-and-seed.js \
  -w /app \
  node:16-alpine \
  sh -c "npm install bcrypt pg && node wait-and-seed.js"

echo ""
echo "Admin credentials:"
echo "Email: admin@wfh.com"
echo "Password: admin123"
