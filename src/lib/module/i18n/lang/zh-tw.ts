import { Util } from '$lib/module/util';
import type { I18N } from '..';

import ratingUploadGuide from '../md/zh-tw/ratingUploadGuide.md?raw';
import ratingExplanation from '../md/zh-tw/ratingExplanation.md?raw';

const newZhtw: I18N.RecursiveStringRecord = {
    layout: {
        main: {
            song: '曲目',
            doc: '文件',
            newSong: '新曲目',
            diffchart: '難易度表',
            dani: '段位道場',
            gamecenter: '街機分佈',
            measures: '評分表',
            user: {
                user: '使用者',
                donderData: '評級',
                notLogined: '未登入',
                login: '登入',
                logout: '登出',
                theme: '主題',
                lang: '語言'
            }
        },
        'dedicated diffchart': {
            type: {
                clear: '通過',
                fc: '全連段',
                dfc: '全良'
            },
            select: '選項'
        },
        '/auth/user': {
            user: '使用者',
            myData: '我的資料',
            donderData: '評級'
        },
        rating: {
            title: '評級',
            me: '我的評級',
            ranking: '排位',
            measure: '評分表'
        }
    },
    component: {
        SongEditor: {
            difficulties: {
                easy: '簡單',
                normal: '普通',
                hard: '困難',
                oni: '魔鬼',
                ura: '魔鬼(裏)'
            }
        },
        DaniDisplay: {
            type: {
                "gauge": "魂量表",
                "combo": "連段數",
                "score": "分數",
                "roll": "連打數",
                "hit": "擊打數",
                "good": "良",
                "ok": "可",
                "bad": "不可",
                "score_sum": "總分"
            },
            suffix1: {
                percent: "%",
                times: "次",
                point: "分",
                count: "個"
            },
            suffix2: {
                up: '以上',
                down: '未滿'
            }
        },
        Diffchart: {
            diffchart: '難易度表',
            downloadMessage: '圖片下載中'
        }
    },
    //페이지 제목
    title: {
        base: '太鼓達人維基',
        '/auth/login': '登入',
        '/auth/user': '我的資料',
        '/auth/user/donder': '鼓眾資料',
        '/dani': '段位道場',
        '/diffchart/clear': '通過難易度表',
        '/diffchart/fc': '全連段難易度表',
        '/diffchart/dfc': '全良難易度表',
        '/gamecenter': '街機分佈地圖',
        '/gamecenter/report': '街機回報',
        '/measures': '譜面評級表',
        '/song': '曲目',
        '/song/[songNo]': '查無結果',
        '/song/[songNo]/edit': '提交編輯',
        '/song/add': '新增曲目',
        '/rating/me': '我的評級',
        '/rating/ranking': '排位',
        '/rating/measure': '評分表'
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
            'sorairo': '天藍色',
            'momoiro': '桃色',
            'kimidori': '黃綠色',
            'murasaki': '紫版',
            'white': '白版',
            'red': '紅版',
            'yellow': '黃版',
            'blue': '藍版',
            'green': '綠版',
            'nijiiro_gaiden': '虹色 外傳',
            '20': '虹色 2020',
            '21': '虹色 2021',
            '22': '虹色 2022',
            '23': '虹色 2023',
            '24': '虹色 2024',
            '25': '虹色 2025',
            '26': '虹色 2026',
            '27': '虹色 2027',
            '28': '虹色 2028',
            '29': '虹色 2029',
            '30': '虹色 2030'
        }
    },
    song: {
        difficulty: {
            easy: '簡單',
            normal: '普通',
            hard: '困難',
            oni: '魔鬼(表)',
            ura: '魔鬼(裏)'
        }
    },
    page: {
        index: {
            shortcut: {
                song: '曲目',
                doc: '文件',
                diffchart: '難易度表',
                dani: '段位道場',
                gamecenter: '街機地圖',
                rating: '評分'
            },
            notice: '公告'
        },
        songNo: {
            alert: {
                deleted: '此曲已被刪除',
                krBanned: '此曲未在韓國上架',
                asiaBanned: '此曲未在亞洲上架'
            },
            multipleTitle: {
                translatedTitle: '翻譯名',
                ko: '韓文',
                aliasKo: '韓文(非官方)',
                en: '英文',
                aliasEn: '英文(非官方)',
                romaji: '羅馬字'
            },
            songData: {
                version: '收錄版本',
                artists: '作者',
                addedDate: '上架日期'
            },
            course: {
                combos: '最大連段數',
                branched: '譜面分歧',
                balloons: '最大風船數',
                roll: '最大連打時間',
                density: '最大密度',
                playTime: '最大演奏時間',
                hitsec: '打/秒',
                sec: '秒',
                total: '總',
                count: '個',
                daniList: '段位表',
                nthSong: '曲目',
                noDani: '段位收錄',
                fumenImage: '譜面圖'
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
                '10 level fc': '★10 全連段難易度表',
                '9 level fc': '★9 全連段難易度表',
                '8 level fc': '★8 全連段難易度表',
                '7 level fc': '★7 全連段難易度表',
                '6 level fc': '★6 全連段難易度表',
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
                search: '搜尋'
            },
            machineInfo: '機台資訊'
        },
        donder: {
            rating: {
                top: '上位'
            },
            section: {
                song: '曲目評級',
                measure: '評分表',
                explanation: '評分說明'
            },
            song: '曲目',
            otherSong: '其他曲目',
            link: '連結',
            download: '下載',
            downloadMessage: '圖片下載中'
        },
        user: {
            showRating: {
                name: '顯示評分',
                showRatingNick: '顯示鼓眾廣場暱稱',
                showRatingTaikoNo: '顯示鼓眾號碼',
                showRatingSongs: '顯示歌曲評分',
                submit: '提交',
                success: '提交成功',
                error: '發生錯誤'
            }
        },
        rating: {
            ranking: {
                heading: '排位',
                ranking: '排位',
                tier: '線級',
                rating: '評分',
                nickname: '暱稱'
            },
            measures: {
                heading: '評分表'
            },
            user: {
                nondisclosure: '曲目評分未公開'
            }
        }
    }
}

