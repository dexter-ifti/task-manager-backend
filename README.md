# Task Manager API Documentation

This documentation describes the REST API endpoints for a task management system.

## Base URL
```
https://youse-ai-task.vercel.app
```

## Authentication
The API uses JWT Bearer token authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## User Endpoints

### Register User
```http
POST /users/register
```

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string"
  }
}
```

### Login User
```http
POST /users/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string"
  }
}
```

### Get Current User
```http
GET /users/me
```

Requires authentication.

## Task Endpoints

All task endpoints require authentication.

### Create Task
```http
POST /tasks
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "status": "To do" | "In progress" | "Completed",
  "priority": "Low" | "Medium" | "High",
  "dueDate": "Date"
}
```

### Get All Tasks
```http
GET /tasks?page=1&limit=10
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Get Filtered Tasks
```http
GET /tasks/filter
```

**Query Parameters:**
- `status`: Filter by status
- `priority`: Filter by priority
- `sortBy`: Field to sort by
- `order`: Sort order ('asc' or 'desc')
- `page`: Page number
- `limit`: Items per page

### Get Task by ID
```http
GET /tasks/:id
```

### Update Task
```http
PATCH /tasks/:id
```

**Request Body:** (all fields optional)
```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "priority": "string",
  "dueDate": "Date"
}
```

### Delete Task
```http
DELETE /tasks/:id
```

## Models

### User Model
- `firstName`: String (required)
- `lastName`: String (required)
- `email`: String (required, unique)
- `password`: String (required, min length: 6)
- `tokens`: Array of tokens
- `tasks`: Array of task references

### Task Model
- `title`: String (required, 3-50 chars)
- `description`: String (3-500 chars)
- `status`: Enum ["To do", "In progress", "Completed"]
- `priority`: Enum ["Low", "Medium", "High"]
- `dueDate`: Date (required)
- `user`: Reference to User (required)


