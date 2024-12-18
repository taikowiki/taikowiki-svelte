import styled from "styled-svelte5";
import color from "./color";
import type { Difficulty } from "./song/types";

export const Center = styled(
    "div",
    () => `
    display:flex;
    flex-direction:column;
    align-items:center;
    width: 100%;
    max-width: 100%;
`,
);

export const DifficultyColor = styled<{ difficulty: Difficulty }>("div",
    ({difficulty}) => `
    width: 40px;
    height: 18px;
    color: white;
    font-size: 14px;
    box-sizing: border-box;
    padding-inline: 5px;
    padding-bottom: 1px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${color.difficulty[difficulty]};
    `
)