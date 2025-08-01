<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import Loading from "$lib/components/common/Loading.svelte";
    import { Doc } from "$lib/module/doc";
    import { getTheme } from "$lib/module/layout/theme";
    import DocParagraphView from "./DocParagraphView.svelte";
    import "$lib/module/doc/assets/docview.scss";
    import { getContext, onMount } from "svelte";
    import type { Writable } from "svelte/store";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import hljs from "highlight.js";
    import hljsLightStyle from "highlight.js/styles/atom-one-light.min.css?raw";
    import hljsDarkStyle from "highlight.js/styles/atom-one-dark.min.css?raw";

    hljsLightStyle && hljsDarkStyle;

    const { docContext } = Doc;

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
            const { Doc } = await import(
                "$lib/module/doc/doc.client"
            );
            const {defineWikiElements} = Doc.Client.element;
            defineWikiElements();
            res();
        } else {
            res();
        }
    });

    // 문서 로딩 확인용
    let docReady = getContext("docReady") as Writable<boolean>;
    let contentDiv = $state<HTMLElement>();
    let contentLoaded = $state(false);
    let paragraphLoaded = $state(
        new Array(contentTree.subParagraphs.length).fill(false),
    );
    $effect(() => {
        if (contentLoaded && paragraphLoaded.every((e) => e)) {
            docReady.set(true);
        }
    });
    wikiElementsDefined.then(() => {
        contentLoaded = true;
    });

    //highlight
    $effect(() => {
        if (browser && $docReady && contentDiv) {
            contentDiv.querySelectorAll("pre > code").forEach((codeElement) => {
                if (codeElement.classList.length > 0) {
                    hljs.highlightElement(codeElement as HTMLElement);
                }
            });
        }
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

    //highlight

    onMount(() => {});

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

{#if $theme === "light"}
    {@html `<style>${hljsLightStyle}</style>`}
{:else}
    {@html `<style>${hljsDarkStyle}</style>`}
{/if}
{#key browser}
    {#await wikiElementsDefined}
        <Loading />
    {:then}
        <div
            class="doc-view-container"
            data-theme={$theme}
            data-isMobile={$isMobile}
        >
            <div class="doc-view-content-container" bind:this={contentDiv}>
                <div class="doc-view-content">
                    {@html contentTree.content}
                </div>
                {#each contentTree.subParagraphs as subParagraph, index}
                    {@const onLoad = () => {
                        paragraphLoaded[index] = true;
                    }}
                    <DocParagraphView
                        paragraph={subParagraph}
                        index={`${index + 1}`}
                        {onLoad}
                    />
                {/each}
            </div>
            {#if annotations.length > 0}
                <div class="doc-view-annot-container" data-theme={$theme}>
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
