<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    export let searchType: "all" | "song" | "docs";
    const types = ["all", "song", "docs"] as const;

    export let opened: boolean = false;

    const [theme] = getTheme();

    function getSelectImgSrc(searchType: "all" | "song" | "docs") {
        switch (searchType) {
            case "all": {
                return "/assets/icon/logo-main.webp";
            }
            case "song": {
                return "/assets/icon/song.svg";
            }
            case "docs": {
                return "/assets/icon/document.svg";
            }
        }
    }
</script>

<div
    class="container"
    class:opened
    on:focusout={() => {
        opened = false;
    }}
    role="button"
    tabindex="0"
    data-theme={$theme}
>
    <div
        class="display"
        on:click={() => {
            opened = !opened;
        }}
        role="presentation"
        data-opened={opened}
        data-theme={$theme}
    >
        <img
            class="type-img"
            src={getSelectImgSrc(searchType)}
            alt=""
            data-type={searchType}
            data-theme={$theme}
        />
    </div>
    <div class="select" class:opened>
        {#each types as type}
            <div
                class="option"
                role="presentation"
                on:click={() => {
                    searchType = type;
                    opened = false;
                }}
                data-theme={$theme}
            >
                <img
                    class="type-img option-img"
                    src={getSelectImgSrc(type)}
                    alt=""
                    data-type={type}
                    data-theme={$theme}
                />
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        width: 48px;
        height: 100%;

        cursor: pointer;

        background-color: white;

        border-radius: 5px 0px 0px 5px;
    }
    .container.opened {
        border-radius: 5px 0px 0px 0px;
    }
    .container[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .display {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap: 4px;
    }
    .display::after {
        content: "〉";
        font-size: 13px;
        font-weight: bold;
        color: rgb(171, 171, 171);
        transform: rotate(90deg) translateX(4px);
    }
    .display[data-opened="true"]::after {
        transform: rotate(270deg) translateX(4.3px) translateY(-2px);
    }

    .select {
        width: 48px;
        display: none;

        margin-top: 1px;

        flex-direction: column;

        background-color: white;
    }
    .container[data-theme="light"] .select {
        outline: 1px solid #cf4844;
    }
    .container[data-theme="dark"] .select {
        background-color: #1c1c1c;
        outline: 1px solid gray;
    }
    .select.opened {
        display: flex;
    }

    .option {
        width: 100%;
        height: 30px;

        box-sizing: border-box;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .option:hover {
        background-color: #ffe4e4;
    }
    .option[data-theme="dark"]:hover{
        background-color: rgb(83, 83, 83);
    }

    img.type-img {
        width: 20px;
        height: 20px;
    }
    .select img.type-img {
        margin-bottom: -2px;
    }

    img.type-img:not([data-type="all"]) {
        filter: brightness(0) saturate(100%) invert(34%) sepia(22%)
            saturate(4162%) hue-rotate(332deg) brightness(87%) contrast(83%);
    }
    img.type-img:not([data-type="all"])[data-theme="dark"]{
        filter: invert(100%);
    }

    .option-img {
        transform: translateY(-1px);
    }
</style>
