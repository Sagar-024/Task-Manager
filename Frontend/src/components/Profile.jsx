import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, LogOut, Home, User } from 'lucide-react';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    console.log('Update profile:', formData);
    setShowEditProfile(false);
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
            onClick={() => setShowEditProfile(true)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center">
                <Edit size={18} className="text-gray-600" />
              </div>
              <span className="text-gray-900 font-semibold text-base">Edit Profile</span>
            </div>
          </button>
          
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

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setShowEditProfile(false)}
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="Email"
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-2xl transition-all duration-200"
                  onClick={() => setShowEditProfile(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-2xl transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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