<script lang="ts">
    import type { Difficulty } from "tja-parser";
    import { Private as Renderer } from "tja-renderer";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        tja: string;
        difficulty: Difficulty;
        branch: "normal" | "advanced" | "master";
        load: () => Promise<void>;
    }

    let { tja, difficulty, load = $bindable(), branch: br }: Props = $props();

    let isAnnotationMode = $state(false);
    let parsed: Record<string, Renderer.ParsedChart>;
    let canvas = $state<HTMLCanvasElement>();
    let moveEventListener: ((ev: MouseEvent) => any) | undefined;
    let clickEventListener: ((ev: MouseEvent) => any) | undefined;
    let branch = $derived(
        br === "normal"
            ? Renderer.BranchName.Normal
            : br === "advanced"
              ? Renderer.BranchName.Expert
              : Renderer.BranchName.Master,
    );

    load = async () => {
        if (!canvas) throw new Error("Renderer canvas not exists.");
        if (!parsed) parsed = Renderer.parseTJA(tja);
        if (moveEventListener)
            canvas.removeEventListener("mousemove", moveEventListener);
        if (clickEventListener)
            canvas.removeEventListener("click", clickEventListener);

        const chart = parsed[difficulty];
        if (!chart) throw new Error(`${difficulty} chart not exists.`);
        chart.branchType = branch;

        const judgementMap =
            new Renderer.JudgementMap<Renderer.JudgementValue>();
        const annotations = new Renderer.NoteLocationMap<Renderer.Annotation>();
        let viewOptions: Renderer.RenderOptions = {
            ...Renderer.DEFAULT_RENDER_OPTIONS,
            showAttribution: true,
            annotations,
            annotationToolType: "hand",
            showAllBranches: false,
            isAnnotationMode,
        };
        const render = () => {
            Renderer.renderChart(
                chart,
                canvas as HTMLCanvasElement,
                judgementMap,
                viewOptions,
            );
        };
        render?.();

        moveEventListener = (ev) => {
            if (!isAnnotationMode) return;
            const x = ev.offsetX ?? 0;
            const y = ev.offsetY ?? 0;
            const canvas_ = canvas as HTMLCanvasElement;

            const hoveredNote = Renderer.getNoteAt(
                x,
                y,
                chart,
                canvas_,
                judgementMap,
                viewOptions,
            );
            if (hoveredNote) {
                viewOptions = {
                    ...viewOptions,
                    hoveredNote: hoveredNote.location,
                };
                canvas_.style.cursor = "pointer";
            } else {
                viewOptions = {
                    ...viewOptions,
                    hoveredNote: null,
                };
                canvas_.style.cursor = "default";
            }
            render?.();
        };
        clickEventListener = (ev) => {
            if (!isAnnotationMode) return;
            const x = ev.offsetX ?? 0;
            const y = ev.offsetY ?? 0;
            const canvas_ = canvas as HTMLCanvasElement;

            const hoveredNote = Renderer.getNoteAt(
                x,
                y,
                chart,
                canvas_,
                judgementMap,
                viewOptions,
            );
            if (!hoveredNote) return;

            const positionKey = hoveredNote.location;
            let annot: Renderer.Annotation | undefined =
                annotations.get(positionKey);
            if (annot?.hand === Renderer.HandType.L) {
                annot.hand = Renderer.HandType.R;
            } else if (annot?.hand === Renderer.HandType.R) {
                annot = undefined;
            } else {
                annot = { hand: Renderer.HandType.L };
            }

            if (annot) {
                annotations.set(positionKey, annot);
            } else {
                annotations.delete(positionKey);
            }
            render?.();
        };
        canvas.addEventListener("mousemove", moveEventListener);
        canvas.addEventListener("click", clickEventListener);
    };
    $effect(() => {
        isAnnotationMode;
        load();
    });

    const [theme] = getTheme();
    const lang = getLang();
    const i18n = $derived(getI18N($lang).page.songNo.preview);
</script>

<label data-theme={$theme}>
    {i18n.isAnnotationMode}
    <input type="checkbox" bind:checked={isAnnotationMode} />
</label>
<div class="container">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    label {
        opacity: 0.5;
        cursor: pointer;

        width: fit-content;
        height: 30px;
        border-radius: 5px;
        border: 1px solid white;

        display: flex;
        justify-content: center;
        align-items: center;
        padding-inline: 5px;
        padding-bottom: 2px;

        font-weight: bold;
        color: white;

        margin-bottom: 5px;

        &[data-theme="light"] {
            background-color: #cf4844;
        }
        &[data-theme="dark"] {
            background-color: #1c1c1c;
        }

        &:has(input:checked) {
            opacity: 1;
        }
        & input {
            display: none;
        }
    }

    canvas {
        width: 100% !important;
        height: auto !important;
    }
</style>
