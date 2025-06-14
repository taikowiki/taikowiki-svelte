<script lang="ts">
    import type { Doc } from "$lib/module/doc";
    import { getTheme } from "$lib/module/layout/theme";
    import { onMount } from "svelte";
    import DocSubParagraphView from "./DocView/DocSubParagraphView.svelte";
    import hljs from "highlight.js";

    interface Props {
        paragraph: Doc.Data.DocParagraph;
        index: string;
        onLoad: () => void;
        depth?: number;
    }

    let { paragraph, index, depth = 1, onLoad }: Props = $props();

    //loaded
    let contentDiv = $state<HTMLElement>();
    let contentLoaded = $state(false);
    let subParagraphLoaded = $state(
        new Array(paragraph.subParagraphs.length).fill(false),
    );
    $effect(() => {
        if (contentLoaded && subParagraphLoaded.every((e) => e)) {
            onLoad();
        }
    });
    $effect(() => {
        if (contentDiv) {
            contentLoaded = true;
        }
    });

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
        style={`font-size:${Math.max(26 - (depth - 1) * 2, 18)}px;`}
        data-theme={$theme}
        data-doc-index={index}
    >
        <span>
            {`${index}. ${paragraph.title}`}
        </span>
    </div>
    <div class="doc-view-content" bind:this={contentDiv} class:closed={!opened}>
        {@html paragraph.content}
    </div>
    <div class="doc-view-paragraphs" class:closed={!opened}>
        {#each paragraph.subParagraphs as subParagraph, i}
            {@const onLoad = () => {
                subParagraphLoaded[i] = true;
            }}
            <DocSubParagraphView
                paragraph={subParagraph}
                index={`${index}.${i + 1}`}
                depth={depth + 1}
                {onLoad}
            />
        {/each}
    </div>
</div>

<style>
    .paragraph-container{
        margin-top: 10px;
    }
    .paragraph-title {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        column-gap: 3px;

        font-size: 26px;
        color: #cf4844;
        font-weight: bold;

        cursor: pointer;

        border-bottom: 2px solid #cf4844;

        word-break: break-all;

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

    .paragraph-title[data-theme="dark"] {
        color: #e1a743;
        border-color: #e1a743;
        &::before {
            color: #e1a743;
        }
    }

    .doc-view-content {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .doc-view-paragraphs {
        width: 100%;
        /*padding-left: 10px;*/
        box-sizing: border-box;
    }

    .closed {
        display: none;
    }
</style>
