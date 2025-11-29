#!/bin/bash

echo "==================================="
echo "Testing Lab 7 API Endpoints"
echo "==================================="
echo ""

# Health Check
echo "1. Testing Health Check..."
curl -s http://localhost:3000/health | jq '.'
echo ""
echo ""

# Root endpoint
echo "2. Testing Root Endpoint..."
curl -s http://localhost:3000/ | jq '.'
echo ""
echo ""

# Get all users
echo "3. Testing GET /api/users..."
curl -s http://localhost:3000/api/users | jq '.'
echo ""
echo ""

# Get all items
echo "4. Testing GET /api/items..."
curl -s http://localhost:3000/api/items | jq '.'
echo ""
echo ""

# Create a new user
echo "5. Testing POST /api/users..."
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}' | jq '.'
echo ""
echo ""

# Create a new item
echo "6. Testing POST /api/items..."
curl -s -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Item","description":"Test description","user_id":1}' | jq '.'
echo ""
echo ""

# Get specific user
echo "7. Testing GET /api/users/1..."
curl -s http://localhost:3000/api/users/1 | jq '.'
echo ""
echo ""

# Update user
echo "8. Testing PUT /api/users/1..."
curl -s -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User"}' | jq '.'
echo ""
echo ""

echo "==================================="
echo "All tests completed!"
echo "==================================="
echo ""
echo "You can access:"
echo "- API Documentation: http://localhost:3000/api-docs"
echo "- Health Check: http://localhost:3000/health"
echo "- Chrome DevTools Debugger: chrome://inspect"
