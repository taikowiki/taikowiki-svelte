<script lang="ts">
    export let title: string;

    export let width: string = "100%";
    export let height: string = "auto";

    export let color: string = "black";

    export let titleColor: string = "white";
    export let titleSize: string = "20px";

    export let type: "vertical" | "horizontal" = "vertical";

    export let round: boolean = true;
</script>

<div class={`container ${type}`} style={`width: ${width}; height: ${height};`} class:noround={!round}>
    <div
        class="title-container"
        style={`background-color:${color};font-size:${titleSize};color:${titleColor};`}
    >
        {title}
    </div>
    <div class="content-container" style={`border-color: ${color};`}>
        <slot />
    </div>
</div>

<style>
    .container {
        display: flex;
    }
    .container.vertical {
        flex-direction: column;

        align-items: flex-start;
    }
    .container.horizontal{
        flex-direction: row;
    }

    .container.vertical .title-container {
        min-width: 60px;

        
        display: flex;
        flex-direction: column;
        align-items: center;

        border-radius: 5px 5px 0 0;

        box-sizing: border-box;
        padding: 5px;

        font-weight: bold;
    }
    .container.vertical .content-container {
        width: 100%;
        height: auto;

        border-width: 3px;
        border-style: solid;

        box-sizing: border-box;

        border-radius: 0px 5px 5px 5px;
    }

    .container.horizontal .title-container{
        min-width: 60px;
        min-height: 100%;

        box-sizing: border-box;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 5px 0 0 5px;

        font-weight: bold;
    }
    .container.horizontal .content-container {
        flex: 1 1 auto;
        min-height: 100%;

        border-width: 3px;
        border-style: solid;
        box-sizing: border-box;

        border-radius: 0 5px 5px 0;
    }

    .container.noround *{
        border-radius: 0 !important;
    }
</style>
