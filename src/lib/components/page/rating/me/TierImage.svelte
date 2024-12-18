<script lang="ts">
    import { TIER_COLOR } from "$lib/module/common/user/const";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import CssFilterConverter from "css-filter-converter";

    interface Props{
        tierName: UserRatingTierName;
        grade: number | null;
        width?: string;
        height?: string;
        fontSize?: string;
        transform?: string;
    }

    let {
        tierName,
        grade,
        width = "180px",
        height = '180px',
        fontSize = '120px',
        transform = 'transform: translate(2px, -7px)'
    }: Props = $props();
</script>

{#if tierName === "omega"}
    <div class="tier-image omega" style={`width:${width};height:${height};`}></div>
{:else if tierName === "pearl"}
    <div class="tier-image pearl" style={`width:${width};height:${height};`}>
        <img
            src="/assets/icon/rating/tier/plate.avif"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};width:${width};height:${height};`}
            alt="pearl"
        />
        <span style={`font-size:${fontSize};transform:${transform};`}> P </span>
    </div>
{:else}
    <div class="tier-image" style={`width:${width};height:${height};`}>
        <img
            src="/assets/icon/rating/tier/plate.avif"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};width:${width};height:${height};`}
            alt="pearl"
        />
        <span style={`font-size:${fontSize};transform:${transform};`}> {grade} </span>
    </div>
{/if}

<style>
    .tier-image {
        width: 180px;
        height: 180px;
        max-width: 100%;

        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        color:white;
    }
    .tier-image.pearl{
        color:black;
    }

    img {
        width: 100%;
        height: auto;
        position: absolute;
        z-index: 0;
    }

    span {
        z-index: 1;
        font-size: 120px;
        font-weight: bold;
        transform: translate(2px, -7px);
    }

    .omega {
        background-image: url("/assets/icon/rating/tier/omega.avif");
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
</style>
