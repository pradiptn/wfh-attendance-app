# WFH Attendance Application

A fullstack web application for Work From Home employee attendance tracking with photo verification.

## Features

### Employee Features
- User registration and login
- Record attendance with photo upload
- Add optional notes to attendance records
- View personal attendance history

### Admin Features
- View all employee attendance records
- Monitor employee work-from-home activities

## Tech Stack

**Backend:**
- NestJS (Node.js framework)
- TypeORM (Database ORM)
- MySQL (Database)
- JWT (Authentication)
- Multer (File upload)

**Frontend:**
- React.js with TypeScript
- Axios (HTTP client)
- React Router (Navigation)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL server
- npm or yarn

### Installation

1. Clone and setup:
```bash
./setup.sh
```

2. Database Setup:
```sql
CREATE DATABASE wfh_attendance;
```

3. Update database credentials in `backend/src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'your_username',
  password: 'your_password',
  database: 'wfh_attendance',
  // ...
})
```

### Running the Application

1. Start Backend:
```bash
cd backend
npm run start:dev
```
Backend runs on http://localhost:3001

2. Start Frontend:
```bash
cd frontend
npm start
```
Frontend runs on http://localhost:3000

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Attendance
- `POST /attendance` - Record attendance (with photo upload)
- `GET /attendance` - Get attendance records

## Usage

1. Register a new account or login
2. Upload a photo and record your attendance
3. View attendance records (employees see their own, admins see all)
4. Admin users can monitor all employee activities

## Project Structure

```
wfh-attendance-app/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── attendance/     # Attendance module
│   │   ├── entities/       # Database entities
│   │   └── main.ts
│   └── uploads/            # Photo storage
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.tsx
└── README.md
```
