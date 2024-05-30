<script lang="ts">
    import {page} from '$app/stores';

    export let data;
</script>

<table>
    <tr>
        <th> createdTime </th>
        <th> uuid </th>
        <th> </th>
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
                <a href={`/admin/song/request/${$page.params.songNo}/${request.order}`}>살펴보기</a>
            </td>
        </tr>
    {/each}
</table>

<style>
    table{
        width: 100%;
    }
</style>