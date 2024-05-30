<script lang="ts" context="module">
    import { goto } from "$app/navigation";
    import axios from "axios";

    async function submit(songNo:string, songData:SongData) {
        try{
            await axios({
                method:'POST',
                data:{
                    songNo,
                    songData
                },
                url:'/api/song/request'
            });
            alert('제출 성공');
            await goto(`/song/${songNo}`)
        }
        catch(err){
            console.log(err);
            alert('제출 실패');
        }
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";

    import SongEditor from "$lib/components/page/song/add/SongEditor.svelte";
    import { getSongFromContextBySongNo } from "$lib/module/common/song/song.client";
    import type { SongData } from "$lib/module/common/song/types";

    let maybeSongData: SongData|null = getSongFromContextBySongNo($page.params.songNo);
    
    let songData = maybeSongData as SongData;
</script>

<SongEditor bind:songData type="edit" />

<button
    on:click={() => {
        submit(songData.songNo, songData);
    }}
>
    <img src="/assets/icon/plus.svg" alt="" />
    제출
</button>

<style>
    button {
        width: 90px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;

        color: white;

        text-decoration: none;

        background-color: #cf4844;

        border-radius: 5px;

        border: none;

        cursor: pointer;

        margin-top: 15px;
    }

    img {
        width: 20px;

        filter: invert(100%);
    }
</style>
