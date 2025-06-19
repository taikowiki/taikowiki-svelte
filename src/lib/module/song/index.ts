import type { RRequestHandler } from '@yowza/rrequestor/types';

//@ts-expect-error
import r from 'regex-escape';
function regexEscape(str: string): string {
    return r(str)
}

export namespace Song {
    export namespace CONST {
        export const GENRE = ["pops", "anime", "kids", "game", "variety", "namco", "vocaloid", "classic"] as const
        export const DIFFICULTY = ["easy", "normal", "hard", "oni", "ura"] as const
        export const VERSION = [
            ["NAC"],
            ["AC1", "AC2", "AC3", "AC4", "AC5", "AC6", "AC7", "AC8", "AC9", "AC10", "AC11", "AC12", "AC12.5", "AC13", "AC14"],
            ["DF"],
            ["NS2", "NS1", "NSRPG"],
            ["PS4"],
            ["TDM"],
            ["WiiU1", "WiiU2", "WiiU3"],
            ["Wii1", "Wii2", "Wii3", "Wii4", "Wii5"],
            ["PS2-1", "PS2-2", "PS2-3", "PS2-4", "PS2-5", "PS2-6", "PS2-7", "PS2Anime1", "PS2Anime2", "PS2TDM"],
            ["PSP1", "PSP2", "PSPDX"],
            ["DS1", "DS2", "DS3"],
            ["V", "IDM"],
            ["3DS1", "3DS2", "3DS3"],
            ["PLUS", "PTB", "RC"]
        ] as const
        export const DANIVERSION = ["katsudon", "sorairo", "momoiro", "kimidori", "murasaki", "white", "red", "yellow", "blue", "green", "nijiiro_gaiden", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"] as const;
        export const REGULAR_DAN = ["senpo", "jiho", "chiuken", "fukusho", "taisho", "beginner", "10kyu", "9kyu", "8kyu", "7kyu", "6kyu", "5kyu", "4kyu", "3kyu", "2kyu", "1kyu", "1dan", "2dan", "3dan", "4dan", "5dan", "6dan", "7dan", "8dan", "9dan", "10dan", "kuroto", "meijin", "chojin", "tatsujin"] as const;
        export const DAN = [...REGULAR_DAN, "gaiden"] as const;
    }

    /*
    song compare
    */
    export function compareSong(song1: SongData, song2: SongData) {
        const keys: any = {
            songNo: song1.songNo !== song2.songNo,
            title: song1.title !== song2.title,
            titleKo: song1.titleKo !== song2.titleKo,
            aliasKo: song1.aliasKo !== song2.aliasKo,
            titleEn: song1.titleEn !== song2.titleEn,
            aliasEn: song1.aliasEn !== song2.aliasEn,
            romaji: song1.romaji !== song2.romaji,
            bpmShiver: song1.bpmShiver !== song2.bpmShiver,
            isAsiaBanned: song1.isAsiaBanned !== song2.isAsiaBanned,
            isDeleted: song1.isDeleted !== song2.isDeleted,
            isKrBanned: song1.isKrBanned !== song2.isKrBanned,
            addedDate: song1.addedDate !== song2.addedDate,
            bpm: false,
            version: false,
            genre: false,
            artists: false,
            courses: {}
        }

        //bpm
        if (song1?.bpm?.min !== song2?.bpm?.min || song1?.bpm?.max !== song2?.bpm?.max) {
            keys.bpm = true;
        }

        //version
        if (song1?.version?.length !== song2?.version?.length) {
            keys.version = true;
        }
        else if (song1.version) {
            for (const version of song1.version) {
                if (!song2?.version?.includes(version)) {
                    keys.version = true;
                    break;
                }
            }
        }

        //genre
        if (song1?.genre?.length !== song2?.genre?.length) {
            keys.genre = true;
        }
        else if (song1.genre) {
            for (const genre of song1.genre) {
                if (!song2.genre.includes(genre)) {
                    keys.genre = true;
                    break;
                }
            }
        }

        //artist
        if (song1?.artists?.length !== song2?.artists?.length) {
            keys.artists = true
        }
        else if (song1.artists) {
            for (const artist of song1.artists) {
                if (!song2.artists.includes(artist)) {
                    keys.artists = true
                    break;
                }
            }
        }

        (['easy', 'normal', 'hard', 'oni', 'ura'] as (keyof SongData['courses'])[]).forEach((diff) => {
            if (song1.courses[diff] === null && song2.courses[diff] === null) {
                return;
            }

            if ((song1.courses[diff] === null && song2.courses[diff] !== null) || (song1.courses[diff] !== null && song2.courses[diff] === null)) {
                keys.courses[diff] = {
                    exists: true
                };
                return;
            }

            keys.courses[diff] = compareCourse(song1.courses[diff] as Course, song2.courses[diff] as Course)
        })

        return keys;
    }

