# Microservices Architecture Plan

## Service Breakdown

### 1. Auth Service (Port 3001)
- User authentication/authorization
- JWT token management
- Database: auth_db

### 2. Employee Service (Port 3002)  
- Employee CRUD operations
- Employee data management
- Database: employee_db

### 3. Attendance Service (Port 3003)
- Attendance recording
- Photo upload handling
- Database: attendance_db

### 4. API Gateway (Port 3000)
- Route requests to appropriate services
- Load balancing
- Authentication middleware

## Implementation Steps

1. Split current modules into separate NestJS apps
2. Create individual databases for each service
3. Implement service-to-service communication
4. Add API Gateway for routing
5. Update frontend to use gateway endpoints

## Directory Structure
```
microservices/
├── auth-service/
├── employee-service/  
├── attendance-service/
├── api-gateway/
└── docker-compose.yml
```
