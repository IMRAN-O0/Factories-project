import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Save, Download, Upload, Users, Phone, MapPin, Eye, Copy, Star, AlertCircle } from 'lucide-react';

const CustomerDatabaseSystem = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      customerCode: 'CUST-001',
      name: 'شركة الأدوية المتقدمة',
      contactPerson: 'أحمد السالم',
      customerType: 'جملة',
      category: 'VIP',
      phone: '0501234567',
      email: 'ahmed@advancedpharm.com',
      address: 'شارع الملك فهد، الرياض',
      city: 'الرياض',
      region: 'المنطقة الوسطى',
      postalCode: '12345',
      taxNumber: '300123456700003',
      creditLimit: 100000,
      paymentTerms: '30 يوم',
      discount: 5,
      salesRep: 'محمد العلي',
      status: 'نشط',
      registrationDate: '2024-01-15',
      lastOrderDate: '2024-03-15',
      totalOrders: 25,
      totalValue: 250000,
      notes: 'عميل ممتاز - دفع منتظم'
    },
    {
      id: 2,
      customerCode: 'CUST-002',
      name: 'صيدلية النور',
      contactPerson: 'فاطمة أحمد',
      customerType: 'تجزئة',
      category: 'عادي',
      phone: '0507654321',
      email: 'info@alnoor-pharmacy.com',
      address: 'حي الصفا، جدة',
      city: 'جدة',
      region: 'المنطقة الغربية',
      postalCode: '21411',
      taxNumber: '300567890100003',
      creditLimit: 25000,
      paymentTerms: '15 يوم',
      discount: 3,
      salesRep: 'سارة محمد',
      status: 'نشط',
      registrationDate: '2024-02-10',
      lastOrderDate: '2024-03-20',
      totalOrders: 12,
      totalValue: 85000,
      notes: 'صيدلية محلية - طلبات منتظمة'
    },
    {
      id: 3,
      customerCode: 'CUST-003',
      name: 'مستشفى الملك فيصل',
      contactPerson: 'د. خالد الغامدي',
      customerType: 'جملة',
      category: 'VIP',
      phone: '0112345678',
      email: 'procurement@kfh.med.sa',
      address: 'شارع التخصصي، الرياض',
      city: 'الرياض',
      region: 'المنطقة الوسطى',
      postalCode: '11211',
      taxNumber: '300789123400003',
      creditLimit: 500000,
      paymentTerms: '45 يوم',
      discount: 8,
      salesRep: 'عبدالله الشمري',
      status: 'نشط',
      registrationDate: '2023-12-01',
      lastOrderDate: '2024-03-18',
      totalOrders: 45,
      totalValue: 850000,
      notes: 'مستشفى حكومي - عقد سنوي'
    },
    {
      id: 4,
      customerCode: 'CUST-004',
      name: 'توزيعات الخليج الطبية',
      contactPerson: 'عمر البراك',
      customerType: 'موزع',
      category: 'عادي',
      phone: '0506789012',
      email: 'omar@gulf-medical.com',
      address: 'المنطقة الصناعية، الدمام',
      city: 'الدمام',
      region: 'المنطقة الشرقية',
      postalCode: '31451',
      taxNumber: '300345678900003',
      creditLimit: 150000,
      paymentTerms: '30 يوم',
      discount: 12,
      salesRep: 'ناصر القحطاني',
      status: 'معلق',
      registrationDate: '2024-01-20',
      lastOrderDate: '2024-02-28',
      totalOrders: 8,
      totalValue: 120000,
      notes: 'تأخير في السداد - مراجعة مطلوبة'
    }
  ]);

  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showCustomerSelector, setShowCustomerSelector] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    customerCode: '',
    name: '',
    contactPerson: '',
    customerType: 'تجزئة',
    category: 'عادي',
    phone: '',
    email: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    taxNumber: '',
    creditLimit: '',
    paymentTerms: '15 يوم',
    discount: '',
    salesRep: '',
    status: 'نشط',
    notes: ''
  });

  const customerTypes = ['تجزئة', 'جملة', 'موزع', 'مؤسسة حكومية', 'مستشفى', 'عيادة'];
  const categories = ['VIP', 'عادي', 'جديد', 'غير نشط'];
  const regions = ['المنطقة الوسطى', 'المنطقة الغربية', 'المنطقة الشرقية', 'المنطقة الشمالية', 'المنطقة الجنوبية'];
  const paymentTerms = ['نقداً', '15 يوم', '30 يوم', '45 يوم', '60 يوم', '90 يوم'];
  const statuses = ['نشط', 'معلق', 'غير نشط', 'محظور'];
  const salesReps = ['محمد العلي', 'سارة محمد', 'عبدالله الشمري', 'ناصر القحطاني', 'أمل الزهراني', 'فهد الدوسري'];

  // البحث والفلترة
  useEffect(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm) ||
                           customer.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || customer.customerType === selectedType;
      const matchesCategory = selectedCategory === '' || customer.category === selectedCategory;
      const matchesRegion = selectedRegion === '' || customer.region === selectedRegion;
      
      return matchesSearch && matchesType && matchesCategory && matchesRegion;
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, selectedType, selectedCategory, selectedRegion, customers]);

  const handleInputChange = (field, value) => {
    if (editingCustomer) {
      setEditingCustomer(prev => ({ ...prev, [field]: value }));
    } else {
      setNewCustomer(prev => ({ ...prev, [field]: value }));
    }
  };

  const generateCustomerCode = () => {
    const number = String(customers.length + 1).padStart(3, '0');
    return `CUST-${number}`;
  };

  const addCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) return;

    const customer = {
      ...newCustomer,
      id: Date.now(),
      customerCode: newCustomer.customerCode || generateCustomerCode(),
      creditLimit: parseFloat(newCustomer.creditLimit) || 0,
      discount: parseFloat(newCustomer.discount) || 0,
      registrationDate: new Date().toISOString().split('T')[0],
      lastOrderDate: '',
      totalOrders: 0,
      totalValue: 0
    };

    setCustomers(prev => [...prev, customer]);
    setNewCustomer({
      customerCode: '',
      name: '',
      contactPerson: '',
      customerType: 'تجزئة',
      category: 'عادي',
      phone: '',
      email: '',
      address: '',
      city: '',
      region: '',
      postalCode: '',
      taxNumber: '',
      creditLimit: '',
      paymentTerms: '15 يوم',
      discount: '',
      salesRep: '',
      status: 'نشط',
      notes: ''
    });
    setShowAddForm(false);
  };

  const updateCustomer = () => {
    if (!editingCustomer.name || !editingCustomer.phone) return;

    setCustomers(prev => prev.map(customer => 
      customer.id === editingCustomer.id ? {
        ...editingCustomer,
        creditLimit: parseFloat(editingCustomer.creditLimit) || 0,
        discount: parseFloat(editingCustomer.discount) || 0
      } : customer
    ));
    setEditingCustomer(null);
  };

  const deleteCustomer = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      setCustomers(prev => prev.filter(customer => customer.id !== id));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(customers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `customers_database_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedCustomers = JSON.parse(e.target.result);
          setCustomers(importedCustomers);
        } catch (error) {
          alert('خطأ في قراءة الملف');
        }
      };
      reader.readAsText(file);
    }
  };

  const copyCustomerCode = (code) => {
    navigator.clipboard.writeText(code);
    alert('تم نسخ كود العميل');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      case 'غير نشط': return 'bg-gray-100 text-gray-800';
      case 'محظور': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'VIP': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'جديد': return <Plus className="w-4 h-4 text-blue-500" />;
      case 'غير نشط': return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default: return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  // مكون منتقي العملاء للاستخدام في النماذج الأخرى
  const CustomerSelector = ({ onSelect, placeholder = "ابحث عن عميل..." }) => {
    const [localSearch, setLocalSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const filteredForSelector = customers.filter(customer => 
      localSearch.length > 1 && customer.status === 'نشط' && (
        customer.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        customer.customerCode.toLowerCase().includes(localSearch.toLowerCase()) ||
        customer.phone.includes(localSearch)
      )
    ).slice(0, 8);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setLocalSearch(value);
      if (value.length > 1 && isInputFocused) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };

    const handleSelectCustomer = (customer) => {
      onSelect(customer);
      setLocalSearch(customer.name);
      setShowDropdown(false);
      setIsInputFocused(false);
    };

    const clearSearch = () => {
      setLocalSearch('');
      setShowDropdown(false);
    };

    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={localSearch}
            onChange={handleInputChange}
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
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
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
        
        {showDropdown && isInputFocused && filteredForSelector.length > 0 && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
            {filteredForSelector.map(customer => (
              <button
                key={customer.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectCustomer(customer);
                }}
                className="w-full text-right p-3 hover:bg-blue-50 focus:bg-blue-50 border-b border-gray-100 last:border-b-0 focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(customer.category)}
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">
                      {customer.customerCode} • {customer.contactPerson} • {customer.phone}
                    </div>
                    <div className="text-xs text-gray-400">
                      {customer.customerType} • {customer.city} • حد ائتماني: {customer.creditLimit.toLocaleString()} ريال
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CustomerForm = ({ customer, isEditing = false }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">كود العميل</label>
        <input
          type="text"
          value={customer.customerCode}
          onChange={(e) => handleInputChange('customerCode', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="سيتم إنشاؤه تلقائياً"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">اسم العميل *</label>
        <input
          type="text"
          value={customer.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="اسم الشركة أو العميل"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الشخص المسؤول</label>
        <input
          type="text"
          value={customer.contactPerson}
          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="اسم المسؤول"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نوع العميل</label>
        <select
          value={customer.customerType}
          onChange={(e) => handleInputChange('customerType', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {customerTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تصنيف العميل</label>
        <select
          value={customer.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف *</label>
        <input
          type="tel"
          value={customer.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="05xxxxxxxx"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
        <input
          type="email"
          value={customer.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="customer@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
        <input
          type="text"
          value={customer.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="الرياض"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">المنطقة</label>
        <select
          value={customer.region}
          onChange={(e) => handleInputChange('region', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">اختر المنطقة</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
        <input
          type="text"
          value={customer.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="العنوان التفصيلي"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الرمز البريدي</label>
        <input
          type="text"
          value={customer.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="12345"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الرقم الضريبي</label>
        <input
          type="text"
          value={customer.taxNumber}
          onChange={(e) => handleInputChange('taxNumber', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="300123456700003"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">حد الائتمان (ريال)</label>
        <input
          type="number"
          value={customer.creditLimit}
          onChange={(e) => handleInputChange('creditLimit', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="50000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">شروط الدفع</label>
        <select
          value={customer.paymentTerms}
          onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {paymentTerms.map(term => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نسبة الخصم (%)</label>
        <input
          type="number"
          step="0.1"
          value={customer.discount}
          onChange={(e) => handleInputChange('discount', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="5.0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">مندوب المبيعات</label>
        <select
          value={customer.salesRep}
          onChange={(e) => handleInputChange('salesRep', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">اختر المندوب</option>
          {salesReps.map(rep => (
            <option key={rep} value={rep}>{rep}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">حالة العميل</label>
        <select
          value={customer.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
        <textarea
          value={customer.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="أي ملاحظات مهمة عن العميل..."
        />
      </div>
    </div>
  );

  const calculateStats = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'نشط').length;
    const vipCustomers = customers.filter(c => c.category === 'VIP').length;
    const totalCreditLimit = customers.reduce((sum, c) => sum + c.creditLimit, 0);
    const totalSalesValue = customers.reduce((sum, c) => sum + c.totalValue, 0);

    return {
      totalCustomers,
      activeCustomers,
      vipCustomers,
      totalCreditLimit,
      totalSalesValue
    };
  };

  const stats = calculateStats();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white" dir="rtl">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">قاعدة بيانات العملاء الذكية</h1>
        </div>
        <p className="text-gray-600">إدارة شاملة ومتقدمة لجميع العملاء والزبائن</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <Users className="text-blue-600 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-blue-600">{stats.totalCustomers}</div>
          <div className="text-sm text-gray-600">إجمالي العملاء</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{stats.activeCustomers}</div>
          <div className="text-sm text-gray-600">عملاء نشطين</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <Star className="text-yellow-600 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold text-yellow-600">{stats.vipCustomers}</div>
          <div className="text-sm text-gray-600">عملاء VIP</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-purple-600">{(stats.totalCreditLimit / 1000).toFixed(0)}K</div>
          <div className="text-sm text-gray-600">حد ائتماني (ريال)</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-lg font-bold text-gray-600">{(stats.totalSalesValue / 1000).toFixed(0)}K</div>
          <div className="text-sm text-gray-600">إجمالي المبيعات</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ابحث بالاسم، الكود، الهاتف، أو المدينة..."
              />
            </div>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">جميع الأنواع</option>
            {customerTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">جميع التصنيفات</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">جميع المناطق</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            إضافة عميل جديد
          </button>

          <button
            onClick={exportData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Download size={16} />
            تصدير البيانات
          </button>

          <label className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 cursor-pointer">
            <Upload size={16} />
            استيراد البيانات
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowCustomerSelector(!showCustomerSelector)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
          >
            <Eye size={16} />
            عرض منتقي العملاء
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          عرض {filteredCustomers.length} من {customers.length} عميل
        </div>
      </div>

      {/* Customer Selector Demo */}
      {showCustomerSelector && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-yellow-800 mb-3">مثال على منتقي العملاء (للاستخدام في النماذج الأخرى)</h3>
          <CustomerSelector
            onSelect={(customer) => alert(`تم اختيار: ${customer.name} (${customer.customerCode})`)}
            placeholder="جرب البحث عن 'شركة' أو 'صيدلية'..."
          />
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAddForm || editingCustomer) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">
            {editingCustomer ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}
          </h2>
          
          <CustomerForm 
            customer={editingCustomer || newCustomer} 
            isEditing={!!editingCustomer}
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={editingCustomer ? updateCustomer : addCustomer}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save size={16} />
              {editingCustomer ? 'تحديث' : 'إضافة'}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingCustomer(null);
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الكود</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">اسم العميل</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">النوع</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">التصنيف</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">التواصل</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">المنطقة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الائتمان</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">المبيعات</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الحالة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-600">{customer.customerCode}</span>
                      <button
                        onClick={() => copyCustomerCode(customer.customerCode)}
                        className="text-gray-400 hover:text-gray-600"
                        title="نسخ الكود"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.contactPerson}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{customer.customerType}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(customer.category)}
                      <span className="text-sm text-gray-900">{customer.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Phone size={12} />
                      {customer.phone}
                    </div>
                    <div className="text-xs text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <MapPin size={12} />
                      {customer.city}
                    </div>
                    <div className="text-xs text-gray-500">{customer.region}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.creditLimit.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{customer.paymentTerms}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.totalValue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{customer.totalOrders} طلب</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCustomer(customer)}
                        className="text-blue-600 hover:text-blue-800"
                        title="تعديل"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteCustomer(customer.id)}
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

      {/* Integration Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-3">ربط قاعدة العملاء مع نماذج المبيعات</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>النماذج التي ستستفيد:</strong></p>
          <ul className="list-disc list-inside space-y-1 mr-4">
            <li>عروض الأسعار - Quotation Forms</li>
            <li>فواتير المبيعات - Sales Invoices</li>
            <li>إذونات التسليم - Delivery Notes</li>
            <li>تقارير المبيعات - Sales Reports</li>
            <li>متابعة الديون - Account Receivables</li>
          </ul>
          <p className="mt-3"><strong>البيانات المتاحة للربط:</strong></p>
          <div className="bg-white p-3 rounded text-xs space-y-1">
            <div>• معلومات العميل الكاملة (الاسم، الكود، التواصل)</div>
            <div>• شروط الدفع وحد الائتمان</div>
            <div>• نسبة الخصم المخصصة</div>
            <div>• مندوب المبيعات المختص</div>
            <div>• العنوان والرقم الضريبي</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDatabaseSystem;