import { Outlet } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import { Moon, Sun } from 'lucide-react';

// Create theme context
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const AppLayout = () => {
  // Force light mode only
  const [darkMode] = useState(false);

  // Ensure no 'dark' class is applied and persist light
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 text-gray-900`}>
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
};

export default AppLayout;