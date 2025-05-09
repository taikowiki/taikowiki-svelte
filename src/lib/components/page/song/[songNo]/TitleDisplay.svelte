<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { DateTime } from "luxon";
    import DocEditBtn from "../../wikidoc/view/DocView/DocEditBtn.svelte";
    import DocLogBtn from "../../wikidoc/view/DocView/DocLogBtn.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        title: string;
        songNo: string;
        docData: {
            id: number;
            title: string;
            canEditable: boolean;
            editedTime: Date;
        } | null;
    }

    let { title, songNo, docData }: Props = $props();

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

{#snippet docEdit()}
    {#if docData}
        {#if docData.canEditable}
            <DocEditBtn id={docData.id} title={docData.title} />
        {/if}
        <DocLogBtn id={docData.id} />
    {/if}
{/snippet}
{#snippet docDataView()}
    {#if docData}
        <div class="doc-data" data-isMobile={$isMobile}>
            <div class="title-date">
                <div>최근 수정 시각:</div>
                <div>
                    {DateTime.fromJSDate(docData.editedTime, {
                        zone: "Asia/Seoul",
                    }).toFormat("yyyy-MM-dd HH:mm:ss")}
                </div>
            </div>
            <div class="id">
                문서 Id: {docData.id}
            </div>
        </div>
    {/if}
{/snippet}
{#snippet youtube()}
    <a
        class="icon-anchor"
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`太鼓の達人 ${title}`)}`}
        data-theme={$theme}
        target="_blank"
    >
        <img class="icon" src="/assets/icon/youtube.svg" alt="edit" />
    </a>
{/snippet}
{#snippet edit()}
    <a class="icon-anchor" href={`/song/${songNo}/edit`} data-theme={$theme}>
        <img class="icon" src="/assets/icon/pen.svg" alt="edit" />
    </a>
{/snippet}

<h1 class="container">
    <div class="title">
        {title}
    </div>
    <div class="right">
        <div class="icon-container">
            {@render youtube()}
            {@render edit()}
            {@render docEdit()}
        </div>
        {@render docDataView()}
    </div>
</h1>

<style>
    h1 {
        margin: 0;
    }

    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        row-gap: 15px;

        margin-bottom: 15px;
    }
    .title {
        flex: 1 1 auto;
        max-width: calc(100% - 30px);

        font-weight: bold;
        font-size: 35px;

        word-break: break-all;
    }

    .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .icon-container {
        display: flex;
        flex-direction: row;
        margin-top: 13px;

        column-gap: 4px;
    }

    .icon {
        width: 20px;
        height: 20px;

        filter: invert(100%);
    }
    .icon-anchor {
        width: 30px;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #cf4844;

        border-radius: 5px;
    }
    .icon-anchor[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .doc-data {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &[data-isMobile="true"] {
            max-width: 132px;
        }
    }
    .title-date,
    .id {
        color: gray;
        font-weight: normal;
        font-size: 13px;

        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
</style>
