import { error } from '@sveltejs/kit'
import type { Crown } from 'node-hiroba/types';

export async function GET({params, setHeaders, fetch}){
    if(!["played", "silver", "gold", "donderful"].includes(params.crown)){
        throw error(404);
    }

    setHeaders({
        'content-type': 'image/png',
        'cache-control': "max-age=31536000"
    });

    const blob = await (await fetch(getUrl(params.crown as Crown))).blob();

    return new Response(blob);
}

function getUrl(crown: Crown): string {
    switch (crown) {
        case "played": {
            return "https://donderhiroba.jp/image/sp/640/crown_large_0_640.png";
        }
        case "silver": {
            return "https://donderhiroba.jp/image/sp/640/crown_large_1_640.png";
        }
        case "gold": {
            return "https://donderhiroba.jp/image/sp/640/crown_large_2_640.png";
        }
        case "donderfull": {
            return "https://donderhiroba.jp/image/sp/640/crown_large_3_640.png";
        }
    }
    return '';
}