<script lang="ts">
    import DIffchartEditor from "$lib/components/common/diffchart/DIffchart-Editor.svelte";
    import { type DiffChart } from "$lib/module/common/diffchart/types";
    export let diffchartData: {
        name: string;
        level: number;
        type: string;
        data: DiffChart;
    };

    let opened = false;
</script>

<tr>
    <td>
        {diffchartData.type}
    </td>
    <td>
        {diffchartData.level}
    </td>
    <td>
        <button on:click={() => {opened = !opened}}>
            {#if opened}
                접기
            {:else}
                펼치기
            {/if}
        </button>
    </td>
</tr>
{#if opened}
    <tr>
        <td colspan="3" style="border: 3px solid red;">
            <DIffchartEditor diffchart={diffchartData.data} />
        </td>
    </tr>
{/if}

<style>
    td {
        border: 1px solid black;
        text-align:center;
    }
</style>
