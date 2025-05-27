<script lang="ts">
    import type { DaniType } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { MouseEventHandler } from "svelte/elements";

    interface Props {
        condition: DaniType.Condition;
        deleteCondition: MouseEventHandler<any>;
    }

    let { condition = $bindable(), deleteCondition }: Props = $props();

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

    let redCriteria = $state(condition.criteria.red.join(", "));
    let goldCriteria = $state(condition.criteria.gold.join(", "));

    $effect.pre(() => {
        condition.criteria.red = redCriteria
            .split(",")
            .map((e) => e.trim())
            .filter((e) => e !== "")
            .map((e) => Number(e));
    });
    $effect.pre(() => {
        condition.criteria.gold = goldCriteria
            .split(",")
            .map((e) => e.trim())
            .filter((e) => e !== "")
            .map((e) => Number(e));
    });

    const lang = getLang();
    let conditionI18n = $derived(getI18N("component", $lang).DaniDisplay.type);
</script>

<table>
    <tbody>
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
                <button onclick={deleteCondition}>삭제</button>
            </td>
        </tr>
        <tr>
            <td> 적합격 </td>
            <td>
                <input
                    type="text"
                    bind:value={redCriteria}
                    placeholder="콤마로 구분할 것"
                />
            </td>
        </tr>
        <tr>
            <td> 금합격 </td>
            <td>
                <input
                    type="text"
                    bind:value={goldCriteria}
                    placeholder="콤마로 구분할 것"
                />
            </td>
        </tr>
    </tbody>
</table>

<style>
    table {
        border: 1px solid black;
        border-collapse: collapse;
    }

    td {
        border: 1px solid black;
    }
</style>
