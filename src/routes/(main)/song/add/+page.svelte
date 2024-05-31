<script lang="ts" context="module">
    import { goto } from "$app/navigation";

    async function submit(songNo:string, songData:SongData) {
        if(!confirm(`제출할 시 사용자의 ip 주소가 수집됩니다.\n동의하십니까?`)){
            alert('동의하지 않아 제출이 실패되었습니다.');
            return;
        }
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
            await goto('/song')
        }
        catch(err){
            console.log(err);
            alert('제출 실패');
        }
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";

    import SongEditor from "$lib/components/common/song/editor/SongEditor.svelte";
    import type { SongData } from "$lib/module/common/song/types";
    import axios from "axios";

    let songData: SongData = {
        songNo: $page.url.searchParams.get("song_no") || "",
        title: "",
        titleEn: null,
        titleKo: null,
        aliasEn: null,
        aliasKo: null,
        bpm: {
            min: 0,
            max: 0,
        },
        bpmShiver: 0,
        version: [],
        isAsiaBanned: 0,
        isKrBanned: 0,
        isDeleted: 0,
        genre: [],
        artists: [],
        addedDate: null,
        courses: {
            easy: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            normal: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            hard: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            oni: {
                level: 1,
                isBranched: 0,
                maxCombo: 0,
                playTime: 0,
                balloon: [],
                rollTime: [],
                maxDensity: 0,
                daniUsed: 0,
                dani: [],
                images: [],
            },
            ura: null,
        },
    };
</script>

<SongEditor bind:songData />

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
