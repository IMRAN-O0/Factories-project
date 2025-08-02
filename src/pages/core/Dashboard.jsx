
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import {
  Boxes,
  FilePlus,
  Truck,
  ClipboardList,
  PackageCheck,
  PackagePlus,
  LogOut
} from 'lucide-react';

const useAuthStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem('authUser');
    set({ user: null });
  },
}));

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      setName(parsed.username);
    }
  }, []);

  const links = [
    { path: '/inventory/add', label: '➕ إضافة مواد خام', icon: FilePlus, roles: ['admin', 'inventory'] },
    { path: '/inventory/view', label: '📦 عرض المواد الخام', icon: Boxes, roles: ['admin', 'inventory', 'viewer'] },
    { path: '/product/receipt', label: '📥 استلام منتج نهائي', icon: PackagePlus, roles: ['admin', 'supervisor'] },
    { path: '/product/issue', label: '📤 صرف منتج نهائي', icon: PackageCheck, roles: ['admin', 'supervisor'] },
    { path: '/product/inventory', label: '📋 جرد المنتج النهائي', icon: ClipboardList, roles: ['admin', 'supervisor'] },
  ];

  const filteredLinks = links.filter(link => user && link.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">لوحة التحكم - {name}</h2>
          <button onClick={() => { logout(); navigate('/login'); }} className="text-red-600 flex items-center gap-1">
            <LogOut size={18} /> خروج
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLinks.map(({ path, label, icon: Icon }, idx) => (
            <button
              key={idx}
              onClick={() => navigate(path)}
              className="flex items-center gap-3 border p-4 rounded hover:bg-gray-100 text-left"
            >
              <Icon size={24} />
              <span className="text-lg font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
