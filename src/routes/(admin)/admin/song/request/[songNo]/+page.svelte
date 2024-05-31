<script lang="ts">
    import {page} from '$app/stores';

    export let data;
</script>

<a href="/admin/song">곡 목록으로 돌아가기</a>
<table>
    <tr>
        <th style="width: 300px;"> createdTime </th>
        <th> uuid </th>
        <th> ip </th>
        <th style="width: 150px;">-</th>
    </tr>
    {#each data.requests as request}
        <tr>
            <td>
                {new Date(request.createdTime).toLocaleString()}
            </td>
            <td>
                {request.UUID}
            </td>
            <td>
                {request.ip}
            </td>
            <td>
                <a href={`/admin/song/request/${$page.params.songNo}/${request.order}`}>살펴보기</a>
            </td>
        </tr>
    {/each}
</table>

<style>
    table{
        width: 100%;
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
    }
</style>