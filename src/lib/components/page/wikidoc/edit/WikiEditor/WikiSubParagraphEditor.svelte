<script lang="ts">
    import type {Doc} from '$lib/module/common/wikidoc/types';
    import { getTheme } from "$lib/module/layout/theme";
    import WikiContentEditor from "./WikiContentEditor.svelte";
    import WikiSubSubParagraphEditor from "./WikiSubSubParagraphEditor.svelte";

    interface Props {
        paragraph: Doc.Data.WikiDocParagraph;
        deleteParagraph: () => void;
        index: number[];
    }

    let { paragraph = $bindable(), deleteParagraph, index }: Props = $props();

    let opened = $state(true);

    function addSubParagraph() {
        paragraph.subParagraphs.push({
            title: "",
            content: "",
            subParagraphs: [],
        });
        paragraph.subParagraphs = paragraph.subParagraphs;
    }

    function deleteSubParagraphByIndex(index: number) {
        paragraph.subParagraphs = paragraph.subParagraphs.filter(
            (_, i) => i !== index,
        );
    }

    const [theme] = getTheme();
</script>

<div class="container">
    <div class="title-container">
        <div
            class="opener"
            class:opened
            onclick={() => {
                opened = !opened;
            }}
            role="presentation"
            data-theme={$theme}
        ></div>
        <span class="title-index" data-theme={$theme}>
            {index.join(".") + "."}
        </span>
        <input
            type="text"
            bind:value={paragraph.title}
            class="title"
            placeholder="문단 제목"
        />
        <button onclick={deleteParagraph} class="delete" data-theme={$theme}>
            삭제
        </button>
    </div>
    <div class="other-container" class:opened>
        <WikiContentEditor bind:content={paragraph.content} />
        <div class="subparagraph-container">
            <div class="subparagraph-heading">
                <span>하위 문단</span>
                <button
                    class="subparagraph-add"
                    onclick={addSubParagraph}
                    data-theme={$theme}
                >
                    추가
                </button>
            </div>
            <div class="subparagraph-editor-container">
                {#each paragraph.subParagraphs as _, i (i)}
                    {@const deleteParagraph = () => {
                        deleteSubParagraphByIndex(i);
                    }}
                    <WikiSubSubParagraphEditor
                        bind:paragraph={paragraph.subParagraphs[i]}
                        {deleteParagraph}
                        index={[...index, i + 1]}
                    />
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .title-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        font-weight: bold;
        align-items: center;
    }
    .title-index {
        font-size: 25px;
        transform: translateY(-2px);
        color: #cf4844;
    }
    .title-index[data-theme="dark"] {
        color: #e1a743;
    }
    input.title {
        flex: 1 0 auto;
        font-size: 18px;
        height: 20px;
    }
    button.delete {
        height: 26px;
        background-color: #cf4844;
        border-radius: 2px;
        border: 0;
        color: white;
        cursor: pointer;
    }
    button.delete[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .opener {
        transform: translateY(-1px);
        display: flex;
        cursor: pointer;
    }
    .opener.opened {
        transform: translateY(-3px);
    }
    .opener::before {
        content: "▼";
        font-size: 23px;
        transition: transform 0.05s;
        transform: rotate(-90deg) translateY(1px);
        color: #cf4844;
    }
    .opener.opened::before {
        transform: rotate(0deg) translateY(1px);
    }
    .opener[data-theme="dark"]::before {
        color: #e1a743;
    }

    .other-container {
        width: 100%;
        flex-direction: column;
        display: none;
    }
    .other-container.opened {
        display: flex;
    }

    .subparagraph-heading {
        font-weight: bold;
        font-size: 18px;

        display: flex;
        align-items: center;
        column-gap: 2px;

        margin-block: 5px;
    }
    .subparagraph-heading > span {
        transform: translateY(-1px);
    }
    .subparagraph-editor-container {
        padding-left: 10px;

        row-gap: 5px;
    }
    .subparagraph-add {
        border-radius: 5px;
        background-color: #cf4844;
        color: white;
        border: 0;
        cursor: pointer;
        height: 20px;
    }
    .subparagraph-add[data-theme="dark"] {
        background-color: #1c1c1c;
    }
</style>
