<script lang="ts">
    // @ts-nocheck
    import color from "$lib/module/common/color";
    import type { Course, Difficulty } from "$lib/module/common/song/types";
    import DaniEditor from "./DaniEditor.svelte";

    export let difficulty: Difficulty;
    export let course: Course | null;

    const init: Course = {
        level: 1,
        isBranched: 0,
        maxCombo: 0,
        playTime: 0,
        balloon: [],
        rollTime: [],
        maxDensity: 0,
        daniUsed: 0,
        dani: [],
    };

    let daniUsed = Boolean(course?.daniUsed ?? 0);
    $: if (course) {
        course.daniUsed = Number(daniUsed) as 0 | 1;
    }

    let isBranched = Boolean(course?.isBranched ?? 0);
    $: if (course) {
        course.isBranched = Number(isBranched) as 0 | 1;
    }
</script>

<div style={`border: 2px solid ${color.difficulty[difficulty]};width:100%;`}>
    <table class="wrapper">
        <tr>
            <td style="font-weight:bold;width:150px;">
                {difficulty}
                {#if difficulty === "ura"}
                    <input
                        type="checkbox"
                        on:change={(event) => {
                            if (event.currentTarget.checked) {
                                course = init;
                            } else {
                                course = null;
                            }
                        }}
                    />
                {/if}
            </td>
            <td>
                {#if course !== null}
                    <table class="data">
                        <tr>
                            <td> 레벨 </td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    bind:value={course.level}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td> 분기 여부 </td>
                            <td>
                                <input
                                    type="checkbox"
                                    bind:checked={isBranched}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td> 최대 노트 수 </td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    bind:value={course.maxCombo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>최대 연주 시간(초)</div>
                                <div class="sub">
                                    첫 번째 동/캇 노트에서 마지막 동/캇
                                    노트까지의 시간입니다.
                                </div>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    bind:value={course.playTime}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td> 최대 밀도 (타/초) </td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    bind:value={course.maxDensity}
                                />
                                <button
                                    on:click={() => {
                                        if (course.playTime !== 0) {
                                            course.maxDensity = Math.round(
                                                course.maxCombo / course.playTime * 100
                                            ) / 100;
                                        } else {
                                            course.maxDensity = 0;
                                        }
                                    }}
                                >
                                    계산하기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>최대 풍선 수</div>
                                <div class="sub">쉼표로 구분 해 주세요.</div>
                            </td>
                            <td>
                                <textarea
                                    on:change={(event) => {
                                        const text = event.currentTarget.value;

                                        course.balloon = text
                                            .split(",")
                                            .map((v) => {
                                                const num = Number(v.trim());
                                                if (isNaN(num) || num === 0) {
                                                    return null;
                                                }
                                                return num;
                                            })
                                            .filter((e) => e !== null);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>최대 연타 시간 (초)</div>
                                <div class="sub">쉼표로 구분 해 주세요.</div>
                            </td>
                            <td>
                                <textarea
                                    on:change={(event) => {
                                        const text = event.currentTarget.value;

                                        course.rollTime = text
                                            .split(",")
                                            .map((v) => {
                                                const num = Number(v.trim());
                                                if (isNaN(num) || num === 0) {
                                                    return null;
                                                }
                                                return num;
                                            })
                                            .filter((e) => e !== null);
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                단위
                                <input
                                    type="checkbox"
                                    bind:checked={daniUsed}
                                />
                            </td>
                            <td>
                                {#if Boolean(course.daniUsed)}
                                    <button
                                        on:click={() => {
                                            course.dani.push({
                                                version: "katsudon",
                                                dan: "senpo",
                                                order: 1,
                                            });
                                            course.dani = course.dani;
                                        }}>추가</button
                                    >
                                    {#each course.dani as dani}
                                        <DaniEditor bind:dani />
                                    {/each}
                                {/if}
                            </td>
                        </tr>
                    </table>
                {/if}
            </td>
        </tr>
    </table>
</div>

<style>
    td {
        border: 1px solid gray;
    }

    .wrapper {
        width: 100%;
    }

    .wrapper > * > td:nth-child(2) {
        padding: 0;
        font-size: 15px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table td:nth-child(1) {
        width: 120px;
    }

    .sub {
        font-size: 11px;
        color: gray;
    }

    textarea {
        border: 1px solid black;
        width: calc(100% - 5px);
        resize: vertical;
    }
</style>
