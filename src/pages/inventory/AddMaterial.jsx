import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Save, Download, Upload, Package, Filter, Eye, Copy } from 'lucide-react';

const ProductDatabaseSystem = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      code: 'MAT-VIT-001',
      name: 'فيتامين C - أقراص 500 مجم',
      category: 'مواد خام',
      subCategory: 'فيتامينات',
      unit: 'كيلو',
      supplier: 'شركة الفيتامينات المتحدة',
      unitCost: 25.50,
      minStock: 100,
      maxStock: 1000,
      storageConditions: 'مكان جاف - درجة حرارة الغرفة',
      shelfLife: '24 شهر',
      notes: 'يحتاج شهادة تحليل مع كل دفعة'
    },
    {
      id: 2,
      code: 'MAT-VIT-002',
      name: 'فيتامين D3 - كبسولات 1000 وحدة',
      category: 'مواد خام',
      subCategory: 'فيتامينات',
      unit: 'جرام',
      supplier: 'شركة الفيتامينات المتحدة',
      unitCost: 45.00,
      minStock: 50,
      maxStock: 500,
      storageConditions: 'مكان جاف - حماية من الضوء',
      shelfLife: '36 شهر',
      notes: 'مادة حساسة للضوء'
    },
    {
      id: 3,
      code: 'PKG-BOT-001',
      name: 'زجاجات بلاستيك 100 مل',
      category: 'مواد تغليف',
      subCategory: 'عبوات',
      unit: 'قطعة',
      supplier: 'مصنع العبوات الحديثة',
      unitCost: 0.75,
      minStock: 5000,
      maxStock: 20000,
      storageConditions: 'مكان جاف',
      shelfLife: 'لا ينتهي',
      notes: 'مطابق للمعايير الغذائية'
    },
    {
      id: 4,
      code: 'PRD-MULTI-001',
      name: 'مجموعة فيتامينات متعددة - 60 قرص',
      category: 'منتج نهائي',
      subCategory: 'المكملات الغذائية',
      unit: 'علبة',
      supplier: 'إنتاج داخلي',
      unitCost: 15.00,
      minStock: 200,
      maxStock: 2000,
      storageConditions: 'مكان جاف - درجة حرارة الغرفة',
      shelfLife: '24 شهر',
      notes: 'منتج جاهز للبيع'
    },
    {
      id: 5,
      code: 'MAT-CAL-001',
      name: 'كالسيوم كربونات - مسحوق',
      category: 'مواد خام',
      subCategory: 'معادن',
      unit: 'كيلو',
      supplier: 'شركة المعادن الطبية',
      unitCost: 12.30,
      minStock: 500,
      maxStock: 2000,
      storageConditions: 'مكان جاف',
      shelfLife: '60 شهر',
      notes: 'درجة نقاء عالية'
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductSelector, setShowProductSelector] = useState(false);

  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    category: 'مواد خام',
    subCategory: '',
    unit: 'كيلو',
    supplier: '',
    unitCost: '',
    minStock: '',
    maxStock: '',
    storageConditions: '',
    shelfLife: '',
    notes: ''
  });

  const categories = ['مواد خام', 'مواد تغليف', 'منتج نهائي'];
  const subCategories = {
    'مواد خام': ['فيتامينات', 'معادن', 'أعشاب', 'مواد حافظة', 'مواد تحلية', 'أخرى'],
    'مواد تغليف': ['عبوات', 'أغطية', 'ملصقات', 'كراتين', 'أكياس', 'أخرى'],
    'منتج نهائي': ['المكملات الغذائية', 'الأدوية', 'منتجات العناية', 'أخرى']
  };
  const units = ['كيلو', 'جرام', 'لتر', 'مل', 'قطعة', 'كرتون', 'كيس', 'علبة', 'زجاجة'];

  // البحث والفلترة
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === '' || product.subCategory === selectedSubCategory;
      
      return matchesSearch && matchesCategory && matchesSubCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedSubCategory, products]);

  const handleInputChange = (field, value) => {
    if (editingProduct) {
      setEditingProduct(prev => ({ ...prev, [field]: value }));
    } else {
      setNewProduct(prev => ({ ...prev, [field]: value }));
    }
  };

  const generateProductCode = (category, subCategory) => {
    const categoryCode = category === 'مواد خام' ? 'MAT' : 
                        category === 'مواد تغليف' ? 'PKG' : 'PRD';
    const subCode = subCategory.substring(0, 3).toUpperCase();
    const number = String(products.length + 1).padStart(3, '0');
    return `${categoryCode}-${subCode}-${number}`;
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.category) return;

    const product = {
      ...newProduct,
      id: Date.now(),
      code: newProduct.code || generateProductCode(newProduct.category, newProduct.subCategory),
      unitCost: parseFloat(newProduct.unitCost) || 0,
      minStock: parseInt(newProduct.minStock) || 0,
      maxStock: parseInt(newProduct.maxStock) || 0
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({
      code: '',
      name: '',
      category: 'مواد خام',
      subCategory: '',
      unit: 'كيلو',
      supplier: '',
      unitCost: '',
      minStock: '',
      maxStock: '',
      storageConditions: '',
      shelfLife: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const updateProduct = () => {
    if (!editingProduct.name || !editingProduct.category) return;

    setProducts(prev => prev.map(product => 
      product.id === editingProduct.id ? {
        ...editingProduct,
        unitCost: parseFloat(editingProduct.unitCost) || 0,
        minStock: parseInt(editingProduct.minStock) || 0,
        maxStock: parseInt(editingProduct.maxStock) || 0
      } : product
    ));
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `products_database_${new Date().toISOString().split('T')[0]}.json`;
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
          const importedProducts = JSON.parse(e.target.result);
          setProducts(importedProducts);
        } catch (error) {
          alert('خطأ في قراءة الملف');
        }
      };
      reader.readAsText(file);
    }
  };

  const copyProductCode = (code) => {
    navigator.clipboard.writeText(code);
    alert('تم نسخ الكود');
  };

  // مكون منتقي المنتجات للاستخدام في النماذج الأخرى
  const ProductSelector = ({ onSelect, placeholder = "ابحث عن منتج..." }) => {
    const [localSearch, setLocalSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const filteredForSelector = products.filter(product => 
      localSearch.length > 1 && (
        product.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        product.code.toLowerCase().includes(localSearch.toLowerCase())
      )
    ).slice(0, 8);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setLocalSearch(value);
      // عرض القائمة فقط إذا كان هناك نص وكان الحقل مُركز عليه
      if (value.length > 1 && isInputFocused) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };

    const handleSelectProduct = (product) => {
      onSelect(product);
      setLocalSearch(product.name);
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
              // تأخير قصير لإتاحة النقر على العناصر
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
            {filteredForSelector.map(product => (
              <button
                key={product.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectProduct(product);
                }}
                className="w-full text-right p-3 hover:bg-blue-50 focus:bg-blue-50 border-b border-gray-100 last:border-b-0 focus:outline-none"
              >
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {product.code} • {product.category} • {product.unit}
                  {product.unitCost > 0 && ` • ${product.unitCost} ريال`}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ProductForm = ({ product, isEditing = false }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">كود المنتج</label>
        <input
          type="text"
          value={product.code}
          onChange={(e) => handleInputChange('code', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="سيتم إنشاؤه تلقائياً"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج *</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="اسم المنتج أو المادة"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الفئة الرئيسية *</label>
        <select
          value={product.category}
          onChange={(e) => {
            handleInputChange('category', e.target.value);
            handleInputChange('subCategory', '');
          }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الفئة الفرعية</label>
        <select
          value={product.subCategory}
          onChange={(e) => handleInputChange('subCategory', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">اختر الفئة الفرعية</option>
          {subCategories[product.category]?.map(subCat => (
            <option key={subCat} value={subCat}>{subCat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الوحدة</label>
        <select
          value={product.unit}
          onChange={(e) => handleInputChange('unit', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {units.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">المورد</label>
        <input
          type="text"
          value={product.supplier}
          onChange={(e) => handleInputChange('supplier', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="اسم المورد أو الشركة"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">التكلفة/الوحدة (ريال)</label>
        <input
          type="number"
          step="0.01"
          value={product.unitCost}
          onChange={(e) => handleInputChange('unitCost', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأدنى للمخزون</label>
        <input
          type="number"
          value={product.minStock}
          onChange={(e) => handleInputChange('minStock', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأقصى للمخزون</label>
        <input
          type="number"
          value={product.maxStock}
          onChange={(e) => handleInputChange('maxStock', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="1000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ظروف التخزين</label>
        <input
          type="text"
          value={product.storageConditions}
          onChange={(e) => handleInputChange('storageConditions', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="مكان جاف - درجة حرارة الغرفة"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">مدة الصلاحية</label>
        <input
          type="text"
          value={product.shelfLife}
          onChange={(e) => handleInputChange('shelfLife', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="24 شهر"
        />
      </div>

      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
        <textarea
          value={product.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="أي ملاحظات إضافية..."
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white" dir="rtl">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">نظام إدارة المنتجات المركزي</h1>
        </div>
        <p className="text-gray-600">قاعدة بيانات موحدة لجميع المواد والمنتجات</p>
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
                placeholder="ابحث بالاسم، الكود، أو الفئة..."
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory('');
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">جميع الفئات</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {selectedCategory && (
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">جميع الفئات الفرعية</option>
              {subCategories[selectedCategory]?.map(subCat => (
                <option key={subCat} value={subCat}>{subCat}</option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} />
            إضافة منتج جديد
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
            onClick={() => setShowProductSelector(!showProductSelector)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
          >
            <Eye size={16} />
            عرض منتقي المنتجات
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          عرض {filteredProducts.length} من {products.length} منتج
        </div>
      </div>

      {/* Product Selector Demo */}
      {showProductSelector && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-yellow-800 mb-3">مثال على منتقي المنتجات (للاستخدام في النماذج الأخرى)</h3>
          <ProductSelector
            onSelect={(product) => alert(`تم اختيار: ${product.name} (${product.code})`)}
            placeholder="جرب البحث عن 'فيتامين' أو 'كالسيوم'..."
          />
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAddForm || editingProduct) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">
            {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h2>
          
          <ProductForm 
            product={editingProduct || newProduct} 
            isEditing={!!editingProduct}
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={editingProduct ? updateProduct : addProduct}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save size={16} />
              {editingProduct ? 'تحديث' : 'إضافة'}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingProduct(null);
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الكود</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">اسم المنتج</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الفئة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الفئة الفرعية</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الوحدة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">المورد</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">التكلفة</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">المخزون</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-600">{product.code}</span>
                      <button
                        onClick={() => copyProductCode(product.code)}
                        className="text-gray-400 hover:text-gray-600"
                        title="نسخ الكود"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    {product.notes && (
                      <div className="text-xs text-gray-500 mt-1">{product.notes.substring(0, 50)}...</div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.category === 'مواد خام' ? 'bg-blue-100 text-blue-800' :
                      product.category === 'مواد تغليف' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.subCategory}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.unit}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {product.supplier}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.unitCost ? `${product.unitCost} ريال` : '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="text-gray-900">
                      {product.minStock} - {product.maxStock}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-blue-600 hover:text-blue-800"
                        title="تعديل"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
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
        <h3 className="text-lg font-bold text-blue-800 mb-3">كيفية الربط مع النماذج الأخرى</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>النماذج المدعومة:</strong></p>
          <ul className="list-disc list-inside space-y-1 mr-4">
            <li>إذن استلام مواد - MaterialReceipt.jsx</li>
            <li>إذن صرف مواد - MaterialIssue.jsx</li>
            <li>سجل جرد المخزون - InventoryCount.jsx</li>
            <li>تقرير انتهاء الصلاحية - ExpiryReports.jsx</li>
          </ul>
          <p className="mt-3"><strong>طريقة الاستخدام:</strong></p>
          <div className="block bg-white p-2 rounded text-xs">
            <pre>{`// استيراد مكون البحث
// نسخ مكون ProductSelector من هذا الملف

// في النموذج
<ProductSelector 
  onSelect={(product) => {
    setMaterialCode(product.code);
    setMaterialName(product.name);
    setUnit(product.unit);
    setUnitCost(product.unitCost);
  }}
  placeholder="ابحث عن منتج..."
/>`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDatabaseSystem;