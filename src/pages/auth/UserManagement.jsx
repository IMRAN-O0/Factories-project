
import React, { useEffect, useState } from 'react';
import { create } from 'zustand';
import { UserPlus, Trash2, Save, ShieldCheck, Pencil } from 'lucide-react';

const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) =>
    set((state) => ({ users: [...state.users, user] })),
  removeUser: (username) =>
    set((state) => ({
      users: state.users.filter((u) => u.username !== username),
    })),
}));

const UserManagement = () => {
  const { users, setUsers, addUser, removeUser } = useUserStore();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'viewer',
    permissions: ['view'],
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(stored);
  }, [setUsers]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.some((u) => u.username === form.username)) return alert('⚠️ اسم المستخدم موجود مسبقًا');
    addUser(form);
    setForm({ username: '', password: '', role: 'viewer', permissions: ['view'] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ShieldCheck /> إدارة المستخدمين
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 bg-white p-4 rounded shadow mb-6">
        <input name="username" placeholder="اسم المستخدم" value={form.username} onChange={handleChange} className="p-2 border rounded" required />
        <input name="password" placeholder="كلمة المرور" value={form.password} onChange={handleChange} className="p-2 border rounded" required />
        <select name="role" value={form.role} onChange={handleChange} className="p-2 border rounded">
          <option value="admin">مدير</option>
          <option value="supervisor">مشرف</option>
          <option value="inventory">مخزون</option>
          <option value="viewer">مشاهدة فقط</option>
        </select>
        <div className="flex gap-2 flex-wrap col-span-full">
          {['view', 'edit', 'delete', 'print', 'manage_users'].map((perm) => (
            <label key={perm} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.permissions.includes(perm)}
                onChange={() => handlePermissionToggle(perm)}
              />
              {perm}
            </label>
          ))}
        </div>
        <button type="submit" className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex justify-center items-center gap-2">
          <Save size={18} /> إضافة مستخدم
        </button>
      </form>

      <table className="w-full border text-sm bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">المستخدم</th>
            <th className="border p-2">الدور</th>
            <th className="border p-2">الصلاحيات</th>
            <th className="border p-2">حذف</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.username} className="text-center hover:bg-gray-50">
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">{u.permissions.join(', ')}</td>
              <td className="border p-2">
                <button className="text-red-600 hover:text-red-800" onClick={() => removeUser(u.username)}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
