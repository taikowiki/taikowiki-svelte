<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";
    import type { Course } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";
    import FumenDisplay from "./FumenDisplay.svelte";

    interface Props {
        course: Course;
    }
    let { course }: Props = $props();

    const [theme] = getTheme();

    course.balloon = course.balloon ?? [0];
    course.rollTime = course.rollTime ?? [0];
    course.daniUsed = course.daniUsed ?? 0;

    let balloonOpened = $state(false);
    let rollOpened = $state(false);
    let daniOpened = $state(false);

    const lang = getLang();
    let daniI18n = $derived(getI18N("other", $lang).dani);
    let i18n = $derived(getI18N($lang).page.songNo.course);

    function containerStyle(){
        return course.images.length === 0 ? 
            "min-height:170px;" :
            "min-height: 136px;";
    }
    function displayStyle(){
        return `width: 100%;display:flex;${course.images.length === 0
                ? "min-height:calc(170px / 4 * 3);"
                : "min-height: 102px;"}`;
    }
</script>

{#snippet firstRow()}
    <tr class={course.images.length ? "no-image" : "has-image"}>
        <td> {i18n.combos} </td>
        <td>
            {course.maxCombo}
        </td>
        <td> {i18n.branched} </td>
        <td>
            {course.isBranched ? "O" : "X"}
        </td>
    </tr>
{/snippet}
{#snippet secondRow()}
    {#snippet balloons()}
        <td>{i18n.balloons}</td>
        <td>
            <div
                class="opener"
                class:opened={balloonOpened}
                onclick={() => {
                    balloonOpened = !balloonOpened;
                }}
                role="presentation"
            >
                {i18n.total}
                <span style="font-weight:bold;"
                    >{course.balloon.reduce(
                        (partial, current) => partial + current,
                        0,
                    )}</span
                >{i18n.count}
            </div>
            {#if balloonOpened}
                <div class="detail">
                    {course.balloon.join(", ")}
                </div>
            {/if}
        </td>
    {/snippet}
    {#snippet roll()}
        <td> {i18n.roll} </td>
        <td>
            <div
                class="opener"
                class:opened={rollOpened}
                onclick={() => {
                    rollOpened = !rollOpened;
                }}
                role="presentation"
            >
                {i18n.total}
                <span style="font-weight:bold;"
                    >{Math.round(
                        course.rollTime.reduce(
                            (partial, current) => partial + current,
                            0,
                        ) * 1000,
                    ) / 1000}</span
                >{i18n.sec}
            </div>
            {#if rollOpened}
                <div class="detail">
                    {course.rollTime.join(", ")}
                </div>
            {/if}
        </td>
    {/snippet}
    <tr class={course.images.length ? "no-image" : "has-image"}>
        {@render balloons()}
        {@render roll()}
    </tr>
{/snippet}
{#snippet thirdRow()}
    {#snippet density()}
        <td>{i18n.density}</td>
        <td>
            {course.maxDensity}
            {i18n.hitsec}
        </td>
    {/snippet}
    {#snippet playTime()}
        <td> {i18n.playTime} </td>
        <td>
            {course.playTime}
            {i18n.sec}
        </td>
    {/snippet}
    <tr class={course.images.length ? "no-image" : "has-image"}>
        {@render density()}
        {@render playTime()}
    </tr>
{/snippet}
{#snippet dani()}
    {#if course.daniUsed}
        <div class="dani-container" data-theme={$theme}>
            <div
                class="dani-opener"
                style={course.images.length === 0
                    ? "height:calc(170px / 4 - 2px);"
                    : "height: 32.5px;"}
                class:opened={daniOpened}
                role="presentation"
                onclick={() => {
                    daniOpened = !daniOpened;
                }}
            >
                {i18n.daniList}
            </div>
            {#if daniOpened}
                <div class="dani">
                    {#each course.dani as dani}
                        <span>
                            {daniI18n.version[dani.version]}
                            {daniI18n.dan[dani.dan]}
                            {dani.order}{i18n.nthSong}
                        </span>
                    {/each}
                </div>
            {/if}
        </div>
    {:else}
        <div
            style={course.images.length === 0
                ? "height:calc(170px / 4);"
                : "height: 34px;"}
            class="nodani-container"
            data-theme={$theme}
        >
            {i18n.noDani} X
        </div>
    {/if}
{/snippet}
{#snippet images()}
    {#if course?.images}
        <FumenDisplay images={course.images} />
    {/if}
{/snippet}

<div
    class="container"
    style={containerStyle()}
>
    <div
        style={displayStyle()}
    >
        <table data-theme={$theme}>
            <tbody>
                {@render firstRow()}
                {@render secondRow()}
                {@render thirdRow()}
            </tbody>
        </table>
    </div>
    {@render dani()}
    {@render images()}
</div>

<style>
    .container {
        width: calc(100% - 80px);
        display: flex;
        flex-direction: column;
    }

    table {
        flex: 1 0 auto;
        border-collapse: collapse;
        max-width: 100%;
    }

    tr.has-image {
        min-height: calc(170px / 3);
    }
    tr.no-image {
        min-height: 34px;
    }

    td {
        width: 25% !important;
        text-align: center;
        border: 1px solid #cf4844;
        box-sizing: border-box;
    }
    td:nth-child(2n-1) {
        background-color: #cf4844;
        color: white;
    }
    table[data-theme="dark"] td {
        border-color: #1c1c1c;
    }
    table[data-theme="dark"] td:nth-child(2n-1) {
        background-color: #1c1c1c;
    }

    .opener {
        cursor: pointer;
    }
    .opener:not(.opened)::after {
        content: " ▼";
    }
    .opened::after {
        content: " ▲";
    }
    .detail {
        font-size: 13px;
    }

    .dani-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #cf4844;
        box-sizing: border-box;
    }
    .dani-container[data-theme="dark"] {
        border-color: #1c1c1c;
    }
    .dani-opener {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;

        background-color: #cf4844;

        color: white;

        cursor: pointer;
    }
    .dani-opener:not(.opened)::after {
        content: "▼";
    }
    .dani-opener.opened::after {
        content: "▲";
    }
    .dani-container[data-theme="dark"] > .dani-opener {
        background-color: #1c1c1c;
    }
    .dani-opener.opened {
        border-bottom: 1px solid #cf4844;
    }
    .dani-container[data-theme="dark"] > .dani-opener.opened {
        border-color: #1c1c1c;
    }
    .nodani-container {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-color: #cf4844;
        color: white;
    }
    .nodani-container[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .dani {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .dani > span {
        transform: translateY(-1px);
    }
</style>
