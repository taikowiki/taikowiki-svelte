import i18n from "$lib/module/common/i18n/i18n";
import type { Handle } from "@sveltejs/kit";


export const dynamicHtmlLang: Handle = async ({event, resolve}) => {
    const urlLang = event.url.searchParams.get('lang');
    const languages = Object.keys(i18n);
    let lang = 'ko';
    if (urlLang && (languages.includes(urlLang))) {
        lang = urlLang;
    }
    else{
        const cookieLang = event.cookies.get('language');
        if(cookieLang && languages.includes(cookieLang)){
            lang = cookieLang;
        }
        else{
            event.cookies.set('lang', 'ko', {path: '/'});
        }
    }
    return await resolve(event, {
        transformPageChunk: ({html}) => html.replace('%lang%', lang)
    });
}