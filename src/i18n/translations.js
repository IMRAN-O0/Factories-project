// Wording follows the official company profile (بروفايل مصنع أول حلم), which is the master source for site copy.

const BOOKING_PACKAGING_IDS = ['bottle', 'jar', 'tube', 'pump', 'spray', 'custom'];

const AR_PACKAGING = [
  {
    id: 'bottle',
    tag: 'Bottles',
    title: 'العبوات والزجاجات',
    desc: 'تشكيلة واسعة من البلاستيك والزجاج بأشكال أحادية وحديثة وأحجام مختلفة (من 30 مل حتى 500 مل).',
  },
  {
    id: 'jar',
    tag: 'Jars',
    title: 'المرطبانات والعلب',
    desc: 'علب أنيقة ومصممة خصيصاً للكريمات، أقنعة البشرة، والمقشرات مع أغطية محكمة.',
  },
  {
    id: 'tube',
    tag: 'Tubes',
    title: 'الأنابيب المرنة',
    desc: 'عبوات أنبوبية عملية ومريحة لغسول الوجه وكريمات اليدين والمقشرات.',
  },
  {
    id: 'pump',
    tag: 'Pumps',
    title: 'المضخات الضغاطة',
    desc: 'مضخات عالية الجودة بألوان متعددة (ذهبي، فضي، أسود، شفاف) مخصصة للسيرومات واللوشنات.',
  },
  {
    id: 'spray',
    tag: 'Sprayers',
    title: 'الرشاشات والبخاخات',
    desc: 'بخاخات رذاذ ناعم ودقيق لرشاشات الجسم والتونر وسبراي الشعر.',
  },
  {
    id: 'labels',
    tag: 'Labels & Boxes',
    title: 'الملصقات والصناديق',
    desc: 'طباعة ملصقات فائقة الجودة مقاومة للماء والزيوت والاحتكاك لضمان ثبات الهوية، وصناديق كرتونية فاخرة.',
  },
  {
    id: 'custom',
    tag: 'Custom Packaging',
    title: 'التغليف المخصص',
    desc: 'إمكانية تصنيع قوالب وعبوات مخصصة بالكامل لهوية علاماتكم لتضمن تميزاً مطلقاً في الأسواق.',
  },
];

const EN_PACKAGING = [
  {
    id: 'bottle',
    tag: 'Bottles',
    title: 'Bottles',
    desc: 'A wide range of plastic and glass bottles in modern shapes and sizes (from 30 ml to 500 ml).',
  },
  {
    id: 'jar',
    tag: 'Jars',
    title: 'Jars',
    desc: 'Elegant jars designed specifically for creams, face masks, and scrubs, with tightly sealed lids.',
  },
  {
    id: 'tube',
    tag: 'Tubes',
    title: 'Flexible Tubes',
    desc: 'Practical, convenient tubes for face washes, hand creams, and scrubs.',
  },
  {
    id: 'pump',
    tag: 'Pumps',
    title: 'Pump Dispensers',
    desc: 'High-quality pumps in multiple colors (gold, silver, black, clear) made for serums and lotions.',
  },
  {
    id: 'spray',
    tag: 'Sprayers',
    title: 'Sprayers',
    desc: 'Fine, precise mist sprayers for body mists, toners, and hair sprays.',
  },
  {
    id: 'labels',
    tag: 'Labels & Boxes',
    title: 'Labels & Boxes',
    desc: 'Premium labels resistant to water, oils, and friction for a lasting brand identity, plus luxury cardboard boxes.',
  },
  {
    id: 'custom',
    tag: 'Custom Packaging',
    title: 'Custom Packaging',
    desc: 'Fully custom molds and containers built around your brand identity, for absolute distinction in the market.',
  },
];

