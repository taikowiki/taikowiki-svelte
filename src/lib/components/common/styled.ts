import styled from "styled-svelte5";

const RowDefault = styled('div', () => '', () => `
    display:flex;
    flex-direction:row;
    align-items: center;
`);

export const Row = {
    left: styled(RowDefault.styledComponentData.tagName, ({ columnGap }) => `
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

/*
Tables
*/
export const Table = styled('table', null, () => ``);
export const Thead = styled('thead', null, () => ``);
export const Tbody = styled('tbody', null, () => ``);
export const Tr = styled('tr', null, () => ``);
export const Th = styled('th', null, () => ``);
export const Td = styled('td', null, () => ``);