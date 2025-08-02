import React, { useState } from 'react';
import { Plus, Trash2, Save, Download, Calendar, Package2, User, FileText, AlertTriangle } from 'lucide-react';

const MaterialIssueForm = () => {
  const [formData, setFormData] = useState({
    issueNumber: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0,5),
    department: '',
    requestedBy: '',
    authorizedBy: '',
    issuedBy: '',
    receivedBy: '',
    purpose: '',
    priority: 'عادي',
    notes: '',
    items: [{
      id: 1,
      materialCode: '',
      materialName: '',
      unit: '',
      requestedQty: '',
      issuedQty: '',
      availableStock: '',
      batchNumber: '',
      expiryDate: '',
      location: '',
      cost: '',
      notes: ''
    }]
  });

  const [printMode, setPrintMode] = useState(false);

  const departments = ['الإنتاج', 'الجودة', 'الصيانة', 'التعبئة', 'المختبر', 'الإدارة', 'التنظيف', 'الأمن'];
  const priorities = ['عاجل', 'عادي', 'غير عاجل'];
  const units = ['كيلو', 'جرام', 'لتر', 'مل', 'قطعة', 'كرتون', 'كيس', 'علبة'];
  const purposes = ['الإنتاج', 'الصيانة', 'التنظيف', 'المختبر', 'الاستهلاك العام', 'أخرى'];

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
        requestedQty: '',
        issuedQty: '',
        availableStock: '',
        batchNumber: '',
        expiryDate: '',
        location: '',
        cost: '',
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

  const calculateTotalCost = () => {
    return formData.items.reduce((total, item) => {
      const cost = parseFloat(item.cost) || 0;
      const qty = parseFloat(item.issuedQty) || 0;
      return total + (cost * qty);
    }, 0).toFixed(2);
  };

  const getStockAlert = (available, requested) => {
    const avail = parseFloat(available) || 0;
    const req = parseFloat(requested) || 0;
    if (avail < req) return 'نقص في المخزون';
    if (avail < req * 1.2) return 'مخزون منخفض';
    return 'مخزون كافي';
  };

  const saveData = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `material_issue_${formData.issueNumber || 'new'}.json`;
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
            <h1 className="text-2xl font-bold mb-2">إذن صرف مواد</h1>
            <div className="text-sm">
              <span>رقم الإذن: {formData.issueNumber}</span>
              <span className="mx-4">التاريخ: {formData.date}</span>
              <span>الوقت: {formData.time}</span>
              <span className="mx-4">الأولوية: {formData.priority}</span>
            </div>
          </div>

          {/* Request Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <strong>بيانات الطلب:</strong>
              <div>القسم الطالب: {formData.department}</div>
              <div>طالب الصرف: {formData.requestedBy}</div>
              <div>الغرض: {formData.purpose}</div>
            </div>
            <div>
              <strong>بيانات التنفيذ:</strong>
              <div>المخول بالصرف: {formData.authorizedBy}</div>
              <div>قام بالصرف: {formData.issuedBy}</div>
              <div>المستلم: {formData.receivedBy}</div>
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
                <th className="border border-gray-800 p-2">المطلوب</th>
                <th className="border border-gray-800 p-2">المصروف</th>
                <th className="border border-gray-800 p-2">المخزون المتاح</th>
                <th className="border border-gray-800 p-2">رقم الدفعة</th>
                <th className="border border-gray-800 p-2">الموقع</th>
                <th className="border border-gray-800 p-2">التكلفة الوحدة</th>
                <th className="border border-gray-800 p-2">إجمالي التكلفة</th>
                <th className="border border-gray-800 p-2">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => {
                const unitCost = parseFloat(item.cost) || 0;
                const issuedQty = parseFloat(item.issuedQty) || 0;
                const totalCost = (unitCost * issuedQty).toFixed(2);
                
                return (
                  <tr key={item.id}>
                    <td className="border border-gray-800 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-800 p-2">{item.materialCode}</td>
                    <td className="border border-gray-800 p-2">{item.materialName}</td>
                    <td className="border border-gray-800 p-2">{item.unit}</td>
                    <td className="border border-gray-800 p-2 text-center">{item.requestedQty}</td>
                    <td className="border border-gray-800 p-2 text-center">{item.issuedQty}</td>
                    <td className="border border-gray-800 p-2 text-center">{item.availableStock}</td>
                    <td className="border border-gray-800 p-2">{item.batchNumber}</td>
                    <td className="border border-gray-800 p-2">{item.location}</td>
                    <td className="border border-gray-800 p-2 text-center">{item.cost}</td>
                    <td className="border border-gray-800 p-2 text-center">{totalCost}</td>
                    <td className="border border-gray-800 p-2">{item.notes}</td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold">
                <td colSpan="10" className="border border-gray-800 p-2 text-left">إجمالي التكلفة:</td>
                <td className="border border-gray-800 p-2 text-center">{calculateTotalCost()}</td>
                <td className="border border-gray-800 p-2"></td>
              </tr>
            </tbody>
          </table>

          {/* Signatures */}
          <div className="grid grid-cols-4 gap-6 mt-8 text-sm">
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>طالب الصرف</div>
                <div className="font-bold">{formData.requestedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>المخول بالصرف</div>
                <div className="font-bold">{formData.authorizedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>قام بالصرف</div>
                <div className="font-bold">{formData.issuedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>المستلم</div>
                <div className="font-bold">{formData.receivedBy}</div>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Package2 className="text-red-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">إذن صرف مواد</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الإذن</label>
              <input
                type="text"
                value={formData.issueNumber}
                onChange={(e) => handleInputChange('issueNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="MI-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوقت</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">القسم الطالب</label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">اختر القسم</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الأولوية</label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Request Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-indigo-600" size={20} />
            بيانات الطلب والتخويل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">طالب الصرف</label>
              <input
                type="text"
                value={formData.requestedBy}
                onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="اسم طالب الصرف"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المخول بالصرف</label>
              <input
                type="text"
                value={formData.authorizedBy}
                onChange={(e) => handleInputChange('authorizedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="اسم المخول"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">قام بالصرف</label>
              <input
                type="text"
                value={formData.issuedBy}
                onChange={(e) => handleInputChange('issuedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="موظف المستودع"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المستلم</label>
              <input
                type="text"
                value={formData.receivedBy}
                onChange={(e) => handleInputChange('receivedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="اسم المستلم"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">الغرض من الصرف</label>
              <select
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">اختر الغرض</option>
                {purposes.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="text-green-600" size={20} />
              تفاصيل المواد المطلوب صرفها
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                إجمالي التكلفة: {calculateTotalCost()} ريال
              </div>
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
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">مصروف</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">المخزون</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">حالة المخزون</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">رقم الدفعة</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الموقع</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">التكلفة</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">ملاحظات</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">إجراء</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.items.map((item, index) => {
                  const stockAlert = getStockAlert(item.availableStock, item.requestedQty);
                  const alertColor = stockAlert === 'نقص في المخزون' ? 'text-red-600 bg-red-50' : 
                                   stockAlert === 'مخزون منخفض' ? 'text-yellow-600 bg-yellow-50' : 
                                   'text-green-600 bg-green-50';
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-sm text-gray-900 text-center">{index + 1}</td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.materialCode}
                          onChange={(e) => handleItemChange(index, 'materialCode', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="MAT-001"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.materialName}
                          onChange={(e) => handleItemChange(index, 'materialName', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="اسم المادة"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={item.unit}
                          onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
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
                          value={item.requestedQty}
                          onChange={(e) => handleItemChange(index, 'requestedQty', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="100"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.issuedQty}
                          onChange={(e) => handleItemChange(index, 'issuedQty', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="100"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.availableStock}
                          onChange={(e) => handleItemChange(index, 'availableStock', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <div className={`text-xs px-2 py-1 rounded-full text-center ${alertColor}`}>
                          {stockAlert}
                          {stockAlert === 'نقص في المخزون' && <AlertTriangle size={12} className="inline ml-1" />}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.batchNumber}
                          onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="B2024001"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="A1-B2"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={item.cost}
                          onChange={(e) => handleItemChange(index, 'cost', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات عامة</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="أي ملاحظات إضافية حول الصرف..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialIssueForm; 
