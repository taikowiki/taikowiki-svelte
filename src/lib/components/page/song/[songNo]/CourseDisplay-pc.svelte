<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { Course } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";
    import FumenDisplay from "./FumenDisplay.svelte";

    export let course: Course;
    const [theme] = getTheme();

    course.balloon = course.balloon ?? [0];
    course.rollTime = course.rollTime ?? [0];
    course.daniUsed = course.daniUsed ?? 0;

    let balloonOpened = false;
    let rollOpened = false;
    let daniOpened = false;

    const lang = getLang();
    $: daniI18n = getI18N("other", $lang).dani;
</script>

<div
    class="container"
    style={course.images.length === 0
        ? "min-height:170px;"
        : "min-height: 136px;"}
>
    <div
        style={`width: 100%;display:flex;${
            course.images.length === 0
                ? "height:calc(170px / 4 * 3);"
                : "height: 102px;"
        }`}
    >
        <table data-theme={$theme}>
            <tr>
                <td> 최대 노트 수 </td>
                <td>
                    {course.maxCombo}
                </td>
                <td> 분기 여부 </td>
                <td>
                    {course.isBranched ? "O" : "X"}
                </td>
            </tr>
            <tr>
                <td>최대 풍선 수</td>
                <td>
                    <div
                        class="opener"
                        class:opened={balloonOpened}
                        on:click={() => {
                            balloonOpened = !balloonOpened;
                        }}
                        role="presentation"
                    >
                        총 <span style="font-weight:bold;"
                            >{course.balloon.reduce(
                                (partial, current) => partial + current,
                                0,
                            )}</span
                        >개
                    </div>
                    {#if balloonOpened}
                        <div class="detail">
                            {course.balloon.join(", ")}
                        </div>
                    {/if}
                </td>
                <td> 최대 연타 시간 </td>
                <td>
                    <div
                        class="opener"
                        class:opened={rollOpened}
                        on:click={() => {
                            rollOpened = !rollOpened;
                        }}
                        role="presentation"
                    >
                        총 <span style="font-weight:bold;"
                            >{Math.round(
                                course.rollTime.reduce(
                                    (partial, current) => partial + current,
                                    0,
                                ) * 1000,
                            ) / 1000}</span
                        >초
                    </div>
                    {#if rollOpened}
                        <div class="detail">
                            {course.rollTime.join(", ")}
                        </div>
                    {/if}
                </td>
            </tr>
            <tr>
                <td>최대 밀도</td>
                <td>
                    {course.maxDensity} 타/초
                </td>
                <td> 최대 연주 시간 </td>
                <td>
                    {course.playTime} 초
                </td>
            </tr>
        </table>
    </div>
    {#if course.daniUsed}
        <div class="dani-container" data-theme={$theme}>
            <div
                class="dani-opener"
                style={course.images.length === 0
                    ? "height:calc(170px / 4 - 2px);"
                    : "height: 32px;"}
                class:opened={daniOpened}
                role="presentation"
                on:click={() => {
                    daniOpened = !daniOpened;
                }}
            >
                단위 수록 목록
            </div>
            {#if daniOpened}
                <div class="dani">
                    {#each course.dani as dani}
                        <span>
                            {daniI18n.version[dani.version]}
                            {daniI18n.dan[dani.dan]}
                            {dani.order}번째 곡
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
            단위 수록 X
        </div>
    {/if}
    {#if course?.images}
        <FumenDisplay images={course.images} />
    {/if}
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
    }

    td {
        width: 25%;
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
    .dani-container[data-theme="dark"]{
        border-color:#1c1c1c;
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
    .dani-opener.opened{
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
    .nodani-container[data-theme="dark"]{
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
