# Task Manager App 

A modern, responsive task management application built with React and Node.js, 

## Features


- **User Authentication**: Login and registration with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Progress Tracking**: Visual progress indicators and statistics
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Real-time Updates**: Dynamic task filtering and status updates

## Tech Stack

### Frontend
- React with modern hooks
- React Router  
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
task-manager-app/
├── Frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── layouts/        # Layout components (Auth, App)
│   │   ├── main.jsx        # Entry point with routing
│   │   └── App.jsx         # Main app with context
│   ├── tailwind.config.js  # Tailwind configuration
│   └── package.json
├── Backend/
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── index.js           # Server entry point
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory:
   ```env
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Create and manage your tasks
4. Track your progress with the visual progress indicators
5. Navigate between Dashboard and Profile using the bottom navigation

## Key Features Implemented

### Authentication
- Secure JWT-based authentication
- Protected routes with proper redirects
- User context management

### Routing
- Modern React Router v6 implementation
- Nested routes with layouts
- Protected and public route handling

### UI Components
- **Login/Register**: Clean authentication forms
- **Dashboard**: Task list with progress tracking
- **Profile**: User settings and account management
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Task Management
- Create, edit, and delete tasks
- Priority levels (High, Medium, Low)
- Status tracking (Pending, In Progress, Completed)
- Due date management
- Progress visualization

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks for user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## Design Implementation

The app has been built to match the provided design mockup exactly, including:
- Color scheme and gradients
- Typography and spacing
- Component layouts and interactions
- Mobile-first responsive design
- Status bars and navigation elements

## Development Notes

- All components use human-readable variable names
- Proper error handling and loading states
- Clean, maintainable code structure
- Responsive design with Tailwind CSS
- Modern React patterns and hooks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

