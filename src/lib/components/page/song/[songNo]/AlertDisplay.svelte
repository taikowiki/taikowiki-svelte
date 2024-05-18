<script lang="ts">
    export let isAsiaBanned: 1 | 0;
    export let isKrBanned: 1 | 0;
    export let isDeleted: 1 | 0;

    console.log(isKrBanned);
</script>

<div class="container">
    {#if isDeleted}
        <img src="/assets/icon/warning.svg" alt="warning" />
        <span> 이 곡은 삭제되었습니다. </span>
    {:else if isKrBanned}
        <img src="/assets/icon/warning.svg" alt="warning" />
        <span> 이 곡은 한국에서 플레이할 수 없습니다. </span>
    {:else if isAsiaBanned}
        <img src="/assets/icon/warning.svg" alt="warning" />
        <span> 이 곡은 아시아판에서 플레이할 수 없습니다. </span>
    {/if}
</div>

<style>
    .container{
        display:flex;
        align-items: center;

        column-gap: 5px;

        margin-bottom: 10px;
    }

    img {
        width: 25px;
        height: 25px;
    }

    span {
        color: #c14d4c;
        font-weight: bold;
        
        transform: translateY(-1px);
    }
</style>
