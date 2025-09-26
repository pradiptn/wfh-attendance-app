#!/bin/bash

echo "Testing admin user login..."

# Test the admin login via API Gateway
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wfh.com","password":"admin123"}' \
  | jq '.'

echo ""
echo "If you see a token above, the admin user is working correctly."
echo "If you see an error, run: docker-compose down && docker-compose up -d"
