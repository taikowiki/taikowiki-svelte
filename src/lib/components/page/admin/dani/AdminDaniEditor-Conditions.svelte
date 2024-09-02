<script lang="ts">
    import type { DaniCondition } from "$lib/module/common/dani/types";
    import AdminDaniEditorCondition from "./AdminDaniEditor-Condition.svelte";


    export let conditions: DaniCondition[];
</script>

<tr>
    <td>
        조건
        <button> + </button>
    </td>
    <td>
        {#each conditions as condition}
            <AdminDaniEditorCondition bind:condition/>
        {/each}
    </td>
</tr>

<style>
    td{
        border: 1px solid black;
    }

    td:nth-child(1){
        width: 100px;
    }
</style>