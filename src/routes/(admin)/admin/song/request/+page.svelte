<script lang="ts" module>
    import { Song } from '$lib/module/song/song.client';

    async function disapproveSelected(checked: number[]) {
        if (checked.length === 0) {
            return;
        }
        const response = await Song.Client.adminRequest.disapproveRequest({
            order: checked,
        });
        if (response.status === "success") {
            alert("거부 성공");

            location.reload();
        } else {
            alert("거부 실패");
        }
    }
</script>

<script lang="ts">
    let { data } = $props();

    let checked: number[] = $state([]);

    let allChecked = $derived(
        checked.length === data.requests.length && checked.length !== 0,
    );
</script>

<a href="/admin/song">곡 목록으로 돌아가기</a>
<div class="button-container">
    <button
        onclick={() => {
            disapproveSelected(checked);
        }}
    >
        선택 항목 거부
    </button>
</div>
<table>
    <thead>
        <tr>
            <th style="width:20px;">
                <input
                    type="checkbox"
                    checked={allChecked}
                    onclick={(event) => {
                        if (event.currentTarget.checked) {
                            checked.push(...data.requests.map((e) => e.order));
                            checked = checked;
                        } else {
                            checked = [];
                        }
                    }}
                />
            </th>
            <th style="width: 300px;"> createdTime </th>
            <th> 곡 번호 </th>
            <th> uuid </th>
            <th> ip </th>
            <th style="width: 150px;">-</th>
        </tr>
    </thead>
    <tbody>
        {#each data.requests as request}
            <tr>
                <td>
                    <input
                        type="checkbox"
                        checked={checked.includes(request.order)}
                        onclick={(event) => {
                            if (event.currentTarget.checked) {
                                checked.push(request.order);
                                checked = checked;
                            } else {
                                checked = checked.filter(
                                    (e) => e !== request.order,
                                );
                            }
                        }}
                    />
                </td>
                <td>
                    {new Date(request.createdTime).toLocaleString()}
                </td>
                <td>
                    {request.songNo}
                </td>
                <td>
                    {request.UUID}
                </td>
                <td>
                    {request.ip}
                </td>
                <td>
                    <a href={`/admin/song/request/order/${request.order}`}
                        >살펴보기</a
                    >
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
    }
</style>
