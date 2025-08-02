
import React, { useEffect, useState } from 'react';
import { Search, Trash2, Package, Filter, Calendar, CheckCircle } from 'lucide-react';
import { create } from 'zustand';

const useMaterialStore = create((set) => ({
  materials: [],
  setMaterials: (data) => set({ materials: data }),
  deleteMaterial: (code) =>
    set((state) => ({
      materials: state.materials.filter((item) => item.code !== code),
    })),
}));

const ViewMaterials = () => {
  const { materials, setMaterials, deleteMaterial } = useMaterialStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('rawMaterials')) || [];
    setMaterials(stored);
  }, [setMaterials]);

  useEffect(() => {
    localStorage.setItem('rawMaterials', JSON.stringify(materials));
  }, [materials]);

  const filteredMaterials = materials.filter((mat) =>
    mat.nameAr.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Package /> المواد الخام المخزنة
      </h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="🔍 ابحث باسم المادة..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="text-center py-10 text-gray-500">لا توجد مواد مطابقة 🔍</div>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">الاسم (ع)</th>
              <th className="border p-2">الاسم (E)</th>
              <th className="border p-2">الكود</th>
              <th className="border p-2">الوحدة</th>
              <th className="border p-2">الفئة</th>
              <th className="border p-2">تاريخ الإضافة</th>
              <th className="border p-2">ملاحظات</th>
              <th className="border p-2">🗑️</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((mat, idx) => (
              <tr key={mat.code} className="text-center hover:bg-gray-50">
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{mat.nameAr}</td>
                <td className="border p-2">{mat.nameEn}</td>
                <td className="border p-2">{mat.code}</td>
                <td className="border p-2">{mat.unit}</td>
                <td className="border p-2">{mat.category}</td>
                <td className="border p-2">{mat.dateAdded}</td>
                <td className="border p-2">{mat.notes}</td>
                <td className="border p-2">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteMaterial(mat.code)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewMaterials;
