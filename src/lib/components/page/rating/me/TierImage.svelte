<script lang="ts">
    import { User } from "$lib/module/user";
    import CssFilterConverter from "css-filter-converter";
    import { onMount } from "svelte";
    import OmegaTierImage from "./TierImages/OmegaTierImage.svelte";
    import OtherTierImage from "./TierImages/OtherTierImage.svelte";
    import SapphireTierImage from "./TierImages/SapphireTierImage.svelte";
    import RubyTierImage from "./TierImages/RubyTierImage.svelte";
    import MasterTierImage from "./TierImages/MasterTierImage.svelte";
    import GrandmasterTierImage from "./TierImages/GrandmasterTierImage.svelte";

    interface Props<T extends User.RatingTierName = User.RatingTierName> {
        tierName: T;
        grade: T extends "pearl" | "omega" | "grandmaster" | "master" ? null : number;
        mode: "user" | "ranking";
        isDownload?: boolean;
    }

    let {
        tierName,
        grade,
        mode,
        isDownload = false,
    }: Props = $props();
    
    function getDefaultTransform(tierName: User.RatingTierName) {
        if (tierName === "grandmaster") {
            return "translate(-1px, -7px)";
        }
        if (tierName === "master") {
            return "translate(0px, -7px)";
        }

        return "translate(3px, -7px)";
    }
</script>

{#if tierName === "omega"}
    <OmegaTierImage {mode} {isDownload}/>
{:else if tierName === "grandmaster"}
    <GrandmasterTierImage {mode}/>
{:else if tierName === "master"}
    <MasterTierImage {mode}/>
{:else if tierName === "sapphire"}
    <SapphireTierImage grade={grade as number} {mode} {isDownload}/>
{:else if tierName === "ruby"}
    <RubyTierImage grade={grade as number} {mode} {isDownload}/>
{:else if tierName === "pearl"}
    <OtherTierImage {tierName} grade="P" {mode} {isDownload}/>
{:else}
    <OtherTierImage {tierName} grade={grade as number} {mode} {isDownload}/>
{/if}