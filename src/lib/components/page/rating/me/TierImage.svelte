<script lang="ts">
    import { TIER_COLOR } from "$lib/module/common/user/const";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import CssFilterConverter from "css-filter-converter";

    export let tierName: UserRatingTierName;
    export let grade: number | null;
    export let width: string = '180px';
    export let height: string = '180px';
    export let fontSize: string = '120px';
    export let transform: string = 'transform: translate(2px, -7px)';
</script>

{#if tierName === "omega"}
    <div class="tier-image omega" style={`width:${width};height:${height};`} />
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
