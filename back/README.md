# AqlBot Backend API

Simple and clean backend API for the AqlBot chatbot platform with authentication support.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google OAuth credentials

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
```bash
cp config.env.example config.env
```

Edit `config.env` with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

3. **Start the server:**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The API will be running at `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with email/password |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google/register` | Register/Login with Google |
| GET | `/api/auth/me` | Get current user info |
| POST | `/api/auth/logout` | Logout user |
| PUT | `/api/auth/profile` | Update user profile |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health status |

## 🔧 API Usage Examples

### Register with Email
```javascript
fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    website: 'https://example.com' // optional
  })
})
```

### Login with Email
```javascript
fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
```

### Google Authentication
```javascript
// After getting Google JWT token
fetch('/api/auth/google/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: 'google-jwt-token-here'
  })
})
```

### Access Protected Routes
```javascript
fetch('/api/auth/me', {
  headers: {
    'Authorization': 'Bearer your-jwt-token-here'
  }
})
```

## 🔐 Authentication Flow

1. **Registration/Login** → Receive JWT token
2. **Store token** → Save in localStorage/sessionStorage
3. **Include token** → Add to Authorization header for protected routes
4. **Auto-refresh** → Handle token expiration (7 days default)

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "subscription": {
      "plan": "starter",
      "status": "trial"
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if any
}
```

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: express-validator for all inputs
- **CORS Protection**: Configured for frontend domain
- **Helmet**: Security headers
- **Google OAuth**: Secure social authentication

## 📁 Project Structure

```
├── config/
│   └── database.js         # MongoDB connection
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   └── User.js             # User data model
├── routes/
│   └── auth.js             # Authentication routes
├── config.env              # Environment variables
├── package.json            # Dependencies
├── server.js               # Main server file
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection | `mongodb://localhost:27017/aqlbot` |
| `JWT_SECRET` | JWT signing key | `your-secret-key` |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |
| `GOOGLE_CLIENT_ID` | Google OAuth ID | `your-client-id.apps.googleusercontent.com` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy Client ID and Secret to config.env

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure MongoDB Atlas or production DB
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

### Quick Deploy Commands
```bash
# Install production dependencies
npm install --production

# Start with PM2 (recommended)
npm install -g pm2
pm2 start server.js --name "aqlbot-api"

# Or start directly
npm start
```

## 🧪 Testing the API

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📞 Support

For questions or issues:
1. Check the error logs in console
2. Verify environment variables
3. Ensure MongoDB is running
4. Check Google OAuth configuration

## 🔄 Next Steps

After setting up the backend:
1. Update frontend API calls to use your backend URL
2. Configure Google OAuth in your frontend
3. Set up database indexes for better performance
4. Add email verification (optional)
5. Implement password reset functionality
