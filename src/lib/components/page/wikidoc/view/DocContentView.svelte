<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import Loading from "$lib/components/common/Loading.svelte";
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { docContext } from "$lib/module/common/wikidoc/util";
    import { getTheme } from "$lib/module/layout/theme";
    import DocParagraphView from "./DocParagraphView.svelte";
    import "$lib/module/common/wikidoc/assets/docview.scss";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        contentTree: Doc.Data.ContentTree;
    }

    let { contentTree }: Props = $props();

    // 위키 커스텀 element 정의
    let wikiElementsDefined = new Promise<void>(async (res) => {
        if (browser) {
            if (customElements.get("wiki-link")) {
                return res();
            }
            const { defineWikiElements } = await import(
                "$lib/module/common/wikidoc/client/wikiElements.client"
            );
            defineWikiElements();
            res();
        } else {
            res();
        }
    });

    // 문서 로딩 확인용
    let docReady = getContext("docReady") as Writable<boolean>;
    wikiElementsDefined.then(() => {
        docReady.set(true);
    });

    //주석들
    docContext.resetWikiDocAnnotations();
    let annotations = $derived.by(() => {
        return Array.from(docContext.getDocAnnotations().entries()).toSorted(
            ([aKey], [bKey]) => {
                const aKey_ = Number(aKey);
                const bKey_ = Number(bKey);
                const aKeyNotNumber = Number.isNaN(aKey_);
                const bKeyNotNumber = Number.isNaN(bKey_);

                if (aKeyNotNumber && !bKeyNotNumber) {
                    return 1;
                } else if (!aKeyNotNumber && bKeyNotNumber) {
                    return -1;
                } else if (!aKeyNotNumber && !bKeyNotNumber) {
                    return aKey_ - bKey_;
                } else {
                    return aKey.localeCompare(bKey);
                }
            },
        );
    });

    docContext.defineWikiDocURLBase(
        (() => {
            const base = new URL(page.url);
            base.pathname = "/doc/r";
            return base;
        })(),
    );

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

{#key browser}
    {#await wikiElementsDefined}
        <Loading />
    {:then}
        <div
            class="doc-view-container"
            data-theme={$theme}
            data-isMobile={$isMobile}
        >
            <div class="doc-view-content">
                {@html contentTree.content}
            </div>
            {#each contentTree.subParagraphs as subParagraph, index}
                <DocParagraphView
                    paragraph={subParagraph}
                    index={`${index + 1}`}
                />
            {/each}
            {#if annotations.length > 0}<div
                    class="doc-view-annot-container"
                    data-theme={$theme}
                >
                    <h3>주석</h3>
                    {#each annotations as [annotKey, annotContent]}
                        {@const clickHandler = () => {
                            document
                                .querySelector(`wiki-annot[key="${annotKey}"]`)
                                ?.scrollIntoView();
                        }}
                        <div class="doc-view-annot" data-annot-key={annotKey}>
                            <div
                                class="doc-view-annot-key"
                                onclick={clickHandler}
                                role="presentation"
                            >
                                [{annotKey}]
                            </div>
                            <div class="doc-view-annot-content">
                                {@html annotContent}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/await}
{/key}

<style>
    .doc-view-annot-container {
        display: flex;
        flex-direction: column;
        row-gap: 2px;

        border-top: 1px solid #cf4844;
        margin-top: 50px;

        &[data-theme="dark"] {
            border-color: #e1a743;
        }

        & h3 {
            margin: 0;
        }

        & .doc-view-annot {
            display: flex;

            column-gap: 3px;
        }

        & .doc-view-annot-key {
            color: #cf4844;
            cursor: pointer;
        }
        &[data-theme="dark"] .doc-view-annot-key {
            color: #e1a743;
        }

        & .doc-view-annot-content {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
</style>
