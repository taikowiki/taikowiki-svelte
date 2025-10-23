<script lang="ts">
    import { Layout } from "$lib/module/layout";
    import { Util } from "$lib/module/util";
    import { DateTime } from "luxon";

    let { data } = $props();
    let pollData = $state(data.pollData);
    let answers = $state(data.answers);

    function downloadCSV() {
        const columns = [
            "UUID",
            ...pollData.sections.map((section) => section.question),
        ];
        const datas = Object.values(answers).map((answer) => {
            const data: Record<string, string> = {
                UUID: answer.responderUUID,
            };
            answer.answers.map((e, i) => {
                data[columns[i + 1]] = e;
            });
            return data;
        });
        const csv = Util.toCSV(datas);
        const blob = new Blob([csv], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "response.csv";
        a.click();
        a.remove();
    }
</script>

<div class="container">
    {@render memoView()}
    {@render untilView()}
    <button onclick={downloadCSV}>CSV 다운로드</button>
</div>

{#snippet memoView()}
    <div class="memo-container">
        <h2>메모</h2>
        <div>{pollData.memo || "[메모 없음]"}</div>
    </div>
{/snippet}
{#snippet untilView()}
    <h3>마감일</h3>
    <div>
        {DateTime.fromJSDate(pollData.until, {
            zone: Layout.getTimezone(),
        }).toFormat("yyyy-MM-dd")}
    </div>
{/snippet}

<style>
    .container {
        width: 100%;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    h2,
    h3 {
        margin-block: 3px;
    }
</style>
