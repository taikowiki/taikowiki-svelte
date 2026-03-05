import { Util } from '$lib/module/util';
import type { I18N } from '..';

import ratingUploadGuide from '../md/ko/ratingUploadGuide.md?raw';
import ratingExplanation from '../md/ko/ratingExplanation.md?raw'

const newKo = {
    //레이아웃
    layout: {
        main: {
            song: '곡',
            doc: '문서',
            newSong: '신곡',
            diffchart: '서열표',
            dani: '단위도장',
            gamecenter: '오락실',
            measures: '상수표',
            user: {
                user: '사용자',
                donderData: '레이팅',
                notLogined: '비로그인',
                login: '로그인',
                logout: '로그아웃',
                theme: '테마',
                lang: '언어'
            }
        },
        'dedicated diffchart': {
            type: {
                clear: '클리어',
                fc: '풀콤보',
                dfc: '전량'
            },
            select: '선택'
        },
        '/auth/user': {
            user: '유저',
            myData: '내 정보',
            donderData: '레이팅'
        },
        rating: {
            title: '레이팅',
            me: '내 레이팅',
            ranking: '랭킹',
            measure: '상수표'
        }
    },
    //컴포넌트
    component: {
        SongEditor: {
            difficulties: {
                easy: '쉬움',
                normal: '보통',
                hard: '어려움',
                oni: '오니(앞)',
                ura: '오니(뒤)'
            },
            BasicEditor: {
                songNo: '곡 번호'
            },
            TitleEditor: {
                title: '제목',
                songTitle: '곡 제목',
                titleKo: '한국어',
                aliasKo: '한국어 비공식',
                titleEn: '영어',
                aliasEn: '영어 비공식',
                titleZhCN: '중국어',
                romaji: '로마자'
            },
            OtherEditor: {
                other: '기타',
                genre: '장르',
                bpmShiver: 'BPM 흔들림',
                version: '수록 버전',
                artist: '아티스트',
                commaPlz: '쉼표로 구분하여 작성해주세요.',
                included: '수록 여부',
                deleted: '삭제',
                asiaBanned: '아시아판 밴',
                krBanned: '한국판 밴',
                addedDate: '추가 날짜',
                use: '사용'
            },
            CoursesEditor: {
                course: '보면'
            },
            CourseEditor: {
                level: '레벨',
                branched: '분기 여부',
                maxCombo: '최대 노트 수',
                playTime: '최대 연주 시간(초)',
                playTimeSub: '첫 번째 동/캇 노트에서 마지막 동/캇 노트까지의 시간입니다.',
                density: '최대 밀도(타/초)',
                calculate: '계산하기',
                maxBalloon: '최대 풍선 수',
                commaPlz: '쉼표로 구분해주세요.',
                maxRoll: '최대 연타 시간(초)',
                dani: '단위',
                add: '추가',
                img: '보면 이미지',
                imgLink: '이미지 주소'
            },
            DaniEditor: {
                first: '첫 번째',
                second: '두 번째',
                third: '세 번째'
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
                "bad": "불가 개수",
                "score_sum": "점수 총합"
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
        },
        Diffchart: {
            diffchart: '서열표',
            downloadMessage: '이미지가 곧 다운로드됩니다.'
        }
    },
    //페이지 제목
    title: {
        base: '태고의 달인 위키',
        '/auth/login': '로그인',
        '/auth/user': '내 정보',
        '/auth/user/donder': '동더 데이터',
        '/dani': '단위도장',
        '/diffchart/clear': '클리어 서열표',
        '/diffchart/fc': '풀콤보 서열표',
        '/diffchart/dfc': '전량 서열표',
        '/gamecenter': '오락실 지도',
        '/gamecenter/report': '오락실 제보',
        '/measures': '보면 상수표',
        '/song': '곡 검색',
        '/song/[songNo]': '곡 없음',
        '/song/[songNo]/edit': '곡 수정',
        '/song/add': '곡 추가',
        '/rating/me': '내 레이팅',
        '/rating/ranking': '랭킹',
        '/rating/measure': '상수표'
    },
    //단위
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
            'tatsujin': '달인',
            'gaiden': '외전'
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
            'nijiiro_gaiden': '니지이로 외전',
            '20': '니지이로 2020',
            '21': '니지이로 2021',
            '22': '니지이로 2022',
            '23': '니지이로 2023',
            '24': '니지이로 2024',
            '25': '니지이로 2025',
            '26': '니지이로 2026',
            '27': '니지이로 2027',
            '28': '니지이로 2028',
            '29': '니지이로 2029',
            '30': '니지이로 2030'
        }
    },
    //곡
    song: {
        difficulty: {
            easy: '쉬움',
            normal: '보통',
            hard: '어려움',
            oni: '오니(앞)',
            ura: '오니(뒤)'
        }
    },
    //페이지
    page: {
        index: {
            shortcut: {
                song: '곡',
                doc: '문서',
                diffchart: '서열표',
                dani: '단위도장',
                gamecenter: '오락실',
                rating: '레이팅'
            },
            notice: '공지'
        },
        songNo: {
            alert: {
                deleted: '이 곡은 삭제되었습니다.',
                krBanned: '이 곡은 한국에서 플레이할 수 없습니다.',
                asiaBanned: '이 곡은 아시아판에서 플레이할 수 없습니다.'
            },
            multipleTitle: {
                translatedTitle: '번역명',
                ko: '한국어',
                aliasKo: '한국어(비공식)',
                en: '영어',
                aliasEn: '영어(비공식)',
                zhCN: '중국어',
                romaji: '로마자'
            },
            songData: {
                version: '수록 버전',
                artists: '아티스트',
                addedDate: '추가된 날짜'
            },
            course: {
                combos: '최대 노트 수',
                branched: '분기 여부',
                balloons: '최대 풍선 수',
                roll: '최대 연타 시간',
                density: '최대 밀도',
                playTime: '최대 연주 시간',
                hitsec: '타/초',
                sec: '초',
                total: '총',
                count: '개',
                daniList: '단위 수록 목록',
                nthSong: '번째 곡',
                noDani: '단위 수록',
                fumenImage: '보면 이미지'
            }
        },
        diffchart: {
            dfc: {
                '10 level dfc': '★10 전량 서열표',
                sections: {
                    'SS': "SS",
                    'iS+': "지력 S+",
                    'pS+': "개인차 S+",
                    'iS': "지력 S",
                    'pS': "개인차 S",
                    'iA+': '지력 A+',
                    'pA+': '개인차 A+',
                    'iA': "지력 A",
                    'pA': "개인차 A",
                    'iB': '지력 B',
                    'pB': "개인차 B",
                    'iC': '지력 C',
                    'pC': '개인차 C',
                    'iD': '지력 D',
                    'pD': '개인차 D',
                    'iE': '지력 E',
                    'pE': '개인차 E',
                    'iF': '지력 F'
                }
            },
            fc: {
                '10 level fc': '★10 풀콤보 서열표',
                '9 level fc': '★9 풀콤보 서열표',
                '8 level fc': '★8 풀콤보 서열표',
                '7 level fc': '★7 풀콤보 서열표',
                '6 level fc': '★6 풀콤보 서열표',
                sections: {
                    'SS': "SS",
                    'S+': "S+",
                    'pS+': "개인차 S+",
                    'S': "S",
                    'pS': "개인차 S",
                    'A+': 'A+',
                    'pA+': '개인차 A+',
                    'A': "A",
                    'pA': "개인차 A",
                    'B+': 'B+',
                    'B': "B",
                    'pB': "개인차 B",
                    'C+': 'C+',
                    'C': 'C',
                    'pC': '개인차 C',
                    'D': 'D',
                    'E': 'E',
                    'F': 'F'
                }
            }
        },
        dani: {
            go: '이동'
        },
        gamecenter: {
            selector: {
                search: '검색'
            },
            machineInfo: '기체 정보'
        },
        donder: {
            rating: {
                top: '상위'
            },
            section: {
                song: '곡 별 레이팅',
                measure: '상수표',
                explanation: '레이팅 설명'
            },
            song: '곡',
            otherSong: '이외의 곡',
            link: '링크',
            download: '다운로드',
            downloadMessage: '이미지가 곧 다운로드됩니다.'
        },
        user: {
            showRating: {
                name: '레이팅 프로필 공개',
                showRatingNick: '동더히로바 닉네임 공개',
                showRatingTaikoNo: '동더히로바 북번호 공개',
                showRatingSongs: '곡 별 레이팅 공개',
                submit: '적용',
                success: '적용이 완료되었습니다.',
                error: '오류가 발생했습니다.'
            }
        },
        rating: {
            ranking: {
                heading: '랭킹',
                ranking: '순위',
                tier: '티어',
                rating: '레이팅',
                nickname: '닉네임'
            },
            measures:{
                heading: '상수표'
            },
            user:{
                nondisclosure: '곡 별 레이팅은 비공개입니다.'
            }
        }
    }
} as const satisfies I18N.RecursiveStringRecord;

