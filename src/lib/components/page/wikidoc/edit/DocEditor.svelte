<script lang="ts">
    import DocTypeSelector from "./DocEditor/DocTypeSelector.svelte";
    import DocTitleEditor from "./DocEditor/DocTitleEditor.svelte";
    import DocContentEditor from "./DocEditor/DocContentEditor.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import DocParagraphEditor from "./DocEditor/DocParagraphEditor.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { page } from "$app/state";
    import DocFullRawEditor from "./DocFullRawEditor.svelte";

    interface Props {
        wikiDoc: Doc.Data.DocData;
    }

    let { wikiDoc = $bindable() }: Props = $props();

    // fullraw 에디터 사용 여부
    let useFullRawEditor = $derived(
        page.url.searchParams.get("type") === "fullraw",
    );
    //$inspect(useFullRawEditor);

    const [theme] = getTheme();

    //$inspect(wikiDoc.contentTree)

    //$inspect(wikiDoc);
</script>

<!-- svelte-ignore ownership_invalid_mutation -->
<!-- svelte-ignore ownership_invalid_binding -->

{#snippet contentEditor()}
    {#if wikiDoc.type === "normal" || wikiDoc.type === "song"}
        {#if useFullRawEditor}
            <DocFullRawEditor bind:contentTree={wikiDoc.contentTree} />
        {:else}
            <DocContentEditor bind:content={wikiDoc.contentTree.content} />
        {/if}
    {/if}
{/snippet}
{#snippet subParagraphEditor()}
    {@const addSubParagraph = () => {
        if (wikiDoc.type !== "normal" && wikiDoc.type !== "song") return;
        wikiDoc.contentTree.subParagraphs.push({
            title: "",
            content: "",
            subParagraphs: [],
        });
        wikiDoc.contentTree.subParagraphs = wikiDoc.contentTree.subParagraphs;
    }}
    {@const deleteSubParagraphByIndex = (index: number) => {
        if (wikiDoc.type !== "normal" && wikiDoc.type !== "song") return;
        wikiDoc.contentTree.subParagraphs =
            wikiDoc.contentTree.subParagraphs.filter((_, i) => i !== index);
    }}

    {#if wikiDoc.type === "song" || wikiDoc.type === "normal"}
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
                {#each wikiDoc.contentTree.subParagraphs as _, index (index)}
                    {@const deleteParagraph = () => {
                        deleteSubParagraphByIndex(index);
                    }}
                    <DocParagraphEditor
                        bind:paragraph={
                            wikiDoc.contentTree.subParagraphs[index]
                        }
                        {deleteParagraph}
                        index={[index + 1]}
                    />
                {/each}
            </div>
        </div>
    {/if}
{/snippet}

<div class="container">
    <DocTitleEditor bind:title={wikiDoc.title} />
    <DocTypeSelector bind:wikiDoc />
    {@render contentEditor()}
    {#if !useFullRawEditor}
        {@render subParagraphEditor()}
    {/if}
</div>

<style>
    .container {
        width: 100%;
    }
    .subparagraph-heading {
        font-weight: bold;
        font-size: 20px;

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
        height: 22px;
    }
    .subparagraph-add[data-theme="dark"] {
        background-color: #1c1c1c;
    }
</style>
