<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { Notice } from "$lib/module/common/notice/types";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        notices: {
            wiki: Omit<Notice, "content">[];
            official: Omit<Notice, "content">[];
        };
    }

    let {notices}: Props = $props();

    const [theme] = getTheme();
    const lang = getLang();
    let noticeI18n = $derived(getI18N("/notice", $lang));
    let indexNoticeI18n = $derived(getI18N($lang).page.index.notice);
</script>

<div class="container">
    <div class="sub-container" data-theme={$theme}>
        <a
            class="sub-container-title"
            data-theme={$theme}
            href="/notice?type=wiki"
        >
            <span>
                {noticeI18n.type.wiki}
                {indexNoticeI18n}
            </span>
        </a>
        {#each notices.wiki as notice}
            <a
                class="notice-title"
                data-theme={$theme}
                href={`/notice/${notice.order}`}
            >
                {notice.title}
            </a>
        {/each}
    </div>
    <div class="sub-container" data-theme={$theme}>
        <a
            class="sub-container-title"
            data-theme={$theme}
            href="/notice?type=official"
        >
            <span>
                {noticeI18n.type.official}
                {indexNoticeI18n}
            </span>
        </a>
        {#each notices.official as notice}
            <a
                class="notice-title"
                data-theme={$theme}
                href={`/notice/${notice.order}`}
            >
                {notice.title}
            </a>
        {/each}
    </div>
</div>

<style>
    .container {
        width: min(700px, 100%);
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        column-gap: 10px;
        row-gap: 10px;

        margin-top: 15px;
    }

    .sub-container {
        width: min(345px, 100%);
        min-height: 114px;
        box-shadow: 0px 0px 3px #d4d4d4;
        border-radius: 5px;

        box-sizing: border-box;

        display: flex;
        flex-direction: column;
    }
    .sub-container[data-theme="dark"] {
        box-shadow: none;
        background-color: #1c1c1c;
    }

    .sub-container-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding-inline-start: 5px;

        margin-bottom: 3px;

        font-weight: bold;
        color: black;
        &[data-theme="dark"] {
            color: white;
        }
    }
    .sub-container-title > span {
        width: fit-content;
        border-bottom: 2px solid #cf4844;
        font-size: 18px;
    }
    .sub-container-title[data-theme="dark"] > span {
        border-color: gray;
    }
    .sub-container-title::after {
        content: "〉";
        color: #cf4844;
    }
    .sub-container-title[data-theme="dark"]::after {
        color: gray;
    }

    .notice-title {
        width: fit-content;
        padding-inline: 5px;

        font-size: 15px;

        color: black;
        &[data-theme="dark"] {
            color: white;
        }
    }
    .notice-title:hover {
        text-decoration: underline;
    }
</style>
