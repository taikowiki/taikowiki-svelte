<script lang="ts" context="module">
    import type { SongData } from "$lib/module/common/song/types";

    function songSortCallback(a: SongData, b: SongData) {
        const numberRegexp = /^([0-9]*)$/;
        if (numberRegexp.test(a.songNo) && numberRegexp.test(b.songNo)) {
            return Number(a.songNo) - Number(b.songNo);
        } else {
            return a.songNo < b.songNo ? -1 : 1;
        }
    }
</script>

<script lang="ts">
    export let data;
    const { songs } = data;
</script>

<a href="/admin/song/add">곡 추가</a>
<a href="/admin/song/request">수정 요청 목록</a>
<table>
    <tr>
        <th>
            곡 번호
        </th>
        <th>
            제목
        </th>
        <th>
            수정 요청 보기
        </th>
    </tr>
    {#each songs.sort(songSortCallback) as song}
        <tr>
            <td>
                <div class="hc vc">
                    {song.songNo}
                </div>
            </td>
            <td>
                <a class="vc" href={`/admin/song/edit/${song.songNo}`}>
                    {song.title}
                </a>
            </td>
            <td>
                <a class="vc hc" href={`/admin/song/request/${song.songNo}`}>
                    수정 요청 목록
                </a>
            </td>
        </tr>
    {/each}
</table>

<style>
    table{
        width: 100%;
    }

    .hc{
        display:flex;
        height: 100%;
        justify-content: center;
    }
    .vc{
        display:flex;
        height: 100%;
        align-items: center;
    }
</style>