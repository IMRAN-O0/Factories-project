 import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Upload, Building2, Globe, FileText, Settings, CheckCircle } from 'lucide-react';

const FactoryWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    companyNameEn: '',
    logo: null,
    crNumber: '',
    vatNumber: '',
    address: '',
    addressEn: '',
    industry: '',
    departments: [],
    paperSize: 'A4',
    language: 'ar'
  });
  const fileInputRef = useRef(null);

  const industries = [
    { id: 'cosmetics', labelAr: 'مستحضرات التجميل (ISO 22716)', labelEn: 'Cosmetics (ISO 22716)' },
    { id: 'food', labelAr: 'صناعة الأغذية (HACCP)', labelEn: 'Food Industry (HACCP)' }
  ];

  const departments = [
    { id: 'production', labelAr: 'الإنتاج', labelEn: 'Production' },
    { id: 'quality', labelAr: 'ضمان الجودة', labelEn: 'Quality Assurance' },
    { id: 'warehouse', labelAr: 'المستودع', labelEn: 'Warehouse' },
    { id: 'packaging', labelAr: 'التعبئة والتغليف', labelEn: 'Packaging' },
    { id: 'maintenance', labelAr: 'الصيانة', labelEn: 'Maintenance' }
  ];

  const isRTL = formData.language === 'ar';

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDepartmentToggle = (deptId) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(deptId)
        ? prev.departments.filter(id => id !== deptId)
        : [...prev.departments, deptId]
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, logo: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    console.log('handleFinish called!');
    
    try {
      // Validate required fields
      if (!formData.companyName.trim()) {
        alert(isRTL ? 'يرجى إدخال اسم الشركة' : 'Please enter company name');
        setCurrentStep(1);
        return;
      }
      
      if (!formData.industry) {
        alert(isRTL ? 'يرجى اختيار نوع الصناعة' : 'Please select industry type');
        setCurrentStep(2);
        return;
      }
      
      if (formData.departments.length === 0) {
        alert(isRTL ? 'يرجى اختيار قسم واحد على الأقل' : 'Please select at least one department');
        setCurrentStep(3);
        return;
      }

      // Save configuration to localStorage
      const tenantConfig = {
        ...formData,
        createdAt: new Date().toISOString(),
        version: '1.0'
      };
      
      console.log('Saving config:', tenantConfig);
      localStorage.setItem('tenantConfig', JSON.stringify(tenantConfig));
      
      // Verify save was successful
      const savedConfig = localStorage.getItem('tenantConfig');
      if (savedConfig) {
        console.log('Config saved successfully:', JSON.parse(savedConfig));
        // Move to success step
        setCurrentStep(5);
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert(isRTL ? 
        'حدث خطأ في حفظ الإعدادات. يرجى المحاولة مرة أخرى.' : 
        'Error saving settings. Please try again.'
      );
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Building2 className="ml-3 text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold">
                {isRTL ? 'معلومات الشركة' : 'Company Information'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'اسم الشركة (عربي)' : 'Company Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={isRTL ? 'أدخل اسم الشركة' : 'Enter company name'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'اسم الشركة (إنجليزي)' : 'Company Name (English)'}
                </label>
                <input
                  type="text"
                  value={formData.companyNameEn}
                  onChange={(e) => handleInputChange('companyNameEn', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'رقم السجل التجاري' : 'Commercial Registration Number'}
                </label>
                <input
                  type="text"
                  value={formData.crNumber}
                  onChange={(e) => handleInputChange('crNumber', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={isRTL ? '1010000000' : 'CR Number'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isRTL ? 'الرقم الضريبي' : 'VAT Number'}
                </label>
                <input
                  type="text"
                  value={formData.vatNumber}
                  onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={isRTL ? '300000000000003' : 'VAT Number'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'العنوان (عربي)' : 'Address (Arabic)'}
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={isRTL ? 'أدخل العنوان الكامل' : 'Enter full address'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'العنوان (إنجليزي)' : 'Address (English)'}
              </label>
              <textarea
                value={formData.addressEn}
                onChange={(e) => handleInputChange('addressEn', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full address in English"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {isRTL ? 'شعار الشركة' : 'Company Logo'}
              </label>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {formData.logo && (
                  <img src={formData.logo} alt="Logo" className="w-16 h-16 object-contain border rounded" />
                )}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Upload size={16} className="ml-2" />
                  {isRTL ? 'رفع الشعار' : 'Upload Logo'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <FileText className="ml-3 text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold">
                {isRTL ? 'اختيار الصناعة' : 'Industry Selection'}
              </h2>
            </div>

            <div className="space-y-4">
              {industries.map(industry => (
                <div
                  key={industry.id}
                  onClick={() => handleInputChange('industry', industry.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.industry === industry.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ml-3 ${
                      formData.industry === industry.id
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}></div>
                    <div>
                      <h3 className="font-medium">
                        {isRTL ? industry.labelAr : industry.labelEn}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isRTL 
                          ? (industry.id === 'cosmetics' ? 'معايير الجودة الدولية لمستحضرات التجميل' : 'نظام تحليل المخاطر ونقاط التحكم الحرجة')
                          : (industry.id === 'cosmetics' ? 'International quality standards for cosmetics' : 'Hazard Analysis Critical Control Points')
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Settings className="ml-3 text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold">
                {isRTL ? 'اختيار الأقسام' : 'Department Selection'}
              </h2>
            </div>

            <p className="text-gray-600 mb-4">
              {isRTL ? 'اختر الأقسام التي تريد تفعيلها في النظام:' : 'Select the departments you want to enable in the system:'}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {departments.map(dept => (
                <div
                  key={dept.id}
                  onClick={() => handleDepartmentToggle(dept.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.departments.includes(dept.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 border-2 rounded ml-3 flex items-center justify-center ${
                      formData.departments.includes(dept.id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.departments.includes(dept.id) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">
                      {isRTL ? dept.labelAr : dept.labelEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Globe className="ml-3 text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold">
                {isRTL ? 'تفضيلات النظام' : 'System Preferences'}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-4">
                  {isRTL ? 'حجم الورق للتقارير' : 'Paper Size for Reports'}
                </label>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  {['A4', 'A5'].map(size => (
                    <div
                      key={size}
                      onClick={() => handleInputChange('paperSize', size)}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paperSize === size
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 ml-2 ${
                          formData.paperSize === size
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}></div>
                        <span>{size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4">
                  {isRTL ? 'لغة النظام' : 'System Language'}
                </label>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <div
                    onClick={() => handleInputChange('language', 'ar')}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.language === 'ar'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ml-2 ${
                        formData.language === 'ar'
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <span>العربية</span>
                    </div>
                  </div>
                  <div
                    onClick={() => handleInputChange('language', 'both')}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.language === 'both'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ml-2 ${
                        formData.language === 'both'
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <span>العربية + English</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">
                  {isRTL ? 'ملخص الإعدادات:' : 'Configuration Summary:'}
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>{isRTL ? 'الشركة:' : 'Company:'}</strong> {formData.companyName || 'غير محدد'}</div>
                  <div><strong>{isRTL ? 'الصناعة:' : 'Industry:'}</strong> {
                    formData.industry ? 
                      (isRTL ? industries.find(i => i.id === formData.industry)?.labelAr : industries.find(i => i.id === formData.industry)?.labelEn)
                      : (isRTL ? 'غير محدد' : 'Not selected')
                  }</div>
                  <div><strong>{isRTL ? 'الأقسام:' : 'Departments:'}</strong> {
                    formData.departments.length > 0 
                      ? formData.departments.map(id => 
                          isRTL ? departments.find(d => d.id === id)?.labelAr : departments.find(d => d.id === id)?.labelEn
                        ).join(', ')
                      : (isRTL ? 'لم يتم اختيار أقسام' : 'No departments selected')
                  }</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-semibold text-green-800">
              {isRTL ? 'تم إنهاء الإعداد بنجاح!' : 'Setup Completed Successfully!'}
            </h2>
            
            <p className="text-gray-600 text-lg">
              {isRTL ? 'تم حفظ إعدادات الشركة ويمكنك الآن البدء في استخدام النظام' : 'Company settings have been saved and you can now start using the system'}
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg inline-block">
              <p className="text-green-800 font-medium">
                {isRTL ? 'تم حفظ البيانات في المتصفح بنجاح' : 'Data saved successfully in browser storage'}
              </p>
            </div>
            
            <button
              onClick={() => {
                alert(isRTL ? 'سيتم الانتقال إلى لوحة التحكم الرئيسية' : 'Redirecting to main dashboard');
                window.location.reload();
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              {isRTL ? 'ابدأ الاستخدام' : 'Start Using System'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Building2 className="mx-auto mb-4 text-blue-600" size={48} />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isRTL ? 'مرحباً بك في نظام إدارة المصانع' : 'Welcome to Factory Management System'}
          </h1>
          <p className="text-gray-600">
            {isRTL ? 'دعنا نقوم بإعداد الشركة والنظام' : 'Let\'s set up your company and system'}
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep <= 4 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {isRTL ? `الخطوة ${currentStep} من 4` : `Step ${currentStep} of 4`}
              </span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-[500px]">
          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep <= 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  currentStep === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft size={16} className="ml-1" />
                {isRTL ? 'السابق' : 'Previous'}
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isRTL ? 'التالي' : 'Next'}
                  <ChevronRight size={16} className="mr-1" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    console.log('Finish button clicked');
                    handleFinish();
                  }}
                  className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {isRTL ? 'إنهاء الإعداد' : 'Finish Setup'}
                  <CheckCircle size={16} className="mr-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactoryWizard;
