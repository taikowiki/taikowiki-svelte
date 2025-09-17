<script lang="ts">
    interface Props {
        mode: "user" | "ranking";
    }

    let { mode }: Props = $props();
</script>

<div class="tier-image" class:ranking={mode === "ranking"}>
    <img
        class:ranking={mode === "ranking"}
        src="/assets/icon/rating/tier/grandmaster.avif"
        alt="grandmaster"
    />
    <span></span>
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

        &.ranking {
            width: 50px;
            height: 50px;
        }
    }

    img {
        width: 100%;
        height: auto;
        position: absolute;
        z-index: 0;

        &.ranking {
            width: 45px;
            height: 45px;
        }
    }
</style>
