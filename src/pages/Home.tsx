import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';

const Home: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-3xl">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Shield size={48} className="text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome, {user?.name}!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          You've successfully logged into the protected area of the application.
        </p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-2 text-left">
            <p><span className="font-medium">Name:</span> {user?.name}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">User ID:</span> {user?.id}</p>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-indigo-800 mb-2">Protected Content</h3>
          <p className="text-indigo-600">
            This content is only visible to authenticated users. You can now access all features of the application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;