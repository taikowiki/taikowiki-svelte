import type { LangFile } from "../types";

const en:LangFile = {
    layout: {
        main: {
            song: 'Songs',
            doc: 'Docs'
        }
    },
    '/song': {
        placeholder: 'Search',
        difficulty: '난이도',
        easy: '쉬움',
        normal: '보통',
        hard: '어려움',
        oni: 'oni',
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
    }
}

export default en;