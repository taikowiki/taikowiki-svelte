import { mdToHtml } from "../../mdHtmlConverter";
import type { LangFile } from "../types";

import ratingUploadGuide from '../md/ko/ratingUploadGuide.md?raw';
import ratingExplanation from '../md/ko/ratingExplanation.md?raw'

const ja: LangFile = {
    layout: {
        main: {
            song: '曲',
            doc: '文書',
            newSong: '新曲',
            diffchart: '難易度表',
            dani: '段位道場',
            gamecenter: 'ゲームセンター',
            measures: 'レーティング表'
        },
        'dedicated diffchart': {
            type: {
                clear: 'クリア',
                fc: 'フルコンボ',
                dfc: '全良'
            },
            select: '選択'
        },
        '/auth/user': {
            myData: 'マイページ',
            donderData: 'ドンだーデータ'
        }
    },
    component: {
        SongEditor: {
            difficulties: {
                easy: 'かんたん',
                normal: 'ふつう',
                hard: 'むずかしい',
                oni: 'おに',
                ura: 'おに(裏)'
            }
        },
        DaniDisplay: {
            type: {
                "gauge": "魂ゲージ",
                "combo": "コンボ数",
                "score": "スコアー",
                "roll": "連打数",
                "hit": "たたいた数",
                "good": "良の数",
                "ok": "可の数",
                "bad": "不可の数",
                "score_sum": "スコア総合"
            },
            suffix1: {
                percent: "%",
                times: "回",
                point: "点",
                count: "個"
            },
            suffix2: {
                up: '以上',
                down: '未満'
            }
        },
        Diffchart: {
            diffchart: '難易度表',
            downloadMessage: 'イメージを間もなくダウンロードします.'
        }
    },
    other: {
        //페이지 제목
        title: {
            base: '太鼓の達人 ウィキ',
            '/auth/login': 'ログイン',
            '/auth/user': 'マイページ',
            '/auth/user/donder': 'ドンだーデータ',
            '/dani': '段位道場',
            '/diffchart/clear': 'クリアー難易度表',
            '/diffchart/fc': 'フルコンボ難易度表',
            '/gamecenter': 'ゲームセンター地図',
            '/gamecenter/report': 'ゲームセンター報告',
            '/measures': '譜面レーティング表',
            '/song': '曲サーチ',
            '/song/[songNo]': '曲なし',
            '/song/[songNo]/edit': '曲修正',
            '/song/add': '曲追加'
        },
        dani: {
            dan: {
                "senpo": "先鋒",
                "jiho": "次鋒",
                "chiuken": "中堅",
                "fukusho": "副将",
                "taisho": "大将",
                "beginner": "初級",
                "10kyu": "十級",
                "9kyu": "九級",
                "8kyu": "八級",
                "7kyu": "七級",
                "6kyu": "六級",
                '5kyu': '五級',
                '4kyu': '四級',
                '3kyu': '三級',
                '2kyu': '二級',
                '1kyu': '一級',
                '1dan': '初段',
                '2dan': '二段',
                '3dan': '三段',
                '4dan': '四段',
                '5dan': '五段',
                '6dan': '六段',
                '7dan': '七段',
                '8dan': '八段',
                '9dan': '九段',
                '10dan': '十段',
                'kuroto': '玄人',
                'meijin': '名人',
                'chojin': '超人',
                'tatsujin': '達人',
                'gaiden': '外傳'
            },
            version: {
                'katsudon': 'K-D',
                'sorairo': 'ソライロ',
                'momoiro': 'モモイロ',
                'kimidori': 'キミドリ',
                'murasaki': 'ムラサキ',
                'white': 'ホワイト',
                'red': 'レッド',
                'yellow': 'イエロー',
                'blue': 'ブルー',
                'green': 'グリーン',
                'nijiiro_gaiden': 'ニジイロ 外傳',
                '20': 'ニジイロ 2020',
                '21': 'ニジイロ 2021',
                '22': 'ニジイロ 2022',
                '23': 'ニジイロ 2023',
                '24': 'ニジイロ 2024',
                '25': 'ニジイロ 2025',
                '26': 'ニジイロ 2026',
                '27': 'ニジイロ 2027',
                '28': 'ニジイロ 2028',
                '29': 'ニジイロ 2029',
                '30': 'ニジイロ 2030'
            }
        },
        difficulty: {
            easy: 'かんたん',
            normal: 'ふつう',
            hard: 'むずかしい',
            oni: 'おに(表)',
            ura: 'おに(裏)'
        }
    },
    //path
    '/auth/login': {
        forLogin: 'からログイン'
    },
    '/auth/user': {
        nickname: 'ニックネーム',
        change: '変更',
        nickRule: `ニックネームには英語、数字、'-'、ハングルのみ対応しております.`,
        nickChangeSuccess: '変更完了',
        provider: 'ログイン提供者',
        delete: 'アカウントを削除',
        error: {
            'New nickname is not in the correct format': '有効な名前の形式ではありません.',
            'Duplicated Nickname': 'この名前はすでに使用中です.'
        }
    },
    '/auth/user/donder': {
        noDonderData: 'ドンだーひろばのデータがありません. ドンだーひろばのデータをアップロードしてください.',
        myDon: 'マイどん',
        lastUpdate: '最新更新日',
        songRating: '曲のレーティング',
        songTitle: '曲名',
        accuracy: '精度',
        crown: '冠',
        rating: 'レーティング',
        hiroba: 'ひろば',
        measureValue: 'レーティング',
        uploadGuide: mdToHtml(ratingUploadGuide),
        explanation: mdToHtml(ratingExplanation)
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
        }
    },
    '/song/[songNo]': {
        noSong: '曲が存在しません.',
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
    '/song/add': {
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
    //서열표
    '/diffchart': {
        type: {
            clear: 'クリア',
            fc: 'フルコンボ',
            dfc: '全良'
        },
        download: "ダウンロード",
        go: "移動",
        custom: 'カスタム'
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
    },
    '/diffchart/clear/[fc]': {
        '10 level fc': '★10 フルコンボ難易度表',
        '9 level fc': '★9 フルコンボ難易度表',
        '8 level fc': '★8 フルコンボ難易度表',
        '7 level fc': '★7 フルコンボ難易度表',
        '6 level fc': '★6 フルコンボ難易度表',
        sections: {
            'SS': "SS",
            'S+': "S+",
            'pS+': "個人差 S+",
            'S': "S",
            'pS': "個人差 S",
            'A+': 'A+',
            'pA+': '個人差 A+',
            'A': "A",
            'pA': "個人差 A",
            'B+': 'B+',
            'B': "B",
            'pB': "個人差 B",
            'C+': 'C+',
            'C': 'C',
            'pC': '個人差 C',
            'D': 'D',
            'E': 'E',
            'F': 'F'
        }
    },
    '/gamecenter': {
        koreanGamecenterAlert: '韓国で太鼓の達人があるゲームセンターの地図です.',
        amenity: {
            'water': '浄水器',
            'toilet': 'トイレ',
            'park': '駐車場',
            'capture': 'キャプチャー',
            'rental': '貸切',
            'night': '哲也',
            'atm': 'ATM',
            'fan': '扇風機',
            'mybachi': 'マイバチ'
        },
        date: {
            "0": "日",
            "1": "月",
            "2": "火",
            "3": "水",
            "4": "木",
            "5": "金",
            "6": "土"
        },
        report: '報告する',
        favorites: '気に入り',
        keyword: 'キーワード',
        region: '地域',
        all: '全体',
        amenityText: '便益施設',
        machineData: '筐体情報',
        price: '値段',
        tunes: '曲数',
        count: '台',
        login: 'ログイン',
        needed: 'が必要です.'
    },
    '/measures': {
        measureTable: '譜面レーティング表',
        donderData: 'ドンだーデータ'
    },
    '/notice': {
        type: {
            wiki: 'ウィキ',
            official: '公式'
        }
    }
} as const;

export default ja;