const oldKo = {
    other: {
        //페이지 제목
        title: {
            base: '태고의 달인 위키',
            '/auth/login': '로그인',
            '/auth/user': '내 정보',
            '/auth/user/donder': '동더 데이터',
            '/dani': '단위도장',
            '/diffchart/clear': '클리어 서열표',
            '/diffchart/fc': '풀콤보 서열표',
            '/gamecenter': '오락실 지도',
            '/gamecenter/report': '오락실 제보',
            '/measures': '보면 상수표',
            '/song': '곡 검색',
            '/song/[songNo]': '곡 없음',
            '/song/[songNo]/edit': '곡 수정',
            '/song/add': '곡 추가'
        },
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
                'tatsujin': '달인',
                'gaiden': '외전'
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
                'nijiiro_gaiden': '니지이로 외전',
                '20': '니지이로 2020',
                '21': '니지이로 2021',
                '22': '니지이로 2022',
                '23': '니지이로 2023',
                '24': '니지이로 2024',
                '25': '니지이로 2025',
                '26': '니지이로 2026',
                '27': '니지이로 2027',
                '28': '니지이로 2028',
                '29': '니지이로 2029',
                '30': '니지이로 2030'
            }
        },
        difficulty: {
            easy: '쉬움',
            normal: '보통',
            hard: '어려움',
            oni: '오니(앞)',
            ura: '오니(뒤)'
        }
    },
    //path
    '/auth/login': {
        forLogin: '에서 로그인'
    },
    '/auth/user': {
        nickname: '닉네임',
        change: '변경',
        nickRule: `닉네임에는 알파벳, 한글, 숫자, '-'만 사용할 수 있으며 공백은 사용하실 수 없습니다.`,
        nickChangeSuccess: '변경 완료',
        provider: '로그인 제공자',
        delete: '회원 탈퇴',
        error: {
            'New nickname is not in the correct format': '닉네임이 형식에 올바르지 않습니다.',
            'Duplicated Nickname': '이미 사용중인 닉네임입니다.'
        }
    },
    '/auth/user/donder': {
        noDonderData: '동더히로바 데이터가 없습니다. 동더히로바 데이터를 업로드해주세요.',
        myDon: '마이동',
        lastUpdate: '마지막 업데이트',
        songRating: '곡 별 레이팅',
        songTitle: '곡 제목',
        accuracy: '정확도',
        crown: '왕관',
        rating: '레이팅',
        hiroba: '히로바',
        measureValue: '상수',
        uploadGuide: Util.mdToHtml(ratingUploadGuide),
        explanation: Util.mdToHtml(ratingExplanation)
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
            ja: '일본어',
            ko: '한국어',
            ako: '한국어(비공식)',
            en: '영어',
            aen: '영어(비공식)',
            rom: '로마자'
        }
    },
    '/song/[songNo]': {
        noSong: '해당 곡이 존재하지 않습니다.',
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
    //서열표
    '/diffchart': {
        type: {
            clear: '클리어',
            fc: '풀콤보',
            dfc: '전량'
        },
        download: "다운로드",
        go: "이동",
        custom: '커스텀'
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
    '/gamecenter': {
        koreanGamecenterAlert: '한국의 태고의 달인이 있는 오락실의 지도입니다.',
        amenity: {
            'water': '정수기',
            'toilet': '화장실',
            'park': '주차장',
            'capture': '캡쳐보드',
            'rental': '대여',
            'night': '밤샘',
            'atm': 'ATM',
            'fan': '선풍기',
            'mybachi': '마이바찌'
        },
        date: {
            "0": "일",
            "1": "월",
            "2": "화",
            "3": "수",
            "4": "목",
            "5": "금",
            "6": "토"
        },
        report: '제보하기',
        favorites: '즐겨찾기',
        keyword: '키워드',
        region: '지역',
        all: '전체',
        amenityText: '편의시설',
        machineData: '기체 정보',
        price: '가격',
        tunes: '튠',
        count: '개수',
        login: '로그인',
        needed: '이 필요합니다.'
    },
    '/measures': {
        measureTable: '보면 상수표',
        donderData: '동더 데이터'
    },
    '/notice': {
        type: {
            wiki: '위키',
            official: '공식'
        }
    },
    ...newKo
} as const satisfies I18N.LangFile;

const ko = {
    ...newKo,
    ...oldKo
} as const;

export default ko;