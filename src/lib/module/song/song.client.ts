import { defineRequestHandler } from "@yowza/rrequestor";
import { Song } from ".";
import { goto } from "$app/navigation";

namespace SongClient {
    export const request = {
        submitSong: defineRequestHandler<{ songNo: string, songData: Song.SongData }, void>({
            url: '/api/song/request',
            method: 'post'
        })
    }

    export const adminRequest = {
        uploadSong: defineRequestHandler<{ songNo: string, songData: Partial<Song.SongData> }, void>({
            url: "/admin/api/song/upload",
            method: 'post'
        }),
        disapproveRequest: defineRequestHandler<{ order: number[] }, void>({
            url: "/admin/api/song/disapprove",
            method: 'post'
        }),
        approve: defineRequestHandler<{ order: number, songData: Song.SongData }, void>({
            url: "/admin/api/song/approve",
            method: 'post'
        })
    }

    export async function submit(songNo: string, songData: Song.SongData, redirectPath: string) {
        if (!confirm(`제출시 제출한 사용자를 구분하기 위해 사용자의 ip 주소가 수집됩니다.\n동의하십니까?`)) {
            alert('동의하지 않아 제출이 실패되었습니다.');
            return;
        }
        const result = await request.submitSong({
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
}

Song.Client = SongClient;

export { Song };