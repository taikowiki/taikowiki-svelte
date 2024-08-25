import createSSC from "styled-svelte-component/svelte4";

const RowDefault = createSSC('div', () => '', () => `
    display:flex;
    flex-direction:row;
    align-items: center;
`)
export const Row = {
    left: createSSC(RowDefault.styledComponentData.tagName, () => '', () => `
        ${RowDefault.styledComponentData.generateCommonStyle({})}
        justify-content: flex-start;
    `),
    center: createSSC(RowDefault.styledComponentData.tagName, () => '', () => `
        ${RowDefault.styledComponentData.generateCommonStyle({})}
        justify-content: center;
    `),
    right: createSSC(RowDefault.styledComponentData.tagName, () => '', () => `
        ${RowDefault.styledComponentData.generateCommonStyle({})}
        justify-content: flex-end;
    `)
}