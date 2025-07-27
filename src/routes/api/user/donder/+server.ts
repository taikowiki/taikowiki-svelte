import { User } from "$lib/module/user";
import '$lib/module/user/user.server';
import { error } from '@sveltejs/kit';
import lzutf8 from 'lzutf8';

/**
 * 동더히로바 프로필, 클리어 데이터, 점수 데이터를 받음
 * @param param0 
 * @returns 
 */
export async function POST({request, locals}){
    if(!locals.userData){
        throw error(403);
    }

    const buffer = await request.arrayBuffer();
    const unit8array = new Uint8Array(buffer);
    const json = lzutf8.decompress(unit8array, {inputEncoding: "ByteArray"});
    const data = JSON.parse(json);

    await User.Server.donderDBController.updateData(locals.userData.UUID, data);

    return new Response();
}

export async function OPTIONS(){
    return new Response();
}