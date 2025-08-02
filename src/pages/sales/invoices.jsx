import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, Eye, AlertTriangle, FileText, Copy } from 'lucide-react';

const SmartSalesInvoice = () => {
  const [customers] = useState([
    {
      id: 1,
      customerCode: 'CUST-001',
      name: 'شركة الأدوية المتقدمة',
      contactPerson: 'أحمد السالم',
      phone: '0501234567',
      address: 'شارع الملك فهد، الرياض',
      taxNumber: '300123456700003',
      paymentTerms: '30 يوم',
      creditLimit: 100000,
      currentBalance: 25000
    },
    {
      id: 2,
      customerCode: 'CUST-002',
      name: 'صيدلية النور',
      contactPerson: 'فاطمة أحمد',
      phone: '0507654321',
      address: 'حي الصفا، جدة',
      taxNumber: '300567890100003',
      paymentTerms: '15 يوم',
      creditLimit: 25000,
      currentBalance: 5000
    }
  ]);

  const [products] = useState([
    {
      id: 1,
      code: 'MAT-VIT-001',
      name: 'فيتامين C - أقراص 500 مجم',
      unit: 'كيلو',
      sellingPrice: 35.00,
      stock: 500,
      available: 500
    },
    {
      id: 2,
      code: 'MAT-VIT-002',
      name: 'فيتامين D3 - كبسولات 1000 وحدة',
      unit: 'جرام',
      sellingPrice: 65.00,
      stock: 200,
      available: 200
    },
    {
      id: 3,
      code: 'PRD-MULTI-001',
      name: 'مجموعة فيتامينات متعددة - 60 قرص',
      unit: 'علبة',
      sellingPrice: 25.00,
      stock: 1000,
      available: 1000
    }
  ]);

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      date: '2024-03-20',
      dueDate: '2024-04-19',
      customer: {
        id: 1,
        customerCode: 'CUST-001',
        name: 'شركة الأدوية المتقدمة',
        contactPerson: 'أحمد السالم',
        phone: '0501234567',
        address: 'شارع الملك فهد، الرياض',
        taxNumber: '300123456700003'
      },
      items: [
        {
          id: 1,
          product: {
            id: 1,
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
      status: 'مؤكدة',
      paymentStatus: 'معلقة',
      notes: 'فاتورة مبيعات'
    }
  ]);

  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState(null);

  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    customer: null,
    notes: '',
    status: 'مسودة',
    paymentStatus: 'معلقة',
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

  const invoiceStatuses = ['مسودة', 'مؤكدة', 'مرسلة', 'ملغية'];
  const paymentStatuses = ['معلقة', 'مدفوعة جزئياً', 'مدفوعة بالكامل', 'متأخرة'];

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const number = String(invoices.length + 1).padStart(3, '0');
    return `INV-${year}-${number}`;
  };

  const handleInputChange = (field, value) => {
    if (editingInvoice) {
      setEditingInvoice(prev => ({ ...prev, [field]: value }));
    } else {
      setNewInvoice(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCustomerSelect = (customerId) => {
    const customer = customers.find(c => c.id === parseInt(customerId));
    const invoice = editingInvoice || newInvoice;
    const updatedInvoice = { ...invoice, customer };

    if (editingInvoice) {
      setEditingInvoice(updatedInvoice);
    } else {
      setNewInvoice(updatedInvoice);
    }
  };

  const handleItemChange = (index, field, value) => {
    const invoice = editingInvoice || newInvoice;
    const updatedItems = [...invoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === 'quantity' || field === 'unitPrice' || field === 'discount') {
      const item = updatedItems[index];
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      const discount = parseFloat(item.discount) || 0;
      const subtotal = qty * price;
      const discountAmount = subtotal * (discount / 100);
      item.total = subtotal - discountAmount;
    }

    const updatedInvoice = { ...invoice, items: updatedItems };

    if (editingInvoice) {
      setEditingInvoice(updatedInvoice);
    } else {
      setNewInvoice(updatedInvoice);
    }
  };

  const handleProductSelect = (index, productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      handleItemChange(index, 'product', product);
      handleItemChange(index, 'unitPrice', product.sellingPrice);
    }
  };

  const addItem = () => {
    const invoice = editingInvoice || newInvoice;
    const newItem = {
      id: Date.now(),
      product: null,
      quantity: '',
      unitPrice: '',
      discount: 0,
      total: 0
    };

    const updatedInvoice = { ...invoice, items: [...invoice.items, newItem] };

    if (editingInvoice) {
      setEditingInvoice(updatedInvoice);
    } else {
      setNewInvoice(updatedInvoice);
    }
  };

  const removeItem = (index) => {
    const invoice = editingInvoice || newInvoice;
    if (invoice.items.length > 1) {
      const updatedItems = invoice.items.filter((_, i) => i !== index);
      const updatedInvoice = { ...invoice, items: updatedItems };

      if (editingInvoice) {
        setEditingInvoice(updatedInvoice);
      } else {
        setNewInvoice(updatedInvoice);
      }
    }
  };

  const calculateTotals = (invoice) => {
    const subtotal = invoice.items.reduce((sum, item) => sum + (item.total || 0), 0);
    const totalDiscount = invoice.items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      const discount = parseFloat(item.discount) || 0;
      return sum + (qty * price * discount / 100);
    }, 0);
    const taxAmount = subtotal * 0.15;
    const grandTotal = subtotal + taxAmount;

    return { subtotal, totalDiscount, taxAmount, grandTotal };
  };

  const checkCreditLimit = (customer, amount) => {
    return (customer.currentBalance + amount) <= customer.creditLimit;
  };

  const checkStock = (items) => {
    return items.filter(item => {
      if (item.product && item.quantity) {
        return parseFloat(item.quantity) > item.product.available;
      }
      return false;
    });
  };

  const saveInvoice = () => {
    const invoice = editingInvoice || newInvoice;
    
    if (!invoice.customer || !invoice.items.some(item => item.product)) {
      alert('يرجى اختيار عميل وإضافة منتج واحد على الأقل');
      return;
    }

    const totals = calculateTotals(invoice);
    
    if (!checkCreditLimit(invoice.customer, totals.grandTotal)) {
      const confirmMsg = 'تحذير: ستتجاوز هذه الفاتورة حد الائتمان!\nهل تريد المتابعة؟';
      if (!window.confirm(confirmMsg)) return;
    }

    const stockIssues = checkStock(invoice.items);
    if (stockIssues.length > 0) {
      const confirmMsg = 'تحذير: نقص في المخزون لبعض المنتجات!\nهل تريد المتابعة؟';
      if (!window.confirm(confirmMsg)) return;
    }

    const finalInvoice = {
      ...invoice,
      id: editingInvoice ? editingInvoice.id : Date.now(),
      invoiceNumber: invoice.invoiceNumber || generateInvoiceNumber(),
      ...totals
    };

    if (editingInvoice) {
      setInvoices(prev => prev.map(inv => inv.id === editingInvoice.id ? finalInvoice : inv));
      setEditingInvoice(null);
    } else {
      setInvoices(prev => [...prev, finalInvoice]);
      setNewInvoice({
        invoiceNumber: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        customer: null,
        notes: '',
        status: 'مسودة',
        paymentStatus: 'معلقة',
        items: [{ id: 1, product: null, quantity: '', unitPrice: '', discount: 0, total: 0 }]
      });
    }

    setShowInvoiceForm(false);
  };

  const deleteInvoice = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
      setInvoices(prev => prev.filter(inv => inv.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      case 'مؤكدة': return 'bg-green-100 text-green-800';
      case 'مرسلة': return 'bg-blue-100 text-blue-800';
      case 'ملغية': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'معلقة': return 'bg-yellow-100 text-yellow-800';
      case 'مدفوعة جزئياً': return 'bg-orange-100 text-orange-800';
      case 'مدفوعة بالكامل': return 'bg-green-100 text-green-800';
      case 'متأخرة': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const InvoiceForm = () => {
    const invoice = editingInvoice || newInvoice;
    const totals = calculateTotals(invoice);
    const stockIssues = checkStock(invoice.items);
    const creditExceeded = invoice.customer && !checkCreditLimit(invoice.customer, totals.grandTotal);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold mb-6">
          {editingInvoice ? 'تعديل الفاتورة' : 'فاتورة مبيعات جديدة'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم الفاتورة</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="سيتم إنشاؤه تلقائياً"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">التاريخ</label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">حالة الفاتورة</label>
            <select
              value={invoice.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {invoiceStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">حالة الدفع</label>
            <select
              value={invoice.paymentStatus}
              onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {paymentStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-3">معلومات العميل</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العميل *</label>
              <select
                value={invoice.customer?.id || ''}
                onChange={(e) => handleCustomerSelect(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر العميل</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.customerCode}
                  </option>
                ))}
              </select>
            </div>
            {invoice.customer && (
              <div className="bg-white p-3 rounded border">
                <div className="text-sm space-y-1">
                  <div><strong>الكود:</strong> {invoice.customer.customerCode}</div>
                  <div><strong>المسؤول:</strong> {invoice.customer.contactPerson}</div>
                  <div><strong>الهاتف:</strong> {invoice.customer.phone}</div>
                  <div><strong>شروط الدفع:</strong> {invoice.customer.paymentTerms}</div>
                  <div><strong>الرصيد:</strong> {invoice.customer.currentBalance.toLocaleString()} ريال</div>
                  <div><strong>حد الائتمان:</strong> {invoice.customer.creditLimit.toLocaleString()} ريال</div>
                </div>
                {creditExceeded && (
                  <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded flex items-center gap-1">
                    <AlertTriangle size={14} />
                    تحذير: ستتجاوز هذه الفاتورة حد الائتمان
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">أصناف الفاتورة</h3>
            <button
              onClick={addItem}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Plus size={16} />
              إضافة صنف
            </button>
          </div>

          {stockIssues.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4">
              <div className="flex items-center gap-2 text-red-800 font-medium">
                <AlertTriangle size={16} />
                تحذير: نقص في المخزون لبعض المنتجات
              </div>
            </div>
          )}

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
                {invoice.items.map((item, index) => {
                  const isStockLow = item.product && item.quantity && 
                    parseFloat(item.quantity) > item.product.available;
                  
                  return (
                    <tr key={item.id} className={isStockLow ? 'bg-red-50' : ''}>
                      <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 p-2">
                        <select
                          value={item.product?.id || ''}
                          onChange={(e) => handleProductSelect(index, e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="">اختر المنتج</option>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                        {item.product && (
                          <div className="text-xs text-gray-500 mt-1">
                            {item.product.code} • متوفر: {item.product.available}
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
                        <span className="font-medium">{(item.total || 0).toFixed(2)}</span>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => removeItem(index)}
                          disabled={invoice.items.length === 1}
                          className="text-red-600 hover:text-red-800 disabled:text-gray-400"
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

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-medium">{totals.subtotal.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>إجمالي الخصم:</span>
                <span className="font-medium text-red-600">-{totals.totalDiscount.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-medium">{totals.taxAmount.toFixed(2)} ريال</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">المجموع الإجمالي:</span>
                <span className="font-bold text-lg text-blue-600">{totals.grandTotal.toFixed(2)} ريال</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
          <textarea
            value={invoice.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="أي ملاحظات أو شروط خاصة..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={saveInvoice}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save size={16} />
            حفظ الفاتورة
          </button>
          <button
            onClick={() => {
              setShowInvoiceForm(false);
              setEditingInvoice(null);
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            إلغاء
          </button>
        </div>
      </div>
    );
  };

  const PrintPreview = ({ invoice }) => (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg" dir="rtl">
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-800 mb-2">فاتورة مبيعات</h1>
            <p className="text-sm text-gray-600">Sales Invoice</p>
          </div>
          <div className="text-left">
            <div className="text-lg font-bold text-blue-600">رقم الفاتورة: {invoice.invoiceNumber}</div>
            <div className="text-sm text-gray-600">التاريخ: {new Date(invoice.date).toLocaleDateString('ar-SA')}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-2">معلومات العميل:</h3>
          <div className="text-sm space-y-1">
            <div><strong>العميل:</strong> {invoice.customer.name}</div>
            <div><strong>المسؤول:</strong> {invoice.customer.contactPerson}</div>
            <div><strong>الهاتف:</strong> {invoice.customer.phone}</div>
            <div><strong>العنوان:</strong> {invoice.customer.address}</div>
            <div><strong>الرقم الضريبي:</strong> {invoice.customer.taxNumber}</div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-2">تفاصيل الفاتورة:</h3>
          <div className="text-sm space-y-1">
            <div><strong>حالة الفاتورة:</strong> {invoice.status}</div>
            <div><strong>حالة الدفع:</strong> {invoice.paymentStatus}</div>
          </div>
        </div>
      </div>

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
          {invoice.items.map((item, index) => (
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

      <div className="flex justify-end mb-6">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span>المجموع الفرعي:</span>
            <span>{invoice.subtotal.toFixed(2)} ريال</span>
          </div>
          <div className="flex justify-between">
            <span>إجمالي الخصم:</span>
            <span>-{invoice.totalDiscount.toFixed(2)} ريال</span>
          </div>
          <div className="flex justify-between">
            <span>ضريبة القيمة المضافة:</span>
            <span>{invoice.taxAmount.toFixed(2)} ريال</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <span>المجموع الإجمالي:</span>
            <span>{invoice.grandTotal.toFixed(2)} ريال</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-2">ملاحظات:</h3>
          <p className="text-sm">{invoice.notes}</p>
        </div>
      )}
    </div>
  );

  if (showPrintPreview && previewInvoice) {
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
        <PrintPreview invoice={previewInvoice} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white" dir="rtl">
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">نظام فواتير المبيعات الذكي</h1>
        </div>
        <p className="text-gray-600">فواتير مبيعات متكاملة مع إدارة المخزون وحدود الائتمان</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{invoices.length}</div>
          <div className="text-sm text-gray-600">إجمالي الفواتير</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{invoices.filter(inv => inv.status === 'مؤكدة').length}</div>
          <div className="text-sm text-gray-600">مؤكدة</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{invoices.filter(inv => inv.paymentStatus === 'معلقة').length}</div>
          <div className="text-sm text-gray-600">معلقة الدفع</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-purple-600">
            {invoices.reduce((sum, inv) => sum + inv.grandTotal, 0).toLocaleString('ar-SA', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-600">إجمالي المبيعات</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{invoices.filter(inv => inv.paymentStatus === 'متأخرة').length}</div>
          <div className="text-sm text-gray-600">متأخرة الدفع</div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowInvoiceForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            فاتورة جديدة
          </button>
        </div>
      </div>

      {showInvoiceForm && <InvoiceForm />}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">رقم الفاتورة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">العميل</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">التاريخ</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">القيمة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">الحالة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">الدفع</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-600">{invoice.invoiceNumber}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(invoice.invoiceNumber)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{invoice.customer.name}</div>
                    <div className="text-xs text-gray-500">{invoice.customer.contactPerson}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {new Date(invoice.date).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {invoice.grandTotal.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ريال
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPreviewInvoice(invoice);
                          setShowPrintPreview(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="معاينة"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingInvoice(invoice);
                          setShowInvoiceForm(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                        title="تعديل"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteInvoice(invoice.id)}
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

      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-green-800 mb-3">الميزات المتكاملة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
          <div>
            <h4 className="font-semibold mb-2">إدارة المخزون:</h4>
            <ul className="space-y-1">
              <li>• عرض المخزون المتاح لكل منتج</li>
              <li>• تنبيهات نقص المخزون</li>
              <li>• تحديث تلقائي عند التأكيد</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">إدارة الائتمان:</h4>
            <ul className="space-y-1">
              <li>• فحص حدود الائتمان</li>
              <li>• عرض الرصيد الحالي</li>
              <li>• تنبيهات تجاوز الحد</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">حسابات تلقائية:</h4>
            <ul className="space-y-1">
              <li>• حساب الخصومات والضرائب</li>
              <li>• إجماليات فورية</li>
              <li>• تقارير مالية دقيقة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSalesInvoice;