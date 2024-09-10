import showdown from 'showdown';

const converter = new showdown.Converter({
    requireSpaceBeforeHeadingText: true,
    ghCodeBlocks: true,
    tasklists: true,
    disableForced4SpacesIndentedSublists: true,
    tables: true
})

export function mdToHtml(md: string){
    return converter.makeHtml(md);
}

export function htmlToMd(html: string){
    return converter.makeMarkdown(html);
}