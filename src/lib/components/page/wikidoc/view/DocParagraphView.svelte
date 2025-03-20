<script lang="ts">
    import type {Doc} from '$lib/module/common/wikidoc/types';
    import { getTheme } from "$lib/module/layout/theme";
    import DocSubParagraphView from "./DocView/DocSubParagraphView.svelte";

    interface Props {
        paragraph: Doc.Data.DocParagraph;
        index: string;
        depth?: number;
    }

    let { paragraph, index, depth = 1 }: Props = $props();

    let opened = $state(true);

    const [theme] = getTheme();
</script>

<div class="paragraph-container">
    <div
        class="paragraph-title"
        class:opened
        onclick={() => {
            opened = !opened;
        }}
        role="presentation"
        style={`transform:scale(${100 - (depth - 1)}%);`}
        data-theme={$theme}
    >
        <span>
            {`${index}. ${paragraph.title}`}
        </span>
    </div>
    {#if opened}
        <div class="paragraph-content">
            {@html paragraph.content}
        </div>
        <div class="paragraph-subparagraphs">
            {#each paragraph.subParagraphs as subParagraph, i}
                <DocSubParagraphView
                    paragraph={subParagraph}
                    index={`${index}.${i+1}`}
                    depth={depth + 1}
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    .paragraph-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 3px;

        font-size: 26px;
        color: #cf4844;
        font-weight: bold;

        cursor: pointer;

        border-bottom: 2px solid #cf4844;

        span {
            transform: translateY(-2px);
        }
        &::before {
            content: "▼";
            font-size: 26px;
            /*transition: transform 0.05s;*/
            transform: rotate(0deg) translateY(-2px);
            color: #cf4844;
        }
        &.opened::before {
            transform: rotate(-90deg) translateY(-1px);
        }
    }

    .paragraph-title[data-theme="dark"]{
        color: #e1a743;
        border-color: #e1a743;
        &::before{
            color: #e1a743;
        }
    }

    .paragraph-subparagraphs {
        width: 100%;
        padding-left: 5px;
        box-sizing: border-box;
    }
</style>
