import { getIsMobile } from "$lib/module/layout/isMobile";
import { getTheme } from "$lib/module/layout/theme";

export function getWindowContext(){
    let windowContext = window.__wiki__window__context__;
    if(!windowContext){
        windowContext = new Map<string & any, any>();
        window.__wiki__window__context__ = windowContext;
    }

    windowContext.set('isMobile', getIsMobile());
    windowContext.set('theme', getTheme()[0]);

    return windowContext;
}

export function resetWikiDocAnnotations(){
    const windowContext = getWindowContext();

    let annotationsMap = windowContext.get('wikiDocAnnotations');
    if(annotationsMap){
        annotationsMap.clear();
    }
    else{
        annotationsMap = new Map<string, string>();
        windowContext.set('wikiDocAnnotations', annotationsMap);
    }
}

export function defineWikiDocURLBase(base: URL){
    getWindowContext().set('wikiDocURLBase', base);
}