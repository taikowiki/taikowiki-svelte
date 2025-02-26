<script lang="ts">
    interface Props{
        title: string;
    }

    let {title = $bindable()}: Props = $props();
</script>

<div class="row-center">
    <input
        type="text"
        class="title"
        bind:value={title}
        placeholder="제목"
    />
</div>

<style>
    .title {
        flex: 1 0 auto;

        font-size: 20px;
        font-weight: bold;
        height: 30px;
    }
    .row-center {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
</style>