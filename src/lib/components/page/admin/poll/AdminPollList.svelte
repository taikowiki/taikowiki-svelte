<script lang="ts">
    import { Poll } from "$lib/module/poll/poll.client";
    import { error } from "@sveltejs/kit";

    interface Props {
        polls: (Poll.Data & { memo: string | null })[];
    }

    let { polls: polls_ }: Props = $props();
    let polls = $state(polls_);

    async function deletePoll(id: number){
        const response = await Poll.Client.adminRequest.deletePoll(id);

        if(response.status === "success"){
            polls = polls.filter((poll) => poll.id !== id);
            alert('성공');
        }
        else{
            alert(`오류 발생: ${response.reason}`)
        }
    }
</script>

<table>
    <thead>
        <tr>
            <th class="th-id"> ID </th>
            <th> 메모 </th>
            <th class="th-delete"></th>
        </tr>
    </thead>
    <tbody>
        {#each polls as poll}
            <tr>
                <td>
                    {poll.id}
                </td>
                <td>
                    {poll.memo ?? "[메모 없음]"}
                </td>
                <td>
                    <button class="standard" onclick={() => deletePoll(poll.id)}>
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

        & .th-id,
        & .th-delete {
            width: 100px;
        }

        & td {
            text-align: center;
        }
    }
</style>
