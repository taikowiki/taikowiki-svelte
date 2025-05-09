<script lang="ts">
    import { DateTime } from "luxon";
    import DocEditBtn from "./DocView/DocEditBtn.svelte";
    import DocLogBtn from "../../wikidoc/view/DocView/DocLogBtn.svelte";
    import { page } from "$app/state";
    import DocAdminBtn from "./DocView/DocAdminBtn.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        id: number;
        title: string;
        editedTime: Date;
        canEditable: boolean;
        version?: number;
    }
    let { id, title, editedTime, canEditable, version }: Props = $props();

    let isAdmin = $derived<boolean>(page.data.isAdmin);

    const isMobile = getIsMobile();
</script>

<h1 class="container">
    <div class="title">
        {title}
    </div>
    <div class="title-others" data-isMobile={$isMobile}>
        <div class="icon-container">
            {#if canEditable}
                <DocEditBtn {id} {title} {version} />
            {/if}
            <DocLogBtn {id} />
            {#if isAdmin}
                <DocAdminBtn {id} />
            {/if}
        </div>
        <div class="title-date">
            <div>최근 수정 시각:</div>
            <div>
                {DateTime.fromJSDate(editedTime, {
                    zone: "Asia/Seoul",
                }).toFormat("yyyy-MM-dd HH:mm:ss")}
            </div>
        </div>
        <div class="id">
            문서 Id: {id}
        </div>
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

    .icon-container {
        display: flex;
        flex-direction: row;
        margin-top: 13px;

        column-gap: 4px;
    }

    .title-others {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &[data-isMobile="true"] {
            max-width: 132px;
        }
    }
    .title-date, .id {
        color: gray;
        font-weight: normal;
        font-size: 13px;

        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
</style>
