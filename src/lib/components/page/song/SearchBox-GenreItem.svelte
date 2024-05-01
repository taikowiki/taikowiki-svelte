<script lang="ts">
    import color from "$lib/module/common/color/color";
    import type { Genre } from "$lib/module/common/song/types";

    export let group: string | undefined;
    export let value: Genre;

    function clickHandle() {
        if (group !== value) {
            group = value;
        } else {
            group = undefined;
        }
    }

    let data: HTMLElement;
    $: text = data?.innerText;

    let transform = ''
    $: if(text?.includes(' ')){
        transform = 'transform: translateY(-1px);';
    }

    let widthType:"long"|"short";
    $: if(data?.clientWidth){
        if(data.clientWidth > 63){
            widthType="long"
        }
        else{
            widthType="short"
        }
    }
</script>

<div
    class={`button ${widthType}`}
    class:selected={group === value}
    class:unselected={group !== value && group !== undefined}
    style={`background-color:${color.genre[value]};`}
    on:click={clickHandle}
    role="presentation"
>
    <span bind:this={data} style={`${transform} text-wrap:nowrap;`}>
        <slot />
    </span>
</div>
<input type="radio" bind:group {value} />

<style>
    input {
        display: none;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 5px;

        height: 30px;
        border-radius: 5px;
        color:white;
        font-weight: bold;
        
        box-sizing: border-box;

        cursor: pointer;
    }

    .button.selected{
        border: 2px solid black;
    }
    .button.unselected{
        opacity: 0.4;
    }

    .button.long{
        width: 110px;
    }
    .button.short{
        width: 60px;
    }
</style>
