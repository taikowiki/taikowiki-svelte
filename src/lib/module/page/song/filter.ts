import type { Difficulty, Genre, SongData } from "$lib/module/common/song/types";
import type { SongSearchOption } from "./types";
//@ts-expect-error
import r from 'regex-escape';

function regexEscape(str: string): string{
    return r(str)
}

export default function filter(songs: SongData[], option: SongSearchOption): SongData[] {
    let filteredSongs = [...songs];

    if (option.query) {
        const query = convert(option.query).toLowerCase();
        const reg = new RegExp(`${query.split(' ').map(regexEscape).join('.*?')}`)

        filteredSongs = filteredSongs.filter(song => {
            return reg.test(convert(song.title).toLowerCase())
            || (song.titleKo ? reg.test(convert(song.titleKo as string).toLowerCase()) : false)
            || (song.titleEn ? reg.test(convert(song.titleEn as string).toLowerCase()) : false)
            || (song.aliasKo ? reg.test(convert(song.aliasKo as string).toLowerCase()) : false)
            || (song.aliasEn ? reg.test(convert(song.aliasEn as string).toLowerCase()) : false)
        })
    }

    if(option.difficulty && option.level !== undefined){
        switch(option.difficulty){
            case("oniura"):{
                filteredSongs = filteredSongs.filter(song => {
                    return song.courses['oni']?.level === option.level || song.courses['ura']?.level === option.level;
                });
                break;
            }
            default:{
                filteredSongs = filteredSongs.filter(song => song.courses[option.difficulty as Difficulty]?.level === option.level);
            }
        }
    }

    if(option.genre){
        filteredSongs = filteredSongs.filter(song => song.genre.includes(option.genre as Genre))
    }

    return filteredSongs;
}

//전각 문자를 반각문자로 치환하는 함수
function convertToHalf(e: string) {
    return e.replace(/[！-～]/g, (halfwidthChar) => String.fromCharCode(halfwidthChar.charCodeAt(0) - 0xfee0));
};
//반각 및 전각 가타카나를 히라가나로 변환하는 함수
function convertGana(e: string) {
    let E = e.split('');
    const katahan = ['ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾊﾟ', 'ﾋﾞ', 'ﾋﾟ', 'ﾌﾞ', 'ﾌﾟ', 'ﾍﾞ', 'ﾍﾟ', 'ﾎﾞ', 'ﾎﾟ', 'ｳﾞ', 'ｰ', 'ｧ', 'ｱ', 'ｨ', 'ｲ', 'ｩ', 'ｳ', 'ｪ', 'ｴ', 'ｫ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ｯ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ｬ', 'ﾔ', 'ｭ', 'ﾕ', 'ｮ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ｦ', 'ﾝ', 'ｶ', 'ｹ', 'ﾜ', 'ｲ', 'ｴ', 'ﾞ', 'ﾟ'];
    const katazen = ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'パ', 'ビ', 'ピ', 'ブ', 'プ', 'ベ', 'ペ', 'ボ', 'ポ', 'ヴ', 'ー', 'ァ', 'ア', 'ィ', 'イ', 'ゥ', 'ウ', 'ェ', 'エ', 'ォ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ッ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ャ', 'ヤ', 'ュ', 'ユ', 'ョ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', 'ヵ', 'ヶ', 'ヮ', 'ヰ', 'ヱ', '゛', '゜'];
    const hirazen = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'ぱ', 'び', 'ぴ', 'ぶ', 'ぷ', 'べ', 'ぺ', 'ぼ', 'ぽ', 'ヴ', 'ー', 'ぁ', 'あ', 'ぃ', 'い', 'ぅ', 'う', 'ぇ', 'え', 'ぉ', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'っ', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'ゃ', 'や', 'ゅ', 'ゆ', 'ょ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん', 'か', 'け', 'ゎ', 'ゐ', 'ゑ', '゛', '゜'];
    for (let i = 0; i < e.length; i++) {
        if (hirazen.includes(E[i])) {
            let index = hirazen.indexOf(E[i]);
            E[i] = katazen[index];
        }
        if (katazen.includes(E[i])) {
            let index = katazen.indexOf(E[i]);
            E[i] = katahan[index];
        }
    }
    return E.join('');
}
function convert(e: string) {
    return convertGana(convertToHalf(e))
}
