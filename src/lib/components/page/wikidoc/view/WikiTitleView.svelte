<script lang="ts">
    import { DateTime } from "luxon";
    import WikiDocEditBtn from "./WikiView/WikiDocEditBtn.svelte";
    import WikiDocLogBtn from "./WikiView/WikiDocLogBtn.svelte";

    interface Props {
        docViewData: any;
    }
    let { docViewData }: Props = $props();
</script>

<h1 class="container">
    <div class="title">
        {docViewData.title}
    </div>
    <div class="title-others">
        <div class="icon-container">
            <WikiDocEditBtn id={docViewData.id} title={docViewData.title} />
            <WikiDocLogBtn id={docViewData.id} />
        </div>
        <div class="title-date">
            최근 수정 시각:
            {DateTime.fromJSDate(docViewData.editedTime, {
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
