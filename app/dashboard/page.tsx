'use client';

import React, { useEffect, useState } from 'react';
import { logout } from '@/app/auth/lib/action';

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('nextjs-basic-auth-current-user');
    logout();
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = JSON.parse(localStorage.getItem('nextjs-basic-auth-users') || '[]')
      const loggedinUser = JSON.parse(localStorage.getItem('nextjs-basic-auth-current-user') || 'null');
      setUsers(storedUsers);
      setCurrentUser(loggedinUser);
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {currentUser?.name}!</h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <div className="bg-white shadow rounded-lg">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border-b last:border-b-0"
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard