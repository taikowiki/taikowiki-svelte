import type { LangFile } from "../types";

const en: LangFile = {
    layout: {
        main: {
            song: 'Song',
            doc: 'Documents',
            newSong: 'New Song',
            diffchart: 'Difficulty Chart'
        },
        'dedicated diffchart': {
            type: {
                clear: 'Clear',
                fc: 'Full Combo',
                dfc: 'Donder Full Combo'
            }
        }
    },
    other:{
        title: {
            base: 'Taiko no Tatsujin Wiki'
        },
    },
    '/song': {
        placeholder: 'Keywords',
        difficulty: 'Difficulty',
        easy: 'Easy',
        normal: 'Normal',
        hard: 'Hard',
        oni: 'Oni',
        omote: 'Oni(Front)',
        ura: 'Oni(Inner)',
        genre: 'Genre',
        genres: {
            pops: 'POPS',
            anime: 'Anime',
            kids: 'Kids',
            vocaloid: 'Vocaloid',
            game: 'Game Music',
            namco: 'Namco Original',
            variety: 'Variety',
            classic: 'Classic'
        },
        languages:{
            jp: 'Japanese',
            ko: 'Korean',
            ako: 'Korean(Unofficial)'
        }
    },
    '/song/[songNo]':{
        genres: {
            pops: 'POPS',
            anime: 'Anime',
            kids: 'Kids',
            vocaloid: 'Vocaloid',
            game: 'Game Music',
            namco: 'Namco Original',
            variety: 'Variety',
            classic: 'Classic'
        }
    },
    '/diffchart': {
        type: {
            clear: 'Clear',
            fc: 'Full Combo',
            dfc: 'Donder Full Combo'
        }
    },
    '/diffchart/clear/[level]':{
        '10 level clear': '★10 Clear Difficulty Chart',
        '9 level clear': '★9 Clear Difficulty Chart',
        '8 level clear': '★8 Clear Difficulty Chart',
        '7 level clear': '★7 Clear Difficulty Chart',
        '6 level clear': '★6Clear Difficulty Chart',
        sections:{
            'SSS': 'SSS',
            'SS': 'SS',
            'S': 'S',
            'A': 'A',
            'B': 'V',
            'C': 'C',
            'D': 'D',
            'E': 'E',
            'F': 'F',
            'X': 'Personal'
        },
        subname: "🔴 Makes big difference between person&nbsp;&nbsp;&nbsp;🟢 Care on first play&nbsp;&nbsp;&nbsp;🟣 Hard to full combo"
    }
}

export default en;
