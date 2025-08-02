import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Save, Download, Calculator, Users, Package, FileText, Copy, Send, Eye } from 'lucide-react';

const SmartQuotationSystem = () => {
  // بيانات العملاء (مرتبطة بقاعدة العملاء)
  const [customers] = useState([
    {
      id: 1,
      customerCode: 'CUST-001',
      name: 'شركة الأدوية المتقدمة',
      contactPerson: 'أحمد السالم',
      phone: '0501234567',
      email: 'ahmed@advancedpharm.com',
      city: 'الرياض',
      address: 'شارع الملك فهد، الرياض',
      taxNumber: '300123456700003',
      paymentTerms: '30 يوم',
      discount: 5,
      salesRep: 'محمد العلي'
    },
    {
      id: 2,
      customerCode: 'CUST-002',
      name: 'صيدلية النور',
      contactPerson: 'فاطمة أحمد',
      phone: '0507654321',
      email: 'info@alnoor-pharmacy.com',
      city: 'جدة',
      address: 'حي الصفا، جدة',
      taxNumber: '300567890100003',
      paymentTerms: '15 يوم',
      discount: 3,
      salesRep: 'سارة محمد'
    }
  ]);

  // بيانات المنتجات (مرتبطة بقاعدة المنتجات)
  const [products] = useState([
    {
      id: 1,
      code: 'MAT-VIT-001',
      name: 'فيتامين C - أقراص 500 مجم',
      category: 'مواد خام',
      unit: 'كيلو',
      unitCost: 25.50,
      sellingPrice: 35.00,
      minQty: 10,
      stock: 500
    },
    {
      id: 2,
      code: 'MAT-VIT-002',
      name: 'فيتامين D3 - كبسولات 1000 وحدة',
      category: 'مواد خام',
      unit: 'جرام',
      unitCost: 45.00,
      sellingPrice: 65.00,
      minQty: 5,
      stock: 200
    },
    {
      id: 3,
      code: 'PRD-MULTI-001',
      name: 'مجموعة فيتامينات متعددة - 60 قرص',
      category: 'منتج نهائي',
      unit: 'علبة',
      unitCost: 15.00,
      sellingPrice: 25.00,
      minQty: 50,
      stock: 1000
    }
  ]);

  const [quotations, setQuotations] = useState([
    {
      id: 1,
      quotationNumber: 'QT-2024-001',
      date: '2024-03-20',
      validUntil: '2024-04-20',
      customer: {
        id: 1,
        customerCode: 'CUST-001',
        name: 'شركة الأدوية المتقدمة',
        contactPerson: 'أحمد السالم',
        phone: '0501234567'
      },
      items: [
        {
          id: 1,
          product: {
            code: 'MAT-VIT-001',
            name: 'فيتامين C - أقراص 500 مجم',
            unit: 'كيلو'
          },
          quantity: 100,
          unitPrice: 35.00,
          discount: 5,
          total: 3325.00
        }
      ],
      subtotal: 3325.00,
      totalDiscount: 166.25,
      taxAmount: 473.81,
      grandTotal: 3632.56,
      status: 'مرسل',
      notes: 'عرض سعر خاص للكمية'
    }
  ]);

  const [showQuotationForm, setShowQuotationForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [previewQuotation, setPreviewQuotation] = useState(null);

  const [newQuotation, setNewQuotation] = useState({
    quotationNumber: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: '',
    customer: null,
    salesRep: '',
    paymentTerms: '',
    deliveryTerms: '',
    notes: '',
    status: 'مسودة',
    items: [
      {
        id: 1,
        product: null,
        quantity: '',
        unitPrice: '',
        discount: 0,
        total: 0
      }
    ]
  });

  const statuses = ['مسودة', 'مرسل', 'مقبول', 'مرفوض', 'منتهي', 'محول لفاتورة'];
  const deliveryTerms = ['تسليم مجاني', 'استلام من المصنع', 'شحن عادي', 'شحن سريع'];

  // منتقي العملاء
  const CustomerSelector = ({ onSelect, selectedCustomer }) => {
    const [localSearch, setLocalSearch] = useState(selectedCustomer?.name || '');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const filteredCustomers = customers.filter(customer =>
      localSearch.length > 1 && (
        customer.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        customer.customerCode.toLowerCase().includes(localSearch.toLowerCase()) ||
        customer.phone.includes(localSearch)
      )
    ).slice(0, 5);

    const handleSelectCustomer = (customer) => {
      onSelect(customer);
      setLocalSearch(customer.name);
      setShowDropdown(false);
      setIsInputFocused(false);
    };

    const clearSearch = () => {
      setLocalSearch('');
      setShowDropdown(false);
      onSelect(null);
    };

    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => {
              const value = e.target.value;
              setLocalSearch(value);
              if (value.length > 1 && isInputFocused) {
                setShowDropdown(true);
              } else {
                setShowDropdown(false);
              }
            }}
            onFocus={() => {
              setIsInputFocused(true);
              if (localSearch.length > 1) {
                setShowDropdown(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsInputFocused(false);
                setShowDropdown(false);
              }, 150);
            }}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ابحث عن عميل..."
            autoComplete="off"
          />
          {localSearch && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        {showDropdown && isInputFocused && filteredCustomers.length > 0 && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
            {filteredCustomers.map(customer => (
              <button
                key={customer.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectCustomer(customer);
                }}
                className="w-full text-right p-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 focus:outline-none"
              >
                <div className="font-medium text-gray-900">{customer.name}</div>
                <div className="text-sm text-gray-500">
                  {customer.customerCode} • {customer.contactPerson} • {customer.phone}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // منتقي المنتجات
  const ProductSelector = ({ onSelect, selectedProduct }) => {
    const [localSearch, setLocalSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const filteredProducts = products.filter(product =>
      localSearch.length > 1 && (
        product.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        product.code.toLowerCase().includes(localSearch.toLowerCase())
      )
    ).slice(0, 5);

    const handleSelectProduct = (product) => {
      onSelect(product);
      setLocalSearch(product.name);
      setShowDropdown(false);
      setIsInputFocused(false);
    };

    const clearSearch = () => {
      setLocalSearch('');
      setShowDropdown(false);
      onSelect(null);
    };

    useEffect(() => {
      if (selectedProduct) {
        setLocalSearch(selectedProduct.name);
      }
    }, [selectedProduct]);

    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => {
              const value = e.target.value;
              setLocalSearch(value);
              if (value.length > 1 && isInputFocused) {
                setShowDropdown(true);
              } else {
                setShowDropdown(false);
              }
            }}
            onFocus={() => {
              setIsInputFocused(true);
              if (localSearch.length > 1) {
                setShowDropdown(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsInputFocused(false);
                setShowDropdown(false);
              }, 150);
            }}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ابحث عن منتج..."
            autoComplete="off"
          />
          {localSearch && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        {showDropdown && isInputFocused && filteredProducts.length > 0 && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectProduct(product);
                }}
                className="w-full text-right p-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 focus:outline-none"
              >
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">
                  {product.code} • {product.unit} • {product.sellingPrice} ريال • متوفر: {product.stock}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const generateQuotationNumber = () => {
    const year = new Date().getFullYear();
    const number = String(quotations.length + 1).padStart(3, '0');
    return `QT-${year}-${number}`;
  };

  const calculateValidUntil = (fromDate) => {
    const date = new Date(fromDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (field, value) => {
    if (editingQuotation) {
      setEditingQuotation(prev => ({ ...prev, [field]: value }));
    } else {
      setNewQuotation(prev => ({
        ...prev,
        [field]: value,
        ...(field === 'date' && { validUntil: calculateValidUntil(value) })
      }));
    }
  };

  const handleCustomerSelect = (customer) => {
    const quotation = editingQuotation || newQuotation;
    const updatedQuotation = {
      ...quotation,
      customer,
      salesRep: customer?.salesRep || '',
      paymentTerms: customer?.paymentTerms || ''
    };

    if (editingQuotation) {
      setEditingQuotation(updatedQuotation);
    } else {
      setNewQuotation(updatedQuotation);
    }
  };

  const handleItemChange = (index, field, value) => {
    const quotation = editingQuotation || newQuotation;
    const updatedItems = [...quotation.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // حساب الإجمالي للصف
    if (field === 'quantity' || field === 'unitPrice' || field === 'discount') {
      const item = updatedItems[index];
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      const discount = parseFloat(item.discount) || 0;
      const subtotal = qty * price;
      const discountAmount = subtotal * (discount / 100);
      item.total = subtotal - discountAmount;
    }

    const updatedQuotation = { ...quotation, items: updatedItems };

    if (editingQuotation) {
      setEditingQuotation(updatedQuotation);
    } else {
      setNewQuotation(updatedQuotation);
    }
  };

  const handleProductSelect = (index, product) => {
    if (product) {
      handleItemChange(index, 'product', product);
      handleItemChange(index, 'unitPrice', product.sellingPrice);
      
      // تطبيق خصم العميل إذا وجد
      const quotation = editingQuotation || newQuotation;
      if (quotation.customer?.discount) {
        handleItemChange(index, 'discount', quotation.customer.discount);
      }
    }
  };

  const addItem = () => {
    const quotation = editingQuotation || newQuotation;
    const newItem = {
      id: Date.now(),
      product: null,
      quantity: '',
      unitPrice: '',
      discount: 0,
      total: 0
    };

    const updatedQuotation = {
      ...quotation,
      items: [...quotation.items, newItem]
    };

    if (editingQuotation) {
      setEditingQuotation(updatedQuotation);
    } else {
      setNewQuotation(updatedQuotation);
    }
  };

  const removeItem = (index) => {
    const quotation = editingQuotation || newQuotation;
    if (quotation.items.length > 1) {
      const updatedItems = quotation.items.filter((_, i) => i !== index);
      const updatedQuotation = { ...quotation, items: updatedItems };

      if (editingQuotation) {
        setEditingQuotation(updatedQuotation);
      } else {
        setNewQuotation(updatedQuotation);
      }
    }
  };

  const calculateTotals = (quotation) => {
    const subtotal = quotation.items.reduce((sum, item) => sum + (item.total || 0), 0);
    const totalDiscount = quotation.items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      const discount = parseFloat(item.discount) || 0;
      return sum + (qty * price * discount / 100);
    }, 0);
    const taxAmount = subtotal * 0.15; // ضريبة القيمة المضافة 15%
    const grandTotal = subtotal + taxAmount;

    return {
      subtotal,
      totalDiscount,
      taxAmount,
      grandTotal
    };
  };

  const saveQuotation = () => {
    const quotation = editingQuotation || newQuotation;
    
    if (!quotation.customer || !quotation.items.some(item => item.product)) {
      alert('يرجى اختيار عميل وإضافة منتج واحد على الأقل');
      return;
    }

    const totals = calculateTotals(quotation);
    const finalQuotation = {
      ...quotation,
      id: editingQuotation ? editingQuotation.id : Date.now(),
      quotationNumber: quotation.quotationNumber || generateQuotationNumber(),
      ...totals
    };

    if (editingQuotation) {
      setQuotations(prev => prev.map(q => q.id === editingQuotation.id ? finalQuotation : q));
      setEditingQuotation(null);
    } else {
      setQuotations(prev => [...prev, finalQuotation]);
      setNewQuotation({
        quotationNumber: '',
        date: new Date().toISOString().split('T')[0],
        validUntil: '',
        customer: null,
        salesRep: '',
        paymentTerms: '',
        deliveryTerms: '',
        notes: '',
        status: 'مسودة',
        items: [
          {
            id: 1,
            product: null,
            quantity: '',
            unitPrice: '',
            discount: 0,
            total: 0
          }
        ]
      });
    }

    setShowQuotationForm(false);
  };

  const deleteQuotation = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      setQuotations(prev => prev.filter(q => q.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      case 'مرسل': return 'bg-blue-100 text-blue-800';
      case 'مقبول': return 'bg-green-100 text-green-800';
      case 'مرفوض': return 'bg-red-100 text-red-800';
      case 'منتهي': return 'bg-yellow-100 text-yellow-800';
      case 'محول لفاتورة': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const QuotationForm = () => {
    const quotation = editingQuotation || newQuotation;
    const totals = calculateTotals(quotation);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">
          {editingQuotation ? 'تعديل عرض السعر' : 'عرض سعر جديد'}
        </h2>

        {/* معلومات أساسية */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم العرض</label>
            <input
              type="text"
              value={quotation.quotationNumber}
              onChange={(e) => handleInputChange('quotationNumber', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="سيتم إنشاؤه تلقائياً"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
            <input
              type="date"
              value={quotation.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">صالح حتى</label>
            <input
              type="date"
              value={quotation.validUntil}
              onChange={(e) => handleInputChange('validUntil', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select
              value={quotation.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* معلومات العميل */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-3">معلومات العميل</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العميل *</label>
              <CustomerSelector
                onSelect={handleCustomerSelect}
                selectedCustomer={quotation.customer}
              />
            </div>
            {quotation.customer && (
              <div className="bg-white p-3 rounded border">
                <div className="text-sm space-y-1">
                  <div><strong>الكود:</strong> {quotation.customer.customerCode}</div>
                  <div><strong>المسؤول:</strong> {quotation.customer.contactPerson}</div>
                  <div><strong>الهاتف:</strong> {quotation.customer.phone}</div>
                  <div><strong>شروط الدفع:</strong> {quotation.customer.paymentTerms}</div>
                  <div><strong>الخصم:</strong> {quotation.customer.discount}%</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* أصناف العرض */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">أصناف العرض</h3>
            <button
              onClick={addItem}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Plus size={16} />
              إضافة صنف
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-right">#</th>
                  <th className="border border-gray-300 p-2 text-right">الصنف</th>
                  <th className="border border-gray-300 p-2 text-right">الكمية</th>
                  <th className="border border-gray-300 p-2 text-right">السعر</th>
                  <th className="border border-gray-300 p-2 text-right">الخصم %</th>
                  <th className="border border-gray-300 p-2 text-right">الإجمالي</th>
                  <th className="border border-gray-300 p-2 text-right">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {quotation.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      <ProductSelector
                        onSelect={(product) => handleProductSelect(index, product)}
                        selectedProduct={item.product}
                      />
                      {item.product && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.product.code} • متوفر: {item.product.stock} {item.product.unit}
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        placeholder="الكمية"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        placeholder="السعر"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        step="0.1"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        placeholder="الخصم"
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <span className="font-medium">{(item.total || 0).toLocaleString('ar-SA', { minimumFractionDigits: 2 })}</span>
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => removeItem(index)}
                        disabled={quotation.items.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400"
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

        {/* المجاميع */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-medium">{totals.subtotal.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>إجمالي الخصم:</span>
                <span className="font-medium text-red-600">-{totals.totalDiscount.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-medium">{totals.taxAmount.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ريال</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">المجموع الإجمالي:</span>
                <span className="font-bold text-lg text-blue-600">{totals.grandTotal.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ريال</span>
              </div>
            </div>
          </div>
        </div>

        {/* ملاحظات */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
          <textarea
            value={quotation.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="أي ملاحظات أو شروط خاصة..."
          />
        </div>

        {/* أزرار الحفظ */}
        <div className="flex gap-3">
          <button
            onClick={saveQuotation}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save size={16} />
            حفظ العرض
          </button>
          <button
            onClick={() => {
              setShowQuotationForm(false);
              setEditingQuotation(null);
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            إلغاء
          </button>
        </div>
      </div>
    );
  };

  const PrintPreview = ({ quotation }) => (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg" dir="rtl">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-800 mb-2">عرض سعر</h1>
            <p className="text-sm text-gray-600">Quotation</p>
          </div>
          <div className="text-left">
            <div className="text-lg font-bold text-blue-600">رقم العرض: {quotation.quotationNumber}</div>
            <div className="text-sm text-gray-600">التاريخ: {new Date(quotation.date).toLocaleDateString('ar-SA')}</div>
            <div className="text-sm text-gray-600">صالح حتى: {new Date(quotation.validUntil).toLocaleDateString('ar-SA')}</div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-2">معلومات العميل:</h3>
          <div className="text-sm space-y-1">
            <div><strong>العميل:</strong> {quotation.customer.name}</div>
            <div><strong>المسؤول:</strong> {quotation.customer.contactPerson}</div>
            <div><strong>الهاتف:</strong> {quotation.customer.phone}</div>
            <div><strong>العنوان:</strong> {quotation.customer.address}</div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-2">تفاصيل العرض:</h3>
          <div className="text-sm space-y-1">
            <div><strong>مندوب المبيعات:</strong> {quotation.salesRep}</div>
            <div><strong>شروط الدفع:</strong> {quotation.paymentTerms}</div>
            <div><strong>شروط التسليم:</strong> {quotation.deliveryTerms}</div>
            <div><strong>الحالة:</strong> {quotation.status}</div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-gray-800 mb-6 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-800 p-2">#</th>
            <th className="border border-gray-800 p-2">الصنف</th>
            <th className="border border-gray-800 p-2">الكمية</th>
            <th className="border border-gray-800 p-2">الوحدة</th>
            <th className="border border-gray-800 p-2">السعر</th>
            <th className="border border-gray-800 p-2">الخصم</th>
            <th className="border border-gray-800 p-2">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {quotation.items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-800 p-2 text-center">{index + 1}</td>
              <td className="border border-gray-800 p-2">
                <div>{item.product.name}</div>
                <div className="text-xs text-gray-600">{item.product.code}</div>
              </td>
              <td className="border border-gray-800 p-2 text-center">{item.quantity}</td>
              <td className="border border-gray-800 p-2 text-center">{item.product.unit}</td>
              <td className="border border-gray-800 p-2 text-center">{item.unitPrice}</td>
              <td className="border border-gray-800 p-2 text-center">{item.discount}%</td>
              <td className="border border-gray-800 p-2 text-center">{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-6">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span>المجموع الفرعي:</span>
            <span>{quotation.subtotal.toFixed(2)} ريال</span>
          </div>
          <div className="flex justify-between">
            <span>إجمالي الخصم:</span>
            <span>-{quotation.totalDiscount.toFixed(2)} ريال</span>
          </div>
          <div className="flex justify-between">
            <span>ضريبة القيمة المضافة:</span>
            <span>{quotation.taxAmount.toFixed(2)} ريال</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <span>المجموع الإجمالي:</span>
            <span>{quotation.grandTotal.toFixed(2)} ريال</span>
          </div>
        </div>
      </div>

      {quotation.notes && (
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-2">ملاحظات:</h3>
          <p className="text-sm">{quotation.notes}</p>
        </div>
      )}
    </div>
  );

  if (showPrintPreview && previewQuotation) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => setShowPrintPreview(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            ← العودة
          </button>
        </div>
        <PrintPreview quotation={previewQuotation} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white" dir="rtl">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">نظام عروض الأسعار الذكي</h1>
        </div>
        <p className="text-gray-600">إنشاء وإدارة عروض الأسعار المتكاملة مع قواعد البيانات</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{quotations.length}</div>
          <div className="text-sm text-gray-600">إجمالي العروض</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{quotations.filter(q => q.status === 'مقبول').length}</div>
          <div className="text-sm text-gray-600">مقبولة</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{quotations.filter(q => q.status === 'مرسل').length}</div>
          <div className="text-sm text-gray-600">مرسلة</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-600">{quotations.filter(q => q.status === 'مسودة').length}</div>
          <div className="text-sm text-gray-600">مسودات</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-purple-600">
            {quotations.reduce((sum, q) => sum + q.grandTotal, 0).toLocaleString('ar-SA', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-600">إجمالي القيمة</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{quotations.filter(q => q.status === 'مرفوض').length}</div>
          <div className="text-sm text-gray-600">مرفوضة</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowQuotationForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            عرض سعر جديد
          </button>
        </div>
      </div>

      {/* Quotation Form */}
      {showQuotationForm && <QuotationForm />}

      {/* Quotations List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">رقم العرض</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">العميل</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">التاريخ</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">صالح حتى</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">القيمة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">الحالة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-600">{quotation.quotationNumber}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(quotation.quotationNumber)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{quotation.customer.name}</div>
                    <div className="text-xs text-gray-500">{quotation.customer.contactPerson}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {new Date(quotation.date).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {new Date(quotation.validUntil).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {quotation.grandTotal.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ريال
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quotation.status)}`}>
                      {quotation.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPreviewQuotation(quotation);
                          setShowPrintPreview(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="معاينة"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingQuotation(quotation);
                          setShowQuotationForm(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                        title="تعديل"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteQuotation(quotation.id)}
                        className="text-red-600 hover:text-red-800"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SmartQuotationSystem;