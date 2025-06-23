<script lang="ts">
    import type { Notice } from "$lib/module/notice";
    import { onMount } from "svelte";
    import "@toast-ui/editor/toastui-editor.css";
    import { DateTime } from "luxon";

    interface Props {
        notice: Omit<Notice.Notice, "order" | "writtenDate">;
    }

    let { notice = $bindable() }: Props = $props();
    let noticeType = $state(notice.type);

    //official date
    $effect.pre(() => {
        notice.type = noticeType;
        if (noticeType === "wiki") {
            notice.officialDate = null;
        }
    });

    //editor
    let editorContainer: HTMLDivElement;
    onMount(async () => {
        const editorOption = {
            height: "500px",
            hideModeSwitch: true,
            language: "ko-KR",
            initialEditType: "markdown",
            toolbarItems: [
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task", "indent", "outdent"],
                ["table", "image", "link"],
                ["code", "codeblock"],
            ],
        };

        //@ts-expect-error
        const Editor = (await import("@toast-ui/editor")).default;

        let editor = new Editor({
            initialValue: notice.content,
            el: editorContainer,
            theme: "light",
            ...editorOption,
        });
        editor.addHook("change", () => {
            notice.content = editor.getMarkdown();
        });
    });

    //official date
    let officialDateInput: HTMLInputElement|undefined = $state();
    onMount(() => {
        if (officialDateInput && notice.officialDate) {
            const officialDate = DateTime.fromJSDate(notice.officialDate, {
                zone: "Asia/Seoul",
            });
            officialDateInput.value = `${officialDate.toFormat("yyyy-MM-dd")}T${officialDate.toFormat("HH:mm:ss")}`;
        }
    });
</script>

<div class="title-container">
    <select bind:value={noticeType}>
        <option value="wiki"> 위키 </option>
        <option value="official"> 공식 </option>
    </select>
    {#if noticeType === "official"}
        <input
            type="datetime-local"
            bind:this={officialDateInput}
            oninput={(event) => {
                notice.officialDate = DateTime.fromFormat(
                    event.currentTarget.value,
                    "yyyy-MM-dd'T'HH:mm",
                    { zone: "Asia/Seoul" },
                ).toJSDate();
            }}
        />
    {/if}
    <input
        class="title-input"
        type="text"
        bind:value={notice.title}
        placeholder="제목"
    />
</div>
<div class="editor-container" bind:this={editorContainer}></div>

<style>
    .title-container {
        width: 100%;
        display: flex;
    }

    .title-input {
        flex: 1 1 auto;
        height: 30px;
        font-size: 20px;
    }
</style>
