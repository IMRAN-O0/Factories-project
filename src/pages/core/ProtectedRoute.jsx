
import React from 'react';
import { Navigate } from 'react-router-dom';
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuthStore.getState();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <div className="text-center p-10 text-red-600 text-xl">🚫 لا تملك صلاحية الوصول لهذه الصفحة</div>;
  }

  return children;
};

export default ProtectedRoute;
