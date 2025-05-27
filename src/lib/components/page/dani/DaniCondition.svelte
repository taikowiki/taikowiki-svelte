<script lang="ts" module>
    function getSuffix2(conditionType: DaniType.ConditionType) {
        if (conditionType === "bad" || conditionType === "ok") {
            return "down";
        }
        return "up";
    }

    function getSuffix1(conditionType: DaniType.ConditionType) {
        switch (conditionType) {
            case "gauge": {
                return "percent";
            }
            case "hit": {
                return "times";
            }
            case "score": {
                return "point";
            }
        }
        return "count";
    }
</script>

<script lang="ts">
    import type { DaniType } from "$lib/module/common/dani/types";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        condition: DaniType.Condition;
    }

    let { condition = $bindable() }: Props = $props();

    const suffix1 = getSuffix1(condition.type);
    const suffix2 = getSuffix2(condition.type);

    const lang = getLang();
    let i18n = $derived(getI18N("component", $lang).DaniDisplay);

    const [theme] = getTheme();
</script>

{#snippet type()}
    <div class="type">
        <span>
            {i18n.type[condition.type]}
        </span>
    </div>
{/snippet}
{#snippet redCriteria()}
    <div class="item">
        <div class="red">
            <span>
                {condition.criteria.red.length === 0
                    ? "?"
                    : `${condition.criteria.red.join(", ")}${i18n.suffix1[suffix1]} ${i18n.suffix2[suffix2]}`}
            </span>
        </div>
    </div>
{/snippet}
{#snippet goldCriteria()}
    <div class="item">
        <div class="gold">
            <span>
                {condition.criteria.gold.length === 0
                    ? "?"
                    : `${condition.criteria.gold.join(", ")}${i18n.suffix1[suffix1]} ${i18n.suffix2[suffix2]}`}
            </span>
        </div>
    </div>
{/snippet}

<div class="container">
    <div class="layer" data-theme={$theme}>
        {@render type()}
        {@render redCriteria()}
        {@render goldCriteria()}
    </div>
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;

        row-gap: 5px;

        font-size: 14px;
    }

    .layer {
        width: 100%;
        min-height: 30px;

        display: flex;
        flex-direction: row;

        background-color: white;

        border-radius: 5px;

        column-gap: 4px;
    }
    .layer[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .type {
        width: 80px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: bold;

        margin-left: 4px;
    }
    .item {
        width: calc((100% - 88px) / 2);

        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: bold;
    }

    .red,
    .gold {
        width: calc(100%);
        height: calc(100%);

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 5px;

        color: white;

        box-sizing: border-box;
    }

    .red {
        background-color: #ff4a4a;
    }

    .gold {
        background-color: #f1b722;
    }

    span {
        transform: translateY(-1px);
        text-align: center;
        word-wrap: break-word;
        word-break: keep-all;
    }
</style>
