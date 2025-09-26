#!/bin/bash

echo "Creating admin user in Docker environment..."

# Get the correct network name
NETWORK_NAME=$(docker network ls --filter name=microservices --format "{{.Name}}" | head -1)
if [ -z "$NETWORK_NAME" ]; then
    NETWORK_NAME="microservices_default"
fi

echo "Using network: $NETWORK_NAME"

# Wait for auth-db to be ready
echo "Waiting for auth-db to be ready..."
docker run --rm --network $NETWORK_NAME postgres:13 \
  sh -c 'until pg_isready -h auth-db -p 5432 -U postgres; do sleep 1; done'

# Run the seed script
docker run --rm \
  --network $NETWORK_NAME \
  -v $(pwd)/seed-admin-docker.js:/app/seed.js \
  -w /app \
  node:16-alpine \
  sh -c "npm install bcrypt pg && node seed.js"

echo ""
echo "Admin credentials:"
echo "Email: admin@wfh.com"
echo "Password: admin123"
