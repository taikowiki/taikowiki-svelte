<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { onMount } from "svelte";
    import { Song, type Difficulty } from "tja-parser";
    import Previewer, { type PreviewMode } from "tja-previewer";

    interface Props {
        tja: string;
        difficulty: Difficulty;
        load: () => Promise<void>;
        branch: "normal" | "advanced" | "master";
    }

    let {
        tja,
        difficulty,
        load = $bindable(),
        branch = $bindable(),
    }: Props = $props();

    let song = $state<Song>();
    let previewer: Previewer;
    let previewerCanvas = $state<HTMLCanvasElement>();
    let audioPlayerContainer = $state<HTMLDivElement>();
    let audioPlayer = $state<HTMLAudioElement | undefined>();
    $effect(() => {
        if (!audioPlayerContainer) return;
        removeAudioChild(audioPlayerContainer);
        if (audioPlayer) audioPlayerContainer.append(audioPlayer);
    });
    let mode = $state<PreviewMode["type"]>("normal");
    let scroll = $state<number>(1);
    let bpm = $state<number>(0);
    $effect(() => {
        bpm = song?.getBPM() ?? 0;
    });
    $effect(() => {
        mode && scroll;
        if (mode === "normal" || mode === "fixedScroll") {
            previewer?.setMode(mode, scroll);
        } else {
            previewer?.setMode(mode, bpm);
        }
    });

    const isMobile = getIsMobile();
    const lang = getLang();
    const i18n = $derived(getI18N($lang).page.songNo.preview);

    onMount(() => {
        if (!previewerCanvas) return;
        const canvasWidth = window.innerWidth * (window.devicePixelRatio || 1);
        const canvasHeight = canvasWidth / 5;
        [previewerCanvas.width, previewerCanvas.height] = [
            canvasWidth,
            canvasHeight,
        ];
    });

    load = async function () {
        if (!previewerCanvas) {
            throw new Error("Previewer canvas not exists.");
        }
        if (!song) {
            song = Song.parse(tja);
        }
        if (!previewer) {
            previewer = new Previewer(previewerCanvas);
        }

        const course = song.course[difficulty];
        if (!course) {
            throw new Error(`${difficulty} course not exists.`);
        }

        await previewer.load(course, branch);
        audioPlayer = previewer.audioPlayer?.audio;
    };

    function removeAudioChild(node: Node) {
        node.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
                child.remove();
            }
        });
    }
</script>

<div class="container">
    <canvas bind:this={previewerCanvas}> </canvas>
    <div class="option-container" class:isMobile={$isMobile}>
        <div class="option">
            {i18n.branch}
            <select bind:value={branch} class="standard">
                {#each ["normal", "advanced", "master"] as const as br}
                    <option value={br}>
                        {i18n.branches[br]}
                    </option>
                {/each}
            </select>
        </div>
        <div class="option">
            {i18n.mode}
            <select bind:value={mode} class="standard">
                {#each ["normal", "fixedScroll", "fixedBPM"] as const as mode}
                    <option value={mode}>
                        {i18n.modes[mode]}
                    </option>
                {/each}
            </select>
        </div>
        {#if mode === "normal" || mode === "fixedScroll"}
            <div class="option">
                {mode === "normal" ? "x" : "HS"}{scroll.toFixed(1)}
                <input
                    bind:value={scroll}
                    type="range"
                    min="0.1"
                    max="4"
                    step="0.1"
                />
            </div>
        {:else}
            <div class="option">
                BPM
                <input bind:value={bpm} type="number" />
            </div>
        {/if}
    </div>
    <div class="audio-container" bind:this={audioPlayerContainer}></div>
</div>

<style>
    canvas {
        width: 100% !important;
    }

    .container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .option-container {
        display: flex;
        flex-direction: row;
        column-gap: 10px;
        row-gap: 8px;

        &.isMobile {
            flex-direction: column;
        }
    }

    .option {
        display: flex;
        align-items: center;
        column-gap: 3px;
    }

    .audio-container {
        & :global(audio) {
            width: 100%;
        }
    }
</style>
