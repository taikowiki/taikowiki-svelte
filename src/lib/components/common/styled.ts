import styled from "styled-svelte5";

const RowDefault = styled('div', () => '', () => `
    display:flex;
    flex-direction:row;
    align-items: center;
`);

export const Row = {
    left: styled(RowDefault.styledComponentData.tagName, ({columnGap}) => `
        ${columnGap ? `column-gap:${columnGap}px;` : ''}
    `, () => `
        ${RowDefault.styledComponentData.generateCommonStyle({})}
        justify-content: flex-start;
    `),
    center: styled(RowDefault.styledComponentData.tagName, () => '', () => `
        ${RowDefault.styledComponentData.generateCommonStyle({})}
        justify-content: center;
    `),
    right: styled(RowDefault.styledComponentData.tagName, () => '', () => `
        ${RowDefault.styledComponentData.generateCommonStyle({})}
        justify-content: flex-end;
    `)
};