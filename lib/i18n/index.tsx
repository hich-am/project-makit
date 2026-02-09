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
        'hero.headline': 'Reimagining Digital Fashion', // IDK if used elsewhere, keeping for safety or removing if sure
        'hero.description': 'We turn clothing concepts into hyper-realistic AI campaigns. Impossible shoots made possible.',
        'hero.tagline': 'your kit to make it',
        'cta.bookCall': 'Book Strategy Call',
        'cta.viewWork': 'View Work',
        'hero.viewWork': 'View Our Work', // Legacy
        'hero.startProject': 'Start a Project', // Legacy

        // Features
        'features.label': 'Why makit',
        'features.title': 'Production without boundaries',
        'features.virtualModels.title': 'Virtual Models',
        'features.virtualModels.description': 'No casting needed. Generate diverse, photorealistic models tailored to your brand identity and campaign vision.',
        'features.virtualModels.stat': 'Unlimited',
        'features.virtualModels.statLabel': 'Model options',
        'features.locations.title': 'Infinite Locations',
        'features.locations.description': 'Shoot in space, underwater, on mountaintops, or inside conceptual environments. No location is off-limits.',
        'features.locations.stat': 'Any',
        'features.locations.statLabel': 'Environment',
        'features.delivery.title': 'Hyper-Speed Delivery',
        'features.delivery.description': 'Full campaigns delivered in days, not months. Rapid iteration cycles with unlimited creative revisions.',
        'features.delivery.stat': '10x',
        'features.delivery.statLabel': 'Faster delivery',

        // Services
        'services.label': 'What We Do',
        'services.title': 'Services & Offerings',
        'services.description': 'End-to-end AI-powered creative production for fashion brands ready to lead the future.',
    },
    fr: {
        // Navbar
        'nav.work': 'Travaux',
        'nav.services': 'Services',
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
        'cta.bookCall': 'Réserver un Appel',
        'cta.viewWork': 'Voir nos Travaux',
        'hero.viewWork': 'Voir nos travaux',
        'hero.startProject': 'Démarrer un projet',

        // Features
        'features.label': 'Pourquoi makit',
        'features.title': 'Production sans limites',
        'features.virtualModels.title': 'Modèles virtuels',
        'features.virtualModels.description': 'Pas de casting nécessaire. Générez des modèles photoréalistes diversifiés adaptés à votre identité de marque.',
        'features.virtualModels.stat': 'Illimité',
        'features.virtualModels.statLabel': 'Options de modèles',
        'features.locations.title': 'Lieux infinis',
        'features.locations.description': "Shootez dans l'espace, sous l'eau, en montagne ou dans des environnements conceptuels. Aucun lieu n'est interdit.",
        'features.locations.stat': 'Tout',
        'features.locations.statLabel': 'Environnement',
        'features.delivery.title': 'Livraison ultra-rapide',
        'features.delivery.description': "Campagnes complètes livrées en jours, pas en mois. Cycles d'itération rapides avec révisions illimitées.",
        'features.delivery.stat': '10x',
        'features.delivery.statLabel': 'Plus rapide',

        // Services
        'services.label': 'Nos services',
        'services.title': 'Services & Offres',
        'services.description': 'Production créative IA de bout en bout pour les marques de mode prêtes à mener le futur.',
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
        'cta.viewWork': 'شاهد أعمالنا',
        'hero.viewWork': 'شاهد أعمالنا',
        'hero.startProject': 'ابدأ مشروعاً',

        // Features
        'features.label': 'لماذا ماكيت',
        'features.title': 'إنتاج بلا حدود',
        'features.virtualModels.title': 'عارضون افتراضيون',
        'features.virtualModels.description': 'لا حاجة لاختيار الممثلين. أنشئ عارضين واقعيين متنوعين مصممين حسب هوية علامتك التجارية.',
        'features.virtualModels.stat': 'غير محدود',
        'features.virtualModels.statLabel': 'خيارات العارضين',
        'features.locations.title': 'مواقع لا نهائية',
        'features.locations.description': 'صوّر في الفضاء، تحت الماء، على قمم الجبال، أو في بيئات مفاهيمية. لا يوجد موقع محظور.',
        'features.locations.stat': 'أي',
        'features.locations.statLabel': 'بيئة',
        'features.delivery.title': 'تسليم فائق السرعة',
        'features.delivery.description': 'حملات كاملة تُسلّم في أيام وليس أشهر. دورات تكرار سريعة مع مراجعات غير محدودة.',
        'features.delivery.stat': '10x',
        'features.delivery.statLabel': 'أسرع',

        // Services
        'services.label': 'ماذا نفعل',
        'services.title': 'الخدمات والعروض',
        'services.description': 'إنتاج إبداعي شامل مدعوم بالذكاء الاصطناعي لعلامات الأزياء المستعدة لقيادة المستقبل.',
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
