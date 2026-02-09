"use client"

import { motion } from 'framer-motion'
import { useI18n, Locale, localeNames } from '@/lib/i18n/i18n'

const locales: Locale[] = ['en', 'fr']

/**
 * LanguageSwitcher - Segmented control with glass styling
 * Animated sliding pill indicates active language
 */
export function LanguageSwitcher() {
    const { locale, setLocale } = useI18n()

    return (
        <div className="relative flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-xl">
            {/* Sliding active indicator */}
            <motion.div
                className="absolute inset-y-1 rounded-full bg-white/10"
                initial={false}
                animate={{
                    x: locales.indexOf(locale) * 36 + 2,
                    width: 32,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                }}
            />

            {locales.map((loc) => (
                <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={`relative z-10 px-2.5 py-1 text-xs font-medium transition-colors ${locale === loc
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    aria-label={`Switch to ${loc === 'en' ? 'English' : loc === 'fr' ? 'French' : 'Arabic'}`}
                >
                    {localeNames[loc]}
                </button>
            ))}
        </div>
    )
}
