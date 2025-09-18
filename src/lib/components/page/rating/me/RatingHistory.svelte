<script lang="ts">
    import { User } from "$lib/module/user";
    import { DateTime } from "luxon";
    import { onMount } from "svelte";

    interface Props {
        ratingHistory: User.DonderData["ratingHistory"];
    }

    let { ratingHistory: rawRatingHistory }: Props = $props();

    let ratingHistory = $derived(removeDuplicatedHistory(rawRatingHistory));
    let [minRating, maxRating] = $derived(getMinMaxRating(ratingHistory));
    let pointXDistance = 50;
    let svgWidth = $derived((ratingHistory.length + 1) * pointXDistance);
    let svgHeight = 300;
    let svgPointRadius = 8;
    let svgBlockPadding = 20;

    let container = $state<HTMLDivElement | null>(null);
    onMount(() => {
        container?.scrollTo({ left: container.scrollWidth });
    });

    function removeDuplicatedHistory(ratingHistory: Props["ratingHistory"]) {
        if (ratingHistory.length === 0) return [];
        if (ratingHistory.length === 1) return [ratingHistory[0]];
        const refined: Props["ratingHistory"] = [ratingHistory[0]];

        let lastData = ratingHistory[0];
        for (let i = 1; i < ratingHistory.length - 1; i++) {
            if (
                lastData[1] !== ratingHistory[i][1] ||
                ratingHistory[i][1] !== ratingHistory[i + 1][1]
            ) {
                refined.push(ratingHistory[i]);
                lastData = ratingHistory[i];
            }
        }

        refined.push(ratingHistory[ratingHistory.length - 1]);

        return refined;
    }

    function getMinMaxRating(ratingHistory: Props["ratingHistory"]) {
        if (ratingHistory.length === 0) return [0, 0];

        let min = ratingHistory[0][1];
        let max = ratingHistory[0][1];

        for (let i = 1; i < ratingHistory.length; i++) {
            if (ratingHistory[i][1] < min) {
                min = ratingHistory[i][1];
            } else if (ratingHistory[i][1] > max) {
                max = ratingHistory[i][1];
            }
        }

        return [min, max];
    }

    function getPointHeight(rating: number) {
        const ratio = maxRating
            ? ratingHistory.length === 1
                ? 0.5
                : (rating - minRating) / (maxRating - minRating)
            : 0;
        return (1 - ratio) * svgHeight + svgBlockPadding;
    }

    function getRatingColor(rating: number) {
        const color = User.TIER_COLOR[User.getTier(rating).tierName];
        if (Array.isArray(color)) {
            return color[1];
        }
        return color;
    }

    function getFloatingLeft(index: number) {
        let left = (index + 0.5) * pointXDistance;
        if (left - 100 < 0) {
            left += 100 + svgPointRadius * 2 + 5;
        }
        return left;
    }

    function showFloating(index: number) {
        const floating = document.getElementById(`floating-${index}`);
        if (!floating) return;
        floating.classList.add("show");
    }

    function hideFloating(index: number) {
        const floating = document.getElementById(`floating-${index}`);
        if (!floating) return;
        floating.classList.remove("show");
    }
</script>

{#if ratingHistory.length}
    <h2>히스토리</h2>
    <div class="container" bind:this={container}>
        <div class="content">
            <svg width={svgWidth} height={svgHeight + svgBlockPadding * 2}>
                {#each ratingHistory as historyElement, i}
                    {#if i !== ratingHistory.length - 1}
                        <line
                            x1={(i + 0.5) * pointXDistance}
                            x2={(i + 1.5) * pointXDistance}
                            y1={getPointHeight(ratingHistory[i][1])}
                            y2={getPointHeight(ratingHistory[i + 1][1])}
                            stroke={getRatingColor(historyElement[1])}
                            stroke-width="3"
                        />
                    {/if}
                    <circle
                        cx={(i + 0.5) * pointXDistance}
                        cy={getPointHeight(ratingHistory[i][1])}
                        r={svgPointRadius}
                        fill={getRatingColor(historyElement[1])}
                        onmouseenter={() => {
                            showFloating(i);
                        }}
                        onmouseleave={() => {
                            hideFloating(i);
                        }}
                        role="presentation"
                    />
                {/each}
            </svg>
            {#each ratingHistory as historyElement, i}
                <div
                    class="floating"
                    style={`left:${getFloatingLeft(i)}px;top:${getPointHeight(ratingHistory[i][1])}px;background-color:${getRatingColor(historyElement[1])};`}
                    class:omega={User.getTier(historyElement[1]).tierName ===
                        "omega"}
                    id={`floating-${i}`}
                >
                    <div class="rating">
                        {historyElement[1]}
                    </div>
                    <div class="date">
                        {historyElement[0].getTime()
                            ? DateTime.fromJSDate(historyElement[0]).toFormat(
                                  "yyyy-MM-dd HH:mm:ss",
                              )
                            : "???"}
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    h2 {
        width: 100%;
        margin-bottom: 0;
    }

    .container {
        width: 100%;
        overflow-x: auto;
        text-align: center;
    }

    .content {
        width: fit-content;
        position: relative;
        display: inline-block;
    }

    svg {
        padding-block: 10px;
    }

    circle:hover {
        stroke: #9ba7b5;
        stroke-width: 3;
    }

    .floating {
        width: 100px;
        position: absolute;
        transform: translateX(calc(-100% - 10px));
        display: none;
        color:white;
        padding-bottom: 5px;
        border-radius: 5px;

        :global(&.show) {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & .rating {
            font-weight: bold;
        }

        & .date {
            color: rgb(255, 255, 255);
            font-size: 10px;
        }

        &.omega {
            color: black;
            & .date {
                color: rgb(98, 98, 98);
            }
        }
    }
</style>
