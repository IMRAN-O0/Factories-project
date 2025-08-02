 import React, { useState } from 'react';
import { Plus, Trash2, Save, Download, Calendar, Package, User, FileText } from 'lucide-react';

const MaterialReceiptForm = () => {
  const [formData, setFormData] = useState({
    receiptNumber: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0,5),
    supplier: '',
    supplierCode: '',
    deliveryNote: '',
    purchaseOrder: '',
    vehicleNumber: '',
    driverName: '',
    receivedBy: '',
    checkedBy: '',
    approvedBy: '',
    notes: '',
    temperature: '',
    humidity: '',
    items: [{
      id: 1,
      materialCode: '',
      materialName: '',
      unit: '',
      orderedQty: '',
      receivedQty: '',
      batchNumber: '',
      expiryDate: '',
      manufacturingDate: '',
      condition: 'مقبول',
      notes: ''
    }]
  });

  const [printMode, setPrintMode] = useState(false);

  const conditions = ['مقبول', 'مرفوض', 'مقبول مع تحفظ', 'تحت المراجعة'];
  const units = ['كيلو', 'جرام', 'لتر', 'مل', 'قطعة', 'كرتون', 'كيس', 'علبة'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: prev.items.length + 1,
        materialCode: '',
        materialName: '',
        unit: '',
        orderedQty: '',
        receivedQty: '',
        batchNumber: '',
        expiryDate: '',
        manufacturingDate: '',
        condition: 'مقبول',
        notes: ''
      }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const saveData = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `material_receipt_${formData.receiptNumber || 'new'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printForm = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 100);
  };

  if (printMode) {
    return (
      <div className="min-h-screen bg-white p-8 text-black print:p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-2xl font-bold mb-2">إذن استلام مواد</h1>
            <div className="text-sm">
              <span>رقم الإذن: {formData.receiptNumber}</span>
              <span className="mx-4">التاريخ: {formData.date}</span>
              <span>الوقت: {formData.time}</span>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <strong>بيانات المورد:</strong>
              <div>المورد: {formData.supplier}</div>
              <div>كود المورد: {formData.supplierCode}</div>
              <div>إذن التوريد: {formData.deliveryNote}</div>
              <div>أمر الشراء: {formData.purchaseOrder}</div>
            </div>
            <div>
              <strong>بيانات النقل:</strong>
              <div>رقم المركبة: {formData.vehicleNumber}</div>
              <div>اسم السائق: {formData.driverName}</div>
              <div>الحرارة: {formData.temperature}°م</div>
              <div>الرطوبة: {formData.humidity}%</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse border border-gray-800 mb-6 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-800 p-2">#</th>
                <th className="border border-gray-800 p-2">كود المادة</th>
                <th className="border border-gray-800 p-2">اسم المادة</th>
                <th className="border border-gray-800 p-2">الوحدة</th>
                <th className="border border-gray-800 p-2">الكمية المطلوبة</th>
                <th className="border border-gray-800 p-2">الكمية المستلمة</th>
                <th className="border border-gray-800 p-2">رقم الدفعة</th>
                <th className="border border-gray-800 p-2">تاريخ الإنتاج</th>
                <th className="border border-gray-800 p-2">تاريخ الانتهاء</th>
                <th className="border border-gray-800 p-2">الحالة</th>
                <th className="border border-gray-800 p-2">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-800 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-800 p-2">{item.materialCode}</td>
                  <td className="border border-gray-800 p-2">{item.materialName}</td>
                  <td className="border border-gray-800 p-2">{item.unit}</td>
                  <td className="border border-gray-800 p-2 text-center">{item.orderedQty}</td>
                  <td className="border border-gray-800 p-2 text-center">{item.receivedQty}</td>
                  <td className="border border-gray-800 p-2">{item.batchNumber}</td>
                  <td className="border border-gray-800 p-2">{item.manufacturingDate}</td>
                  <td className="border border-gray-800 p-2">{item.expiryDate}</td>
                  <td className="border border-gray-800 p-2">{item.condition}</td>
                  <td className="border border-gray-800 p-2">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>تم الاستلام بواسطة</div>
                <div className="font-bold">{formData.receivedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>تم الفحص بواسطة</div>
                <div className="font-bold">{formData.checkedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>تم الاعتماد بواسطة</div>
                <div className="font-bold">{formData.approvedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
          </div>

          {formData.notes && (
            <div className="mt-6 text-sm">
              <strong>ملاحظات عامة:</strong>
              <div className="border border-gray-800 p-2 mt-2">{formData.notes}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Package className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">إذن استلام مواد</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveData}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={16} />
                حفظ البيانات
              </button>
              <button
                onClick={printForm}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={16} />
                طباعة
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الإذن</label>
              <input
                type="text"
                value={formData.receiptNumber}
                onChange={(e) => handleInputChange('receiptNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MR-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوقت</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الحرارة (°م)</label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25"
              />
            </div>
          </div>
        </div>

        {/* Supplier Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-indigo-600" size={20} />
            بيانات المورد والنقل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المورد</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="شركة المواد الغذائية"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كود المورد</label>
              <input
                type="text"
                value={formData.supplierCode}
                onChange={(e) => handleInputChange('supplierCode', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="SUP-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">إذن التوريد</label>
              <input
                type="text"
                value={formData.deliveryNote}
                onChange={(e) => handleInputChange('deliveryNote', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="DN-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">أمر الشراء</label>
              <input
                type="text"
                value={formData.purchaseOrder}
                onChange={(e) => handleInputChange('purchaseOrder', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PO-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم المركبة</label>
              <input
                type="text"
                value={formData.vehicleNumber}
                onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أ ب ج 123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم السائق</label>
              <input
                type="text"
                value={formData.driverName}
                onChange={(e) => handleInputChange('driverName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أحمد محمد"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الرطوبة (%)</label>
              <input
                type="number"
                value={formData.humidity}
                onChange={(e) => handleInputChange('humidity', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="60"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="text-green-600" size={20} />
              تفاصيل المواد المستلمة
            </h2>
            <button
              onClick={addItem}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={16} />
              إضافة مادة
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">كود المادة</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">اسم المادة</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الوحدة</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">مطلوب</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">مستلم</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">رقم الدفعة</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">تاريخ الإنتاج</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">تاريخ الانتهاء</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الحالة</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">ملاحظات</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">إجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-sm text-gray-900 text-center">{index + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={item.materialCode}
                        onChange={(e) => handleItemChange(index, 'materialCode', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MAT-001"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={item.materialName}
                        onChange={(e) => handleItemChange(index, 'materialName', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="اسم المادة"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">اختر</option>
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={item.orderedQty}
                        onChange={(e) => handleItemChange(index, 'orderedQty', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="100"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={item.receivedQty}
                        onChange={(e) => handleItemChange(index, 'receivedQty', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="100"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={item.batchNumber}
                        onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="B2024001"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="date"
                        value={item.manufacturingDate}
                        onChange={(e) => handleItemChange(index, 'manufacturingDate', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="date"
                        value={item.expiryDate}
                        onChange={(e) => handleItemChange(index, 'expiryDate', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={item.condition}
                        onChange={(e) => handleItemChange(index, 'condition', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      >
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ملاحظات"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeItem(index)}
                        disabled={formData.items.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures and Notes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تم الاستلام بواسطة</label>
              <input
                type="text"
                value={formData.receivedBy}
                onChange={(e) => handleInputChange('receivedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="اسم المستلم"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تم الفحص بواسطة</label>
              <input
                type="text"
                value={formData.checkedBy}
                onChange={(e) => handleInputChange('checkedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="اسم الفاحص"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تم الاعتماد بواسطة</label>
              <input
                type="text"
                value={formData.approvedBy}
                onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="اسم المعتمد"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات عامة</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أي ملاحظات إضافية..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialReceiptForm;
