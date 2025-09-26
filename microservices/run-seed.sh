#!/bin/bash

echo "Creating admin user in Docker environment..."

# Run the seed script in a temporary container
docker run --rm \
  --network microservices_default \
  -v $(pwd)/seed-admin-docker.js:/app/seed-admin.js \
  -w /app \
  node:16-alpine \
  sh -c "npm install bcrypt pg && node seed-admin.js"

echo ""
echo "Admin credentials:"
echo "Email: admin@wfh.com"
echo "Password: admin123"
