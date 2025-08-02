import React, { useState } from 'react';
import { Plus, Trash2, Save, Download, Search, AlertTriangle, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const InventoryCountForm = () => {
  const [formData, setFormData] = useState({
    countNumber: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0,5),
    countType: 'شامل',
    warehouse: '',
    section: '',
    countedBy: '',
    supervisedBy: '',
    verifiedBy: '',
    notes: '',
    items: [{
      id: 1,
      materialCode: '',
      materialName: '',
      unit: '',
      location: '',
      batchNumber: '',
      expiryDate: '',
      systemQty: '',
      physicalQty: '',
      variance: 0,
      varianceValue: 0,
      unitCost: '',
      reason: '',
      action: ''
    }]
  });

  const [printMode, setPrintMode] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const countTypes = ['شامل', 'دوري', 'عينة عشوائية', 'مواد منتهية الصلاحية', 'مواد بطيئة الحركة'];
  const warehouses = ['المستودع الرئيسي', 'مستودع المواد الخام', 'مستودع المنتجات النهائية', 'مستودع التعبئة', 'المخزن البارد'];
  const units = ['كيلو', 'جرام', 'لتر', 'مل', 'قطعة', 'كرتون', 'كيس', 'علبة'];
  const reasons = ['خطأ في التسجيل', 'تلف', 'انتهاء صلاحية', 'سرقة', 'فقدان', 'خطأ في العد', 'تبخر طبيعي', 'أخرى'];
  const actions = ['تعديل النظام', 'إجراء تحقيق', 'إعدام المادة', 'إعادة عد', 'لا يوجد إجراء'];

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
      
      // حساب الفرق التلقائي
      if (field === 'systemQty' || field === 'physicalQty' || field === 'unitCost') {
        const systemQty = parseFloat(newItems[index].systemQty) || 0;
        const physicalQty = parseFloat(newItems[index].physicalQty) || 0;
        const unitCost = parseFloat(newItems[index].unitCost) || 0;
        
        newItems[index].variance = physicalQty - systemQty;
        newItems[index].varianceValue = (physicalQty - systemQty) * unitCost;
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
        location: '',
        batchNumber: '',
        expiryDate: '',
        systemQty: '',
        physicalQty: '',
        variance: 0,
        varianceValue: 0,
        unitCost: '',
        reason: '',
        action: ''
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

  const getVarianceStatus = (variance) => {
    if (variance > 0) return { status: 'زيادة', color: 'text-green-600 bg-green-50', icon: CheckCircle };
    if (variance < 0) return { status: 'نقص', color: 'text-red-600 bg-red-50', icon: XCircle };
    return { status: 'مطابق', color: 'text-gray-600 bg-gray-50', icon: CheckCircle };
  };

  const calculateSummary = () => {
    const totalItems = formData.items.length;
    const itemsWithVariance = formData.items.filter(item => item.variance !== 0).length;
    const totalVarianceValue = formData.items.reduce((sum, item) => sum + (parseFloat(item.varianceValue) || 0), 0);
    const positiveVariance = formData.items.filter(item => item.variance > 0).length;
    const negativeVariance = formData.items.filter(item => item.variance < 0).length;
    const accuracyRate = ((totalItems - itemsWithVariance) / totalItems * 100).toFixed(1);

    return {
      totalItems,
      itemsWithVariance,
      totalVarianceValue: totalVarianceValue.toFixed(2),
      positiveVariance,
      negativeVariance,
      accuracyRate
    };
  };

  const saveData = () => {
    const jsonData = JSON.stringify({...formData, summary: calculateSummary()}, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_count_${formData.countNumber || 'new'}.json`;
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
            <h1 className="text-2xl font-bold mb-2">سجل جرد المخزون</h1>
            <div className="text-sm">
              <span>رقم الجرد: {formData.countNumber}</span>
              <span className="mx-4">التاريخ: {formData.date}</span>
              <span>الوقت: {formData.time}</span>
              <span className="mx-4">النوع: {formData.countType}</span>
            </div>
          </div>

          {/* Count Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <strong>بيانات الجرد:</strong>
              <div>المستودع: {formData.warehouse}</div>
              <div>القسم: {formData.section}</div>
              <div>قام بالعد: {formData.countedBy}</div>
            </div>
            <div>
              <strong>بيانات المراجعة:</strong>
              <div>تم الإشراف بواسطة: {formData.supervisedBy}</div>
              <div>تم التحقق بواسطة: {formData.verifiedBy}</div>
              <div>دقة الجرد: {summary.accuracyRate}%</div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-100 p-4 mb-6 text-sm">
            <h3 className="font-bold mb-2">ملخص الجرد:</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>إجمالي المواد: {summary.totalItems}</div>
              <div>مواد بها فروقات: {summary.itemsWithVariance}</div>
              <div>زيادة: {summary.positiveVariance}</div>
              <div>نقص: {summary.negativeVariance}</div>
            </div>
            <div className="mt-2">إجمالي قيمة الفروقات: {summary.totalVarianceValue} ريال</div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse border border-gray-800 mb-6 text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-800 p-1">#</th>
                <th className="border border-gray-800 p-1">كود المادة</th>
                <th className="border border-gray-800 p-1">اسم المادة</th>
                <th className="border border-gray-800 p-1">الموقع</th>
                <th className="border border-gray-800 p-1">رقم الدفعة</th>
                <th className="border border-gray-800 p-1">كمية النظام</th>
                <th className="border border-gray-800 p-1">الكمية الفعلية</th>
                <th className="border border-gray-800 p-1">الفرق</th>
                <th className="border border-gray-800 p-1">قيمة الفرق</th>
                <th className="border border-gray-800 p-1">السبب</th>
                <th className="border border-gray-800 p-1">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-800 p-1 text-center">{index + 1}</td>
                  <td className="border border-gray-800 p-1">{item.materialCode}</td>
                  <td className="border border-gray-800 p-1">{item.materialName}</td>
                  <td className="border border-gray-800 p-1">{item.location}</td>
                  <td className="border border-gray-800 p-1">{item.batchNumber}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.systemQty}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.physicalQty}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.variance}</td>
                  <td className="border border-gray-800 p-1 text-center">{item.varianceValue}</td>
                  <td className="border border-gray-800 p-1">{item.reason}</td>
                  <td className="border border-gray-800 p-1">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-8 mt-8 text-sm">
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>قام بالعد</div>
                <div className="font-bold">{formData.countedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>الإشراف</div>
                <div className="font-bold">{formData.supervisedBy}</div>
                <div>التوقيع: _______________</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 mt-8">
                <div>التحقق</div>
                <div className="font-bold">{formData.verifiedBy}</div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-purple-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">سجل جرد المخزون</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <BarChart3 size={16} />
                {showSummary ? 'إخفاء الملخص' : 'عرض الملخص'}
              </button>
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
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجرد</label>
              <input
                type="text"
                value={formData.countNumber}
                onChange={(e) => handleInputChange('countNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="IC-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الوقت</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع الجرد</label>
              <select
                value={formData.countType}
                onChange={(e) => handleInputChange('countType', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {countTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المستودع</label>
              <select
                value={formData.warehouse}
                onChange={(e) => handleInputChange('warehouse', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">اختر المستودع</option>
                {warehouses.map(warehouse => (
                  <option key={warehouse} value={warehouse}>{warehouse}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
              <input
                type="text"
                value={formData.section}
                onChange={(e) => handleInputChange('section', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="قسم A"
              />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        {showSummary && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="text-purple-600" size={20} />
              ملخص الجرد
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{summary.totalItems}</div>
                <div className="text-sm text-gray-600">إجمالي المواد</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">{summary.itemsWithVariance}</div>
                <div className="text-sm text-gray-600">مواد بها فروقات</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{summary.positiveVariance}</div>
                <div className="text-sm text-gray-600">زيادة</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{summary.negativeVariance}</div>
                <div className="text-sm text-gray-600">نقص</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{summary.accuracyRate}%</div>
                <div className="text-sm text-gray-600">دقة الجرد</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">{summary.totalVarianceValue}</div>
                <div className="text-sm text-gray-600">قيمة الفروقات (ريال)</div>
              </div>
            </div>
          </div>
        )}

        {/* Staff Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">فريق الجرد</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">قام بالعد</label>
              <input
                type="text"
                value={formData.countedBy}
                onChange={(e) => handleInputChange('countedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="اسم موظف المستودع"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تم الإشراف بواسطة</label>
              <input
                type="text"
                value={formData.supervisedBy}
                onChange={(e) => handleInputChange('supervisedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="اسم المشرف"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تم التحقق بواسطة</label>
              <input
                type="text"
                value={formData.verifiedBy}
                onChange={(e) => handleInputChange('verifiedBy', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="اسم مدير المستودع"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">تفاصيل الجرد</h2>
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
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الموقع</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">رقم الدفعة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">كمية النظام</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الكمية الفعلية</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الفرق</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الحالة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">التكلفة/وحدة</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">قيمة الفرق</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">السبب</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الإجراء</th>
                  <th className="px-2 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">حذف</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.items.map((item, index) => {
                  const varianceInfo = getVarianceStatus(item.variance);
                  const VarianceIcon = varianceInfo.icon;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm text-gray-900 text-center">{index + 1}</td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={item.materialCode}
                          onChange={(e) => handleItemChange(index, 'materialCode', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="MAT-001"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={item.materialName}
                          onChange={(e) => handleItemChange(index, 'materialName', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="اسم المادة"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <select
                          value={item.unit}
                          onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
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
                          value={item.location}
                          onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="A1-B2"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={item.batchNumber}
                          onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="B2024001"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          value={item.systemQty}
                          onChange={(e) => handleItemChange(index, 'systemQty', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="100"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          value={item.physicalQty}
                          onChange={(e) => handleItemChange(index, 'physicalQty', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="98"
                        />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className={`text-sm font-medium ${item.variance !== 0 ? (item.variance > 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-600'}`}>
                          {item.variance}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-full text-xs ${varianceInfo.color}`}>
                          <VarianceIcon size={12} />
                          {varianceInfo.status}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={item.unitCost}
                          onChange={(e) => handleItemChange(index, 'unitCost', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                          placeholder="10.50"
                        />
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className={`text-sm font-medium ${item.varianceValue !== 0 ? (item.varianceValue > 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-600'}`}>
                          {item.varianceValue.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <select
                          value={item.reason}
                          onChange={(e) => handleItemChange(index, 'reason', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">اختر السبب</option>
                          {reasons.map(reason => (
                            <option key={reason} value={reason}>{reason}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-2">
                        <select
                          value={item.action}
                          onChange={(e) => handleItemChange(index, 'action', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">اختر الإجراء</option>
                          {actions.map(action => (
                            <option key={action} value={action}>{action}</option>
                          ))}
                        </select>
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="أي ملاحظات حول عملية الجرد..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCountForm;
