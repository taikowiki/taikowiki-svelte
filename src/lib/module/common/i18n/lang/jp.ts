import type { LangFile } from "../types";

const jp:LangFile = {
    layout: {
        main: {
            song: '曲',
            doc: '文書'
            diffchart: '難易度表'
        },
        'dedicated diffchart': {
            type: {
                clear: 'クリア',
                fc: 'フルコンボ',
                dfc: '全良'
            }
        }
    }
},
'/song': {
    placeholder: 'キーワード',
    difficulty: '難易度',
    easy: 'かんたん',
    normal: 'ふつう',
    hard: 'むずかしい',
    oni: 'おに',
    omote: 'おに(表)',
    ura: 'おに(裏)',
    genre: 'ジャンル',
    genres: {
        pops: 'ポップス',
        anime: 'アニメ,
        kids: 'キッズ',
        vocaloid: 'ボーカロイド',
        game: 'ゲームミュージック',
        namco: 'ナムコオリジナル',
        variety: 'バラエティ',
        classic: 'クラシック'
    },
    languages:{
        jp: '日本語',
        ko: '韓国語',
        ako: '韓国語(非公式)'
    },
    '/song/[songNo]':{
        genres: {
            pops: 'ポップス',
            anime: 'アニメ,
            kids: 'キッズ',
            vocaloid: 'ボーカロイド',
            game: 'ゲームミュージック',
            namco: 'ナムコオリジナル',
            variety: 'バラエティ',
            classic: 'クラシック'
        }
    },
    '/diffchart':太鼓
        type: {
            clear: 'クリア',
            fc: 'フルコンボ',
            dfc: '全良'
        }
    },
export default jp;
