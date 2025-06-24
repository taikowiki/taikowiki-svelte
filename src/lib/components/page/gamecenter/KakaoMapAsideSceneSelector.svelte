<script lang="ts">
    import { getI18N, getLang } from "$lib/module/i18n";

    interface Props {
        scene: "search" | "favorites";
    }
    let { scene = $bindable() }: Props = $props();

    const lang = getLang();
    let i18n = $derived(getI18N("/gamecenter", $lang));
    let newI18n = $derived(getI18N($lang).page.gamecenter.selector);
</script>

<div>
    <div class="container">
        <div
            class="button"
            role="presentation"
            onclick={() => {
                scene = "search";
            }}
        >
            <span>{newI18n.search}</span>
        </div>
        <div
            class="button"
            role="presentation"
            onclick={() => {
                scene = "favorites";
            }}
        >
            <span>{i18n.favorites}</span>
        </div>
    </div>
    <div class="slider-container">
        <div
            class="slider"
            class:search={scene === "search"}
            class:favorites={scene === "favorites"}
        ></div>
    </div>
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: row;
    }

    .button {
        width: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;

        box-sizing: border-box;

        cursor: pointer;
    }
    .button > span {
        transform: translateY(-1px);
    }

    .slider-container {
        width: 100%;
        height: 2px;

        position: relative;
    }
    .slider {
        width: 50%;
        height: 100%;

        background-color: rgb(189, 189, 189);

        transition: left 0.15s;

        position: absolute;
        top: 0px;
    }

    .slider.search {
        left: 0%;
    }
    .slider.favorites {
        left: 50%;
    }
</style>
