# Smart Notes App

## Overview
A full-stack web application that allows users to register, log in, and manage notes securely using JWT authentication and role-based access control.

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Validation: Joi

## Features
- User registration and login
- Password hashing using bcrypt
- JWT authentication
- Role-based access (Admin/User)
- Create and view notes
- Protected routes
- Input validation and error handling

## Setup Instructions

### Backend
cd backend  
npm install  
node server.js  

### Frontend
cd frontend  
npm install  
npm start  

## API Endpoints

### Auth
POST /api/v1/auth/register  
POST /api/v1/auth/login  

### Notes
GET /api/v1/notes  
POST /api/v1/notes  

## Notes
- Admin role is assigned based on email during registration.
- Environment variables are stored in `.env` and not pushed to GitHub.