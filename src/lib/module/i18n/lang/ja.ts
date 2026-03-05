import { Util } from '$lib/module/util';
import type { I18N } from '..';

import ratingUploadGuide from '../md/ja/ratingUploadGuide.md?raw';
import ratingExplanation from '../md/ja/ratingExplanation.md?raw';

const newJa: I18N.RecursiveStringRecord = {
    layout: {
        main: {
            song: '曲',
            doc: '文書',
            newSong: '新曲',
            diffchart: '難易度表',
            dani: '段位道場',
            gamecenter: 'ゲームセンター',
            measures: 'レーティング表',
            user: {
                user: 'ユーザー',
                donderData: 'レーティング',
                notLogined: '非ログイン',
                login: 'ログイン',
                logout: 'ログアウト',
                theme: 'テーマ',
                lang: '言語'
            }
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
            user: 'ユーザー',
            myData: 'マイページ',
            donderData: 'レーティング'
        },
        rating:{
            title: 'レーティング',
            me: 'マイ·レーティング',
            ranking: 'ランキング',
            measure: '定数表'
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
            },
            BasicEditor: {
                songNo: '曲番号'
            },
            TitleEditor: {
                title: 'タイトル',
                songTitle: '曲タイトル',
                titleKo: '韓国語',
                aliasKo: '韓国語(非公式)',
                titleEn: '英語',
                aliasEn: '英語(非公式)',
                titleZhCN: '中国語',
                romaji: 'ローマ字'
            },
            OtherEditor: {
                other: 'その他',
                genre: 'ジャンル',
                bpmShiver: 'BPM揺れ',
                version: '収録バージョン',
                artist: 'アーティスト',
                commaPlz: 'カンマで区切って入力してください。',
                included: '収録可否',
                deleted: '削除',
                asiaBanned: 'アジア版制限',
                krBanned: '韓国版制限',
                addedDate: '追加日',
                use: '使用'
            },
            CoursesEditor: {
                course: '譜面'
            },
            CourseEditor: {
                level: 'レベル',
                branched: '分岐あり',
                maxCombo: '最大コンボ数',
                playTime: '最大演奏時間(秒)',
                playTimeSub: '最初のドン/カッから最後のドン/カッまでの時間です。',
                density: '最大密度(打/秒)',
                calculate: '計算する',
                maxBalloon: '最大風船数',
                commaPlz: 'カンマで区切ってください。',
                maxRoll: '最大連打時間(秒)',
                dani: '段位',
                add: '追加',
                img: '譜面イメージ',
                imgLink: 'イメージURL'
            },
            DaniEditor: {
                first: '1曲目',
                second: '2曲目',
                third: '3曲目'
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
    //페이지 제목
    title: {
        base: '太鼓の達人 ウィキ',
        '/auth/login': 'ログイン',
        '/auth/user': 'マイページ',
        '/auth/user/donder': 'ドンだーデータ',
        '/dani': '段位道場',
        '/diffchart/clear': 'クリアー難易度表',
        '/diffchart/fc': 'フルコンボ難易度表',
        '/diffchart/dfc': '全良難易度表',
        '/gamecenter': 'ゲームセンター地図',
        '/gamecenter/report': 'ゲームセンター報告',
        '/measures': '譜面レーティング表',
        '/song': '曲サーチ',
        '/song/[songNo]': '曲なし',
        '/song/[songNo]/edit': '曲修正',
        '/song/add': '曲追加',
        '/rating/me': 'マイ·レーティング',
        '/rating/ranking': 'ランキング',
        '/rating/measure': '定数表'
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
    song: {
        difficulty: {
            easy: 'かんたん',
            normal: 'ふつう',
            hard: 'むずかしい',
            oni: 'おに(表)',
            ura: 'おに(裏)'
        }
    },
    page: {
        index: {
            shortcut: {
                song: '曲',
                doc: '文書',
                diffchart: '難易度表',
                dani: '段位道場',
                gamecenter: 'ゲーセン',
                rating: 'レーティング'
            },
            notice: 'お知らせ'
        },
        songNo: {
            alert: {
                deleted: 'この曲は削除されました。',
                krBanned: 'この曲は韓国ではプレイできません',
                asiaBanned: 'この曲はアジア版ではプレイできません。'
            },
            multipleTitle: {
                translatedTitle: '翻訳名',
                ko: '韓国語',
                aliasKo: '韓国語(非公式)',
                en: '英語',
                aliasEn: '英語(非公式)',
                romaji: 'ローマ字'
            },
            songData: {
                version: '収録 バージョン',
                artists: 'アーティスト',
                addedDate: '追加された日付'
            },
            course: {
                combos: '最大コンボ数',
                branched: '分岐可否',
                balloons: '最大風船数',
                roll: '最大連打時間',
                density: '最大密度',
                playTime: '最大演奏時間',
                hitsec: '打/秒',
                sec: '秒',
                total: '総',
                count: '個',
                daniList: '段位収録リスト',
                nthSong: '曲目',
                noDani: '段位収録',
                fumenImage: '譜面イメージ'
            }
        },
        diffchart: {
            dfc: {
                '10 level dfc': '★10 全良難易度表',
                sections: {
                    'SS': "SS",
                    'iS+': "地力 S+",
                    'pS+': "個人差 S+",
                    'iS': "地力 S",
                    'pS': "個人差 S",
                    'iA+': '地力 A+',
                    'pA+': '個人差 A+',
                    'iA': "地力 A",
                    'pA': "個人差 A",
                    'iB': '地力 B',
                    'pB': "個人差 B",
                    'iC': '地力 C',
                    'pC': '個人差 C',
                    'iD': '地力 D',
                    'pD': '個人差 D',
                    'iE': '地力 E',
                    'pE': '個人差 E',
                    'iF': '地力 F'
                }
            },
            fc: {
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
            }
        },
        dani: {
            go: '移動'
        },
        gamecenter: {
            selector: {
                search: '検索'
            },
            machineInfo: '機体情報'
        },
        donder: {
            rating:{
                top: '上位'
            },
            section:{
                song: '曲レーティング',
                measure: '定数表',
                explanation: 'レーティング説明'
            },
            song: '曲',
            otherSong: 'それ以外の曲',
            link: 'リンク',
            download: 'ダウンロード',
            downloadMessage: 'イメージを間もなくダウンロードします.'
        },
        user: {
            showRating: {
                name: 'レーティング プロフィール公開',
                showRatingNick: 'マイどん名前公開',
                showRatingTaikoNo: 'マイどん太鼓番公開',
                showRatingSongs: '曲レーティング公開',
                submit: '適用',
                success: '適用が完了しました。',
                error: 'エラーが発生しました。'
            }
        },
        rating: {
            ranking: {
                heading: 'ランキング',
                ranking: '順位',
                tier: 'ティア',
                rating: 'レーティング',
                nickname: '名前'
            },
            measures:{
                heading: '定数表'
            },
            user:{
                nondisclosure: '曲のレーティングは非公開です。'
            }
        }
    }
}

const ja: I18N.LangFile = {
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
                'katsudon': 'KATSU-DON',
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
        uploadGuide: Util.mdToHtml(ratingUploadGuide),
        explanation: Util.mdToHtml(ratingExplanation)
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
            ja: '日本語',
            ko: '韓国語',
            ako: '韓国語(非公式)',
            en: '英語',
            aen: '英語(非公式)',
            rom: 'ローマ字'
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
    },
    ...newJa
} as const;

export default ja;
