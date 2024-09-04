<script lang="ts">
    import type { DaniCondition } from "$lib/module/common/dani/types";
    import AdminDaniEditorCondition from "./AdminDaniEditor-Condition.svelte";

    export let conditions: DaniCondition[];

    function addCondition(){
        conditions = [...conditions, {
            type: 'gauge',
            criteria:{
                red: [],
                gold: []
            }
        }]
    }

    function deleteCondition(index: number){
        conditions = conditions.filter((_, i) => i !== index);
    }
</script>

<tr>
    <td>
        조건
        <button on:click={addCondition}> + </button>
    </td>
    <td>
        {#each conditions as condition, index}
            <AdminDaniEditorCondition bind:condition deleteCondition={() => deleteCondition(index)}/>
        {/each}
    </td>
</tr>

<style>
    td{
        border: 1px solid black;
    }

    td:nth-child(1){
        width: 100px;
        text-align: center;
    }
</style>