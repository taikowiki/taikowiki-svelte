<script lang="ts">
    import { page } from "$app/stores";

    export let data;
</script>

<table>
    <tr>
        <th style="width: 300px;"> createdTime </th>
        <th> 곡 번호 </th>
        <th> uuid </th>
        <th style="width: 150px;"> </th>
    </tr>
    {#each data.requests as request}
        <tr>
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
                <a
                    href={`/admin/song/request/list/${request.order}`}
                    >살펴보기</a
                >
            </td>
        </tr>
    {/each}
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
