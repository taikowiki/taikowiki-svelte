<script lang="ts">
    import { page } from "$app/stores";
</script>

<a href={$page.params.songNo? `/song/add?song_no=${$page.params.songNo}` : '/song/add'}>
    <img src='/assets/icon/plus.svg' alt=""/>
    곡 추가
</a>

<style>
    a{
        width: 90px;
        height: 30px;
        display:flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;

        color:white !important;

        text-decoration: none;

        background-color: #cf4844;

        border-radius: 5px;
    }

    img{
        width: 20px;

        filter: invert(100%);
    }
</style>