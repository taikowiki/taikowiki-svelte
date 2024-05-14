<script lang="ts">export let title:string;
</script>

<div class="container">
    <div class="title">
        {title}
    </div>
</div>

<style>
    .container{
        display:flex;
        flex-direction: column;
        align-items: flex-start;

        row-gap: 15px;

        margin-bottom: 15px;
    }
    .title{
        width: auto;

        font-weight: bold;
        font-size: 35px;
    }
</style>