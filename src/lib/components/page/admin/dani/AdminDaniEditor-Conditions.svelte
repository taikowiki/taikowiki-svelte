<script lang="ts">
    import type { DaniType } from "$lib/module/common/dani/types";
    import AdminDaniEditorCondition from "./AdminDaniEditor-Condition.svelte";

    interface Props {
        conditions: DaniType.Condition[];
    }

    let { conditions = $bindable() }: Props = $props();

    function addCondition() {
        conditions.push({
            type: "gauge",
            criteria: {
                red: [],
                gold: [],
            },
        });
    }

    function deleteCondition(index: number) {
        conditions = conditions.filter((_, i) => i !== index);
    }
</script>

<tr>
    <td>
        조건
        <button onclick={addCondition}> + </button>
    </td>
    <td>
        {#each conditions as _, index}
            <AdminDaniEditorCondition
                bind:condition={conditions[index]}
                deleteCondition={() => deleteCondition(index)}
            />
        {/each}
    </td>
</tr>

<style>
    td {
        border: 1px solid black;
    }

    td:nth-child(1) {
        width: 100px;
        text-align: center;
    }
</style>
