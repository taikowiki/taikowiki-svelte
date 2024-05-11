<script lang="ts">
    export let name: string;
    export let subname: string = '';
    export let color: string = "black";
    export let backgroundColor: string = "grey";
</script>

<div class="name" style={`color:${color};background-color:${backgroundColor};`}>
    {name}
    {#if subname}
    <div class="subname">
        {subname}
    </div>
    {/if}
</div>

<style>
    .name{
        width: 100%;
        height: 70px;

        display:flex;
        flex-direction: column;
        justify-content: center;

        font-size: 25px;
        font-weight: bold;

        border-radius: 10px;

        box-sizing: border-box;

        padding-inline: 10px;

        margin-bottom: 10px;
    }

    .name:has(.subname){
        height: 90px;
    }

    .subname{
        font-size: 13px;
        font-weight: normal;
    }
</style>