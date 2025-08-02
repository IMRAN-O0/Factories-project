
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { LockKeyhole, LogIn } from 'lucide-react';

const useAuthStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

const LoginPage = () => {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem('authUser'));
    if (existingUser) {
      login(existingUser);
      navigate('/dashboard');
    }
  }, [login, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/data/users.json');
      const users = await res.json();
      const found = users.find(
        (u) => u.username === formData.username && u.password === formData.password
      );
      if (found) {
        login(found);
        localStorage.setItem('authUser', JSON.stringify(found));
        navigate('/dashboard');
      } else {
        setError('❌ اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch {
      setError('🚫 فشل تحميل بيانات الدخول');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <LockKeyhole /> تسجيل الدخول
        </h2>
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        <form onSubmit={handleLogin} className="grid gap-4">
          <input
            type="text"
            name="username"
            placeholder="👤 اسم المستخدم"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <LogIn size={18} /> دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
