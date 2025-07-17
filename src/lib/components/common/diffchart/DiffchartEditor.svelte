<script lang="ts">
    import { page } from "$app/state";
    import Diffchart from "$lib/module/diffchart";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { Util } from "$lib/module/util";
    import { onDestroy, onMount } from "svelte";

    interface Props {
        diffchart: Diffchart.Diffchart;
        songs?: Diffchart.SongDataForDisplay[];
        canCopyUrl?: boolean;
    }

    let { diffchart = $bindable(), songs, canCopyUrl }: Props = $props();
    let draggingElement = $state<HTMLDivElement | null>(null);

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    onMount(() => {
        //@ts-expect-error
        window.setDiffchart = (diffchart_: Diffchart.Diffchart) => {
            Diffchart.Schema.Diffchart.parse(diffchart_);
            diffchart = diffchart_;
        }
    })
    onDestroy(() => {
        //@ts-expect-error
        delete window.setDiffchart;
    })

    function addSection() {
        diffchart.sections.push({
            name: "",
            order: diffchart.sections.length,
            songs: [],
            color: "white",
            backgroundColor: "gray",
        });
    }

    function addSong(section: Diffchart.Section) {
        section.songs.push({
            songNo: "",
            order: section.songs.length,
            title: "",
            difficulty: "oni",
        });
    }

    function copyLink() {
        try {
            const url = new URL(page.url);
            url.hash = Diffchart.encodeDiffchart(diffchart);
            navigator.clipboard.writeText(url.href);
            alert("복사 완료");
        } catch {
            alert("복사 실패");
        }
    }
</script>

<div class="container">
    {@render diffchartSetting()}
    {@render sectionsSetting()}
</div>

