import type { LangFile } from "../types";

const ko: LangFile = {
    layout: {
        main: {
            song: '곡',
            doc: '문서',
            newSong: '신곡',
            diffchart: '서열표',
            dani: '단위도장',
            gamecenter: '오락실'
        },
        'dedicated diffchart': {
            type: {
                clear: '클리어',
                fc: '풀콤보',
                dfc: '전량'
            }
        }
    },
    component: {
        SongEditor: {
            difficulties: {
                easy: '쉬움',
                normal: '보통',
                hard: '어려움',
                oni: '오니(앞)',
                ura: '오니(뒤)'
            }
        },
        DaniDisplay: {
            type: {
                "gauge": "혼 게이지",
                "combo": "콤보 수",
                "score": "점수",
                "roll": "연타 수",
                "hit": "두드린 횟수",
                "good": "량 개수",
                "ok": "가 개수",
                "bad": "불가 개수"
            },
            suffix1: {
                percent: "%",
                times: "회",
                point: "점",
                count: "개"
            },
            suffix2: {
                up: '이상',
                down: '미만'
            }
        }
    },
    other: {
        dani: {
            dan: {
                "senpo": "선봉",
                "jiho": "차봉",
                "chiuken": "중견",
                "fukusho": "부장",
                "taisho": "대장",
                "beginner": "초급",
                "10kyu": "10급",
                "9kyu": "9급",
                "8kyu": "8급",
                "7kyu": "7급",
                "6kyu": "6급",
                '5kyu': '5급',
                '4kyu': '4급',
                '3kyu': '3급',
                '2kyu': '2급',
                '1kyu': '1급',
                '1dan': '초단',
                '2dan': '2단',
                '3dan': '3단',
                '4dan': '4단',
                '5dan': '5단',
                '6dan': '6단',
                '7dan': '7단',
                '8dan': '8단',
                '9dan': '9단',
                '10dan': '10단',
                'kuroto': '현인',
                'meijin': '명인',
                'chojin': '초인',
                'tatsujin': '달인'
            },
            version: {
                'katsudon': '카츠동',
                'sorairo': '소라이로',
                'momoiro': '모모이로',
                'kimidori': '키미도리',
                'murasaki': '무라사키',
                'white': '화이트',
                'red': '레드',
                'yellow': '옐로우',
                'blue': '블루',
                'green': '그린',
                '20': '니지이로 2020',
                '21': '니지이로 2021',
                '22': '니지이로 2022',
                '23': '니지이로 2023',
                '24': '니지이로 2024'
            }
        }
    },
    '/song': {
        placeholder: '검색어',
        difficulty: '난이도',
        easy: '쉬움',
        normal: '보통',
        hard: '어려움',
        oni: '오니',
        omote: '오니(앞)',
        ura: '오니(뒤)',
        genre: '장르',
        genres: {
            pops: '팝스',
            anime: '애니메이션',
            kids: '키즈',
            vocaloid: '보컬로이드',
            game: '게임 뮤직',
            namco: '남코 오리지널',
            variety: '버라이어티',
            classic: '클래식'
        },
        languages: {
            jp: '일본어',
            ko: '한국어',
            ako: '한국어(비공식)'
        }
    },
    '/song/[songNo]': {
        genres: {
            pops: '팝스',
            anime: '애니메이션',
            kids: '키즈',
            vocaloid: '보컬로이드',
            game: '게임 뮤직',
            namco: '남코 오리지널',
            variety: '버라이어티',
            classic: '클래식'
        }
    },
    '/song/add': {
        genres: {
            pops: '팝스',
            anime: '애니메이션',
            kids: '키즈',
            vocaloid: '보컬로이드',
            game: '게임 뮤직',
            namco: '남코 오리지널',
            variety: '버라이어티',
            classic: '클래식'
        }
    },
    '/diffchart': {
        type: {
            clear: '클리어',
            fc: '풀콤보',
            dfc: '전량'
        },
        download: "다운로드",
        go: "이동"
    },
    '/diffchart/clear/[level]': {
        '10 level clear': '★10 클리어 서열표',
        '9 level clear': '★9 클리어 서열표',
        '8 level clear': '★8 클리어 서열표',
        '7 level clear': '★7 클리어 서열표',
        '6 level clear': '★6 클리어 서열표',
        sections: {
            'SSS': '졸업+',
            'SS': '졸업',
            'S': '최상',
            'A': '상',
            'B': '중상',
            'C': '중',
            'D': '중하',
            'E': '하',
            'F': '최하',
            'X': '개인차'
        },
        subname: "🔴 개인차가 왕 큼&nbsp;&nbsp;&nbsp;🟢 초견 주의&nbsp;&nbsp;&nbsp;🟣 클리어에 비해 풀콤보가 왕 어려움"
    },
    '/auth/user': {
        'error': {
            'New nickname is not in the correct format': '닉네임이 형식에 올바르지 않습니다.',
            'Duplicated Nickname': '이미 사용중인 닉네임입니다.'
        }
    }
}

export default ko;