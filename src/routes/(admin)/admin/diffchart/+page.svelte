<script lang="ts">
    import DiffchartAdminEditor from "$lib/components/page/admin/diffchart/Diffchart-Admin-Editor.svelte";


    export let data;

    const { diffchartDatas } = data;
</script>

<table>
    <tr>
        <th> 종류 </th>
        <th> 레벨 </th>
        <th> 펼치기/접기 </th>
    </tr>
    {#each diffchartDatas as diffchartData}
        <DiffchartAdminEditor {diffchartData}/>
    {/each}
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th{
        border: 1px solid black;
    }
</style>
