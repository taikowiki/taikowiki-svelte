<script lang="ts">
    interface Props {
        name: string;
        color?: string;
        backgroundColor?: string;
    }

    let { name, color = "black", backgroundColor = "gray" }: Props = $props();
</script>

<div class="name" style={`color:${color};background:${backgroundColor};`}>
    {name}
</div>

<style>
    .name {
        width: 100%;
        height: 70px;

        display: flex;
        flex-direction: column;
        justify-content: center;

        font-size: 25px;
        font-weight: bold;

        border-radius: 10px;

        box-sizing: border-box;

        padding-inline: 10px;

        margin-bottom: 10px;
    }
</style>
