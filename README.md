# ePlan Backend API

A comprehensive financial planning backend API built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Normal, Enterprise, Admin)
  - Password reset functionality
  - Secure password hashing

- **User Management**
  - User registration and login
  - Profile management
  - Admin user management with pagination and search

- **Financial Data Management**
  - Assets management
  - Liabilities tracking
  - Income records
  - Net worth calculations

- **Analytics & Reporting**
  - Asset allocation charts
  - Financial projections
  - Rule of 100 calculations
  - User statistics for admin dashboard

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eplan-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/eplan
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   
   # Email configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@eplan.com
   ```

4. **Database Setup**
   Make sure MongoDB is running on your system, then seed the database:
   ```bash
   node seeders/adminSeeder.js
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

### User Management (Admin only)
- `GET /api/users` - Get all users with pagination
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `PATCH /api/user/update-status/:id` - Update user status

### Profile Management
- `GET /api/myprofile/profile` - Get user profile
- `POST /api/myprofile/profile` - Create user profile
- `PUT /api/myprofile/profile/:id` - Update user profile
- `GET /api/myprofile/source` - Get client/spouse names for dropdowns

### Assets Management
- `GET /api/assets/assets` - Get user assets
- `POST /api/assets/assets` - Create assets
- `PUT /api/assets/assets/:id` - Update asset
- `DELETE /api/assets/assets/:id` - Delete asset

### Liabilities Management
- `GET /api/liability/liability` - Get user liabilities
- `POST /api/liability/liability` - Create liabilities
- `PUT /api/liability/liability/:id` - Update liability
- `DELETE /api/liability/liability/:id` - Delete liability

### Income Management
- `GET /api/income/income` - Get user income data
- `POST /api/income/income` - Create income records
- `PUT /api/income/income/:id` - Update income record
- `DELETE /api/income/income/:id` - Delete income record

### Financial Analytics
- `GET /api/networth/networth` - Get net worth calculation
- `GET /api/graph/asset-allocation` - Get asset allocation data
- `GET /api/graph/rule_of_100_allocation` - Get rule of 100 allocation
- `GET /api/graph/chart` - Get ePlan recommended allocation (Enterprise)
- `GET /api/graph/financial-projection` - Get financial projection data (Enterprise)

### Admin Analytics
- `GET /api/userchart` - Get user statistics for charts (Admin only)
- `GET /api/finance/financial` - Get comprehensive financial data (Enterprise)

### Default Parameters (Admin only)
- `GET /api/default/default-parameters` - Get default parameters
- `PUT /api/default/default-parameters` - Update default parameters

## Default Users

After running the seeder, you'll have these default users:

1. **Admin User**
   - Email: admin@eplan.com
   - Password: Admin@123
   - Role: Admin

2. **Enterprise User**
   - Email: enterprise@eplan.com
   - Password: Enterprise@123
   - Role: Enterprise

3. **Normal User**
   - Email: user@eplan.com
   - Password: User@123
   - Role: Normal

## Security Features

- Helmet.js for security headers
- Rate limiting
- CORS configuration
- Input validation and sanitization
- Password hashing with bcrypt
- JWT token authentication
- Role-based access control

## Error Handling

The API includes comprehensive error handling with:
- Validation error messages
- Database error handling
- Authentication error responses
- Global error handler middleware

## Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run tests
npm test
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Update the JWT_SECRET with a strong secret key
3. Configure your MongoDB connection string
4. Set up email service credentials
5. Configure CORS for your frontend domain

## API Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "message": "Error description",
  "errors": [ ... ] // Optional validation errors
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.