import type { LangFile } from "../types";

const jp: LangFile = {
    layout: {
        main: {
            song: '曲',
            doc: '文書',
            diffchart: '難易度表'
        },
        'dedicated diffchart': {
            type: {
                clear: 'クリア',
                fc: 'フルコンボ',
                dfc: '全良'
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
            anime: 'アニメ',
            kids: 'キッズ',
            vocaloid: 'ボーカロイド',
            game: 'ゲームミュージック',
            namco: 'ナムコオリジナル',
            variety: 'バラエティ',
            classic: 'クラシック'
        },
        languages: {
            jp: '日本語',
            ko: '韓国語',
            ako: '韓国語(非公式)'
        },

    },
    '/song/[songNo]': {
        genres: {
            pops: 'ポップス',
            anime: 'アニメ',
            kids: 'キッズ',
            vocaloid: 'ボーカロイド',
            game: 'ゲームミュージック',
            namco: 'ナムコオリジナル',
            variety: 'バラエティ',
            classic: 'クラシック'
        }
    },
    '/diffchart': {
        type: {
            clear: 'クリア',
            fc: 'フルコンボ',
            dfc: '全良'
        },

    },
    '/diffchart/clear/[level]': {
        '10 level clear': '★10 クリア難易度表',
        '9 level clear': '★9 クリア難易度表',
        '8 level clear': '★8 クリア難易度表',
        '7 level clear': '★7 クリア難易度表',
        '6 level clear': '★6 クリア難易度表',
        sections: {
            'SSS': 'SSS',
            'SS': 'SS',
            'S': 'S',
            'A': 'A',
            'B': 'B',
            'C': 'C',
            'D': 'D',
            'E': 'E',
            'F': 'F',
            'X': '個人差'
        },
        subname: "🔴 個人差デカい&nbsp;&nbsp;&nbsp;🟢 初見注意&nbsp;&nbsp;&nbsp;🟣 クリアに比べてフルコンボむずい"
    }
}

export default jp;