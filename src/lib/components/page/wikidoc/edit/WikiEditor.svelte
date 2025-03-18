<script lang="ts">
    import type { WikiDocData } from "$lib/module/common/wikidoc/types/wikidoc.types";
    import WikiTypeSelector from "./WikiEditor/WikiTypeSelector.svelte";
    import WikiTitleEditor from "./WikiEditor/WikiTitleEditor.svelte";
    import WikiContentEditor from "./WikiEditor/WikiContentEditor.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import WikiSubParagraphEditor from "./WikiEditor/WikiSubParagraphEditor.svelte";
    import { wikiDocRequestor } from "$lib/module/common/wikidoc/requestor.client";
    import { goto } from "$app/navigation";

    interface Props {
        wikiDoc: WikiDocData;
    }

    let { wikiDoc = $bindable() }: Props = $props();

    const [theme] = getTheme();

    //$inspect(wikiDoc);
</script>

<!-- svelte-ignore ownership_invalid_mutation -->
<!-- svelte-ignore ownership_invalid_binding -->

{#snippet contentEditor()}
    {#if wikiDoc.type === "normal" || wikiDoc.type === "song"}
        <WikiContentEditor bind:content={wikiDoc.contentTree.content} />
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
                {#each wikiDoc.contentTree.subParagraphs as _, index}
                    {@const deleteParagraph = () => {
                        deleteSubParagraphByIndex(index);
                    }}
                    <WikiSubParagraphEditor
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
    <WikiTitleEditor bind:title={wikiDoc.title} />
    <WikiTypeSelector bind:wikiDoc />
    {@render contentEditor()}
    {@render subParagraphEditor()}
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
    .subparagraph-add{
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
