<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import { Poll } from "$lib/module/poll/poll.client";
    import { Util } from "$lib/module/util";

    interface Props {
        polls: (Poll.Data & { memo: string | null })[];
    }

    let { polls: polls_ }: Props = $props();
    let polls = $state(polls_);
    let [theme] = getTheme();

    async function deletePoll(id: number) {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        const response = await Poll.Client.adminRequest.deletePoll(id);

        if (response.status === "success") {
            polls = polls.filter((poll) => poll.id !== id);
            alert("성공");
        } else {
            alert(`오류 발생: ${response.reason}`);
        }
    }

    async function downloadCSV(id: number) {
        const pollData = polls.find((poll) => poll.id === id);
        if (!pollData) {
            alert("설문을 찾을 수 없습니다.");
            return;
        }

        const answerPromise = Poll.Client.adminRequest.fetchAllAnswer(id);
        alert("CSV가 곧 다운로드 됩니다.");
        const response = await answerPromise;

        if (response.status === "error") {
            alert("오류 발생");
            return;
        }

        const answers = response.data;

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

<table>
    <thead>
        <tr>
            <th class="th-id"> ID </th>
            <th> 메모 </th>
            <th class="th-csv"> CSV 다운로드 </th>
            <th class="th-delete"> 삭제 </th>
        </tr>
    </thead>
    <tbody>
        {#each polls as poll}
            <tr>
                <td>
                    {poll.id}
                </td>
                <td>
                    {poll.memo || "[메모 없음]"}
                </td>
                <td>
                    <button
                        class="standard"
                        onclick={() => downloadCSV(poll.id)}
                        data-theme={$theme}>다운로드</button
                    >
                </td>
                <td>
                    <button
                        class="standard"
                        onclick={() => deletePoll(poll.id)}
                        data-theme={$theme}
                    >
                        삭제하기
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;

        & td,
        & th {
            border: 1px solid black;
        }

        & .th-id,
        & .th-delete,
        & .th-csv {
            width: 100px;
        }

        & td {
            text-align: center;
        }
    }
</style>