    function compareCourse(course1: Course, course2: Course) {
        const course = {
            level: false,
            isBranched: false,
            maxCombo: false,
            playTime: false,
            maxDensity: false,
            daniUsed: false,
            balloon: false,
            rollTime: false,
            images: false,
            dani: false
        }

        if (course1?.level !== course2?.level) {
            course.level = true;
        }

        if (course1?.isBranched !== course2?.isBranched) {
            course.isBranched = true;
        }

        if (course1?.maxCombo !== course2?.maxCombo) {
            course.maxCombo = true;
        }

        if (course1?.playTime !== course2?.playTime) {
            course.playTime = true;
        }

        if (course1?.maxDensity !== course2?.maxDensity) {
            course.maxDensity = true;
        }

        if (course1?.daniUsed !== course2?.daniUsed) {
            course.daniUsed = true;
        }

        if (JSON.stringify(course1?.balloon) !== JSON.stringify(course2?.balloon)) {
            course.balloon = true;
        }

        if (JSON.stringify(course1?.rollTime) !== JSON.stringify(course2?.rollTime)) {
            course.rollTime = true;
        }

        if (JSON.stringify(course1?.images) !== JSON.stringify(course2?.images)) {
            course.images = true;
        }

        if (course1?.dani?.length !== course2?.dani?.length) {
            course.dani = true;
        }
        if (course1.dani) {
            for (const dani of course1.dani) {
                if (!course2?.dani.find(d => {
                    return dani.dan === d.dan && dani.order === d.order && dani.version === d.version
                })) {
                    course.dani = true;
                    break;
                }
            }
        }

        return course;
    }

    /*
    filter
    */
    export function filter(songs: SongData[], option: SongSearchOption): SongData[] {
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

        if (option.difficulty && option.level !== undefined) {
            switch (option.difficulty) {
                case ("oniura"): {
                    filteredSongs = filteredSongs.filter(song => {
                        return song.courses['oni']?.level === option.level || song.courses['ura']?.level === option.level;
                    });
                    break;
                }
                default: {
                    filteredSongs = filteredSongs.filter(song => song.courses[option.difficulty as Difficulty]?.level === option.level);
                }
            }
        }

        if (option.genre) {
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
}

export namespace Song {
    export declare namespace Client {
        const request: {
            submitSong: RRequestHandler<{
                songNo: string;
                songData: Song.SongData;
            }, void>;
        }
        const adminRequest: {
            uploadSong: RRequestHandler<{
                songNo: string;
                songData: Partial<Song.SongData>;
            }, void>;
            disapproveRequest: RRequestHandler<{
                order: number[];
            }, void>;
            approve: RRequestHandler<{
                order: number;
                songData: Song.SongData;
            }, void>
        }
        function submit(songNo: string, songData: Song.SongData, redirectPath: string): Promise<void>
    }
}

export namespace Song {
    const { GENRE, DIFFICULTY, VERSION, DANIVERSION, DAN } = Song.CONST;

    export type SongDataPickedForSearch = Pick<SongData, "songNo" | "genre" | "title" | "titleKo" | "aliasKo" | "titleEn" | "aliasEn" | "romaji" | "artists" | "courses"> & { order: number }

    export interface SongData {
        songNo: string;
        title: string;
        titleKo: string | null;
        aliasKo: string | null;
        titleEn: string | null;
        aliasEn: string | null;
        romaji: string | null;
        bpm: Record<'min' | 'max', number>;
        bpmShiver: 1 | 0;
        version: Version[];
        isAsiaBanned: 1 | 0;
        isKrBanned: 1 | 0;
        genre: Genre[];
        artists: string[];
        addedDate: number | null;
        courses: Record<"easy" | "normal" | "hard" | "oni", Course> & Record<"ura", Course | null>
        isDeleted: 1 | 0;
    }

    export type Genre = typeof GENRE[number]
    export type Difficulty = typeof DIFFICULTY[number]
    export interface Course {
        level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        isBranched: 1 | 0;
        maxCombo: number;
        playTime: number;
        balloon: number[];
        rollTime: number[];
        maxDensity: number;
        daniUsed: 1 | 0;
        dani: Dani[];
        images: string[];
    }
    export type Version = typeof VERSION[number][number]
    export type SongLang = "ja" | "ko" | "ako" | "en" | "aen" | "rom";
    export type DaniVersion = typeof DANIVERSION[number];
    export type Dan = typeof DAN[number];
    export interface Dani {
        version: DaniVersion;
        dan: Dan;
        order: 1 | 2 | 3;
    }

    //song search option
    export interface SongSearchOption {
        query?: string;
        difficulty?: Difficulty | "oniura";
        level?: number;
        genre?: Genre;
    }

    //request
    export interface SongRequest {
        UUID: string;
        ip: string;
        songNo: string;
        createdTime: number;
        type: 'edit' | 'new';
        data: SongData;
        status: 'none' | 'approved' | 'disapproved'
    }
}