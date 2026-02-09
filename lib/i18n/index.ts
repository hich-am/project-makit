// This file is deprecated. Please use index.tsx instead.
export * from './index' // This might be circular. 

// Better:
// export { I18nProvider, useI18n, useTranslation, localeNames, isRTL } from './index.tsx'
// But index.tsx is the one we want.

// Let's try to just export * from './index.tsx';
export * from './i18n';
