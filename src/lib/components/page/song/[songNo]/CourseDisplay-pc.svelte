<script lang="ts">
    import type { Course } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";

    export let course: Course;
    const [theme] = getTheme();

    course.balloon = course.balloon ?? [0];
    course.rollTime = course.rollTime ?? [0];
    course.daniUsed = course.daniUsed ?? 0;

    let balloonOpened = false;
    let rollOpened = false;
    let daniOpened = false;
</script>

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
                    ).toFixed(2)}</span
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
                    >{course.rollTime.reduce(
                        (partial, current) => partial + current,
                        0,
                    ).toFixed(2)}</span
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
    {#if course.daniUsed}
        <tr>
            <td colspan="4" class="dani-td">
                <div class="dani-container">
                    <div class="dani-opener" class:opened={daniOpened} role="presentation" on:click={() => {daniOpened = !daniOpened}}>
                        단위 수록 목록
                    </div>
                    {#if daniOpened}
                        <div class="dani">
                            {#each course.dani as dani}
                                {dani.version} {dani.dan} {dani.order}번째 곡
                            {/each}
                        </div>
                    {/if}
                </div>
            </td>
        </tr>
    {:else}
        <tr>
            <td colspan="2">단위 수록</td>
            <td colspan="2">X</td>
        </tr>
    {/if}
</table>

<style>
    table {
        flex: 1 0 auto;
        border-collapse: collapse;
    }

    td {
        width: 25%;
        text-align: center;
        border: 1px solid #cf4844;
        box-sizing: border-box;
        height: 42px;
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
        height: 42.5px;

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
</style>
