<script lang="ts">
    import DiffchartAdminEditor from "$lib/components/page/admin/diffchart/Diffchart-Admin-Editor.svelte";

    let { data } = $props();

    let diffchartDatas = $state(data.diffchartDatas);
</script>

<table>
    <thead>
        <tr>
            <th style="width: calc(100% / 3);"> 종류 </th>
            <th style="width: calc(100% / 3);"> 레벨 </th>
            <th> </th>
        </tr>
    </thead>
    <tbody>
        {#each diffchartDatas as diffchartData}
            <DiffchartAdminEditor {diffchartData} />
        {/each}
        <tr>
            <td colspan="3">
                <button
                    onclick={() => {
                        diffchartDatas.push({
                            name: "",
                            type: "clear",
                            level: 1,
                            data: {
                                name: "",
                                sections: [],
                            },
                            comment: null,
                        });
                    }}
                >
                    추가하기
                </button>
            </td>
        </tr>
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        border: 1px solid black;
    }
</style>
