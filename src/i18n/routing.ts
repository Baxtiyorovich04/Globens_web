import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['uz', 'ru', 'en'],

    // Used when no locale matches
    defaultLocale: 'uz',
    
    // Enable locale detection
    localeDetection: true,
    
    // Pathnames configuration
    pathnames: {
        // Add any custom pathnames here if needed
        // '/': '/',
        // '/about': '/about',
    }
});
