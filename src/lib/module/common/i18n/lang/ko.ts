import type { LangFile } from "../types";

const ko: LangFile = {
    layout: {
        main: {
            song: '곡',
            doc: '문서',
            newSong: '신곡'
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
        languages:{
            jp: '일본어',
            ko: '한국어',
            ako: '한국어(비공식)'
        }
    },
    '/song/[songNo]':{
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
    '/diffchart/clear/[level]':{
        '10 level clear': '★10 클리어 서열표',
        '9 level clear': '★9 클리어 서열표',
        '8 level clear': '★8 클리어 서열표',
        '7 level clear': '★7 클리어 서열표',
        '6 level clear': '★6 클리어 서열표',
        sections:{
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
        }
    }
}

export default ko;