<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let scene: "search" | "favorites";

    const user = getContext("user") as Writable<{ logined: boolean }>;
</script>

<div>
    <div class="container">
        <div
            class="button"
            role="presentation"
            on:click={() => {
                scene = "search";
            }}
        >
            <span>검색</span>
        </div>
        <div
            class="button"
            role="presentation"
            on:click={() => {
                scene = "favorites";
            }}
        >
            <span>즐겨찾기</span>
        </div>
    </div>
    <div class="slider-container">
        <div
            class="slider"
            class:search={scene === "search"}
            class:favorites={scene === "favorites"}
        />
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
