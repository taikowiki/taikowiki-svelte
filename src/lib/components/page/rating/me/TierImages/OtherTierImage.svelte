<script lang="ts">
    import { User } from "$lib/module/user";
    import CssFilterConverter from "css-filter-converter";
    import { onMount } from "svelte";

    type TierName = "gold" | "silver" | "bronze" | "pearl";
    interface Props<T extends TierName = TierName> {
        tierName: T;
        grade: T extends "pearl" ? "P" : number;
        mode: "user" | "ranking";
        isDownload?: boolean;
    }

    let { tierName, grade, mode, isDownload }: Props = $props();

    let size = $derived(mode === "user" ? 180 : 50);

    let imgElement: HTMLImageElement | null = $state(null);
    async function generateFilteredImg() {
        if (!imgElement) return;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        [canvas.width, canvas.height] = [size, size];

        const img = new Image();
        img.src = "/assets/icon/rating/tier/plate.avif";

        await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
        });

        const filter = CssFilterConverter.hexToFilter(
            User.TIER_COLOR[tierName as Exclude<User.RatingTierName, "omega">],
        ).color;
        if (filter) {
            ctx.filter = filter;
        }
        ctx.drawImage(img, 0, 0, size, size);

        if (isDownload) {
            imgElement.src = canvas.toDataURL();
        }
        canvas.remove();
    }
    onMount(generateFilteredImg);
</script>

<div
    class="tier-image"
    class:pearl={tierName === "pearl"}
    class:ranking={mode === "ranking"}
>
    <img
        src="/assets/icon/rating/tier/plate.png"
        style={`filter:${CssFilterConverter.hexToFilter(User.TIER_COLOR[tierName]).color};`}
        alt={tierName}
        bind:this={imgElement}
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
    .tier-image.pearl {
        color: black;
    }

    img {
        width: 100%;
        height: auto;
        position: absolute;
        z-index: 0;
    }

    span {
        font-size: 120px;
        transform: translate(3px, -7px);
        font-weight: bold;

        &.ranking {
            font-size: 34px;
            transform: translate(0px, -2px);
        }
    }
</style>
