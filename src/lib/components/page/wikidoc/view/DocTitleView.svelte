<script lang="ts">
    import { DateTime } from "luxon";
    import DocEditBtn from "./DocView/DocEditBtn.svelte";
    import DocLogBtn from "../../wikidoc/view/DocView/DocLogBtn.svelte";

    interface Props {
        id: number;
        title: string;
        editedTime: Date;
        canEditable: boolean;
    }
    let { id, title, editedTime, canEditable }: Props = $props();
</script>

<h1 class="container">
    <div class="title">
        {title}
    </div>
    <div class="title-others">
        <div class="icon-container">
            {#if canEditable}
                <DocEditBtn {id} {title} />
            {/if}
            <DocLogBtn {id} />
        </div>
        <div class="title-date">
            최근 수정 시각:
            {DateTime.fromJSDate(editedTime, {
                zone: "Asia/Seoul",
            }).toFormat("yyyy-MM-dd")}
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
    }
    .title-date {
        color: gray;
        font-weight: normal;
        font-size: 13px;
    }
</style>