{#snippet diffchartSetting()}
    <div class="box" data-theme={$theme}>
        <div class="box-title">서열표 설정</div>
        <div class="box-section">
            <div class="box-section-title">제목</div>
            <input
                class="text"
                type="text"
                placeholder="제목"
                bind:value={diffchart.name}
            />
        </div>
        <div class="box-section">
            {@render colorSetting(
                diffchart.color ?? "white",
                diffchart.backgroundColor ?? "gray",
                (color) => {
                    diffchart.color = color;
                },
                (bgColor) => {
                    diffchart.backgroundColor = bgColor;
                },
            )}
        </div>
        {#if canCopyUrl}
            <div class="box-section">
                <button class="link-btn" onclick={copyLink}> 링크 복사 </button>
            </div>
        {/if}
    </div>
{/snippet}

{#snippet sectionsSetting()}
    <div class="box sections" data-theme={$theme}>
        <div class="box-title">
            <span>섹션 설정</span>
            <button data-theme={$theme} onclick={addSection}>
                섹션 추가
            </button>
        </div>
        <div class="box-section section-container">
            {#each diffchart.sections as section, i}
                {@render sectionSetting(section, i)}
            {/each}
        </div>
    </div>
{/snippet}

{#snippet sectionSetting(section: Diffchart.Section, index: number)}
    <div
        class="box section"
        role="presentation"
        data-theme={$theme}
        data-section-index={index}
        data-box-type="section"
        ondragstart={(event) => {
            if (event.target) {
                draggingElement = event.target as HTMLDivElement;
            }
        }}
        ondragenter={(event) => {
            // 해당 섹션 위로 드래그 중인지 검사하여 drag 클래스 추가
            if (
                !draggingElement ||
                draggingElement.getAttribute("data-box-type") !== "section"
            )
                return;
            const sectionIndex = Number(
                draggingElement.getAttribute("data-section-index") || undefined,
            );
            if (Number.isNaN(sectionIndex) || sectionIndex === index) return;
            event.currentTarget.classList.add("drag");
        }}
        ondragleave={(event) => {
            // 해당 섹션 에서 드래그가 벗어났는지 검사하여 drag 클래스 제거
            if (
                !draggingElement ||
                draggingElement.getAttribute("data-box-type") !== "section"
            )
                return;
            const sectionIndex = Number(
                draggingElement.getAttribute("data-section-index") || undefined,
            );
            if (Number.isNaN(sectionIndex)) return;
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            if (
                x <= Math.round(rect.left) ||
                x >= Math.round(rect.right) ||
                y <= Math.round(rect.top) ||
                y >= Math.round(rect.bottom)
            ) {
                event.currentTarget.classList.remove("drag");
            }
        }}
        ondragend={({ target }) => {
            if (target) {
                (target as HTMLElement).setAttribute("draggable", "false");
            }
            if (draggingElement) draggingElement = null;
        }}
        ondragover={(event) => event.preventDefault()}
        ondrop={(event) => {
            // 해당 섹션 위로 드래그했는지 검사하여 순서 변경
            if (
                !draggingElement ||
                draggingElement.getAttribute("data-box-type") !== "section"
            )
                return;
            const sectionIndex = Number(
                draggingElement.getAttribute("data-section-index") || undefined,
            );
            if (Number.isNaN(sectionIndex)) return;
            event.currentTarget.classList.remove("drag");
            const reIndexed = Util.intercept(
                diffchart.sections,
                sectionIndex,
                index,
            );
            reIndexed.forEach((s, i) => (s.order = i));
            diffchart.sections = reIndexed;
        }}
    >
        <div class="box-section section-order-box">
            <img
                src="/assets/icon/grip.svg"
                alt="grip"
                role="presentation"
                onmousedown={() => {
                    const sectionBox: HTMLDivElement | null =
                        document.querySelector(
                            `[data-box-type="section"][data-section-index="${index}"]`,
                        );
                    if (!sectionBox) return;
                    sectionBox.setAttribute("draggable", "true");
                }}
                draggable="false"
            />
            <button
                disabled={index === 0}
                onclick={() => {
                    if (index === 0) return;
                    const reIndexed = Util.intercept(
                        diffchart.sections,
                        index,
                        index - 1,
                    );
                    reIndexed.forEach((s, i) => (s.order = i));
                    diffchart.sections = reIndexed;
                }}
                >↑
            </button>
            <button
                disabled={index === diffchart.sections.length - 1}
                onclick={() => {
                    if (index === diffchart.sections.length - 1) return;
                    const reIndexed = Util.intercept(
                        diffchart.sections,
                        index,
                        index + 1,
                    );
                    reIndexed.forEach((s, i) => (s.order = i));
                    diffchart.sections = reIndexed;
                }}
                >↓
            </button>
            <button
                onclick={() => {
                    diffchart.sections = diffchart.sections.filter(
                        (_, i) => i !== index,
                    );
                }}
                >🗑
            </button>
        </div>
        <div class="box-section">
            <div class="box-section-title">제목</div>
            <input
                class="text"
                type="text"
                placeholder="제목"
                bind:value={section.name}
            />
        </div>
        <div class="box-section">
            {@render colorSetting(
                section.color ?? "white",
                section.backgroundColor ?? "gray",
                (color) => {
                    section.color = color;
                },
                (bgColor) => {
                    section.backgroundColor = bgColor;
                },
            )}
        </div>
        <div class="box-section">
            <div class="box-section-title">
                곡
                <button class="add-song-btn" onclick={() => addSong(section)}>
                    추가
                </button>
            </div>
            {#each section.songs as song, i}
                {@render songSetting(section, song, index, i)}
            {/each}
        </div>
    </div>
{/snippet}

{#snippet songSetting(
    section: Diffchart.Section,
    song: Diffchart.Song,
    sectionIndex: number,
    index: number,
)}
    <div
        class="song"
        role="presentation"
        data-theme={$theme}
        data-isMobile={$isMobile}
        data-box-type="song"
        data-section-index={sectionIndex}
        data-song-index={index}
        ondragstart={(event) => {
            if (event.target) {
                draggingElement = event.target as HTMLDivElement;
            }
        }}
        ondragenter={(event) => {
            // 해당 섹션 위로 드래그 중인지 검사하여 drag 클래스 추가
            if (
                !draggingElement ||
                draggingElement.getAttribute("data-box-type") !== "song"
            )
                return;
            const sectionIndex_ = Number(
                draggingElement.getAttribute("data-section-index") || undefined,
            );
            const songIndex = Number(
                draggingElement.getAttribute("data-song-index") || undefined,
            );
            if (
                Number.isNaN(sectionIndex_) ||
                Number.isNaN(songIndex) ||
                sectionIndex_ !== sectionIndex ||
                songIndex === index
            )
                return;
            event.currentTarget.classList.add("drag");
        }}
        ondragleave={(event) => {
            // 해당 섹션 에서 드래그가 벗어났는지 검사하여 drag 클래스 제거
            if (
                !draggingElement ||
                draggingElement.getAttribute("data-box-type") !== "song"
            )
                return;
            const sectionIndex_ = Number(
                draggingElement.getAttribute("data-section-index") || undefined,
            );
            const songIndex = Number(
                draggingElement.getAttribute("data-song-index") || undefined,
            );
            if (
                Number.isNaN(sectionIndex_) ||
                Number.isNaN(songIndex) ||
                sectionIndex_ !== sectionIndex
            )
                return;
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX;
            const y = event.clientY;
            if (
                x <= Math.round(rect.left) ||
                x >= Math.round(rect.right) ||
                y <= Math.round(rect.top) ||
                y >= Math.round(rect.bottom)
            ) {
                event.currentTarget.classList.remove("drag");
            }
        }}
        ondragend={({ target }) => {
            if (target) {
                (target as HTMLElement).setAttribute("draggable", "false");
            }
            if (draggingElement) draggingElement = null;
        }}
        ondragover={(event) => event.preventDefault()}
        ondrop={(event) => {
            // 해당 섹션 위로 드래그했는지 검사하여 순서 변경
            if (
                !draggingElement ||
                draggingElement.getAttribute("data-box-type") !== "song"
            )
                return;
            const sectionIndex_ = Number(
                draggingElement.getAttribute("data-section-index") || undefined,
            );
            const songIndex = Number(
                draggingElement.getAttribute("data-song-index") || undefined,
            );
            if (
                Number.isNaN(sectionIndex_) ||
                Number.isNaN(songIndex) ||
                sectionIndex_ !== sectionIndex
            )
                return;
            event.currentTarget.classList.remove("drag");
            const reIndexed = Util.intercept(section.songs, songIndex, index);
            reIndexed.forEach((s, i) => (s.order = i));
            section.songs = reIndexed;
        }}
    >
        <div class="btn-container">
            <img
                src="/assets/icon/grip.svg"
                alt="grip"
                role="presentation"
                onmousedown={() => {
                    const sectionBox: HTMLDivElement | null =
                        document.querySelector(
                            `[data-box-type="song"][data-section-index="${sectionIndex}"][data-song-index="${index}"]`,
                        );
                    if (!sectionBox) return;
                    sectionBox.setAttribute("draggable", "true");
                }}
                draggable="false"
            />
            <button
                disabled={index === 0}
                onclick={() => {
                    if (index === 0) return;
                    const reIndexed = Util.intercept(
                        section.songs,
                        index,
                        index - 1,
                    );
                    reIndexed.forEach((s, i) => (s.order = i));
                    section.songs = reIndexed;
                }}
                >↑
            </button>
            <button
                disabled={index === section.songs.length - 1}
                onclick={() => {
                    if (index === section.songs.length - 1) return;
                    const reIndexed = Util.intercept(
                        section.songs,
                        index,
                        index + 1,
                    );
                    reIndexed.forEach((s, i) => (s.order = i));
                    section.songs = reIndexed;
                }}
                >↓
            </button>
            <button
                onclick={() => {
                    section.songs = section.songs.filter((_, i) => i !== index);
                }}
                >🗑
            </button>
        </div>
        <input
            class="songno text"
            type="text"
            placeholder="곡 번호"
            onchange={() => {
                if (songs) {
                    song.title =
                        songs.find((v) => v.songNo === song.songNo)?.title ??
                        song.title;
                }
            }}
            bind:value={song.songNo}
        />
        <input
            class="title text"
            type="text"
            placeholder="제목"
            bind:value={song.title}
        />
        <div class="select-container">
            <div
                class="color"
                style={`background-color:${Util.Color.difficulty[song.difficulty]};`}
            ></div>
            <select bind:value={song.difficulty}>
                <option value="easy">쉬움</option>
                <option value="normal">보통</option>
                <option value="hard">어려움</option>
                <option value="oni">오니(앞)</option>
                <option value="ura">오니(뒤)</option>
            </select>
        </div>
    </div>
{/snippet}

{#snippet colorSetting(
    textColor: string,
    backgroundColor: string,
    setTextColor: (color: string) => void,
    setBackgroundColor: (color: string) => void,
)}
    <div class="color-box">
        <div class="color-box-section">
            <div class="color-box-section-title">글씨 색</div>
            <div class="color-box-section-input">
                <input
                    type="color"
                    value={Util.colorToHex(textColor)}
                    onchange={({ target }) => {
                        if (target) {
                            setTextColor((target as HTMLInputElement).value);
                        }
                    }}
                />
                <input
                    class="text"
                    type="text"
                    value={Util.colorToHex(textColor)}
                    onchange={({ target }) => {
                        if (target) {
                            setTextColor((target as HTMLInputElement).value);
                        }
                    }}
                />
            </div>
        </div>
        <div class="color-box-section">
            <div class="color-box-section-title">배경 색</div>
            <div class="color-box-section-input">
                <input
                    type="color"
                    value={Util.colorToHex(backgroundColor)}
                    onchange={({ target }) => {
                        if (target) {
                            setBackgroundColor(
                                (target as HTMLInputElement).value,
                            );
                        }
                    }}
                />
                <input
                    class="text"
                    type="text"
                    value={Util.colorToHex(backgroundColor)}
                    onchange={({ target }) => {
                        if (target) {
                            setBackgroundColor(
                                (target as HTMLInputElement).value,
                            );
                        }
                    }}
                />
            </div>
        </div>
    </div>
{/snippet}

<style>
    .container {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }

    .box {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 10px;

        box-sizing: border-box;
        padding: 20px;
        border-radius: 10px;

        &.box[data-theme="light"] {
            background-color: #ededed;
        }

        &.box[data-theme="dark"] {
            background-color: #1c1c1c;
        }

        & .box-title {
            font-size: 20px;
            font-weight: bold;
        }

        & .box-section {
            width: 100%;
            display: flex;
            flex-direction: column;
            row-gap: 2px;
        }

        & .box-section-title {
            font-size: 15px;
            font-weight: bold;
        }
    }

    .sections {
        & .box-title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            & button {
                color: white;
                background-color: black;

                border-radius: 5px;
                border: 0;

                height: 30px;

                cursor: pointer;

                &:hover {
                    background-color: rgb(45, 45, 45);
                }

                &:active {
                    background-color: black;
                }
            }
        }

        & .section-container {
            row-gap: 10px;
        }
    }

    .section {
        &.section[data-theme="light"] {
            border: 1px solid rgb(127, 127, 127);
            background-color: white;
        }
        &.section[data-theme="dark"] {
            border: 1px solid rgb(73, 73, 73);
            background-color: #282828;
        }

        & img {
            width: 10px;
            cursor: grab;
        }
        &[data-theme="dark"] img {
            filter: invert(100%);
        }

        &[data-theme="light"]:global(.drag) {
            background-color: #d3d3d3;
        }
        &[data-theme="dark"]:global(.drag) {
            background-color: #3f3f3f;
        }

        & .section-order-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            column-gap: 5px;

            & button {
                width: 16px;
                height: min-content;
                padding: 0;
                background: 0;
                border: 0;
                color: inherit;
                font-size: 15px;
                font-family: inherit;
                transform: translateY(-1px);

                &:disabled {
                    opacity: 0.7;
                }
                &:not(:disabled) {
                    cursor: pointer;
                }
                &:not(:disabled):hover {
                    font-weight: bold !important;
                }
            }
        }

        & .add-song-btn {
            color: white;
            background-color: black;

            border-radius: 5px;
            border: 0;

            height: 30px;

            cursor: pointer;

            &:hover {
                background-color: rgb(45, 45, 45);
            }

            &:active {
                background-color: black;
            }
        }
    }

    .song {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;

        width: 100%;
        height: 40px;

        box-sizing: border-box;
        padding: 5px;
        border-radius: 5px;

        &[data-isMobile="true"] {
            flex-direction: column;
            height: auto;
            align-items: flex-start;
            row-gap: 5px;

            padding: 7px;

            & input.songno,
            & input.title {
                width: 100%;
            }
        }

        & .btn-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            column-gap: 5px;
        }

        &[data-theme="light"] {
            background-color: #ededed;
        }
        &[data-theme="dark"] {
            background-color: #1c1c1c;
        }

        & img {
            width: 10px;
            margin-inline: 3px;
        }

        & button {
            width: 16px;
            height: min-content;
            padding: 0;
            background: 0;
            border: 0;
            color: inherit;
            font-size: 15px;
            font-family: inherit;
            transform: translateY(-1px);

            &:disabled {
                opacity: 0.7;
            }
            &:not(:disabled) {
                cursor: pointer;
            }
            &:not(:disabled):hover {
                font-weight: 900 !important;
            }
        }

        &[data-theme="light"]:global(.drag) {
            background-color: #d3d3d3;
        }
        &[data-theme="dark"]:global(.drag) {
            background-color: #3f3f3f;
        }

        & input {
            height: 25px !important;
        }
        & input.songno {
            width: 100px;
        }
        & input.title {
            flex: 1 0 auto;
        }
        & select {
            width: 80px;
            height: 25px;
            border-radius: 5px;
        }

        & .select-container {
            display: flex;
            align-items: center;
            column-gap: 5px;
        }

        & .color {
            width: 15px;
            height: 15px;
        }
    }

    .link-btn {
        width: 100px;

        color: white;
        background-color: black;

        border-radius: 5px;
        border: 0;

        height: 30px;

        cursor: pointer;

        &:hover {
            background-color: rgb(45, 45, 45);
        }

        &:active {
            background-color: black;
        }
    }

    .color-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & .color-box-section {
            width: calc(50% - 10px);

            display: flex;
            flex-direction: column;
            row-gap: 2px;
        }

        & .color-box-section-title {
            font-size: 15px;
            font-weight: bold;
        }

        & .color-box-section-input {
            display: flex;
            column-gap: 5px;
        }

        input[type="color"] {
            width: 35px;
            height: 35px;
        }

        input[type="text"] {
            width: calc(100% - 40px);
            max-width: 150px;
        }
    }

    input.text {
        height: 35px;

        box-sizing: border-box;
        padding: 5px;

        border-radius: 5px;

        border: 1px solid black;

        &:focus {
            outline: 1px solid black;
        }
    }
</style>
