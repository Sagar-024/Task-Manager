import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

// Root Layout Component
export const RootLayout = () => {
  const { user } = useAuth();
  
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

// Auth Layout Component
export const AuthLayoutWrapper = () => {
  const { user } = useAuth();
  
  return (
    <PublicRoute user={user}>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </PublicRoute>
  );
};

// App Layout Component  
export const AppLayoutWrapper = () => {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute user={user}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  );
};

// Login Component
export const LoginPage = () => {
  const { setUser } = useAuth();
  return <Login setUser={setUser} />;
};

// Register Component
export const RegisterPage = () => {
  const { setUser } = useAuth();
  return <Register setUser={setUser} />;
};

// Dashboard Component
export const DashboardPage = () => {
  const { user } = useAuth();
  return <Dashboard user={user} />;
};

// Profile Component
export const ProfilePage = () => {
  const { user, setUser } = useAuth();
  return <Profile user={user} setUser={setUser} />;
};

export default App;
