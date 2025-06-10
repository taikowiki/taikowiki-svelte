<script lang="ts">
    // @ts-nocheck
    import color from "$lib/module/common/color";
    import { getI18N, getLang } from "$lib/module/i18n";
    import type { Course, Difficulty } from "$lib/module/common/song/types";
    import DaniEditor from "./admin-DaniEditor.svelte";

    interface Props {
        difficulty: Difficulty;
        course: Course | null;
        compare: any;
    }

    let { difficulty, course = $bindable(), compare }: Props = $props();

    let init: Course = $state({
        level: 1,
        isBranched: 0,
        maxCombo: 0,
        playTime: 0,
        balloon: [],
        rollTime: [],
        maxDensity: 0,
        daniUsed: 0,
        dani: [],
        images: [],
    });

    let daniUsed = $state(Boolean(course?.daniUsed ?? 0));
    $effect.pre(() => {
        if (course) {
            course.daniUsed = Number(daniUsed) as 0 | 1;
        }
    });

    let isBranched = $state(Boolean(course?.isBranched ?? 0));
    $effect.pre(() => {
        if (course) {
            course.isBranched = Number(isBranched) as 0 | 1;
        }
    });

    const lang = getLang();
    let i18n = $derived(getI18N("component", $lang).SongEditor);
</script>

<div
    style={`${`border: 2px solid ${color.difficulty[difficulty]};width:100%;box-sizing:border-box;border-radius:2px;`}`}
    class:different={compare?.exists === true}
>
    <table class="wrapper">
        <tbody>
            <tr>
                <td class="r" style="font-weight:bold">
                    {i18n.difficulties[difficulty]}
                    {#if difficulty === "ura"}
                        <input
                            type="checkbox"
                            checked={!(course === null)}
                            onchange={(event) => {
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
                            <tbody>
                                <tr class:different={compare?.level === true}>
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
                                <tr
                                    class:different={compare?.isBranched ===
                                        true}
                                >
                                    <td> 분기 여부 </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            bind:checked={isBranched}
                                        />
                                    </td>
                                </tr>
                                <tr
                                    class:different={compare?.maxCombo === true}
                                >
                                    <td> 최대 노트 수 </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            bind:value={course.maxCombo}
                                        />
                                    </td>
                                </tr>
                                <tr
                                    class:different={compare?.playTime === true}
                                >
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
                                <tr
                                    class:different={compare?.maxDensity ===
                                        true}
                                >
                                    <td> 최대 밀도 (타/초) </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            bind:value={course.maxDensity}
                                        />
                                        <button
                                            onclick={() => {
                                                if (course.playTime !== 0) {
                                                    course.maxDensity =
                                                        Math.round(
                                                            (course.maxCombo /
                                                                course.playTime) *
                                                                100,
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
                                <tr class:different={compare?.balloon === true}>
                                    <td>
                                        <div>최대 풍선 수</div>
                                        <div class="sub">
                                            쉼표로 구분 해 주세요.
                                        </div>
                                    </td>
                                    <td>
                                        <textarea
                                            value={course?.balloon?.join(",") ??
                                                ""}
                                            onchange={(event) => {
                                                const text =
                                                    event.currentTarget.value;

                                                course.balloon = text
                                                    .split(",")
                                                    .map((v) => {
                                                        const num = Number(
                                                            v.trim(),
                                                        );
                                                        if (
                                                            isNaN(num) ||
                                                            num === 0
                                                        ) {
                                                            return null;
                                                        }
                                                        return num;
                                                    })
                                                    .filter((e) => e !== null);
                                            }}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr
                                    class:different={compare?.rollTime === true}
                                >
                                    <td>
                                        <div>최대 연타 시간 (초)</div>
                                        <div class="sub">
                                            쉼표로 구분 해 주세요.
                                        </div>
                                    </td>
                                    <td>
                                        <textarea
                                            value={course?.rollTime?.join(
                                                ",",
                                            ) ?? ""}
                                            onchange={(event) => {
                                                const text =
                                                    event.currentTarget.value;

                                                course.rollTime = text
                                                    .split(",")
                                                    .map((v) => {
                                                        const num = Number(
                                                            v.trim(),
                                                        );
                                                        if (
                                                            isNaN(num) ||
                                                            num === 0
                                                        ) {
                                                            return null;
                                                        }
                                                        return num;
                                                    })
                                                    .filter((e) => e !== null);
                                            }}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr
                                    class:different={compare?.dani === true ||
                                        compare?.daniUsed === true}
                                >
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
                                                onclick={() => {
                                                    course.dani.push({
                                                        version: "katsudon",
                                                        dan: "senpo",
                                                        order: 1,
                                                    });
                                                    course.dani = course.dani;
                                                }}>추가</button
                                            >
                                            <div
                                                class="dani-container-container"
                                            >
                                                {#each course.dani as dani, i}
                                                    <div class="dani-container">
                                                        <DaniEditor
                                                            bind:dani={course
                                                                .dani[i]}
                                                        />
                                                        <button
                                                            onclick={() => {
                                                                course.dani =
                                                                    course.dani.filter(
                                                                        (
                                                                            _,
                                                                            index,
                                                                        ) =>
                                                                            index !==
                                                                            i,
                                                                    );
                                                            }}>X</button
                                                        >
                                                    </div>
                                                {/each}
                                            </div>
                                        {/if}
                                    </td>
                                </tr>
                                <tr class:different={compare?.images === true}>
                                    <td> 보면 이미지 </td>
                                    <td>
                                        <div class="image-container-container">
                                            <div
                                                style="display:flex;align-items:center;"
                                            >
                                                <button
                                                    onclick={() => {
                                                        course.images.push("");
                                                    }}>추가</button
                                                >
                                            </div>
                                            {#each course.images as image, i}
                                                <div class="image-container">
                                                    <input
                                                        type="text"
                                                        bind:value={course
                                                            .images[i]}
                                                        placeholder="이미지 주소"
                                                    />
                                                    <button
                                                        onclick={() => {
                                                            course.images =
                                                                course.images.filter(
                                                                    (
                                                                        _,
                                                                        index,
                                                                    ) =>
                                                                        index !==
                                                                        i,
                                                                );
                                                        }}>X</button
                                                    >
                                                </div>
                                            {/each}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    {/if}
                </td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    td {
        border: 1px solid gray;
    }

    .wrapper {
        width: 100%;
    }

    .wrapper > * > * > td:nth-child(2) {
        padding: 0;
        font-size: 15px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table td:nth-child(1):not(.r) {
        width: 120px;
    }
    td:nth-child(1).r {
        padding-inline: 5px;
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

    .r {
        width: 150px;
    }
    @media only screen and (max-width: 1000px) {
        .r {
            width: 80px;
        }
    }

    .dani-container {
        display: flex;
        align-items: center;
    }
    .dani-container > button {
        width: 17px;
        height: 17px;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 0;
        background-color: #cf4844;
        color: white;

        border-radius: 3px;
        cursor: pointer;
    }

    .dani-container-container {
        display: flex;
        flex-direction: column;

        row-gap: 3px;
    }

    .image-container {
        display: flex;
        align-items: center;
    }
    .image-container > input {
        height: 15px;
    }
    .image-container > button {
        width: 20px;
        height: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 0;
        background-color: #cf4844;
        color: white;

        border-radius: 3px;
        cursor: pointer;
    }

    .image-container-container {
        display: flex;
        flex-direction: column;
        row-gap: 3px;
    }

    .image-container-container input {
        max-width: 300px;
        width: 100%;
    }

    .different {
        background-color: #ff9999;
    }
</style>
