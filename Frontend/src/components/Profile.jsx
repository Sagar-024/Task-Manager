import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Home, User } from 'lucide-react';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/app/dashboard')}
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-white font-bold text-2xl sm:text-3xl">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{user?.name || 'User'}</h2>
          <p className="text-gray-500 text-base sm:text-lg">{user?.email || 'user@example.com'}</p>
        </div>

        {/* Account Actions */}
        <div className="space-y-4 mb-20">
          <button 
            className="w-full bg-white rounded-3xl p-5 flex items-center justify-between hover:shadow-lg transition-all duration-200 shadow-md"
            onClick={handleLogout}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center">
                <LogOut size={18} className="text-red-500" />
              </div>
              <span className="text-red-500 font-semibold text-base">Log Out</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex justify-around max-w-md mx-auto">
          <button 
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
            onClick={() => navigate('/app/dashboard')}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-blue-500">
            <User size={20} />
            <span className="text-xs mt-1 font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
