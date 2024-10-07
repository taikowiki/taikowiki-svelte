<script lang="ts">
    import type { Notice } from "$lib/module/common/notice/types";
    import { onMount } from "svelte";
    import "@toast-ui/editor/toastui-editor.css";
    import dayjs from "dayjs";
    import utc from "dayjs/plugin/utc";
    import timezone from "dayjs/plugin/timezone";

    export let notice: Omit<Notice, "order" | "writtenDate"> = {
        title: "",
        content: "",
        type: "wiki",
        officialDate: null,
    };

    //official date
    $: if (notice.type === "wiki") {
        notice.officialDate = null;
    }

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
    let officialDateInput: HTMLInputElement;
    onMount(() => {
        if (officialDateInput && notice.officialDate) {
            dayjs.extend(utc);
            dayjs.extend(timezone);
            const timeZone = dayjs.tz.guess();
            const officialDate = dayjs(notice.officialDate).tz(timeZone)
            officialDateInput.value = `${officialDate.format("YYYY-MM-DD")}T${officialDate.format("HH:mm:ss")}`;
        }
    });
</script>

<div class="title-container">
    <select bind:value={notice.type}>
        <option value="wiki"> 위키 </option>
        <option value="official"> 공식 </option>
    </select>
    {#if notice.type === "official"}
        <input
            type="datetime-local"
            bind:this={officialDateInput}
            on:input={(event) => {
                notice.officialDate = new Date(event.currentTarget.value);
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
