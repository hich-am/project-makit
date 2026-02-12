"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

export type Locale = 'en' | 'fr' | 'ar'

export const localeNames: Record<Locale, string> = {
    en: 'EN',
    fr: 'FR',
    ar: 'AR',
}

export const isRTL = (locale: Locale): boolean => locale === 'ar'

interface I18nContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
    dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextType | null>(null)

// Translation dictionaries
const translations: Record<Locale, Record<string, string>> = {
    en: {
        // Navbar
        'nav.work': 'Work',
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.startProject': 'Start Project',

        // Hero
        'hero.badge': 'The Future of Digital Fashion',
        'hero.headline.line1': 'Your Vision.',
        'hero.headline.line2': 'Our Digital Reality.',
        'hero.headline': 'Reimagining Digital Fashion',
        'hero.description': 'We turn clothing concepts into hyper-realistic AI campaigns. Impossible shoots made possible.',
        'hero.tagline': 'your kit to make it',
        'cta.bookCall': 'Contact Us',
        'cta.bookCallLong': 'Contact Us on WhatsApp Business',
        'cta.viewWork': 'View Work',
        'hero.viewWork': 'View Our Work',
        'hero.startProject': 'Start a Project',

        // Features
        'features.label': 'Why Makit?',
        'features.title': 'PRODUCTION WITHOUT BOUNDARIES',
        'features.body': 'Makit is where efficiency meets excellence. We have dismantled traditional barriers to give you immediate, high-fidelity results at a fraction of the usual cost and time. Whether you need one bespoke model or thousands of consistent units, our platform keeps you on the cutting edge of global trends without the wait.',
        'features.speed.title': 'Instant Speed & Lower Costs',
        'features.speed.description': 'Get campaign-ready assets in hours, not weeks. Our AI pipeline eliminates costly production overhead while delivering results that rival traditional shoots.',
        'features.consistency.title': 'Uncompromising Consistency',
        'features.consistency.description': 'Every output meets the same exacting standard. From the first render to the thousandth, pixel-perfect uniformity across your entire catalog.',
        'features.customization.title': 'Adaptive Customization',
        'features.customization.description': 'Tailor every detail to your vision — models, poses, lighting, environments. Infinitely flexible, endlessly creative, always on-brand.',
        'features.global.title': 'Globally Current',
        'features.global.description': 'Stay ahead of every market. Our platform tracks real-time global trends so your campaigns resonate with audiences across continents.',

        // Services
        'services.label': 'What We Do',
        'services.title': 'Services & Offerings',
        'services.description': 'End-to-end AI-powered creative production for fashion brands ready to lead the future.',
        'services.virtualPhotoshoots.title': 'Virtual Photoshoots',
        'services.virtualPhotoshoots.description': 'No casting, no crew, no limits. Generate hyper-realistic model photography for lookbooks, e-commerce, and editorials.',
        'services.aiVideo.title': 'AI Video Campaigns',
        'services.aiVideo.description': 'Produce cinematic video content for social, web, and broadcast without a single day on set.',
        'services.productViz.title': 'Product Visualization',
        'services.productViz.description': 'Transform flat designs into photorealistic product renders on virtual models and environments.',
        'services.locations.title': 'Infinite Locations',
        'services.locations.description': 'Shoot on a rooftop in Tokyo, underwater in the Maldives, or on Mars. Any setting is possible.',
        'services.creativeDirection.title': 'Creative Direction',
        'services.creativeDirection.description': 'From moodboard to final delivery, our team provides full creative direction tailored to your brand.',
        'services.delivery.title': 'Hyper-Speed Delivery',
        'services.delivery.description': 'Campaigns delivered in days instead of months. Rapid iteration with unlimited revisions.',

        // Portfolio
        'portfolio.label': 'Selected Work',
        'portfolio.title': 'The Impossible Gallery',
        'portfolio.description': 'AI-powered campaigns and editorials crafted for forward-thinking fashion brands.',
        'portfolio.category.aiEditorial': 'AI Editorial',
        'portfolio.category.campaign': 'Campaign',
        'portfolio.category.editorial': 'Editorial',
        'portfolio.category.concept': 'Concept',
        'portfolio.tag.virtualModel': 'Virtual Model',
        'portfolio.tag.impossibleLocation': 'Impossible Location',
        'portfolio.tag.virtualSet': 'Virtual Set',
        'portfolio.tag.aiCampaign': 'AI Campaign',
        'portfolio.filter.products': 'Products',
        'portfolio.filter.models': 'Models',
        'portfolio.filter.videos': 'Videos',
        'portfolio.tag.product': 'Product',
        'portfolio.tag.accessory': 'Accessory',
        'portfolio.tag.footwear': 'Footwear',
        'portfolio.tag.apparel': 'Apparel',
        'portfolio.tag.fragrance': 'Fragrance',
        'portfolio.tag.leather': 'Leather Goods',
        'portfolio.tag.aiGenerated': 'AI Generated',
        'portfolio.tag.editorial': 'Editorial',
        'portfolio.tag.lookbook': 'Lookbook',
        'portfolio.tag.campaign': 'Campaign',
        'portfolio.tag.streetwear': 'Streetwear',
        'portfolio.tag.couture': 'Couture',
        'portfolio.tag.avantGarde': 'Avant-Garde',
        'portfolio.tag.runway': 'Runway',
        'portfolio.tag.brandFilm': 'Brand Film',
        'portfolio.tag.bts': 'Behind the Scenes',
        'portfolio.tag.aiVideo': 'AI Video',

        // About
        'about.label': 'About makit',
        'about.title': 'The studio where impossible becomes the standard',
        'about.description1': 'Makit is a creative AI studio specializing in hyper-realistic video and photography campaigns for fashion and clothing brands. We eliminate the constraints of traditional production, delivering cinematic-quality campaigns in a fraction of the time and cost.',
        'about.description2': 'From virtual models to impossible locations, we empower brands to tell stories that were previously unimaginable. Our team merges deep fashion expertise with the most advanced generative AI tools on the market.',
        'about.digitalReality.title': 'Digital Reality',
        'about.digitalReality.description': 'We harness cutting-edge AI tools like Kling, Weavy, and Higgfield to produce imagery indistinguishable from reality.',
        'about.creativeVision.title': 'Creative Vision',
        'about.creativeVision.description': 'Every campaign begins with a narrative. We craft compelling visual stories that elevate your brand far beyond standard production.',
        'about.resultsDriven.title': 'Results Driven',
        'about.resultsDriven.description': 'Our campaigns are designed to convert. From concept to delivery, we optimize every frame for maximum audience impact.',

        // Contact
        'contact.label': 'Get in Touch',
        'contact.title': 'Ready to Make It?',
        'contact.description': "Whether you have a campaign in mind or you're exploring what AI can do for your brand, we'd love to hear from you.",
        'contact.bookCall': 'Book a 15-min strategy call',
        'contact.firstName': 'First Name',
        'contact.lastName': 'Last Name',
        'contact.email': 'Email',
        'contact.company': 'Brand / Company',
        'contact.message': 'Message',
        'contact.placeholder.firstName': 'Jane',
        'contact.placeholder.lastName': 'Doe',
        'contact.placeholder.email': 'jane@brand.com',
        'contact.placeholder.company': 'Your brand name',
        'contact.placeholder.message': 'Tell us about your project...',
        'contact.send': 'Send Message',
        'contact.sent.title': 'Message Sent',
        'contact.sent.description': "We'll get back to you within 24 hours.",

        // CTA
        'cta.title': 'Ready to Make It?',
        'cta.description': "Let's create something impossible together. Book a strategy call and see what AI can do for your brand.",
        'cta.tagline': 'your kit to make it',

        // Footer
        'footer.studio': 'Studio',
        'footer.connect': 'Connect',
        'footer.tagline': 'Your kit to make it. Hyper-realistic AI campaigns for the fashion brands of tomorrow.',
        'footer.rights': 'All rights reserved',
        'footer.crafted': 'Crafted with AI. Made for the future.',
        'footer.work': 'Work',
        'footer.services': 'Services',
        'footer.about': 'About',
        'footer.contact': 'Contact',

        // Brand Marquee
        'marquee.poweredBy': "Powered by the world's most advanced models",

        // Common
        'common.close': 'Close',
    },
    fr: {
        // Navbar
        'nav.work': 'Projets',
        'nav.services': 'Expertise',
        'nav.about': 'À propos',
        'nav.contact': 'Contact',
        'nav.startProject': 'Démarrer',

        // Hero
        'hero.badge': "L'avenir de la mode numérique",
        'hero.headline.line1': 'Votre Vision.',
        'hero.headline.line2': 'Notre Réalité Digitale.',
        'hero.headline': 'Réinventer la mode digitale',
        'hero.description': 'Nous transformons vos concepts vestimentaires en campagnes IA hyperréalistes. Des shootings impossibles rendus possibles.',
        'hero.tagline': 'votre kit pour réussir',
        'cta.bookCall': 'Contactez-nous',
        'cta.bookCallLong': 'Contactez-nous sur WhatsApp Business',
        'cta.viewWork': 'Voir nos Projets',
        'hero.viewWork': 'Voir nos projets',
        'hero.startProject': 'Démarrer un projet',

        // Features
        'features.label': 'Pourquoi Makit ?',
        'features.title': 'PRODUCTION SANS LIMITES',
        'features.body': 'Makit, c\'est là où l\'efficacité rencontre l\'excellence. Nous avons supprimé les barrières traditionnelles pour vous offrir des résultats immédiats et haute fidélité, à une fraction du coût et du temps habituels. Qu\'il vous faille un mannequin sur mesure ou des milliers d\'unités cohérentes, notre plateforme vous maintient à la pointe des tendances mondiales, sans attente.',
        'features.speed.title': 'Rapidité Instantanée & Coûts Réduits',
        'features.speed.description': 'Obtenez des assets prêts pour vos campagnes en heures, pas en semaines. Notre pipeline IA élimine les surcoûts de production tout en rivalisant avec les shootings traditionnels.',
        'features.consistency.title': 'Constance Inébranlable',
        'features.consistency.description': 'Chaque rendu respecte le même standard exigeant. Du premier au millième, une uniformité pixel-parfaite sur l\'ensemble de votre catalogue.',
        'features.customization.title': 'Personnalisation Adaptative',
        'features.customization.description': 'Ajustez chaque détail selon votre vision — mannequins, poses, éclairages, environnements. Infiniment flexible, créatif sans limites, toujours fidèle à votre marque.',
        'features.global.title': 'Connecté au Monde',
        'features.global.description': 'Gardez une longueur d\'avance sur chaque marché. Notre plateforme suit les tendances mondiales en temps réel pour que vos campagnes résonnent auprès d\'audiences sur tous les continents.',

        // Services
        'services.label': 'Notre Expertise',
        'services.title': 'Services & Prestations',
        'services.description': 'Production créative propulsée par l\'IA, de bout en bout, pour les marques de mode prêtes à façonner le futur.',
        'services.virtualPhotoshoots.title': 'Shootings Virtuels',
        'services.virtualPhotoshoots.description': 'Ni casting, ni équipe, ni limites. Générez des photographies de mannequins hyperréalistes pour lookbooks, e-commerce et éditoriaux.',
        'services.aiVideo.title': 'Campagnes Vidéo IA',
        'services.aiVideo.description': 'Produisez du contenu vidéo cinématographique pour les réseaux sociaux, le web et la diffusion, sans une seule journée de tournage.',
        'services.productViz.title': 'Visualisation Produit',
        'services.productViz.description': 'Transformez vos designs à plat en rendus produits photoréalistes sur des mannequins et environnements virtuels.',
        'services.locations.title': 'Décors Infinis',
        'services.locations.description': 'Shootez sur un rooftop à Tokyo, sous l\'eau aux Maldives ou sur Mars. Tout décor est envisageable.',
        'services.creativeDirection.title': 'Direction Artistique',
        'services.creativeDirection.description': 'Du moodboard à la livraison finale, notre équipe assure une direction artistique complète, sur mesure pour votre marque.',
        'services.delivery.title': 'Livraison Ultra-Rapide',
        'services.delivery.description': 'Des campagnes livrées en quelques jours, plus en plusieurs mois. Itérations rapides et révisions illimitées.',

        // Portfolio
        'portfolio.label': 'Projets Sélectionnés',
        'portfolio.title': 'La Galerie de l\'Impossible',
        'portfolio.description': 'Une galerie de l\'impossible : campagnes et éditoriaux générés par IA pour les marques de mode visionnaires.',
        'portfolio.category.aiEditorial': 'Éditorial IA',
        'portfolio.category.campaign': 'Campagne',
        'portfolio.category.editorial': 'Éditorial',
        'portfolio.category.concept': 'Concept',
        'portfolio.tag.virtualModel': 'Mannequin Virtuel',
        'portfolio.tag.impossibleLocation': 'Lieu Imaginaire',
        'portfolio.tag.virtualSet': 'Décor Virtuel',
        'portfolio.tag.aiCampaign': 'Campagne IA',
        'portfolio.filter.products': 'Produits',
        'portfolio.filter.models': 'Mannequins',
        'portfolio.filter.videos': 'Vidéos',
        'portfolio.tag.product': 'Produit',
        'portfolio.tag.accessory': 'Accessoire',
        'portfolio.tag.footwear': 'Chaussures',
        'portfolio.tag.apparel': 'Vêtement',
        'portfolio.tag.fragrance': 'Parfum',
        'portfolio.tag.leather': 'Maroquinerie',
        'portfolio.tag.aiGenerated': 'Généré par IA',
        'portfolio.tag.editorial': 'Éditorial',
        'portfolio.tag.lookbook': 'Lookbook',
        'portfolio.tag.campaign': 'Campagne',
        'portfolio.tag.streetwear': 'Streetwear',
        'portfolio.tag.couture': 'Couture',
        'portfolio.tag.avantGarde': 'Avant-Garde',
        'portfolio.tag.runway': 'Défilé',
        'portfolio.tag.brandFilm': 'Film de Marque',
        'portfolio.tag.bts': 'Coulisses',
        'portfolio.tag.aiVideo': 'Vidéo IA',

        // About
        'about.label': 'À propos de makit',
        'about.title': 'Le studio où l\'impossible devient la norme',
        'about.description1': 'Makit est un studio créatif IA spécialisé dans les campagnes vidéo et photographiques hyperréalistes pour les marques de mode et de prêt-à-porter. Nous éliminons les contraintes de la production traditionnelle, en livrant des campagnes de qualité cinématographique en une fraction du temps et du coût.',
        'about.description2': 'Des mannequins virtuels aux lieux imaginaires, nous permettons aux marques de raconter des histoires jusqu\'alors inimaginables. Notre équipe allie une expertise approfondie de la mode aux outils d\'IA générative les plus avancés du marché.',
        'about.digitalReality.title': 'Réalité Digitale',
        'about.digitalReality.description': 'Nous exploitons les outils IA de pointe — Kling, Weavy et Higgfield — pour produire des visuels indiscernables de la réalité.',
        'about.creativeVision.title': 'Vision Créative',
        'about.creativeVision.description': 'Chaque campagne commence par un récit. Nous concevons des histoires visuelles captivantes qui élèvent votre marque bien au-delà de la production standard.',
        'about.resultsDriven.title': 'Orienté Résultats',
        'about.resultsDriven.description': 'Nos campagnes sont conçues pour convertir. Du concept à la livraison, nous optimisons chaque image pour un impact maximal auprès de votre audience.',

        // Contact
        'contact.label': 'Nous Contacter',
        'contact.title': 'Prêt à passer à l\'action ?',
        'contact.description': 'Que vous ayez une campagne en tête ou que vous souhaitiez explorer ce que l\'IA peut apporter à votre marque, nous serions ravis d\'échanger avec vous.',
        'contact.bookCall': 'Réserver un appel stratégique (15 min)',
        'contact.firstName': 'Prénom',
        'contact.lastName': 'Nom',
        'contact.email': 'E-mail',
        'contact.company': 'Marque / Entreprise',
        'contact.message': 'Message',
        'contact.placeholder.firstName': 'Marie',
        'contact.placeholder.lastName': 'Dupont',
        'contact.placeholder.email': 'marie@marque.com',
        'contact.placeholder.company': 'Nom de votre marque',
        'contact.placeholder.message': 'Parlez-nous de votre projet...',
        'contact.send': 'Envoyer le message',
        'contact.sent.title': 'Message envoyé',
        'contact.sent.description': 'Nous vous répondrons sous 24 heures.',

        // CTA
        'cta.title': 'Prêt à passer à l\'action ?',
        'cta.description': 'Créons ensemble quelque chose d\'impossible. Réservez un appel stratégique et découvrez ce que l\'IA peut faire pour votre marque.',
        'cta.tagline': 'votre kit pour réussir',

        // Footer
        'footer.studio': 'Studio',
        'footer.connect': 'Nous suivre',
        'footer.tagline': 'Votre kit pour réussir. Des campagnes IA hyperréalistes pour les marques de mode de demain.',
        'footer.rights': 'Tous droits réservés',
        'footer.crafted': 'Conçu avec l\'IA. Pensé pour le futur.',
        'footer.work': 'Projets',
        'footer.services': 'Expertise',
        'footer.about': 'À propos',
        'footer.contact': 'Contact',

        // Brand Marquee
        'marquee.poweredBy': 'Propulsé par les modèles les plus avancés au monde',

        // Common
        'common.close': 'Fermer',
    },
    ar: {
        // Navbar
        'nav.work': 'أعمالنا',
        'nav.services': 'الخدمات',
        'nav.about': 'من نحن',
        'nav.contact': 'اتصل بنا',
        'nav.startProject': 'ابدأ مشروعك',

        // Hero
        'hero.badge': 'مستقبل الأزياء الرقمية',
        'hero.headline.line1': 'رؤيتك.',
        'hero.headline.line2': 'واقعنا الرقمي.',
        'hero.headline': 'إعادة تصور الأزياء الرقمية',
        'hero.description': 'نحوّل مفاهيم الملابس إلى حملات ذكاء اصطناعي واقعية للغاية. التصوير المستحيل أصبح ممكناً.',
        'hero.tagline': 'أدواتك للنجاح',
        'cta.bookCall': 'احجز مكالمة استراتيجية',
        'cta.bookCallLong': 'احجز مكالمة استراتيجية (١٥ دقيقة)',
        'cta.viewWork': 'شاهد أعمالنا',
        'hero.viewWork': 'شاهد أعمالنا',
        'hero.startProject': 'ابدأ مشروعاً',

        // Features
        'features.label': 'لماذا ماكيت؟',
        'features.title': 'إنتاج بلا حدود',
        'features.body': 'ماكيت هو حيث تلتقي الكفاءة بالتميز. لقد أزلنا الحواجز التقليدية لنمنحك نتائج فورية عالية الدقة بجزء بسيط من التكلفة والوقت المعتادين. سواء كنت بحاجة إلى نموذج مخصص واحد أو آلاف الوحدات المتسقة، تبقيك منصتنا في طليعة الاتجاهات العالمية دون انتظار.',
        'features.speed.title': 'سرعة فورية وتكاليف أقل',
        'features.speed.description': 'احصل على أصول جاهزة للحملات في ساعات وليس أسابيع. يزيل خط أنابيب الذكاء الاصطناعي لدينا التكاليف الإنتاجية مع تقديم نتائج تنافس التصوير التقليدي.',
        'features.consistency.title': 'اتساق لا يتزعزع',
        'features.consistency.description': 'كل مخرج يلبي نفس المعيار الدقيق. من أول تصيير إلى الألف، تماثل مثالي عبر كامل كتالوجك.',
        'features.customization.title': 'تخصيص تكيّفي',
        'features.customization.description': 'خصّص كل تفصيل وفقاً لرؤيتك — العارضون، الوضعيات، الإضاءة، البيئات. مرونة لا نهائية، إبداع بلا حدود، دائماً وفياً لعلامتك.',
        'features.global.title': 'متصل عالمياً',
        'features.global.description': 'ابقَ متقدماً على كل سوق. تتبع منصتنا الاتجاهات العالمية في الوقت الفعلي لتجعل حملاتك تتردد صداها لدى الجماهير عبر القارات.',

        // Services
        'services.label': 'ماذا نفعل',
        'services.title': 'الخدمات والعروض',
        'services.description': 'إنتاج إبداعي شامل مدعوم بالذكاء الاصطناعي لعلامات الأزياء المستعدة لقيادة المستقبل.',
        'services.virtualPhotoshoots.title': 'جلسات تصوير افتراضية',
        'services.virtualPhotoshoots.description': 'بدون كاستينغ، بدون طاقم، بدون حدود. أنشئ صوراً واقعية للغاية لكتالوجات المنتجات والتجارة الإلكترونية.',
        'services.aiVideo.title': 'حملات فيديو بالذكاء الاصطناعي',
        'services.aiVideo.description': 'أنتج محتوى فيديو سينمائي للشبكات الاجتماعية والويب والبث دون يوم واحد في موقع التصوير.',
        'services.productViz.title': 'عرض المنتجات',
        'services.productViz.description': 'حوّل تصاميمك المسطحة إلى عروض منتجات واقعية على عارضين وبيئات افتراضية.',
        'services.locations.title': 'مواقع لا نهائية',
        'services.locations.description': 'صوّر على سطح مبنى في طوكيو، تحت الماء في المالديف، أو على المريخ. أي موقع ممكن.',
        'services.creativeDirection.title': 'إخراج فني',
        'services.creativeDirection.description': 'من لوحة الإلهام حتى التسليم النهائي، يقدم فريقنا إخراجاً فنياً كاملاً مصمماً خصيصاً لعلامتك.',
        'services.delivery.title': 'تسليم فائق السرعة',
        'services.delivery.description': 'حملات تُسلّم في أيام بدلاً من أشهر. تكرارات سريعة مع مراجعات غير محدودة.',

        // Portfolio
        'portfolio.label': 'أعمال مختارة',
        'portfolio.title': 'معرض المستحيل',
        'portfolio.description': 'حملات وتحريرات مدعومة بالذكاء الاصطناعي لعلامات الأزياء الرائدة.',
        'portfolio.category.aiEditorial': 'تحرير بالذكاء الاصطناعي',
        'portfolio.category.campaign': 'حملة',
        'portfolio.category.editorial': 'تحرير',
        'portfolio.category.concept': 'مفهوم',
        'portfolio.tag.virtualModel': 'عارض افتراضي',
        'portfolio.tag.impossibleLocation': 'موقع خيالي',
        'portfolio.tag.virtualSet': 'ديكور افتراضي',
        'portfolio.tag.aiCampaign': 'حملة ذكاء اصطناعي',
        'portfolio.filter.products': 'المنتجات',
        'portfolio.filter.models': 'العارضون',
        'portfolio.filter.videos': 'الفيديوهات',
        'portfolio.tag.product': 'منتج',
        'portfolio.tag.accessory': 'إكسسوار',
        'portfolio.tag.footwear': 'أحذية',
        'portfolio.tag.apparel': 'ملابس',
        'portfolio.tag.fragrance': 'عطر',
        'portfolio.tag.leather': 'منتجات جلدية',
        'portfolio.tag.aiGenerated': 'مُنشأ بالذكاء الاصطناعي',
        'portfolio.tag.editorial': 'تحريري',
        'portfolio.tag.lookbook': 'كتالوج',
        'portfolio.tag.campaign': 'حملة',
        'portfolio.tag.streetwear': 'أزياء شارع',
        'portfolio.tag.couture': 'أزياء راقية',
        'portfolio.tag.avantGarde': 'طليعي',
        'portfolio.tag.runway': 'عرض أزياء',
        'portfolio.tag.brandFilm': 'فيلم علامة تجارية',
        'portfolio.tag.bts': 'كواليس',
        'portfolio.tag.aiVideo': 'فيديو بالذكاء الاصطناعي',

        // About
        'about.label': 'عن ماكيت',
        'about.title': 'الاستوديو حيث يصبح المستحيل هو المعيار',
        'about.description1': 'ماكيت هو استوديو إبداعي للذكاء الاصطناعي متخصص في حملات الفيديو والتصوير الواقعي للغاية لعلامات الأزياء. نزيل قيود الإنتاج التقليدي ونقدم حملات بجودة سينمائية في وقت وتكلفة أقل بكثير.',
        'about.description2': 'من العارضين الافتراضيين إلى المواقع المستحيلة، نمكّن العلامات التجارية من رواية قصص كانت في السابق لا يمكن تصورها.',
        'about.digitalReality.title': 'واقع رقمي',
        'about.digitalReality.description': 'نستخدم أحدث أدوات الذكاء الاصطناعي مثل Kling و Weavy و Higgfield لإنتاج صور لا يمكن تمييزها عن الواقع.',
        'about.creativeVision.title': 'رؤية إبداعية',
        'about.creativeVision.description': 'كل حملة تبدأ بسرد. نصمم قصصاً بصرية مقنعة ترفع علامتك التجارية إلى ما هو أبعد من الإنتاج القياسي.',
        'about.resultsDriven.title': 'مدفوع بالنتائج',
        'about.resultsDriven.description': 'حملاتنا مصممة للتحويل. من المفهوم إلى التسليم، نحسّن كل إطار لتحقيق أقصى تأثير.',

        // Contact
        'contact.label': 'تواصل معنا',
        'contact.title': 'مستعد للانطلاق؟',
        'contact.description': 'سواء كانت لديك حملة في ذهنك أو تستكشف ما يمكن أن يقدمه الذكاء الاصطناعي لعلامتك، يسعدنا سماعك.',
        'contact.bookCall': 'احجز مكالمة استراتيجية (١٥ دقيقة)',
        'contact.firstName': 'الاسم الأول',
        'contact.lastName': 'اسم العائلة',
        'contact.email': 'البريد الإلكتروني',
        'contact.company': 'العلامة التجارية / الشركة',
        'contact.message': 'الرسالة',
        'contact.placeholder.firstName': 'أحمد',
        'contact.placeholder.lastName': 'محمد',
        'contact.placeholder.email': 'ahmed@brand.com',
        'contact.placeholder.company': 'اسم علامتك التجارية',
        'contact.placeholder.message': 'أخبرنا عن مشروعك...',
        'contact.send': 'إرسال الرسالة',
        'contact.sent.title': 'تم إرسال الرسالة',
        'contact.sent.description': 'سنعود إليك خلال 24 ساعة.',

        // CTA
        'cta.title': 'مستعد للانطلاق؟',
        'cta.description': 'لنصنع معاً شيئاً مستحيلاً. احجز مكالمة استراتيجية واكتشف ما يمكن أن يفعله الذكاء الاصطناعي لعلامتك.',
        'cta.tagline': 'أدواتك للنجاح',

        // Footer
        'footer.studio': 'الاستوديو',
        'footer.connect': 'تابعنا',
        'footer.tagline': 'أدواتك للنجاح. حملات ذكاء اصطناعي واقعية لعلامات الأزياء المستقبلية.',
        'footer.rights': 'جميع الحقوق محفوظة',
        'footer.crafted': 'صُنع بالذكاء الاصطناعي. مصمم للمستقبل.',
        'footer.work': 'أعمالنا',
        'footer.services': 'الخدمات',
        'footer.about': 'من نحن',
        'footer.contact': 'اتصل بنا',

        // Brand Marquee
        'marquee.poweredBy': 'مدعوم بأكثر النماذج تقدماً في العالم',

        // Common
        'common.close': 'إغلاق',
    },
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en')

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale)
    }, [])

    // Update HTML dir attribute when locale changes
    useEffect(() => {
        const dir = isRTL(locale) ? 'rtl' : 'ltr'
        document.documentElement.setAttribute('dir', dir)
        document.documentElement.setAttribute('lang', locale)
    }, [locale])

    const t = useCallback((key: string): string => {
        return translations[locale][key] || translations.en[key] || key
    }, [locale])

    const dir = isRTL(locale) ? 'rtl' : 'ltr'

    return (
        <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider')
    }
    return context
}

export function useTranslation() {
    const { t, locale, dir } = useI18n()
    return { t, locale, dir }
}
