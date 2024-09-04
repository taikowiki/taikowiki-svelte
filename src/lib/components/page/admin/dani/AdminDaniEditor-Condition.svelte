<script lang="ts">
    import type { DaniCondition } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { MouseEventHandler } from "svelte/elements";

    export let condition: DaniCondition;
    export let deleteCondition: MouseEventHandler<any>;

    const conditionTypes = [
        "gauge",
        "combo",
        "score",
        "roll",
        "hit",
        "good",
        "ok",
        "bad",
        "score_sum",
    ];

    let redCriteria = condition.criteria.red.join(", ");
    let goldCriteria = condition.criteria.gold.join(", ");

    $: condition.criteria.red = redCriteria
        .split(",")
        .map((e) => Number(e.trim()));
    $: condition.criteria.gold = goldCriteria
        .split(",")
        .map((e) => Number(e.trim()));

    const lang = getLang();
    $: conditionI18n = getI18N('component', $lang).DaniDisplay.type
</script>

<table>
    <tr>
        <td> 종류 </td>
        <td>
            <select bind:value={condition.type}> 
                {#each conditionTypes as conditionType}
                    <option value={conditionType}>
                        {conditionI18n[conditionType]}
                    </option>
                {/each}
            </select>
        </td>
        <td rowspan="3">
            <button on:click={deleteCondition}>삭제</button>
        </td>
    </tr>
    <tr>
        <td> 적합격 </td>
        <td>
            <input type="text" bind:value={redCriteria} placeholder="콤마로 구분할 것"/>
        </td>
    </tr>
    <tr>
        <td> 금합격 </td>
        <td>
            <input type="text" bind:value={goldCriteria} placeholder="콤마로 구분할 것" />
        </td>
    </tr>
</table>

<style>
    table{
        border: 1px solid black;
        border-collapse: collapse;
    }
    
    td{
        border: 1px solid black;
    }
</style>