<script lang="ts">
    export let name: string;
    export let color: string = "black";
    export let backgroundColor: string = "grey";
</script>

<div class="name" style={`color:${color};background-color:${backgroundColor};`}>
    {name}
</div>

<style>
    .name{
        width: 100%;
        height: 70px;

        display:flex;

        align-items: center;

        font-size: 25px;
        font-weight: bold;

        border-radius: 10px;

        box-sizing: border-box;

        padding-inline: 10px;

        margin-bottom: 10px;
    }
</style>