<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
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
</script>

<table data-theme={$theme}>
    <tbody>
        <tr>
            <td> {i18n.combos} </td>
            <td>
                {course.maxCombo}
            </td>
        </tr>
        <tr>
            <td> {i18n.branched} </td>
            <td>
                {course.isBranched ? "O" : "X"}
            </td>
        </tr>
        <tr>
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
        </tr>
        <tr>
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
        </tr>
        <tr>
            <td>{i18n.density}</td>
            <td>
                {course.maxDensity}
                {i18n.hitsec}
            </td>
        </tr>
        <tr>
            <td> {i18n.playTime} </td>
            <td>
                {course.playTime}
                {i18n.sec}
            </td>
        </tr>
        {#if course.daniUsed}
            <tr>
                <td colspan="4" class="dani-td">
                    <div class="dani-container" data-theme={$theme}>
                        <div
                            class="dani-opener"
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
                </td>
            </tr>
        {:else}
            <tr>
                <td>{i18n.noDani}</td>
                <td>X</td>
            </tr>
        {/if}
    </tbody>
</table>
{#if course?.images}
    <FumenDisplay images={course.images} />
{/if}

<style>
    table {
        flex: 1 0 auto;
        border-collapse: collapse;
    }

    td {
        width: 50%;
        text-align: center;
        border: 1px solid #cf4844;
        box-sizing: border-box;
        height: 30px;
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

    .dani-td {
        background-color: transparent !important;
        padding: 0;
        color: inherit !important;
    }
    .dani-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .dani-opener {
        width: 100%;
        height: 30px;

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
