<script lang="ts">
    export let opened: boolean;
    export let sectionName: string;
</script>

<div class="container">
    <h2 class:opened role="presentation" on:click={() => {opened = !opened}}>
        {sectionName}
    </h2>
    <div class="content" class:opened>
        <slot/>
    </div>
</div>

<style>
    .container{
        display:flex;
        flex-direction: column;
        width: 100%;
    }

    h2{
        margin-block: 0;
        border-bottom: 3px solid black;
        cursor: pointer;
    }
    h2::before{
        content: '▼'
    }
    h2.opened::before{
        content: '▲'
    }

    .content{
        width: 100%;
        display:none;
    }
    .content.opened{
        display:block;
    }
</style>