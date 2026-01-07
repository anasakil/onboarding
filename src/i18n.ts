import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically aligns with the middleware, but providing a default is safe
    let locale = await requestLocale;

    if (!locale || !['en', 'it'].includes(locale)) {
        locale = 'it';
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});
