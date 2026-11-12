# HMVC Backend FullStack

A modular Node.js backend built with Express.js and PostgreSQL for managing users, modules, permissions, and related business data in an HMVC (Hierarchical Model-View-Controller) structure.

This project is designed to keep the code clean, scalable, and easy to extend as the application grows.

## Overview

This backend supports:

- User registration and login
- JWT-based authentication
- Role and module permission checks
- User management APIs
- Module/group permission management
- Lead management APIs
- PostgreSQL database integration

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- dotenv
- CORS

## Project Structure

```text
HMVC-Backend-FullStack/
├── api/
│   └── v1/
│       ├── auth/
│       ├── global/
│       ├── group_permission/
│       ├── lead/
│       ├── middlewares/
│       ├── module/
│       ├── picklist/
│       ├── response/
│       └── user/
├── config/
│   ├── database.js
│   └── db.config.js
├── routes/
│   └── router.js
├── service/
├── tests/
├── utils/
├── .env
├── package.json
├── server.js
├── start.js
└── README.md
```

## Main Architecture

### 1. API layer

The `api/v1` folder contains separate modules for each business feature, such as:

- `auth` → login, signup, password update
- `user` → user CRUD operations
- `module` → module listing and creation
- `group_permission` → permission assignment logic
- `lead` → lead management
- `picklist` → group/module list and related lookup data

Each feature module usually contains:

- `index.js` → route definitions
- `*.controller.js` → request/response logic
- `*.model.js` → database queries

### 2. Middleware layer

The `middlewares` folder contains reusable logic, especially:

- `authenticateUser` → verifies JWT token
- `checkModulePermission` → checks whether the logged-in user has access to a module/action

### 3. Config layer

The `config` folder handles:

- database connection setup
- environment and JWT configuration

### 4. Routes layer

The `routes/router.js` file mounts each feature under the main API prefix:

```text
/api/v1
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env` file in the project root:

```env
HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=5432
SERVER_PORT=6000
```

### 3. Start the server

```bash
npm start
```

The app will run on:

```text
http://localhost:6000
```

## Base API URL

```text
/api/v1
```

## Example Endpoints

### Authentication

```text
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/passowrd
```

### Users

```text
GET /api/v1/user
GET /api/v1/user/:id
POST /api/v1/user
PUT /api/v1/user/:id
DELETE /api/v1/user
```

### Modules

```text
GET /api/v1/module
POST /api/v1/module
```

### Permissions

```text
GET /api/v1/group-permission/:id
POST /api/v1/global/group-permission
PUT /api/v1/global/group-permission/:id
GET /api/v1/global/module-list
```

### Leads

```text
GET /api/v1/lead
GET /api/v1/lead/:id
POST /api/v1/lead
PUT /api/v1/lead/:id
DELETE /api/v1/lead/:id
```

## Permission Flow

This project includes a permission-based access system:

- User logs in and receives a JWT token
- Token is validated in middleware
- The system checks the user's group permissions
- A route is allowed only if the user has the required `tab_view`, `create`, `update`, or `delete` access for that module

This makes the backend suitable for multi-user access control based on roles and groups.

## Why this project is useful

- Easy to expand with new modules
- Clear modular code structure
- Reusable middleware for auth and permission checks
- Keeps database logic separate from route logic
- Good for learning HMVC architecture in real projects

## Development Notes

- The application uses PostgreSQL with `pg` package
- JWT secret and token expiry are configured in `config/db.config.js`
- `start.js` starts the server and uses the port from environment or default `6000`

## Scripts

```bash
npm start      # run the app with nodemon
npm test       # run Jest tests
```

## License

This project is licensed under ISC.

## Author

Mohd Sarfraz
