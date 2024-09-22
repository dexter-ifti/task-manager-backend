Backend api = https://youse-ai-task.vercel.app

User Model 
## User Model
- firstName
- lastName
- email
- password
- tokens
- tasks

## Task Model
- title
- description
- status
- priority
- due date
- user

## User Router 
- POST /users/login (email, password)
- POST /users/register (firstName, lastName, email, password)
- GET /users/me 

## Task Router (all routes are protected)
- POST /tasks 
- GET /tasks 
- GET /tasks/filter 
- GET /tasks/:id
- PATCH /tasks/:id 
- DELETE /tasks/:id 

## Middleware
- auth - JWT Token - Bearer Token


