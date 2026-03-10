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
            },
            BasicEditor: {
                songNo: '曲目編號'
            },
            TitleEditor: {
                title: '標題',
                songTitle: '曲目名稱',
                titleKo: '韓文',
                aliasKo: '韓文(非官方)',
                titleEn: '英文',
                aliasEn: '英文(非官方)',
                titleZhCN: '簡體中文',
                romaji: '羅馬字'
            },
            OtherEditor: {
                other: '其他',
                genre: '類型',
                bpmShiver: 'BPM 抖動',
                version: '收錄版本',
                artist: '作者',
                commaPlz: '請以逗號分隔。',
                included: '收錄狀態',
                deleted: '刪除',
                asiaBanned: '亞洲版禁曲',
                krBanned: '韓國版禁曲',
                addedDate: '上架日期',
                use: '使用'
            },
            CoursesEditor: {
                course: '譜面'
            },
            CourseEditor: {
                level: '等級',
                branched: '譜面分歧',
                maxCombo: '最大連段數',
                playTime: '最大演奏時間(秒)',
                playTimeSub: '從第一顆音符到最後一顆音符的時間。',
                density: '最大密度(打/秒)',
                calculate: '計算',
                maxBalloon: '最大風船數',
                commaPlz: '請用逗號分隔。',
                maxRoll: '最大連打時間(秒)',
                dani: '段位',
                add: '新增',
                img: '譜面圖片',
                imgLink: '圖片連結'
            },
            DaniEditor: {
                first: '第一首',
                second: '第二首',
                third: '第三首'
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
        '/song': '曲目搜尋',
        '/song/[songNo]': '查無結果',
        '/song/[songNo]/edit': '曲目編輯',
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
            "fukusho": "副將",
            "taisho": "大將",
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
            'katsudon': 'Katsudon',
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
                gamecenter: '街機分佈',
                rating: '評級'
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
                translatedTitle: '翻譯名稱',
                ko: '韓文',
                aliasKo: '韓文(非官方)',
                en: '英文',
                aliasEn: '英文(非官方)',
                zhCN: '簡體中文',
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
                daniList: '段位收錄清單',
                nthSong: '第幾首',
                noDani: '段位收錄',
                fumenImage: '譜面圖'
            },
            preview: {
                branch: '分歧',
                branches: {
                    normal: '普通譜面',
                    advanced: '玄人譜面',
                    master: '達人譜面'
                },
                mode: '模式',
                modes: {
                    normal: '一般',
                    fixedScroll: 'HS固定',
                    fixedBPM: 'BPM固定'
                },
                isAnnotationMode: '使用註釋'
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
                name: '顯示評級個人檔案',
                showRatingNick: '顯示鼓眾廣場暱稱',
                showRatingTaikoNo: '顯示鼓眾號碼',
                showRatingSongs: '顯示個別曲目評級',
                submit: '套用',
                success: '套用成功。',
                error: '發生錯誤。'
            }
        },
        rating: {
            ranking: {
                heading: '排位',
                ranking: '排名',
                tier: '線級',
                rating: '評級',
                nickname: '暱稱'
            },
            measures: {
                heading: '評分表'
            },
            user: {
                nondisclosure: '個別曲目評級未公開。'
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
            '/song': '曲目搜尋',
            '/song/[songNo]': '查無結果',
            '/song/[songNo]/edit': '曲目編輯',
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
                "fukusho": "副將",
                "taisho": "大將",
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
                'katsudon': 'Katsudon',
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
        forLogin: '登入自'
    },
    '/auth/user': {
        nickname: '暱稱',
        change: '變更',
        nickRule: `暱稱僅限使用英文字母、韓文、數字及 '-'，不支援空格。`,
        nickChangeSuccess: '變更成功',
        provider: '登入提供者',
        delete: '註銷帳號',
        error: {
            'New nickname is not in the correct format': '暱稱格式不正確。',
            'Duplicated Nickname': '此暱稱已被使用。'
        }
    },
    '/auth/user/donder': {
        noDonderData: '查無鼓眾廣場資料。請上傳鼓眾廣場資料。',
        myDon: '我的小咚',
        lastUpdate: '最後更新日',
        songRating: '個別曲目評級',
        songTitle: '曲名',
        accuracy: '精準度',
        crown: '王冠',
        rating: '評級',
        hiroba: '廣場',
        measureValue: '譜面定數',
        uploadGuide: Util.mdToHtml(ratingUploadGuide),
        explanation: Util.mdToHtml(ratingExplanation)
    },
    '/song': {
        placeholder: '關鍵字',
        difficulty: '難易度',
        easy: '簡單',
        normal: '普通',
        hard: '困難',
        oni: '魔鬼',
        omote: '魔鬼(表)',
        ura: '魔鬼(裏)',
        genre: '類型',
        genres: {
            pops: '流行音樂',
            anime: '動畫',
            kids: '兒童',
            vocaloid: 'VOCALOID™',
            game: '遊戲音樂',
            namco: '南科原創',
            variety: '綜藝',
            classic: '古典'
        },
        languages: {
            ja: '日文',
            ko: '韓文',
            ako: '韓文(非官方)',
            en: '英文',
            aen: '英文(非官方)',
            rom: '羅馬字'
        }
    },
    '/song/[songNo]': {
        noSong: '查無此曲。',
        genres: {
            pops: '流行音樂',
            anime: '動畫',
            kids: '兒童',
            vocaloid: 'VOCALOID™',
            game: '遊戲音樂',
            namco: '南科原創',
            variety: '綜藝',
            classic: '古典'
        }
    },
    '/song/add': {
        genres: {
            pops: '流行音樂',
            anime: '動畫',
            kids: '兒童',
            vocaloid: 'VOCALOID™',
            game: '遊戲音樂',
            namco: '南科原創',
            variety: '綜藝',
            classic: '古典'
        }
    },
    //서열표
    '/diffchart': {
        type: {
            clear: '通過',
            fc: '全連段',
            dfc: '全良'
        },
        download: "下載",
        go: "移動",
        custom: '自定義'
    },
    '/diffchart/clear/[level]': {
        '10 level clear': '★10 通過難易度表',
        '9 level clear': '★9 通過難易度表',
        '8 level clear': '★8 通過難易度表',
        '7 level clear': '★7 通過難易度表',
        '6 level clear': '★6 通過難易度表',
        sections: {
            'SSS': '超難關',
            'SS': '難關',
            'S+': '最上+',
            'S': '最上',
            'A': '上',
            'B': '中上',
            'C': '中',
            'D': '中下',
            'E': '下',
            'F': '最下',
            'X': '個人差'
        },
        subname: "🔴 個人差極大&nbsp;&nbsp;&nbsp;🟢 注意初見&nbsp;&nbsp;&nbsp;🟣 全連段難度遠高於通過難度"
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
        koreanGamecenterAlert: '這是韓國境內設有太鼓達人機台的街機地圖。',
        amenity: {
            'water': '飲水機',
            'toilet': '廁所',
            'park': '停車場',
            'capture': '側錄設備',
            'rental': '租借/包台',
            'night': '通宵營運',
            'atm': 'ATM',
            'fan': '電風扇',
            'mybachi': 'My Bachi'
        },
        date: {
            "0": "日",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        },
        report: '回報資訊',
        favorites: '收藏夾',
        keyword: '關鍵字',
        region: '區域',
        all: '全部',
        amenityText: '便利設施',
        machineData: '機台資訊',
        price: '價格',
        tunes: '曲數',
        count: '台數',
        login: '登入',
        needed: '是必需的。'
    },
    '/measures': {
        measureTable: '譜面定數表',
        donderData: '鼓眾資料'
    },
    '/notice': {
        type: {
            wiki: '維基',
            official: '官方'
        }
    },
    ...newZhtw
} as const;

export default zhtw;