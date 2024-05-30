<script lang="ts">
    export let name: string;
    export let subname: string = '';
    export let color: string = "white";
    export let backgroundColor: string = "#cf4844";
</script>

<div class="name-container" style={`color:${color};background-color:${backgroundColor};`}>
    <div class="name">
        {name}
        {#if subname}
        <div class="subname">
            {subname}
        </div>
        {/if}
    </div>
</div>


<style>
    .name-container{
        display:flex;
        justify-content: center;
       
        align-items: center;
        border-radius: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        height: 50px;
        
    }

    .name{
        margin-left: 10px;
        margin-right: 10px;

        font-size: 30px;
        font-weight: bold;

        box-sizing: border-box;
    }

    .subname{
        font-size: 13px;
        font-weight: normal;
    }
</style>