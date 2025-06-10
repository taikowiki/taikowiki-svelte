<script lang="ts">
    // @ts-nocheck
    import { Util } from "$lib/module/util";
    import { getI18N, getLang } from "$lib/module/i18n";
    import type { Course, Difficulty } from "$lib/module/common/song/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import DaniEditor from "./DaniEditor.svelte";

    interface Props {
        difficulty: Difficulty;
        course: Course | null;
    }

    let { difficulty, course = $bindable() }: Props = $props();

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
        images: [],
    };

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

    const isMobile = getIsMobile();
    const lang = getLang();
    let diffI18n = $derived(
        getI18N("component", $lang).SongEditor.difficulties,
    );
    let i18n = $derived(getI18N($lang).component.SongEditor.CourseEditor);
</script>

{#snippet uraCheckbox()}
    <td class="r" data-isMobile={isMobile} style="font-weight:bold">
        {diffI18n[difficulty]}
        {#if difficulty === "ura"}
            <input
                type="checkbox"
                checked={!(course === null)}
                onchange={(event) => {
                    if (event.currentTarget.checked) {
                        course = structuredClone(init);
                    } else {
                        course = null;
                    }
                }}
            />
        {/if}
    </td>
{/snippet}
{#snippet courseData(course: Course)}
    {#snippet level()}
        <tr>
            <td> {i18n.level} </td>
            <td>
                <input
                    type="number"
                    min="1"
                    max="10"
                    bind:value={course.level}
                />
            </td>
        </tr>
    {/snippet}
    {#snippet branched()}
        <tr>
            <td> {i18n.branched} </td>
            <td>
                <input type="checkbox" bind:checked={isBranched} />
            </td>
        </tr>
    {/snippet}
    {#snippet maxCombo()}
        <tr>
            <td> {i18n.maxCombo} </td>
            <td>
                <input type="number" min="1" bind:value={course.maxCombo} />
            </td>
        </tr>
    {/snippet}
    {#snippet playTime()}
        <tr>
            <td>
                <div>{i18n.playTime}</div>
                <div class="sub">
                    {i18n.playTimeSub}
                </div>
            </td>
            <td>
                <input type="number" min="1" bind:value={course.playTime} />
            </td>
        </tr>
    {/snippet}
    {#snippet density()}
        {@const calculateDensity = () => {
            if (course.playTime !== 0) {
                course.maxDensity =
                    Math.round((course.maxCombo / course.playTime) * 100) / 100;
            } else {
                course.maxDensity = 0;
            }
        }}
        <tr>
            <td> {i18n.density} </td>
            <td>
                <input type="number" min="1" bind:value={course.maxDensity} />
                <button onclick={calculateDensity}>
                    {i18n.calculate}
                </button>
            </td>
        </tr>
    {/snippet}
    {#snippet balloon()}
        {@const setBalloon = (event: Event) => {
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
        <tr>
            <td>
                <div>{i18n.maxBalloon}</div>
                <div class="sub">
                    {i18n.commaPlz}
                </div>
            </td>
            <td>
                <textarea
                    value={course?.balloon?.join(",") ?? ""}
                    onchange={setBalloon}
                ></textarea>
            </td>
        </tr>
    {/snippet}
    {#snippet roll()}
        {@const setRoll = (event: Event) => {
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
        <tr>
            <td>
                <div>{i18n.maxRoll}</div>
                <div class="sub">
                    {i18n.commaPlz}
                </div>
            </td>
            <td>
                <textarea
                    value={course?.rollTime?.join(",") ?? ""}
                    onchange={setRoll}
                ></textarea>
            </td>
        </tr>
    {/snippet}
    {#snippet dani()}
        {@const push = () => {
            course.dani.push({
                version: "katsudon",
                dan: "senpo",
                order: 1,
            });
        }}
        <tr>
            <td>
                {i18n.dani}
                <input type="checkbox" bind:checked={daniUsed} />
            </td>
            <td>
                {#if Boolean(course.daniUsed)}
                    <button onclick={push}>{i18n.add}</button>
                    <div class="dani-container-container">
                        {#each course.dani as dani, i}
                            {@const remove = () => {
                                course.dani = course.dani.filter(
                                    (_, index) => index !== i,
                                );
                            }}
                            <div class="dani-container">
                                <DaniEditor bind:dani={course.dani[i]} />
                                <button onclick={remove}>X</button>
                            </div>
                        {/each}
                    </div>
                {/if}
            </td>
        </tr>
    {/snippet}
    {#snippet img()}
        {@const push = () => {
            course?.images.push("");
        }}
        <tr>
            <td> {i18n.img} </td>
            <td>
                <div class="image-container-container">
                    <div style="display:flex;align-items:center;">
                        <button onclick={push}>{i18n.add}</button>
                    </div>
                    {#each course.images as image, i}
                        {@const remove = () => {
                            course.images = course.images.filter(
                                (_, index) => index !== i,
                            );
                        }}
                        <div class="image-container">
                            <input
                                type="text"
                                bind:value={course.images[i]}
                                placeholder={i18n.imgLink}
                            />
                            <button onclick={remove}>X</button>
                        </div>
                    {/each}
                </div>
            </td>
        </tr>
    {/snippet}
    <td>
        <table class="data">
            <tbody>
                {@render level()}
                {@render branched()}
                {@render maxCombo()}
                {@render playTime()}
                {@render density()}
                {@render balloon()}
                {@render roll()}
                {@render dani()}
                {@render img()}
            </tbody>
        </table>
    </td>
{/snippet}

<div
    style={`${`border: 2px solid ${Util.Color.difficulty[difficulty]};width:100%;box-sizing:border-box;border-radius:2px;`}`}
>
    <table class="wrapper">
        <tbody>
            <tr>
                {@render uraCheckbox()}
                {#if course}
                    {@render courseData(course)}
                {/if}
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
    .r[data-isMobile="true"] {
        width: 80px;
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
</style>
