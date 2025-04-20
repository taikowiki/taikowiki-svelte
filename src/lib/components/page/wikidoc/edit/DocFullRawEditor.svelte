<script lang="ts">
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { UndoStack } from "$lib/module/common/wikidoc/util";
    import { getTheme } from "$lib/module/layout/theme";
    import { onMount } from "svelte";
    import DocPreview from "./Preview/DocPreview.svelte";

    interface Props {
        contentTree: Doc.Data.ContentTree;
    }
    let { contentTree = $bindable() }: Props = $props();
    let content = $state(toContent(contentTree));
    $effect(() => {
        contentTree = toTree(content);
    });

    let type = $state<"edit" | "preview">("edit");

    let undoStack = $state<UndoStack>();
    let textarea = $state<HTMLTextAreaElement>();
    onMount(() => {
        if (!textarea) return;
        undoStack = new UndoStack(textarea, {
            cooldown: 500,
            maxStackSize: 1000,
            onUndo: (element) => {
                content = element.value;
            },
            onRedo: (element) => {
                content = element.value;
            },
        });
    });

    const [theme] = getTheme();

    function toTree(content: string) {
        const contentTree: Doc.Data.ContentTree = {
            content: "",
            subParagraphs: [],
        };

        const paragraphStack: (Doc.Data.DocParagraph | Doc.Data.ContentTree)[] =
            [contentTree];
        const lines = content.split("\n");
        let currentDepth = 0;
        for (const line of lines) {
            if (line.startsWith("#") && /^(\#+)\s(.+)/.test(line)) {
                const spaceIndex = line.indexOf(" ");
                const thisDepth = line.slice(0, spaceIndex).length;
                const title = line.slice(spaceIndex + 1);

                const paragraph: Doc.Data.DocParagraph = {
                    title,
                    content: "",
                    subParagraphs: [],
                };
                console.log(title, thisDepth, structuredClone(paragraphStack));
                if (thisDepth === currentDepth) {
                    paragraphStack.pop();
                    paragraphStack.at(-1)?.subParagraphs?.push(paragraph);
                    paragraphStack.push(paragraph);
                } else if (thisDepth === currentDepth + 1) {
                    paragraphStack.at(-1)?.subParagraphs?.push(paragraph);
                    paragraphStack.push(paragraph);
                    currentDepth++;
                } else if (thisDepth < currentDepth) {
                    for (let i = 0; i < currentDepth - thisDepth + 1; i++) {
                        paragraphStack.pop();
                    }
                    paragraphStack.at(-1)?.subParagraphs?.push(paragraph);
                    paragraphStack.push(paragraph);
                    currentDepth = thisDepth;
                }
            } else {
                const last = paragraphStack.at(-1);
                if (last) {
                    if (last.content !== "") {
                        last.content += "\n";
                    }
                    last.content += line;
                }
            }
        }

        return contentTree;
    }
    function toContent(tree: Doc.Data.ContentTree) {
        let content = "";
        content += tree.content;
        tree.subParagraphs.forEach((paragraph) => {
            addParagraphContent(paragraph, 1);
        });
        return content;

        function addParagraphContent(
            paragraph: Doc.Data.DocParagraph,
            depth: number,
        ) {
            content += "\n";
            content += "#".repeat(depth) + " ";
            content += paragraph.title;
            content += "\n";
            content += paragraph.content;
            paragraph.subParagraphs.forEach((subParagraph) => {
                addParagraphContent(subParagraph, depth + 1);
            });
        }
    }
    function textAreaTabEvent(this: HTMLTextAreaElement, event: KeyboardEvent) {
        if (event.key !== "Tab") return;
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const tab = "    ";

        const before = this.value.substring(0, start);
        const after = this.value.substring(end);

        this.value = before + tab + after;
        this.selectionStart = start + tab.length;
        this.selectionEnd = this.selectionStart;
        this.focus();
        content = this.value;
        if (undoStack) {
            undoStack.pushCurrent();
        }
    }
</script>

{#snippet editorTypeSelector()}
    <div class="row-left">
        <label class:selected={type === "edit"} data-theme={$theme}>
            수정
            <input type="radio" value="edit" bind:group={type} />
        </label>
        <label class:selected={type === "preview"} data-theme={$theme}>
            미리보기
            <input type="radio" value="preview" bind:group={type} />
        </label>
    </div>
{/snippet}
{#snippet paragraphPreview(
    paragraph: Doc.Data.DocParagraph,
    index: string,
    depth: number,
)}
    <div class="paragraph-container">
        <div
            class="paragraph-title"
            role="presentation"
            style={`font-size:${Math.max(26 - (depth - 1) * 2, 18)}px;`}
            data-theme={$theme}
            data-doc-index={index}
        >
            <span>
                {`${index}. ${paragraph.title}`}
            </span>
        </div>
        <DocPreview content={paragraph.content} forRaw={true} />
        {#each paragraph.subParagraphs as subParagraph, i}
            {@render paragraphPreview(
                subParagraph,
                `${index}.${i + 1}`,
                depth + 1,
            )}
        {/each}
    </div>
{/snippet}

{@render editorTypeSelector()}
{#if type === "edit"}
    <textarea
        bind:value={content}
        bind:this={textarea}
        onkeydown={textAreaTabEvent}
    ></textarea>
{:else}
    <div class="preview-container">
        <DocPreview content={contentTree.content} forRaw={true} />
        {#each contentTree.subParagraphs as paragraph, i}
            {@render paragraphPreview(paragraph, (i + 1).toString(), 1)}
        {/each}
    </div>
{/if}

<style>
    input[type="radio"] {
        display: none;
    }

    label {
        height: 30px;

        padding-inline: 10px;

        border-radius: 5px 5px 0 0;

        background-color: rgb(212, 212, 212);

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
    }

    label.selected {
        background-color: rgb(176, 176, 176);
    }
    label[data-theme="dark"] {
        background-color: rgb(67, 67, 67);
        color: white;
    }
    label.selected[data-theme="dark"] {
        background-color: rgb(99, 99, 99);
    }

    .row-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    textarea {
        width: 100%;
        min-height: 500px;

        resize: vertical;

        font-family: "Sans Serif";
        font-size: 16px;

        box-sizing: border-box;
        border: 2px solid black;
    }

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
            transform: rotate(-90deg) translateY(-1px);
            color: #cf4844;
        }
    }

    .paragraph-title[data-theme="dark"] {
        color: #e1a743;
        border-color: #e1a743;
        &::before {
            color: #e1a743;
        }
    }

    .preview-container {
        border: 2px solid black;
    }
</style>
