# AqlBot API Structure

This document outlines the new organized API structure with separated user and admin routes, and controller-based logic.

## Directory Structure

```
back/
├── controllers/
│   ├── authController.js      # User authentication logic
│   └── adminController.js     # Admin management logic
├── middleware/
│   ├── auth.js               # User authentication middleware
│   └── adminAuth.js          # Admin authentication middleware
├── routes/
│   ├── user/
│   │   ├── index.js          # User routes entry point
│   │   └── auth.js           # User authentication routes
│   ├── admin/
│   │   ├── index.js          # Admin routes entry point
│   │   ├── users.js          # User management routes
│   │   └── dashboard.js      # Dashboard statistics routes
│   └── auth.js               # [DEPRECATED] Old auth routes
├── models/
│   └── User.js               # User model (updated with role field)
└── server.js                 # Main server file (updated routes)
```

## API Endpoints

### User Routes (`/api/user`)

#### Authentication (`/api/user/auth`)
- `POST /api/user/auth/register` - Register new user
- `POST /api/user/auth/login` - Login user
- `POST /api/user/auth/google/register` - Google OAuth login/register
- `GET /api/user/auth/me` - Get current user profile
- `POST /api/user/auth/logout` - Logout user
- `PUT /api/user/auth/profile` - Update user profile

### Admin Routes (`/api/admin`)

#### User Management (`/api/admin/users`)
- `GET /api/admin/users` - Get all users (with pagination & filtering)
- `GET /api/admin/users/:id` - Get specific user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/bulk` - Bulk update users

#### Dashboard (`/api/admin/dashboard`)
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## Controllers

### AuthController (`controllers/authController.js`)
Contains all user authentication logic:
- `register()` - User registration
- `login()` - User login
- `googleAuth()` - Google OAuth handling
- `getMe()` - Get current user
- `logout()` - User logout
- `updateProfile()` - Profile updates

### AdminController (`controllers/adminController.js`)
Contains all admin management logic:
- `getAllUsers()` - Get users with pagination
- `getUserById()` - Get specific user
- `updateUser()` - Update user data
- `deleteUser()` - Delete user
- `getDashboardStats()` - Get admin statistics
- `bulkUpdateUsers()` - Bulk operations

## Middleware

### User Auth (`middleware/auth.js`)
- Validates JWT tokens
- Extracts user information
- Protects user routes

### Admin Auth (`middleware/adminAuth.js`)
- Validates JWT tokens
- Checks admin role
- Protects admin routes

## User Model Updates

Added new field:
```javascript
role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
}
```

## Usage Examples

### User Registration
```javascript
POST /api/user/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "website": "https://johndoe.com"
}
```

### Admin Get Users
```javascript
GET /api/admin/users?page=1&limit=10&search=john&accountType=email
Authorization: Bearer <admin_token>
```

### Admin Update User
```javascript
PUT /api/admin/users/60d5ecb54b24a03d5c8e4b5a
Authorization: Bearer <admin_token>
{
  "name": "Updated Name",
  "subscription": "pro",
  "isEmailVerified": true
}
```

## Migration Notes

1. **Route Changes**: All routes have been moved from `/api/auth/*` to `/api/user/auth/*`
2. **Admin Routes**: New admin routes at `/api/admin/*`
3. **Controllers**: Logic moved from routes to controllers
4. **User Model**: Added `role` field for admin access control
5. **Middleware**: New admin authentication middleware

## Benefits

1. **Separation of Concerns**: User and admin functionality clearly separated
2. **Maintainability**: Logic in controllers, routes handle only routing
3. **Scalability**: Easy to add new user/admin features
4. **Security**: Role-based access control for admin functions
5. **Organization**: Clear directory structure and file organization

## Next Steps

1. Update frontend to use new API endpoints (`/api/user/auth/*`)
2. Create admin dashboard using new admin endpoints
3. Add more admin features (chatbot management, analytics, etc.)
4. Add more user features (chatbot creation, settings, etc.)
5. Remove deprecated `/api/auth` routes after migration
