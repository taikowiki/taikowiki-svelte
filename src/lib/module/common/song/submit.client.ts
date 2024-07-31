import { type SongData } from "$lib/module/common/song/types";
import { goto } from "$app/navigation";
import { songRequestor } from "./song.client";

export default async function submit(songNo: string, songData: SongData, redirectPath: string) {
    if (!confirm(`제출시 제출한 사용자를 구분하기 위해 사용자의 ip 주소가 수집됩니다.\n동의하십니까?`)) {
        alert('동의하지 않아 제출이 실패되었습니다.');
        return;
    }
    const result = await songRequestor.submitSong({
        songNo,
        songData
    });
    if(result.status === 'success'){
        alert('제출 성공');
        await goto(redirectPath)
    }
    else{
        if(result.statusCode === 403){
            alert('제출 실패: 권한 없음');
        }
        else{
            alert('제출 실패');
        }
    }
}