# Backend Node.js + JavaScript Project

Production-ready Node.js Express MongoDB backend with comprehensive security and scalability features.

## Features

- 🚀 **Express.js** - Fast, unopinionated web framework
- 🍃 **MongoDB & Mongoose** - NoSQL database with ODM
- 🔐 **Authentication** - JWT-based authentication
- 🛡️ **Security** - Helmet, CORS, Rate Limiting, Sanitization
- ✅ **Validation** - Request validation middleware
- 📝 **Logging** - Morgan HTTP request logger
- 🗜️ **Compression** - Response compression
- 🔄 **Error Handling** - Centralized error handling
- 📊 **Pagination** - Built-in pagination support
- 🎯 **Production Ready** - Environment-based configuration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/app_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## Project Structure

```
src/
├── config/
│   ├── config.js          # Application configuration
│   └── database.js        # MongoDB connection
├── controllers/           # Request handlers
│   ├── authController.js
│   └── userController.js
├── middleware/            # Custom middleware
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── validationMiddleware.js
│   └── index.js
├── models/                # Mongoose models
│   └── User.js
├── routes/                # API routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── index.js
├── utils/                 # Utility functions
│   ├── asyncHandler.js
│   └── responseHelper.js
└── server.js              # Application entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Forgot password
- `PUT /api/auth/reset-password/:resetToken` - Reset password

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/profile` - Update own profile

### Health Check

- `GET /health` - Server health check

## Security Features

### Rate Limiting

Default: 100 requests per 15 minutes per IP

```javascript
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Security Headers

- Helmet.js for security headers
- CORS protection
- MongoDB injection protection
- XSS protection

### Authentication

- JWT-based authentication
- Password hashing with bcrypt
- HTTP-only cookies
- Token expiration

## Error Handling

Centralized error handling with custom error classes:

- ValidationError - 400
- UnauthorizedError - 401
- ForbiddenError - 403
- NotFoundError - 404
- ServerError - 500

## Database

### MongoDB Connection

The application includes automatic reconnection and connection monitoring.

### Models

All models include:
- Timestamps
- Validation
- Pre/post hooks
- Virtual properties
- Instance methods

## Best Practices

- ✅ Async/await with error handling
- ✅ Environment-based configuration
- ✅ Modular route structure
- ✅ Input validation & sanitization
- ✅ Proper HTTP status codes
- ✅ Consistent API responses
- ✅ Security best practices
- ✅ Scalable folder structure

## Scripts

- `npm run dev` - Development mode with nodemon
- `npm start` - Production mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Common MongoDB URI

The backend is configured to use a common local database:

```
mongodb://localhost:27017/app_db
```

All environments (JS, TS) can connect to this same database for development.

## License

MIT
