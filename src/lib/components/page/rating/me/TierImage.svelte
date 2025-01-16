<script lang="ts">
    import { TIER_COLOR } from "$lib/module/common/user/const";
    import type { UserRatingTierName } from "$lib/module/common/user/types";
    import CssFilterConverter from "css-filter-converter";
    import { onMount } from "svelte";

    interface Props {
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
        height = "180px",
        fontSize = "120px",
        transform
    }: Props = $props();

    if(!transform){
        transform = getDefaultTransform(tierName);
    }

    function getDefaultTransform(tierName: UserRatingTierName){
        if(tierName === "grandmaster"){
            return "translate(0px, -7px)";
        }

        return "translate(3px, -7px)";
    }

    let imgElement: HTMLImageElement | null = $state(null);
    async function generateFilteredImg(){
        if(!imgElement) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        const widthNumber = parseFloat(width.replace('px', ''));
        const heightNumber = parseFloat(height.replace('px', ''));

        [canvas.width, canvas.height] = [widthNumber, heightNumber];

        const img = new Image();
        img.src = "/assets/icon/rating/tier/plate.avif";

        await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
        })

        const filter = CssFilterConverter.hexToFilter(TIER_COLOR[tierName as Exclude<UserRatingTierName, "omega">]).color;
        if(filter){
            ctx.filter = filter;
        }
        ctx.drawImage(img, 0, 0, widthNumber, heightNumber);

        imgElement.src = canvas.toDataURL();
        canvas.remove();
    }
    onMount(() => {
        generateFilteredImg();
    })
</script>

{#if tierName === "omega"}
    <div
        class="tier-image omega"
        style={`width:${width};height:${height};`}
    ></div>
{:else if tierName === "pearl"}
    <div class="tier-image pearl" style={`width:${width};height:${height};`}>
        <img
            src="/assets/icon/rating/tier/plate.png"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};width:${width};height:${height};`}
            alt="pearl"
            bind:this={imgElement}
        />
        <span style={`font-size:${fontSize};transform:${transform};`}> P </span>
    </div>
{:else if tierName === "grandmaster"}
    <div class="tier-image" style={`width:${width};height:${height};`}>
        <img
            src="/assets/icon/rating/tier/plate.png"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};width:${width};height:${height};`}
            alt="grandmaster"
            bind:this={imgElement}
        />
        <span style={`font-size:${fontSize};transform:${transform};`}>
            G
        </span>
    </div>
{:else if tierName === "master"}
    <div class="tier-image" style={`width:${width};height:${height};`}>
        <img
            src="/assets/icon/rating/tier/plate.png"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};width:${width};height:${height};`}
            alt="master"
            bind:this={imgElement}
        />
        <span style={`font-size:${fontSize};transform:${transform};`}>
            M
        </span>
    </div>
{:else}
    <div class="tier-image" style={`width:${width};height:${height};`}>
        <img
            src="/assets/icon/rating/tier/plate.png"
            style={`filter:${CssFilterConverter.hexToFilter(TIER_COLOR[tierName]).color};width:${width};height:${height};`}
            alt={tierName}
            bind:this={imgElement}
        />
        <span style={`font-size:${fontSize};transform:${transform};`}>
            {grade}
        </span>
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

        color: white;
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