const zhtw: I18N.LangFile = {
    other: {
        //페이지 제목
        title: {
            base: '太鼓達人維基',
            '/auth/login': '登入',
            '/auth/user': '我的資料',
            '/auth/user/donder': '鼓眾資料',
            '/dani': '段位道場',
            '/diffchart/clear': '通過難易度表',
            '/diffchart/fc': '全連段難易度表',
            '/diffchart/dfc': '全良難易度表',
            '/gamecenter': '街機分佈地圖',
            '/gamecenter/report': '街機回報',
            '/measures': '譜面評級表',
            '/song': '曲目',
            '/song/[songNo]': '查無結果',
            '/song/[songNo]/edit': '提交編輯',
            '/song/add': '新增曲目',
            '/rating/me': '我的評級',
            '/rating/ranking': '排位',
            '/rating/measure': '評分表',
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
                'sorairo': '天藍色',
                'momoiro': '桃色',
                'kimidori': '黃綠色',
                'murasaki': '紫版',
                'white': '白版',
                'red': '紅版',
                'yellow': '黃版',
                'blue': '藍版',
                'green': '綠版',
                'nijiiro_gaiden': '虹色 外傳',
                '20': '虹色 2020',
                '21': '虹色 2021',
                '22': '虹色 2022',
                '23': '虹色 2023',
                '24': '虹色 2024',
                '25': '虹色 2025',
                '26': '虹色 2026',
                '27': '虹色 2027',
                '28': '虹色 2028',
                '29': '虹色 2029',
                '30': '虹色 2030'
            }
        },
        difficulty: {
            easy: '簡單',
            normal: '普通',
            hard: '困難',
            oni: '魔鬼(表)',
            ura: '魔鬼(裏)'
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
        easy: '簡單',
        normal: '普通',
        hard: '困難',
        oni: '魔鬼',
        omote: '魔鬼(表)',
        ura: '魔鬼(裏)',
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
            clear: '通過',
            fc: '全連段',
            dfc: '全良'
        },
        download: "ダウンロード",
        go: "移動",
        custom: 'カスタム'
    },
    '/diffchart/clear/[level]': {
        '10 level clear': '★10 通過難易度表',
        '9 level clear': '★9 通過難易度表',
        '8 level clear': '★8 通過難易度表',
        '7 level clear': '★7 通過難易度表',
        '6 level clear': '★6 通過難易度表',
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
        subname: "🔴 個人差デカい&nbsp;&nbsp;&nbsp;🟢 初見注意&nbsp;&nbsp;&nbsp;🟣 クリアに比べて全連段むずい"
    },
    '/diffchart/clear/[fc]': {
        '10 level fc': '★10 全連段難易度表',
        '9 level fc': '★9 全連段難易度表',
        '8 level fc': '★8 全連段難易度表',
        '7 level fc': '★7 全連段難易度表',
        '6 level fc': '★6 全連段難易度表',
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
    ...newZhtw
} as const;

export default zhtw;
