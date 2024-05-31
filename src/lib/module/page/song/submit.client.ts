import { type SongData } from "$lib/module/common/song/types";
import axios from "axios";
import { goto } from "$app/navigation";

export default async function submit(songNo:string, songData:SongData, redirectPath: string) {
    if(!confirm(`제출시 제출한 사용자를 구분하기 위해 사용자의 ip 주소가 수집됩니다.\n동의하십니까?`)){
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
        await goto(redirectPath)
    }
    catch(err){
        console.log(err);
        alert('제출 실패');
    }
}