export const translations = {
  ar: {
    nav: {
      home: 'الصفحة الرئيسية',
      services: 'خدماتنا',
      products: 'منتجاتنا',
      about: 'من نحن',
      contact: 'تواصل معنا',
      bookNow: 'احجز موعد',
      openMenu: 'فتح القائمة',
    },
    theme: {
      toggleToDark: 'تفعيل الوضع الليلي',
      toggleToLight: 'تفعيل الوضع النهاري',
    },
    lang: {
      switchTo: 'English',
    },
    hero: {
      badge: 'حيث تتلاقى الطبيعة مع العلم',
      titleLine1: 'مصنع أول حلم',
      titleLine2: 'لتصنيع مستحضرات التجميل',
      subtitle:
        'في مصنع أول حلم، ومن قلب العاصمة الرياض، نقدم للمستثمرين في عالم الجمال شريكاً تصنيعياً وطنياً يمتلك المعرفة العلمية، والبنية التحتية، والالتزام المطلق بالمعايير العالمية.',
      ctaBook: 'احجز موعد مجاناً',
      ctaServices: 'تعرّف على خدماتنا',
      floatingTitle: 'مرخّص من SFDA',
      floatingDesc: 'الهيئة العامة للغذاء والدواء',
      imageAlt: 'عبوة كريم وعلبة تغليف بلا علامة تجارية، جاهزة لهوية علامتك',
    },
    whyUs: {
      eyebrow: 'لماذا نحن',
      title: 'لماذا تختار مصنع أول حلم؟',
      items: [
        {
          title: 'تصنيع محلي بمعايير عالمية',
          desc: 'إنتاج وطني في الرياض يوفر عليك عناء الاستيراد وتكاليف الشحن المعقدة، مع ضمان الامتثال لأعلى المواصفات السعودية والعالمية.',
        },
        {
          title: 'مرونة استثنائية في حجم الإنتاج',
          desc: 'جاهزية وسرعة لتلبية تطلعاتك، سواء بدأت بدفعات تجريبية محدودة لاختبار السوق، أو تتوسع نحو خطوط إنتاج ضخمة.',
        },
        {
          title: 'تنوع تصنيعي شامل (45 فئة)',
          desc: 'محفظة واسعة تضم كافة أنواع وفئات منتجات العناية والتجميل تحت سقف واحد.',
        },
        {
          title: 'دعم متكامل من الفكرة حتى الرف',
          desc: 'نرافقك خطوة بخطوة: من الفكرة لتطوير المنتج واختيار الهوية العطرية والبصرية والقوام، مع تجهيز التعبئة والتغليف للانطلاق بثقة.',
        },
        {
          title: 'الامتثال التنظيمي المعتمد',
          desc: 'جميع عملياتنا ومنتجاتنا مسجلة ومطابقة تماماً لاشتراطات الهيئة العامة للغذاء والدواء (SFDA) وأنظمة ISO العالمية.',
        },
        {
          title: 'تسهيل التصدير',
          desc: 'المساعدة والمساندة في توفير واستخراج كافة التصاريح اللازمة للتصدير الدولي.',
        },
        {
          title: 'أسعار تنافسية',
          desc: 'أسعار مناسبة لجميع الأسواق العالمية ولسهولة الوصول لجميع العملاء والفئات التنافسية.',
        },
      ],
      banner: 'شريك تصنيع واحد، لكل ما تحتاجه علامتك التجارية',
    },
    certifications: {
      eyebrow: 'شهاداتنا واعتماداتنا',
      title: 'معايير الجودة والاعتمادات الرسمية',
      badges: [
        {
          title: 'ترخيص الغذاء والدواء (SFDA)',
          desc: 'منشأة مسجلة ومصنعة وفق كافة الشروط والمواصفات الفنية المعتمدة من الهيئة العامة للغذاء والدواء.',
        },
        {
          title: 'الترخيص الصناعي الرسمي',
          desc: 'رقم (441101122756) الصادر من وزارة الصناعة والثروة المعدنية.',
        },
        {
          title: 'شهادة ISO 9001:2015',
          desc: 'نظام إدارة الجودة المعتمد عالمياً في خطوط الإنتاج والإدارة.',
        },
        {
          title: 'شهادة ISO 14001:2015',
          desc: 'نظام الإدارة البيئية المعتمد للحد من المخلفات والتصنيع النظيف.',
        },
        {
          title: 'شهادة ISO 45001:2018',
          desc: 'نظام إدارة الصحة والسلامة المهنية لكافة الكوادر الفنية.',
        },
        {
          title: 'اعتماد (صناعة سعودية)',
          desc: 'عضوية رسمية تجسد فخر التصنيع الوطني عالي الجودة.',
        },
      ],
      qc: {
        title: 'منظومة ضبط الجودة (QC)',
        desc: 'فحوصات مخبرية دقيقة للمواد الخام، الرقابة البينية أثناء الإنتاج، والتحاليل الميكروبيولوجية لمنتج التشغيلة النهائي لضمان أعلى مستويات الأمان والسلامة.',
      },
      stats: [
        { target: 50, label: 'عميل وعلامة تجارية' },
        { target: 350000, label: 'منتج خلال عام واحد' },
        { target: 10, label: 'سنوات خبرة في التصنيع' },
      ],
    },
    about: {
      eyebrow: 'من نحن',
      title: 'الهوية والنشأة',
      paragraphs: [
        'مصنع أول حلم لتصنيع مستحضرات التجميل صرح صناعي سعودي متخصص في تطوير وتصنيع كافة منتجات العناية بالبشرة والشعر والجسم، بموجب الترخيص الصناعي رقم 441101122756.',
        'تأسس المصنع ليكون رافداً صناعياً متميزاً يواكب رؤية المملكة 2030 في توطين الصناعات الدقيقة والارتقاء بالجودة السعودية لتنافس عالمياً. نجمع بين المواد الطبيعية المستخلصة من أنقى المصادر (كالزيوت المعصورة على البارد والنباتات العطرية) وبين الدقة الكيميائية في التركيب، تحت إشراف نخبة من الكيميائيين والخبراء المتخصصين.',
      ],
      quote: '"نصنع الثقة قبل أن نصنع المنتج"',
      marketsTitle: 'الأسواق التي نخدمها',
      markets: ['السوق السعودي', 'كافة أسواق دول مجلس التعاون الخليجي', 'الأسواق الإقليمية والدولية'],
    },
    vision: {
      vision: {
        title: 'رؤيتنا',
        desc: 'أن نكون الخيار الأول والشريك الصناعي الأبرز للعلامات التجارية في مجال التجميل والعناية الشخصية بالمنطقة.',
      },
      mission: {
        title: 'رسالتنا',
        desc: 'تمكين أصحاب العلامات التجارية والمستثمرين من تحويل رؤاهم إلى منتجات واقعية فاخرة، مطابقة لأعلى المعايير التنظيمية.',
      },
      valuesTitle: 'قيمنا المؤسسية',
      values: [
        { title: 'الأمانة والجودة', desc: 'لا مساومة في سلامة ونقاء المواد الخام والمنتجات النهائية.' },
        { title: 'الابتكار المستمر', desc: 'مواكبة أحدث التقنيات والعلوم التجميلية.' },
        { title: 'المرونة والتمكين', desc: 'دعم كافة أحجام الأعمال، إضافة إلى الالتزام بالاستدامة البيئية.' },
      ],
    },
    infrastructure: {
      eyebrow: 'مرافق المصنع',
      title: 'البنية التحتية ومرافق المصنع',
      intro:
        'تم إعداد وتجهيز مصنع أول حلم وفق أعلى المعايير الهندسية والصناعية لضمان إنتاج آمن وبيئة تصنيع معقمة ومحفزة على الإبداع.',
      items: [
        { title: 'صالة الإنتاج الرئيسية', desc: 'مجهزة بأحدث خطوط الخلط والتجنيس الآلية المصنوعة من الستانلس ستيل المعقم.' },
        { title: 'قسم المختبرات وضبط الجودة', desc: 'مختبر مجهز بأحدث الأجهزة الكيميائية والميكروبيولوجية لفحص المنتجات.' },
        {
          title: 'المستودعات والمخازن',
          desc: 'مستودعات مكيفة ومسيطر على حرارتها وفق اشتراطات SFDA لحفظ سلامة المواد والمستحضرات.',
        },
      ],
    },
    aboutTeaser: {
      eyebrow: 'من نحن',
      title: 'شريكك الصناعي الموثوق',
      lead: 'في سوق التجميل والعناية الشخصية المتسارع، لم تعد الجودة مجرد خيار، بل هي الأساس الذي تُبنى عليه العلامات التجارية الناجحة.',
      paragraph:
        'مصنع أول حلم لتصنيع مستحضرات التجميل صرح صناعي سعودي متخصص في تطوير وتصنيع كافة منتجات العناية بالبشرة والشعر والجسم، بموجب الترخيص الصناعي رقم 441101122756.',
      cta: 'تعرّف علينا أكثر',
      imageAlt: 'عبوة بمضخة من تشكيلة عبوات مصنع أول حلم',
    },
    services: {
      eyebrow: 'رحلة الشراكة',
      title: 'من الفكرة حتى الرف',
      desc: 'نرافقك خطوة بخطوة: من الفكرة لتطوير المنتج واختيار الهوية العطرية والبصرية والقوام، مع تجهيز التعبئة والتغليف للانطلاق بثقة.',
      items: [
        {
          tag: 'Concept',
          title: 'الفكرة والتخطيط',
          desc: 'جلسة استكشافية لفهم هوية براندك، شريحة الجمهور المستهدف، والميزانية المحددة.',
        },
        {
          tag: 'Product Selection',
          title: 'تحديد المنتج',
          desc: 'اختيار نوع المنتج والقوام والمكونات النشطة من قائمة الكتالوج أو تطوير تركيبة جديدة.',
        },
        {
          tag: 'Sampling',
          title: 'العينات والتجربة',
          desc: 'إعداد عينات أولية لاختبار القوام والرائحة والفاعلية وتعديلها حتى الوصول للنتيجة المثالية.',
        },
        {
          tag: 'Packaging',
          title: 'التعبئة والتغليف',
          desc: 'مساعدتكم في اختيار العبوات المناسبة وتنسيق وتصميم الملصقات المخصصة.',
        },
        {
          tag: 'Approval',
          title: 'التسجيل والاعتماد',
          desc: 'إعداد الملفات الفنية وتسجيل المنتج رسمياً لدى الهيئة العامة للغذاء والدواء (SFDA).',
        },
        {
          tag: 'Manufacturing',
          title: 'التصنيع والإنتاج',
          desc: 'بدء عمليات الإنتاج الفعلي والتعبئة تحت رقابة فريق الجودة المباشرة.',
        },
        {
          tag: 'Delivery',
          title: 'التسليم والانطلاق',
          desc: 'تجهيز الشحنة النهائية وتسليمها لمستودعاتكم جاهزة للبيع في الأسواق.',
        },
      ],
    },
    manufacturing: {
      eyebrow: 'نماذج التعاون',
      title: 'خدمات التصنيع للغير',
      models: [
        {
          code: 'OEM',
          name: 'Original Equipment Manufacturing',
          desc: 'تصنيع منتجاتك وفق تركيباتك ومواصفاتك الخاصة المعتمدة.',
        },
        {
          code: 'ODM',
          name: 'Original Design Manufacturing',
          desc: 'تطوير كامل للمنتج من صياغة التركيبة واختيار العبوة وتصميم الهوية حتى المنتج النهائي.',
        },
        {
          code: 'PRIVATE LABEL',
          name: 'منتجات جاهزة باسم علامتك',
          desc: 'اختيار منتجات ممتازة ومجربة من قائمة مصنعنا المعتمدة وإطلاقها فوراً باسم علامتكم التجارية.',
        },
      ],
      lines: {
        title: 'خطوط الصناعة والتعبئة المتطورة',
        desc: 'خلاطات ستانلس ستيل مخصصة تضمن تجنيس القوام دون فقاعات، وخطوط تعبئة آلية معقمة تحافظ على نقاء المنتجات وثبات الجودة.',
      },
      export: {
        title: 'الأوراق النظامية للتصدير الدولي',
        items: [
          'استخراج ملفات تعريف المنتج (PIF)',
          'شهادات التحليل المخبري المعتمدة (COA) والفحوصات الميكروبيولوجية',
          'شهادات حرية البيع (Free Sale Certificate) لتسهيل التسجيل دولياً',
        ],
      },
    },
    rnd: {
      eyebrow: 'R&D',
      title: 'مركز الأبحاث والتطوير',
      intro:
        'يمثل مركز الأبحاث والتطوير (R&D) القلب النابض لعملياتنا الصناعية، حيث يعمل فريقنا من خبراء الكيمياء التجميلية على ابتكار مستحضرات تجمع بين الفاعلية والقيمة السوقية المرغوبة.',
      items: [
        {
          title: 'صياغة التركيبات المخصصة',
          desc: 'ابتكار حصري لتركيبات فريدة تشمل المكونات النشطة المعتمدة علمياً لعلامتك التجارية.',
        },
        {
          title: 'تعديل وتطوير التركيبات',
          desc: 'تعديل القوام والرائحة والزيوت والمستخلصات والفيتامينات حسب طلبك واحتياجات شريحة عملائك.',
        },
        {
          title: 'الهندسة والتصميم العطري',
          desc: 'دمج وثبات الزيوت العطرية العالية التركيز وفق معايير الجمعية الدولية للعطور (IFRA).',
        },
        {
          title: 'اختبارات الثبات والأمان',
          desc: 'خضوع كافة التركيبات لاختبارات متقدمة تضمن استقرار القوام واللون والرائحة تحت مختلف ظروف الحرارة والضغط.',
        },
      ],
      imageAlt: 'عبوة سيروم بقطارة من تشكيلة مصنع أول حلم',
    },
    packagingSolutions: {
      eyebrow: 'التعبئة والتغليف',
      title: 'حلول التعبئة والتغليف',
      items: AR_PACKAGING,
    },
    catalog: {
      eyebrow: 'منتجاتنا',
      title: 'كتالوج المنتجات الشامل',
      desc: '45 فئة تصنيعية معتمدة في خطوط الإنتاج، تحت سقف واحد',
      count: 45,
      countLabel: 'فئة تصنيعية',
      cta: 'تصفّح الكتالوج كاملاً',
      itemsLabel: (n) => `${n} ${n >= 3 && n <= 10 ? 'فئات' : 'فئة'}`,
      groups: [
        {
          id: 'skin',
          title: 'العناية بالبشرة',
          items: [
            { n: '01', title: 'كريمات ولوشن الترطيب', desc: 'تركيبات غنية تمنح البشرة ترطيباً عميقاً وملمساً مخملياً.' },
            { n: '02', title: 'كريمات التفتيح وتوحيد اللون', desc: 'مدعمة بمستخلصات طبيعية ومواد آمنة لتقليل التصبغات.' },
            { n: '03', title: 'كريمات التوريد', desc: 'تمنح الوجه والجسم إشراقة وملمساً وردياً لطيفاً ومظهراً صحياً.' },
            { n: '04', title: 'أقنعة الوجه (كريمي / جل)', desc: 'أقنعة مغذية ومطهرة تعمل على تنظيف المسام وتجديد الخلايا.' },
            { n: '05', title: 'مقشرات الجسم والوجه', desc: 'حبيبات دقيقة وطبيعية تضمن تقشيراً ناعماً وتزيل الخلايا الميتة برفق.' },
            { n: '06', title: 'سيرومات الوجه المركّزة', desc: 'تركيبات غنية بالهيالورونيك والفيتامينات لنتائج سريعة وملموسة.' },
            { n: '07', title: 'غسول البشرة الدهنية', desc: 'تنظيف متوازن يزيل الدهون الزائدة ويحافظ على الرطوبة الطبيعية.' },
            { n: '08', title: 'غسول البشرة الجافة والحساسة', desc: 'تنظيف لطيف جداً مدعم بمرطبات تهدئ البشرة.' },
          ],
        },
        {
          id: 'body',
          title: 'العناية بالجسم',
          items: [
            { n: '09', title: 'زيوت ترطيب البشرة العطرية', desc: 'زيوت طبيعية معصورة على البارد معطرة بنسب متوازنة.' },
            { n: '10', title: 'غسول المناطق الحساسة', desc: 'تركيبة لطيفة ومتوازنة الحامضية (pH Balanced) للعناية اليومية.' },
            { n: '11', title: 'معطرات الجسم والشعر', desc: 'رذاذ عطري خفيف (Mist) يدوم طويلاً وينعش الحواس.' },
            { n: '12', title: 'بودرة الجسم العطرية الفاخرة', desc: 'بودرة فائقة النعومة معززة بروائح عطرية ثابتة.' },
          ],
        },
        {
          id: 'relax',
          title: 'طقوس الاسترخاء والحمام',
          items: [
            { n: '13', title: 'بودرة الاستحمام الفوارة', desc: 'تجربة حمام فوارة ومنعشة مع زبدة الترطيب والزيوت العطرية.' },
            { n: '14', title: 'سبراي الاسترخاء ورذاذ النوم', desc: 'بخاخ معزز بالزيوت المهدئة (كاللافندر) يرش على المفارش لنوم مريح.' },
            { n: '15', title: 'أملاح الاسترخاء واستشفاء العضلات', desc: 'أملاح معدنية طبيعية تساعد على استرخاء الجسد وتجديد الطاقة.' },
            { n: '16', title: 'المياه المرجانية للاستحمام', desc: 'تركيبة فريدة تعيد للبشرة توازنها وحيويتها أثناء الاستحمام.' },
            { n: '17', title: 'زيوت المساج والتدليك', desc: 'زيوت انسيابية تساعد على تخفيف الإجهاد العضلي وتغذية الجلد.' },
            { n: '18', title: 'صابون الجسم المرطب السائل', desc: 'رغوة غنية وتنظيف فاخر يترك الجسم معطراً ومرطباً.' },
            { n: '19', title: 'صابون اليدين المرطب والمغذي', desc: 'تنظيف يومي متكرر يحافظ على نعومة اليدين دون جفاف.' },
            { n: '20', title: 'التبريمة والصقلة والصابون المغربي', desc: 'منتجات مستوحاة من طقوس الحمام الأصيلة بتركيبات بلدية فاخرة.' },
          ],
        },
        {
          id: 'shower',
          title: 'الشاور والعطور',
          items: [
            { n: '21', title: 'العطر الصلب (Solid Perfume)', desc: 'تركيبة شمعية عطرية فاخرة تثبت على النبض وتدوم طويلاً.' },
            { n: '22', title: 'شاور جل الاستحمام المنعش', desc: 'تنظيف عميق برغوة كثيفة وعطور فواحة يناسب العائلة.' },
            { n: '23', title: 'تونر شد الوجه وتقليص المسام', desc: 'ينظم إفراز الدهون ويشد البشرة لمظهر مشرق.' },
            { n: '24', title: 'تونر ترطيب وانتعاش البشرة', desc: 'خطوة عناية يومية تعيد الحيوية للبشرة المجهدة.' },
          ],
        },
        {
          id: 'hair',
          title: 'العناية بالشعر',
          items: [
            { n: '25', title: 'أقنعة الشعر المغذية', desc: 'زيوت وبودرة طبيعية ترمم الشعر التالف وتمنحه القوة واللمعان.' },
            { n: '26', title: 'شامبوهات الكبار والأطفال', desc: 'تركيبات خالية من المواد القاسية (خالية من السلفات) وآمنة تماماً.' },
            { n: '27', title: 'بلسم الشعر للكبار والأطفال', desc: 'فك تشابك فوري وترطيب يدوم لتسهيل التصفيف.' },
            { n: '28', title: 'شامبوهات 2 في 1 للرجال', desc: 'حل عملي يجمع بين التنظيف والترطيب الشامل للشعر والفروة.' },
            { n: '29', title: 'شامبوهات الشعر المعالج', desc: 'مخصصة للشعر المصبوغ أو المعالج بالكيراتين والبروتين.' },
            { n: '30', title: 'شامبو الديتوكس للفروة', desc: 'لتنظيف فروة الرأس من الترسبات والزيوت الزائدة تنظيفاً عميقاً.' },
            { n: '31', title: 'كريمات ترطيب وتنعيم الشعر', desc: 'تغذية خفيفة تمنع هيشان الشعر دون إثقال.' },
            { n: '32', title: 'سبراي فك تشابك الشعر', desc: 'بخاخ خفيف يسهل تمشيط شعر الأطفال والكبار دون ألم.' },
            { n: '33', title: 'معالجات الشعر المتقدمة', desc: 'سيرومات مرممة لأطراف الشعر والتلف الحراري والتقصف.' },
            { n: '34', title: 'كريمات التصفيف الطبيعية', desc: 'تمنح الثبات والنعومة وتساعد على تشكيل الشعر بأسلوب طبيعي.' },
            { n: '35', title: 'سيرومات اللمعان والحماية', desc: 'حماية ضد حرارة التصفيف ولمعان حريري وبراق.' },
            { n: '36', title: 'زيوت تكثيف الشعر واللحية', desc: 'زيوت غنية بالفيتامينات لتحفيز البصيلات وتكثيف الشعر.' },
          ],
        },
        {
          id: 'tan',
          title: 'التان والجمال والمكياج',
          items: [
            { n: '37–39', title: 'منتجات التان (زيت / بخاخ / كريم)', desc: 'إشراقة برونزية دافئة وجذابة مع ترطيب متوازن للبشرة.' },
            { n: '40–42', title: 'مرطب شفايف / بلاشر / قلوس', desc: 'زبدة مغذية، أحمر خدود كريمي، ولمعة شفافة براقة.' },
            { n: '43–45', title: 'واقيات الشمس والزيوت المركّزة', desc: 'حماية SPF 30 و SPF 50 وزيوت عطرية عالية التركيز للبراندات.' },
          ],
        },
      ],
    },
    ctaBanner: {
      title: 'هل أنت جاهز لإطلاق علامتك التجارية في عالم التجميل أو التوسع بمنتجات فاخرة تصنع فارقاً حقيقياً في السوق؟',
      desc: 'نحن في مصنع أول حلم نسعد باستقبال استفساراتكم وبدء خطوة الشراكة الأولى معكم.',
      cta: 'احجز موعدك الآن',
    },
    contact: {
      eyebrow: 'تواصل معنا',
      title: 'شريكك الصناعي الموثوق',
      desc: 'نحن في مصنع أول حلم نسعد باستقبال استفساراتكم وبدء خطوة الشراكة الأولى معكم.',
      whatsappLabel: 'راسلنا عبر واتساب',
      addressLabel: 'المقر',
      address: 'حي المشاعل، مدينة الرياض، المملكة العربية السعودية',
      storeLabel: 'المتجر الإلكتروني',
      licenseLabel: 'الترخيص الصناعي',
      form: {
        name: 'الاسم الثلاثي',
        namePlaceholder: 'مثال: عبدالله محمد العتيبي',
        phone: 'رقم الجوال',
        phonePlaceholder: '05XXXXXXXX',
        brand: 'اسم العلامة التجارية (اختياري)',
        brandPlaceholder: 'اسم علامتك التجارية إن وُجد',
        message: 'رسالتك',
        messagePlaceholder: 'أخبرنا عن فكرتك أو منتجك...',
        submit: 'إرسال الطلب',
        submitting: 'جارِ الإرسال...',
        success: 'تم استلام رسالتك بنجاح، سنتواصل معك قريباً.',
        error: 'حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.',
      },
      email: {
        subjectPrefix: 'طلب استشارة من',
        subjectFallback: 'زائر الموقع',
        name: 'الاسم',
        brand: 'اسم العلامة التجارية',
        phone: 'رقم الجوال',
        message: 'الرسالة',
      },
    },
    footer: {
      tagline: 'مصنع أول حلم لتصنيع مستحضرات التجميل — حيث تتلاقى الطبيعة مع العلم. شريكك الصناعي الموثوق.',
      quickLinks: 'روابط سريعة',
      factoryInfo: 'معلومات المصنع',
      followUs: 'تابعنا',
      license: 'الترخيص الصناعي',
      cr: 'السجل التجاري',
      taxNumber: 'الرقم الضريبي',
      address: 'حي المشاعل، الرياض',
      copyright: (year) => `© ${year} مصنع أول حلم لتصنيع مستحضرات التجميل. جميع الحقوق محفوظة.`,
      madeWith: 'صُنع بفخر لدعم الصناعة الوطنية',
      privacyLink: 'سياسة الخصوصية',
    },
    pages: {
      services: {
        eyebrow: 'خدماتنا',
        title: 'قدرات التصنيع والحلول الشاملة',
        description: 'شريك تصنيع واحد، لكل ما تحتاجه علامتك التجارية.',
      },
      products: {
        eyebrow: 'منتجاتنا',
        title: 'كتالوج المنتجات الشامل',
        description: '45 فئة تصنيعية معتمدة في خطوط الإنتاج، تحت سقف واحد',
      },
      about: {
        eyebrow: 'من نحن',
        title: 'مصنع أول حلم',
        description:
          'في سوق التجميل والعناية الشخصية المتسارع، لم تعد الجودة مجرد خيار، بل هي الأساس الذي تُبنى عليه العلامات التجارية الناجحة.',
      },
      contact: {
        eyebrow: 'تواصل معنا',
        title: 'التواصل وبدء الشراكة',
        description:
          'هل أنت جاهز لإطلاق علامتك التجارية في عالم التجميل أو التوسع بمنتجات فاخرة تصنع فارقاً حقيقياً في السوق؟',
      },
      booking: {
        eyebrow: 'حجز موعد',
        title: 'احجز استشارتك المجانية',
        description: 'خطوات بسيطة لتحديد موعدك مع فريق مصنع أول حلم لمناقشة فكرة منتجك.',
      },
      notFound: {
        code: '404',
        title: 'الصفحة غير موجودة',
        description: 'يبدو أن الرابط الذي تبحث عنه غير متوفر.',
        cta: 'العودة للرئيسية',
      },
      privacy: {
        eyebrow: 'الخصوصية والثقة',
        title: 'بياناتك أمانة عندنا',
        description: 'قبل ما نصنع منتجك، نصنع الثقة — وهذا ينطبق على بياناتك بنفس القدر.',
      },
    },
    privacy: {
      updated: 'آخر تحديث: أغسطس 2026',
      intro:
        'في مصنع أول حلم، نؤمن أن الثقة تُبنى قبل أن يُصنع المنتج — ونفس المبدأ ينطبق تماماً على بياناتك. هذه الصفحة ليست نصاً قانونياً جامداً، بل شرح صريح وبسيط لكيفية تعاملنا مع أي معلومة تشاركها معنا.',
      sections: [
        {
          title: 'ما الذي نجمعه',
          body: 'نجمع فقط ما تشاركه معنا مباشرة: اسمك، رقم جوالك، بريدك الإلكتروني (إن قدّمته)، اسم علامتك التجارية، وتفاصيل طلب الحجز أو الاستشارة. لا نجمع بيانات دفع أو معلومات حساسة لا علاقة لها بخدمتنا.',
        },
        {
          title: 'كيف نستخدمها',
          body: 'نستخدم بياناتك حصراً للتواصل معك بخصوص طلبك، تأكيد موعدك، والرد على استفساراتك. لا نستخدمها لأي غرض تسويقي لم توافق عليه، ولا نبيعها لأي جهة على الإطلاق.',
        },
        {
          title: 'كيف نحميها',
          body: 'يصل إلى بياناتك فريق محدود ومخوّل داخل مصنع أول حلم فقط، ونحرص على تخزينها بطريقة آمنة وحذفها عند انتهاء الغرض منها.',
        },
        {
          title: 'هل نشاركها مع أحد؟',
          body: 'لا نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية. قد نستعين بخدمات تقنية موثوقة (مثل خدمة إرسال البريد أو استضافة الموقع) لتشغيل الموقع فقط، وبأقل قدر ممكن من البيانات.',
        },
        {
          title: 'ملفات تعريف الارتباط',
          body: 'نستخدم فقط ملفات تعريف ارتباط أساسية لحفظ تفضيلاتك (مثل اللغة والوضع الليلي) على جهازك، ولا نستخدم أي تتبع إعلاني.',
        },
        {
          title: 'حقوقك',
          body: 'يحق لك في أي وقت أن تطلب معرفة البيانات التي نحتفظ بها عنك، أو تعديلها، أو حذفها بالكامل — فقط راسلنا وسنستجيب خلال أيام قليلة.',
        },
        {
          title: 'مدة الاحتفاظ بالبيانات',
          body: 'نحتفظ بمعلومات طلبك للمدة اللازمة لإتمام الخدمة والمتابعة معك فقط، ثم نتخلص منها بشكل آمن ما لم يطلب القانون خلاف ذلك.',
        },
        {
          title: 'تواصل معنا',
          body: 'لأي استفسار متعلق بخصوصيتك أو بياناتك، راسلنا مباشرة على info@firstdream1.com وسنكون سعداء بالرد.',
        },
      ],
    },
    booking: {
      steps: ['نوع العناية', 'العبوة', 'الموعد', 'بياناتك', 'التأكيد'],
      nav: { back: 'رجوع', next: 'التالي', submit: 'إرسال طلب الحجز', submitting: 'جارِ الإرسال...' },
      submitError: 'حدث خطأ أثناء إرسال طلبك، يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.',
      service: {
        heading: 'ما نوع العناية التي تحتاجها؟',
        subheading: 'اختر التصنيف الأقرب لفكرتك من كتالوج منتجاتنا، يمكنك توضيح التفاصيل لاحقاً',
        options: [
          { id: 'skin', title: 'العناية بالبشرة', desc: 'كريمات الترطيب والتفتيح، السيرومات، الأقنعة، المقشرات والغسول' },
          { id: 'body', title: 'العناية بالجسم', desc: 'الزيوت العطرية، غسول المناطق الحساسة، المعطرات والبودرة' },
          { id: 'relax', title: 'طقوس الاسترخاء والحمام', desc: 'الأملاح، بودرة الاستحمام الفوارة، زيوت المساج، الصابون والتبريمة والصقلة' },
          { id: 'shower', title: 'الشاور والعطور', desc: 'العطر الصلب، شاور جل الاستحمام، وتونر الوجه' },
          { id: 'hair', title: 'العناية بالشعر', desc: 'الشامبو والبلسم، الأقنعة، السيرومات وزيوت التكثيف' },
          { id: 'tan', title: 'التان والجمال والمكياج', desc: 'منتجات التان، مرطب الشفايف والبلاشر والقلوس، وواقيات الشمس' },
        ],
      },
      packaging: {
        heading: 'اختر العبوة المناسبة لمنتجك',
        subheading: 'اختر الشكل الأقرب لتصورك، يمكن تعديله لاحقاً مع فريقنا',
        options: AR_PACKAGING.filter((p) => BOOKING_PACKAGING_IDS.includes(p.id)),
      },
      dateTime: {
        heading: 'اختر الموعد المناسب',
        subheading: 'نعمل من السبت إلى الخميس، وسنؤكد الموعد معك خلال 24 ساعة',
        timeLabel: 'الوقت المناسب',
        emptyState: 'اختر تاريخاً أولاً لعرض الأوقات المتاحة',
        timeSlots: ['10:00 ص', '11:00 ص', '12:00 م', '01:00 م', '02:00 م', '04:00 م', '05:00 م'],
      },
      details: {
        heading: 'بياناتك ومرفقاتك',
        subheading: 'سنستخدمها للتواصل معك وتأكيد الموعد',
        name: 'الاسم الثلاثي',
        namePlaceholder: 'مثال: عبدالله محمد العتيبي',
        phone: 'رقم الجوال',
        phonePlaceholder: '05XXXXXXXX',
        brand: 'اسم العلامة التجارية (اختياري)',
        brandPlaceholder: 'اسم علامتك التجارية إن وُجد',
        email: 'البريد الإلكتروني (اختياري)',
        emailPlaceholder: 'example@email.com',
        notes: 'ملاحظات (اختياري)',
        notesPlaceholder: 'أخبرنا المزيد عن فكرتك أو منتجك...',
        logoLabel: 'شعارك (اختياري)',
        logoHint: 'PNG, JPG أو PDF',
        designLabel: 'تصاميم أو مرجع للعبوة (اختياري)',
        designHint: 'يمكنك اختيار أكثر من ملف',
        disclaimer:
          'ملاحظة: هذا النموذج لا يرفع الملفات مباشرة إلى خوادمنا — سنعرض أسماءها فقط ضمن طلبك، ويرجى إرفاقها فعلياً عند الرد على رسالة التأكيد التي سنرسلها لك، أو عبر واتساب.',
      },
      review: {
        title: 'مراجعة الطلب',
        subtitle: 'تأكد من بياناتك قبل الإرسال، سنتواصل معك لتأكيد الموعد نهائياً',
        service: 'نوع العناية',
        packaging: 'نوع العبوة',
        date: 'التاريخ',
        time: 'الوقت',
        name: 'الاسم الثلاثي',
        brand: 'اسم العلامة التجارية',
        phone: 'رقم الجوال',
        notes: 'ملاحظات',
        attachments: 'المرفقات المختارة',
        disclaimer: 'هذا طلب حجز موعد استشارة، وليس تأكيداً نهائياً — سيتواصل معك فريقنا لتثبيت الموعد',
        disclaimerAttachments: '، ولا تنسَ إرفاق ملفاتك عند الرد على رسالتنا أو عبر واتساب',
        empty: '—',
      },
      success: {
        title: 'تم إرسال طلبك بنجاح',
        desc: 'شكراً لتواصلك مع مصنع أول حلم. سيقوم فريقنا بمراجعة طلبك والتواصل معك خلال 24 ساعة لتأكيد موعدك النهائي.',
        cta: 'العودة للرئيسية',
      },
      email: {
        subjectPrefix: 'طلب حجز موعد من',
        service: 'نوع العناية',
        packaging: 'نوع العبوة',
        date: 'التاريخ',
        time: 'الوقت',
        name: 'الاسم',
        brand: 'اسم العلامة التجارية',
        phone: 'رقم الجوال',
        email: 'البريد الإلكتروني',
        notes: 'ملاحظات',
        attachments: 'ملفات سيتم إرفاقها من العميل',
      },
    },
    fileDrop: {
      pickFiles: 'اضغط لاختيار ملفات',
      pickFile: 'اضغط لاختيار ملف',
      removeFile: 'إزالة الملف',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      products: 'Products',
      about: 'About Us',
      contact: 'Contact',
      bookNow: 'Book Now',
      openMenu: 'Open menu',
    },
    theme: {
      toggleToDark: 'Switch to dark mode',
      toggleToLight: 'Switch to light mode',
    },
    lang: {
      switchTo: 'العربية',
    },
    hero: {
      badge: 'Where Nature Meets Science',
      titleLine1: 'Awal Helm Factory',
      titleLine2: 'for Cosmetics Manufacturing',
      subtitle:
        'At Awal Helm Factory, from the heart of Riyadh, we offer beauty investors a national manufacturing partner with scientific know-how, modern infrastructure, and an absolute commitment to international standards.',
      ctaBook: 'Book a Free Appointment',
      ctaServices: 'Explore Our Services',
      floatingTitle: 'SFDA Licensed',
      floatingDesc: 'Saudi Food & Drug Authority',
      imageAlt: 'An unbranded cream jar and packaging box, ready for your brand identity',
    },
    whyUs: {
      eyebrow: 'Why Us',
      title: 'Why Choose Awal Helm Factory?',
      items: [
        {
          title: 'Local Manufacturing, Global Standards',
          desc: 'National production in Riyadh that spares you the hassle of importing and complex shipping costs, while guaranteeing compliance with the highest Saudi and international specifications.',
        },
        {
          title: 'Exceptional Production Flexibility',
          desc: 'Ready and fast to meet your ambitions, whether you start with limited trial batches to test the market or scale up to large production lines.',
        },
        {
          title: 'A Comprehensive Range (45 Categories)',
          desc: 'A broad portfolio covering every type and category of care and beauty products under one roof.',
        },
        {
          title: 'End-to-End Support, From Idea to Shelf',
          desc: 'We walk with you step by step: from the idea to product development, choosing the fragrance, visual identity and texture, to preparing the packaging for a confident launch.',
        },
        {
          title: 'Certified Regulatory Compliance',
          desc: 'All our operations and products are registered and fully compliant with Saudi Food & Drug Authority (SFDA) requirements and international ISO systems.',
        },
        {
          title: 'Export Facilitation',
          desc: 'Assistance and support in obtaining all the permits required for international export.',
        },
        {
          title: 'Competitive Pricing',
          desc: 'Prices suited to all global markets, so every client and competitive segment can access them easily.',
        },
      ],
      banner: 'One manufacturing partner for everything your brand needs',
    },
    certifications: {
      eyebrow: 'Certifications & Accreditations',
      title: 'Quality Standards & Official Accreditations',
      badges: [
        {
          title: 'SFDA License',
          desc: 'A registered facility manufacturing in line with all the technical requirements and specifications approved by the Saudi Food & Drug Authority.',
        },
        {
          title: 'Official Industrial License',
          desc: 'No. (441101122756), issued by the Ministry of Industry and Mineral Resources.',
        },
        {
          title: 'ISO 9001:2015',
          desc: 'An internationally certified quality management system across production and administration.',
        },
        {
          title: 'ISO 14001:2015',
          desc: 'A certified environmental management system for reduced waste and clean manufacturing.',
        },
        {
          title: 'ISO 45001:2018',
          desc: 'An occupational health and safety management system covering all technical staff.',
        },
        {
          title: 'Saudi Made Accreditation',
          desc: 'Official membership embodying the pride of high-quality national manufacturing.',
        },
      ],
      qc: {
        title: 'Quality Control (QC) System',
        desc: 'Precise lab testing of raw materials, in-process control during production, and microbiological analysis of every finished batch to ensure the highest levels of safety.',
      },
      stats: [
        { target: 50, label: 'Clients & brands' },
        { target: 350000, label: 'Products in one year' },
        { target: 10, label: 'Years of manufacturing experience' },
      ],
    },
    about: {
      eyebrow: 'About Us',
      title: 'Identity & Origins',
      paragraphs: [
        'Awal Helm Factory for Cosmetics Manufacturing is a Saudi industrial facility specialized in developing and manufacturing all skin, hair, and body care products, under Industrial License No. 441101122756.',
        'The factory was founded as a distinguished industrial contributor aligned with Saudi Vision 2030 in localizing precision industries and elevating Saudi quality to compete globally. We combine natural ingredients sourced from the purest origins (such as cold-pressed oils and aromatic botanicals) with chemical precision in formulation, under the supervision of a select team of chemists and specialists.',
      ],
      quote: '"We build trust before we build the product"',
      marketsTitle: 'Markets We Serve',
      markets: ['The Saudi market', 'All GCC markets', 'Regional and international markets'],
    },
    vision: {
      vision: {
        title: 'Our Vision',
        desc: 'To be the first choice and the leading industrial partner for beauty and personal care brands in the region.',
      },
      mission: {
        title: 'Our Mission',
        desc: 'Empowering brand owners and investors to turn their visions into real, premium products that meet the highest regulatory standards.',
      },
      valuesTitle: 'Our Corporate Values',
      values: [
        { title: 'Integrity & Quality', desc: 'No compromise on the safety and purity of raw materials and finished products.' },
        { title: 'Continuous Innovation', desc: 'Keeping pace with the latest cosmetic technologies and science.' },
        {
          title: 'Flexibility & Empowerment',
          desc: 'Supporting businesses of every size, with a firm commitment to environmental sustainability.',
        },
      ],
    },
    infrastructure: {
      eyebrow: 'Our Facilities',
      title: 'Infrastructure & Factory Facilities',
      intro:
        'Awal Helm Factory was built and equipped to the highest engineering and industrial standards, ensuring safe production in a sterile manufacturing environment that encourages creativity.',
      items: [
        {
          title: 'Main Production Hall',
          desc: 'Equipped with the latest automated mixing and homogenizing lines made of sterilized stainless steel.',
        },
        {
          title: 'Laboratories & Quality Control',
          desc: 'A lab equipped with the latest chemical and microbiological instruments for product testing.',
        },
        {
          title: 'Warehouses & Storage',
          desc: 'Air-conditioned, temperature-controlled warehouses that meet SFDA requirements to keep materials and products safe.',
        },
      ],
    },
    aboutTeaser: {
      eyebrow: 'About Us',
      title: 'Your Trusted Industrial Partner',
      lead: 'In the fast-moving beauty and personal care market, quality is no longer optional — it is the foundation successful brands are built on.',
      paragraph:
        'Awal Helm Factory for Cosmetics Manufacturing is a Saudi industrial facility specialized in developing and manufacturing all skin, hair, and body care products, under Industrial License No. 441101122756.',
      cta: 'Learn More About Us',
      imageAlt: 'A pump bottle from the Awal Helm packaging range',
    },
    services: {
      eyebrow: 'Partnership Journey',
      title: 'From Idea to Shelf',
      desc: 'We walk with you step by step: from the idea to product development, choosing the fragrance, visual identity and texture, to preparing the packaging for a confident launch.',
      items: [
        {
          tag: '',
          title: 'Concept & Planning',
          desc: 'A discovery session to understand your brand identity, target audience, and budget.',
        },
        {
          tag: '',
          title: 'Product Selection',
          desc: 'Choosing the product type, texture, and active ingredients from our catalog, or developing a brand-new formula.',
        },
        {
          tag: '',
          title: 'Sampling & Testing',
          desc: 'Preparing initial samples to test texture, scent, and efficacy, refining them until we reach the ideal result.',
        },
        {
          tag: '',
          title: 'Packaging',
          desc: 'Helping you choose the right containers and coordinating and designing your custom labels.',
        },
        {
          tag: '',
          title: 'Registration & Approval',
          desc: 'Preparing the technical files and officially registering the product with the Saudi Food & Drug Authority (SFDA).',
        },
        {
          tag: '',
          title: 'Manufacturing',
          desc: 'Starting actual production and filling under the direct supervision of our quality team.',
        },
        {
          tag: '',
          title: 'Delivery & Launch',
          desc: 'Preparing the final shipment and delivering it to your warehouses, ready for sale in the market.',
        },
      ],
    },
    manufacturing: {
      eyebrow: 'Partnership Models',
      title: 'Contract Manufacturing Services',
      models: [
        {
          code: 'OEM',
          name: 'Original Equipment Manufacturing',
          desc: 'Manufacturing your products according to your own approved formulas and specifications.',
        },
        {
          code: 'ODM',
          name: 'Original Design Manufacturing',
          desc: 'Full product development, from formulating and choosing the packaging to designing the identity and the final product.',
        },
        {
          code: 'PRIVATE LABEL',
          name: 'Ready products under your brand',
          desc: 'Choose excellent, proven products from our approved factory list and launch them right away under your brand name.',
        },
      ],
      lines: {
        title: 'Advanced Manufacturing & Filling Lines',
        desc: 'Custom stainless-steel mixers that homogenize textures without air bubbles, and sterile automated filling lines that preserve product purity and consistent quality.',
      },
      export: {
        title: 'Regulatory Documents for International Export',
        items: [
          'Product Information Files (PIF)',
          'Certified Certificates of Analysis (COA) and microbiological testing',
          'Free Sale Certificates to facilitate international registration',
        ],
      },
    },
    rnd: {
      eyebrow: 'R&D',
      title: 'Research & Development Center',
      intro:
        'Our Research & Development (R&D) center is the beating heart of our industrial operations, where our team of cosmetic chemistry experts creates formulations that combine efficacy with the market value you are looking for.',
      items: [
        {
          title: 'Custom Formulation',
          desc: 'Exclusive, unique formulas for your brand featuring scientifically proven active ingredients.',
        },
        {
          title: 'Formula Modification & Development',
          desc: 'Adjusting texture, scent, oils, extracts, and vitamins to your request and your customers’ needs.',
        },
        {
          title: 'Fragrance Engineering & Design',
          desc: 'Blending and stabilizing high-concentration fragrance oils in line with International Fragrance Association (IFRA) standards.',
        },
        {
          title: 'Stability & Safety Testing',
          desc: 'Every formula undergoes advanced testing to ensure stable texture, color, and scent under varying heat and pressure conditions.',
        },
      ],
      imageAlt: 'A serum dropper bottle from the Awal Helm range',
    },
    packagingSolutions: {
      eyebrow: 'Packaging',
      title: 'Packaging Solutions',
      items: EN_PACKAGING,
    },
    catalog: {
      eyebrow: 'Our Products',
      title: 'Comprehensive Product Catalog',
      desc: '45 certified manufacturing categories on our production lines, under one roof',
      count: 45,
      countLabel: 'manufacturing categories',
      cta: 'Browse the full catalog',
      itemsLabel: (n) => `${n} ${n === 1 ? 'category' : 'categories'}`,
      groups: [
        {
          id: 'skin',
          title: 'Skincare',
          items: [
            { n: '01', title: 'Moisturizing Creams & Lotions', desc: 'Rich formulas that deeply hydrate and leave skin velvety soft.' },
            { n: '02', title: 'Brightening & Even-Tone Creams', desc: 'Enriched with natural extracts and safe ingredients to reduce pigmentation.' },
            { n: '03', title: 'Rosy Glow Creams', desc: 'Give the face and body radiance, a soft rosy touch, and a healthy look.' },
            { n: '04', title: 'Face Masks (Cream / Gel)', desc: 'Nourishing, purifying masks that clean pores and renew cells.' },
            { n: '05', title: 'Body & Face Scrubs', desc: 'Fine natural granules for gentle exfoliation that softly removes dead cells.' },
            { n: '06', title: 'Concentrated Face Serums', desc: 'Formulas rich in hyaluronic acid and vitamins for fast, visible results.' },
            { n: '07', title: 'Oily Skin Cleansers', desc: 'Balanced cleansing that removes excess oil while preserving natural moisture.' },
            { n: '08', title: 'Dry & Sensitive Skin Cleansers', desc: 'Ultra-gentle cleansing enriched with soothing moisturizers.' },
          ],
        },
        {
          id: 'body',
          title: 'Body Care',
          items: [
            { n: '09', title: 'Scented Skin Moisturizing Oils', desc: 'Cold-pressed natural oils, scented in balanced proportions.' },
            { n: '10', title: 'Intimate Washes', desc: 'A gentle, pH-balanced formula for daily care.' },
            { n: '11', title: 'Body & Hair Mists', desc: 'A light, long-lasting fragrance mist that refreshes the senses.' },
            { n: '12', title: 'Luxury Scented Body Powder', desc: 'Ultra-fine powder enhanced with long-lasting fragrances.' },
          ],
        },
        {
          id: 'relax',
          title: 'Relaxation & Bath Rituals',
          items: [
            { n: '13', title: 'Fizzing Bath Powder', desc: 'A fizzy, refreshing bath experience with moisturizing butter and fragrance oils.' },
            { n: '14', title: 'Relaxation & Sleep Mist', desc: 'A spray enriched with calming oils (such as lavender) for bedding, for restful sleep.' },
            { n: '15', title: 'Relaxation & Muscle Recovery Salts', desc: 'Natural mineral salts that help the body relax and restore energy.' },
            { n: '16', title: 'Coral Bath Water', desc: 'A unique formula that restores the skin’s balance and vitality while bathing.' },
            { n: '17', title: 'Massage Oils', desc: 'Smooth-flowing oils that help relieve muscle tension and nourish the skin.' },
            { n: '18', title: 'Moisturizing Liquid Body Soap', desc: 'Rich lather and luxurious cleansing that leaves the body scented and moisturized.' },
            { n: '19', title: 'Moisturizing & Nourishing Hand Soap', desc: 'Frequent daily cleansing that keeps hands soft without dryness.' },
            { n: '20', title: 'Tabrima, Saqla & Moroccan Soap', desc: 'Products inspired by authentic hammam rituals, with luxurious traditional formulas.' },
          ],
        },
        {
          id: 'shower',
          title: 'Shower & Fragrance',
          items: [
            { n: '21', title: 'Solid Perfume', desc: 'A luxurious waxy fragrance formula that sets on pulse points and lasts long.' },
            { n: '22', title: 'Refreshing Shower Gel', desc: 'Deep cleansing with thick lather and rich fragrances, for the whole family.' },
            { n: '23', title: 'Firming & Pore-Minimizing Toner', desc: 'Regulates oil production and tightens the skin for a radiant look.' },
            { n: '24', title: 'Hydrating & Refreshing Toner', desc: 'A daily care step that brings tired skin back to life.' },
          ],
        },
        {
          id: 'hair',
          title: 'Hair Care',
          items: [
            { n: '25', title: 'Nourishing Hair Masks', desc: 'Natural oils and powders that repair damaged hair and give it strength and shine.' },
            { n: '26', title: 'Adult & Kids Shampoos', desc: 'Formulas free of harsh ingredients (sulfate-free) and completely safe.' },
            { n: '27', title: 'Adult & Kids Conditioners', desc: 'Instant detangling and lasting moisture for easy styling.' },
            { n: '28', title: '2-in-1 Shampoos for Men', desc: 'A practical solution combining cleansing and complete moisture for hair and scalp.' },
            { n: '29', title: 'Shampoos for Treated Hair', desc: 'Made for colored hair or hair treated with keratin and protein.' },
            { n: '30', title: 'Scalp Detox Shampoo', desc: 'Deep-cleans the scalp of buildup and excess oil.' },
            { n: '31', title: 'Moisturizing & Smoothing Hair Creams', desc: 'Light nourishment that prevents frizz without weighing hair down.' },
            { n: '32', title: 'Detangling Spray', desc: 'A light spray that makes combing easy and painless for kids and adults.' },
            { n: '33', title: 'Advanced Hair Treatments', desc: 'Repairing serums for split ends, heat damage, and breakage.' },
            { n: '34', title: 'Natural Styling Creams', desc: 'Hold and softness that help shape hair naturally.' },
            { n: '35', title: 'Shine & Protection Serums', desc: 'Protection against styling heat with a silky, brilliant shine.' },
            { n: '36', title: 'Hair & Beard Thickening Oils', desc: 'Vitamin-rich oils that stimulate follicles and thicken hair.' },
          ],
        },
        {
          id: 'tan',
          title: 'Tan, Beauty & Makeup',
          items: [
            { n: '37–39', title: 'Tanning Products (Oil / Spray / Cream)', desc: 'A warm, attractive bronze glow with balanced skin hydration.' },
            { n: '40–42', title: 'Lip Balm / Blush / Gloss', desc: 'Nourishing butter, creamy blush, and a clear, glossy shine.' },
            { n: '43–45', title: 'Sunscreens & Concentrated Oils', desc: 'SPF 30 and SPF 50 protection, plus high-concentration fragrance oils for brands.' },
          ],
        },
      ],
    },
    ctaBanner: {
      title: 'Ready to launch your brand in the world of beauty, or expand with premium products that make a real difference in the market?',
      desc: 'At Awal Helm Factory, we are happy to receive your inquiries and take the first step of our partnership together.',
      cta: 'Book Your Appointment Now',
    },
    contact: {
      eyebrow: 'Contact Us',
      title: 'Your Trusted Industrial Partner',
      desc: 'At Awal Helm Factory, we are happy to receive your inquiries and take the first step of our partnership together.',
      whatsappLabel: 'Message us on WhatsApp',
      addressLabel: 'Headquarters',
      address: 'Al Masha’el District, Riyadh, Saudi Arabia',
      storeLabel: 'Online store',
      licenseLabel: 'Industrial License',
      form: {
        name: 'Full Name',
        namePlaceholder: 'e.g. Abdullah Mohammed Al-Otaibi',
        phone: 'Phone Number',
        phonePlaceholder: '05XXXXXXXX',
        brand: 'Brand Name (optional)',
        brandPlaceholder: 'Your brand name, if any',
        message: 'Your Message',
        messagePlaceholder: 'Tell us about your idea or product...',
        submit: 'Send Message',
        submitting: 'Sending...',
        success: "Your message was received, we'll be in touch soon.",
        error: 'Something went wrong while sending, please try again or reach us on WhatsApp.',
      },
      email: {
        subjectPrefix: 'Consultation request from',
        subjectFallback: 'Website visitor',
        name: 'Name',
        brand: 'Brand Name',
        phone: 'Phone Number',
        message: 'Message',
      },
    },
    footer: {
      tagline: 'Awal Helm Factory for Cosmetics Manufacturing — where nature meets science. Your trusted industrial partner.',
      quickLinks: 'Quick Links',
      factoryInfo: 'Factory Information',
      followUs: 'Follow Us',
      license: 'Industrial License',
      cr: 'Commercial Registration',
      taxNumber: 'Tax Number',
      address: 'Al Masha’el District, Riyadh',
      copyright: (year) => `© ${year} Awal Helm Factory for Cosmetics Manufacturing. All rights reserved.`,
      madeWith: 'Proudly made to support national industry',
      privacyLink: 'Privacy Policy',
    },
    pages: {
      services: {
        eyebrow: 'Our Services',
        title: 'Manufacturing Capabilities & Complete Solutions',
        description: 'One manufacturing partner for everything your brand needs.',
      },
      products: {
        eyebrow: 'Our Products',
        title: 'Comprehensive Product Catalog',
        description: '45 certified manufacturing categories on our production lines, under one roof',
      },
      about: {
        eyebrow: 'About Us',
        title: 'Awal Helm Factory',
        description:
          'In the fast-moving beauty and personal care market, quality is no longer optional — it is the foundation successful brands are built on.',
      },
      contact: {
        eyebrow: 'Contact Us',
        title: 'Get in Touch & Start the Partnership',
        description:
          'Ready to launch your brand in the world of beauty, or expand with premium products that make a real difference in the market?',
      },
      booking: {
        eyebrow: 'Book an Appointment',
        title: 'Book Your Free Consultation',
        description: 'Simple steps to schedule your appointment with the Awal Helm team to discuss your product idea.',
      },
      notFound: {
        code: '404',
        title: 'Page Not Found',
        description: "It looks like the link you're looking for isn't available.",
        cta: 'Back to Home',
      },
      privacy: {
        eyebrow: 'Privacy & Trust',
        title: 'Your Data Is Safe With Us',
        description: 'Before we make your product, we make trust — and that applies just as much to your data.',
      },
    },
    privacy: {
      updated: 'Last updated: August 2026',
      intro:
        "At Awal Helm Factory, we believe trust is built before the product is made — and the same principle applies fully to your data. This page isn't rigid legal boilerplate; it's a plain, honest explanation of how we handle anything you share with us.",
      sections: [
        {
          title: 'What We Collect',
          body: "We only collect what you share with us directly: your name, phone number, email (if provided), brand name, and the details of your booking or consultation request. We don't collect payment data or sensitive information unrelated to our service.",
        },
        {
          title: 'How We Use It',
          body: "We use your data solely to contact you about your request, confirm your appointment, and respond to your questions. We never use it for marketing you haven't agreed to, and we never sell it to anyone.",
        },
        {
          title: 'How We Protect It',
          body: "Only a limited, authorized team within Awal Helm Factory can access your data. We store it securely and remove it once it's no longer needed.",
        },
        {
          title: 'Do We Share It?',
          body: "We don't share your data with any third party for marketing purposes. We may rely on trusted technical services (like email delivery or website hosting) purely to run the site, sharing the minimum data necessary.",
        },
        {
          title: 'Cookies',
          body: 'We only use essential cookies to remember your preferences (like language and dark mode) on your device — no advertising trackers.',
        },
        {
          title: 'Your Rights',
          body: "You can ask, at any time, to know what data we hold about you, correct it, or have it fully deleted — just email us and we'll respond within a few days.",
        },
        {
          title: 'Data Retention',
          body: 'We keep your request details only as long as needed to deliver the service and follow up with you, then dispose of them securely unless the law requires otherwise.',
        },
        {
          title: 'Contact Us',
          body: "For any question about your privacy or data, reach us directly at info@firstdream1.com — we're happy to help.",
        },
      ],
    },
    booking: {
      steps: ['Care Type', 'Packaging', 'Date', 'Details', 'Confirm'],
      nav: { back: 'Back', next: 'Next', submit: 'Submit Booking Request', submitting: 'Submitting...' },
      submitError: 'Something went wrong while submitting your request, please try again or reach us on WhatsApp.',
      service: {
        heading: 'What type of care are you looking for?',
        subheading: 'Choose the category from our catalog closest to your idea, you can clarify details later',
        options: [
          { id: 'skin', title: 'Skincare', desc: 'Moisturizing and brightening creams, serums, masks, scrubs, and cleansers' },
          { id: 'body', title: 'Body Care', desc: 'Scented oils, intimate washes, mists, and body powder' },
          { id: 'relax', title: 'Relaxation & Bath Rituals', desc: 'Bath salts, fizzing powders, massage oils, soaps, tabrima and saqla' },
          { id: 'shower', title: 'Shower & Fragrance', desc: 'Solid perfume, shower gel, and face toners' },
          { id: 'hair', title: 'Hair Care', desc: 'Shampoos and conditioners, masks, serums, and thickening oils' },
          { id: 'tan', title: 'Tan, Beauty & Makeup', desc: 'Tanning products, lip balm, blush and gloss, and sunscreens' },
        ],
      },
      packaging: {
        heading: 'Choose the right container for your product',
        subheading: 'Choose the closest shape to your vision, it can be adjusted later with our team',
        options: EN_PACKAGING.filter((p) => BOOKING_PACKAGING_IDS.includes(p.id)),
      },
      dateTime: {
        heading: 'Choose a Suitable Date',
        subheading: 'We work Saturday to Thursday, and will confirm your appointment within 24 hours',
        timeLabel: 'Suitable Time',
        emptyState: 'Choose a date first to see available times',
        timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '04:00 PM', '05:00 PM'],
      },
      details: {
        heading: 'Your Details & Attachments',
        subheading: "We'll use these to contact you and confirm your appointment",
        name: 'Full Name',
        namePlaceholder: 'e.g. Abdullah Mohammed Al-Otaibi',
        phone: 'Phone Number',
        phonePlaceholder: '05XXXXXXXX',
        brand: 'Brand Name (optional)',
        brandPlaceholder: 'Your brand name, if any',
        email: 'Email (optional)',
        emailPlaceholder: 'example@email.com',
        notes: 'Notes (optional)',
        notesPlaceholder: 'Tell us more about your idea or product...',
        logoLabel: 'Your Logo (optional)',
        logoHint: 'PNG, JPG or PDF',
        designLabel: 'Packaging Designs or References (optional)',
        designHint: 'You can select more than one file',
        disclaimer:
          "Note: this form does not upload files directly to our servers — we'll only display their names within your request. Please attach them when replying to our confirmation message, or via WhatsApp.",
      },
      review: {
        title: 'Review Your Request',
        subtitle: 'Make sure your details are correct before submitting, we will contact you to finalize the appointment',
        service: 'Care Type',
        packaging: 'Packaging Type',
        date: 'Date',
        time: 'Time',
        name: 'Full Name',
        brand: 'Brand Name',
        phone: 'Phone Number',
        notes: 'Notes',
        attachments: 'Selected Attachments',
        disclaimer: 'This is a consultation booking request, not a final confirmation — our team will contact you to finalize the appointment',
        disclaimerAttachments: ', and don\'t forget to attach your files when replying to our message or via WhatsApp',
        empty: '—',
      },
      success: {
        title: 'Your Request Was Sent Successfully',
        desc: 'Thank you for reaching out to Awal Helm Factory. Our team will review your request and contact you within 24 hours to confirm your final appointment.',
        cta: 'Back to Home',
      },
      email: {
        subjectPrefix: 'Booking request from',
        service: 'Care Type',
        packaging: 'Packaging Type',
        date: 'Date',
        time: 'Time',
        name: 'Name',
        brand: 'Brand Name',
        phone: 'Phone Number',
        email: 'Email',
        notes: 'Notes',
        attachments: 'Files to be attached by the client',
      },
    },
    fileDrop: {
      pickFiles: 'Click to select files',
      pickFile: 'Click to select a file',
      removeFile: 'Remove file',
    },
  },
};
