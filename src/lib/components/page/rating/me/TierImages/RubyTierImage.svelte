<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        grade: number;
        mode: "user" | "ranking";
        isDownload?: boolean;
    }

    let { grade, mode, isDownload }: Props = $props();

    let imgElement: HTMLImageElement | null = $state(null);
    async function generateFilteredImg() {
        if (!imgElement) return;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        [canvas.width, canvas.height] = [180, 140];

        const img = new Image();
        img.src = "/assets/icon/rating/tier/ruby.svg";

        await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
        });

        ctx.drawImage(img, 0, 0, 180, 140);

        if (isDownload) {
            imgElement.src = canvas.toDataURL();
        }
        canvas.remove();
    }
    onMount(generateFilteredImg);
</script>

<div
    class="tier-image"
    class:ranking={mode === "ranking"}
>
    <img
        src="/assets/icon/rating/tier/ruby.svg"
        alt="ruby"
    />
    <span class:ranking={mode === "ranking"}>
        {grade}
    </span>
</div>

<style>
    .tier-image {
        width: 180px;
        height: 180px;
        max-width: 100%;

        position: relative;

        display: inline-flex;
        justify-content: center;
        align-items: center;

        color: white;

        &.ranking{
            width: 50px;
            height: 50px;
        }
    }

    img {
        width: 100%;
        height: auto;
        position: absolute;
        z-index: 0;
    }

    span {
        font-size: 120px;
        transform: translate(1.5px, -21px);
        font-weight: bold;

        &.ranking {
            font-size: 34px;
            transform: translate(0px, -6px);
        }
    }
</style>
