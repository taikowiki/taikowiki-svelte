<script lang="ts">
    import { TIER_COLOR } from "$lib/module/common/user/const";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import CssFilterConverter from "css-filter-converter";

    export let tierName: UserRatingTierName;
    export let grade: number | null;
</script>

{#if tierName === "omega"}
    <div class="tier-image omega" />
{:else if tierName === "pearl"}
    <div class="tier-image pearl">
        <img
            src="/assets/icon/rating/tier/plate.avif"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};`}
            alt="pearl"
        />
        <span> P </span>
    </div>
{:else}
    <div class="tier-image">
        <img
            src="/assets/icon/rating/tier/plate.avif"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};`}
            alt="pearl"
        />
        <span> {grade} </span>
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
