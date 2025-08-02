import React, { useState } from 'react';
import { Plus, Trash2, Save, Download, AlertTriangle, Clock, Calendar, Package } from 'lucide-react';

const ExpiryReportForm = () => {
  const [formData, setFormData] = useState({
    reportNumber: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0,5),
    reportType: 'منتهية الصلاحية',
    warehouse: '',
    preparedBy: '',
    reviewedBy: '',
    approvedBy: '',
    notes: '',
    items: [{
      id: 1,
      materialCode: '',
      materialName: '',
      unit: '',
      batchNumber: '',
      manufacturingDate: '',
      expiryDate: '',
      quantity: '',
      location: '',
      unitCost: '',
      totalValue: 0,
      daysToExpiry: 0,
      riskLevel: 'متوسط',
      supplierName: '',
      action: '',
      notes: ''
    }]
  });

  const [printMode, setPrintMode] = useState(false);

  const reportTypes = ['منتهية الصلاحية', 'قريبة الانتهاء (30 يوم)', 'قريبة الانتهاء (60 يوم)', 'قريبة الانتهاء (90 يوم)'];
  const warehouses = ['المستودع الرئيسي', 'مستودع المواد الخام', 'مستودع المنتجات النهائية', 'مستودع التعبئة', 'المخزن البارد'];
  const units = ['كيلو', 'جرام', 'لتر', 'مل', 'قطعة', 'كرتون', 'كيس', 'علبة'];
  const riskLevels = ['عالي', 'متوسط', 'منخفض'];
  const actions = ['إعدام فوري', 'إعادة تقييم', 'بيع بخصم', 'استخدام أولوية', 'تحويل لمنتج آخر', 'إرجاع للمورد'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      // حساب إجمالي القيمة والأيام للانتهاء
      if (field === 'quantity' || field === 'unitCost') {
        const qty = parseFloat(newItems[index].quantity) || 0;
        const cost = parseFloat(newItems[index].unitCost) || 0;
        newItems[index].totalValue = qty * cost;
      }
      
      if (field === 'expiryDate' || field === 'quantity' || field === 'unitCost') {
        const today = new Date();
        const expiryDate = new Date(newItems[index].expiryDate);
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        newItems[index].daysToExpiry = diffDays;
        
        // تحديد مستوى المخاطر
        if (diffDays < 0) {
          newItems[index].riskLevel = 'عالي';
        } else if (diffDays <= 30) {
          newItems[index].riskLevel = 'عالي';
        } else if (diffDays <= 90) {
          newItems[index].riskLevel = 'متوسط';
        } else {
          newItems[index].riskLevel = 'منخفض';
        }
      }
      
      return { ...prev, items: newItems };
    });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: prev.items.length + 1,
        materialCode: '',
        materialName: '',
        unit: '',
        batchNumber: '',
        manufacturingDate: '',
        expiryDate: '',
        quantity: '',
        location: '',
        unitCost: '',
        totalValue: 0,
        daysToExpiry: 0,
        riskLevel: 'متوسط',
        supplierName: '',
        action: '',
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

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'عالي': return 'text-red-700 bg-red-100 border-red-300';
      case 'متوسط': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'منخفض': return 'text-green-700 bg-green-100 border-green-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getDaysColor = (days) => {
    if (days < 0) return 'text-red-600 font-bold';
    if (days <= 30) return 'text-red-600';
    if (days <= 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  const calculateSummary = () => {
    const totalItems = formData.items.length;
    const expiredItems = formData.items.filter(item => item.daysToExpiry < 0).length;
    const highRiskItems = formData.items.filter(item => item.riskLevel === 'عالي').length;
    const totalValue = formData.items.reduce((sum, item) => sum + (parseFloat(item.totalValue) || 0), 0);
    const expiredValue = formData.items
      .filter(item => item.daysToExpiry < 0)
      .reduce((sum, item) => sum + (parseFloat(item.totalValue) || 0), 0);

    return {
      totalItems,
      expiredItems,
      highRiskItems,
      totalValue: totalValue.toFixed(2),
      expiredValue: expiredValue.toFixed(2)
    };
  };

  const saveData = () => {
    const jsonData = JSON.stringify({...formData, summary: calculateSummary()}, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expiry_report_${formData.reportNumber || 'new'}.json`;
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

  const summary = calculateSummary();

  if (printMode) {
    return (
      <div className="min-h-screen bg-white p-8 text-black print:p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-2xl font-bold mb-2">تقرير انتهاء الصلاحية</h1>
            <div className="text-sm">
              <span>رقم التقرير: {formData.reportNumber}</span>
              <span className="mx-4">التاريخ: {formData.date}</span>
              <span>الوقت: {formData.time}</span>
              <span className="mx-4">النوع: {formData.reportType}</span>
            </div>
          </div>

          {/* Report Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <strong>بيانات التقرير:</strong>
              <div>المستودع: {formData.warehouse}</div>
              <div>أعد بواسطة: {formData.preparedBy}</div>
              <div>راجع بواسطة: {formData.reviewedBy}</div>
            </div>
            <div>
              <strong>ملخص التقرير:</strong>
              <div>إجمالي المواد: {summary.totalItems}</div>
              <div>المواد المنتهية: {summary.expiredItems}</div>
              <div>قيمة المواد المنتهية: {summary.expiredValue} ريال</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse border border-gray-800 mb-6 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-800 p-1">#</th>
                <th className="border border-gray-800 p-1">كود المادة</th>
                <th className="border border-gray-800 p-1">اسم المادة</th>
                <th className="border border-gray-800 p-1">رقم الدفعة</th>
                <th className="border border-gray-800 p-1">تاريخ الانتهاء</th>
                <th className="border border-gray-800 p-1">الكمية</th>
                <th className="border border-gray-800 p-1">الموقع</th>
                <th className="border border-gray-800 p-1">أيام للانتهاء</th>
                <th className="border border-gray-800 p-1">مستوى المخاطر</th>
                <th className="border border-gray-800 p-1">القيمة الإجمالية</th>
                <th className="border border-gray-800 p-1">الإجراء المطلوب</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-800 p-1 text-center">{index + 1}</td>
                  <td className="border border-gray-800 p-1">{item.materialCode}</td>
                  <td className="border border-gray-800 p-1">{item.materialName}</td>
                  <td className="border border-gray-800 p-1">{item.batchNumber}</td>
                  <td className="border border-gray-800 p-1">{item.expiryDate}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.quantity} {item.unit}</td>
                  <td className="border border-gray-800 p-1">{item.location}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.daysToExpiry}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.riskLevel}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.totalValue.toFixed(2)}</td>
                  <td className="border border-gray-800 p-1">{item.action}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td colSpan="9" className="border border-gray-800 p-1 text-left">إجمالي القيمة:</td>
                <td className="border border-gray-800 p-1 text-center">{summary.totalValue}</td>
                <td className="border border-gray-800 p-1"></td>
              </tr>
            </tbody>
          </table>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>أعد التقرير</div>
                <div className="font-bold">{formData.preparedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>راجع التقرير</div>
                <div className="font-bold">{formData.reviewedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>اعتمد التقرير</div>
                <div className="font-bold">{formData.approvedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
          </div>

          {formData.notes && (
            <div className="mt-6 text-sm">
              <strong>ملاحظات:</strong>
              <div className="border border-gray-800 p-2 mt-2">{formData.notes}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">تقرير انتهاء الصلاحية</h1>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم التقرير</label>
              <input
                type="text"
                value={formData.reportNumber}
                onChange={(e) => handleInputChange('reportNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="EXP-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوقت</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع التقرير</label>
              <select
                value={formData.reportType}
                onChange={(e) => handleInputChange('reportType', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {reportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المستودع</label>
              <select
                value={formData.warehouse}
                onChange={(e) => handleInputChange('warehouse', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">اختر المستودع</option>
                {warehouses.map(warehouse => (
                  <option key={warehouse} value={warehouse}>{warehouse}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Package className="text-blue-600 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-blue-600">{summary.totalItems}</div>
            <div className="text-sm text-gray-600">إجمالي المواد</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <AlertTriangle className="text-red-600 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-red-600">{summary.expiredItems}</div>
            <div className="text-sm text-gray-600">منتهية الصلاحية</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Clock className="text-orange-600 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-orange-600">{summary.highRiskItems}</div>
            <div className="text-sm text-gray-600">مخاطر عالية</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="text-lg font-bold text-green-600">{summary.totalValue}</div>
            <div className="text-sm text-gray-600">إجمالي القيمة (ريال)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="text-lg font-bold text-red-600">{summary.expiredValue}</div>
            <div className="text-sm text-gray-600">قيمة المنتهية (ريال)</div>
          </div>
        </div>

        {/* Staff Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">معلومات التقرير</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">أعد بواسطة</label>
              <input
                type="text"
                value={formData.preparedBy}
                onChange={(e) => handleInputChange('preparedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="اسم محضر التقرير"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">راجع بواسطة</label>
              <input
                type="text"
                value={formData.reviewedBy}
                onChange={(e) => handleInputChange('reviewedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="اسم مراجع التقرير"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اعتمد بواسطة</label>
              <input
                type="text"
                value={formData.approvedBy}
                onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="اسم معتمد التقرير"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">تفاصيل المواد</h2>
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
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">كود المادة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">اسم المادة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الوحدة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">رقم الدفعة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">تاريخ الإنتاج</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">تاريخ الانتهاء</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الكمية</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الموقع</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">أيام للانتهاء</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">مستوى المخاطر</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">التكلفة/وحدة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">القيمة الإجمالية</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">المورد</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الإجراء المطلوب</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">ملاحظات</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">حذف</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-2 py-2 text-sm text-gray-900 text-center">{index + 1}</td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.materialCode}
                        onChange={(e) => handleItemChange(index, 'materialCode', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="MAT-001"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.materialName}
                        onChange={(e) => handleItemChange(index, 'materialName', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="اسم المادة"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">اختر</option>
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.batchNumber}
                        onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="B2024001"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="date"
                        value={item.manufacturingDate}
                        onChange={(e) => handleItemChange(index, 'manufacturingDate', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="date"
                        value={item.expiryDate}
                        onChange={(e) => handleItemChange(index, 'expiryDate', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="100"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="A1-B2"
                      />
                    </td>
                    <td className="px-2 py-2 text-center">
                      <div className={`text-sm font-medium ${getDaysColor(item.daysToExpiry)}`}>
                        {item.daysToExpiry < 0 ? `منتهية منذ ${Math.abs(item.daysToExpiry)} يوم` : `${item.daysToExpiry} يوم`}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className={`px-2 py-1 rounded-full text-xs text-center border ${getRiskColor(item.riskLevel)}`}>
                        {item.riskLevel}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="10.50"
                      />
                    </td>
                    <td className="px-2 py-2 text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {item.totalValue.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.supplierName}
                        onChange={(e) => handleItemChange(index, 'supplierName', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="اسم المورد"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <select
                        value={item.action}
                        onChange={(e) => handleItemChange(index, 'action', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">اختر الإجراء</option>
                        {actions.map(action => (
                          <option key={action} value={action}>{action}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleItemChange(index, 'notes', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                        placeholder="ملاحظات"
                      />
                    </td>
                    <td className="px-2 py-2 text-center">
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

        {/* Notes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات عامة</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="أي ملاحظات حول المواد منتهية الصلاحية أو الإجراءات المتخذة..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryReportForm;
