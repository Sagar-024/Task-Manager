import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import App, { 
  RootLayout, 
  AuthLayoutWrapper, 
  AppLayoutWrapper, 
  LoginPage, 
  RegisterPage, 
  DashboardPage, 
  ProfilePage 
} from './App.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "auth",
        element: <AuthLayoutWrapper />,
        children: [
          {
            path: "login",
            element: <LoginPage />
          },
          {
            path: "register",
            element: <RegisterPage />
          }
        ]
      },
      {
        path: "app",
        element: <AppLayoutWrapper />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />
          },
          {
            path: "profile",
            element: <ProfilePage />
          }
        ]
      },
      {
        path: "login",
        element: <Navigate to="/auth/login" replace />
      },
      {
        path: "register",
        element: <Navigate to="/auth/register" replace />
      },
      {
        path: "dashboard",
        element: <Navigate to="/app/dashboard" replace />
      },
      {
        path: "profile",
        element: <Navigate to="/app/profile" replace />
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
      <RouterProvider router={router} />
    
  </React.StrictMode>
)
