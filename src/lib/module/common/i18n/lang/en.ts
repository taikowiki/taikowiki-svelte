import { mdToHtml } from "../../util";
import type { LangFile, RecursiveStringRecord } from "../types";

import ratingUploadGuide from '../md/ko/ratingUploadGuide.md?raw';
import ratingExplanation from '../md/ko/ratingExplanation.md?raw';

const newEn: RecursiveStringRecord = {
    layout: {
        main: {
            song: 'Song',
            doc: 'Documents',
            newSong: 'New Charts',
            diffchart: 'Difficulty Chart',
            dani: 'Dan-i Dojo',
            gamecenter: 'Game Centers',
            measures: 'Rating Mesurements'
        },
        'dedicated diffchart': {
            type: {
                clear: 'Clear',
                fc: 'Full Combo',
                dfc: 'Donder Full Combo'
            }
        },
        '/auth/user': {
            myData: 'My Data',
            donderData: 'Donder Data'
        }
    },
    component: {
        SongEditor: {
            difficulties: {
                easy: 'Easy',
                normal: 'Normal',
                hard: 'Hard',
                oni: 'Extreme (Front)',
                ura: 'Extreme (Inner)'
            }
        },
        DaniDisplay: {
            type: {
                "gauge": "Soul Guage",
                "combo": "Combos",
                "score": "Score",
                "roll": "Drumrolls",
                "hit": "Hits",
                "good": "Goods",
                "ok": "OKs",
                "bad": "Bads",
                "score_sum": "Score Summary"
            },
            suffix1: {
                percent: "%",
                times: "Times",
                point: "Points",
                count: ""
            },
            suffix2: {
                up: 'Or more',
                down: 'Under'
            }
        },
        Diffchart: {
            diffchart: 'Difficulty Chart',
            downloadMessage: 'The image will be soon downloaded.'
        }
    },
    title: {
        base: 'Taiko no Tatsujin Wiki',
        '/auth/login': 'Login',
        '/auth/user': 'My Data',
        '/auth/user/donder': 'Donder Data',
        '/dani': 'Dan-i Dojo',
        '/diffchart/clear': 'Clear Difficulty Chart',
        '/gamecenter': 'Game Center Map',
        '/gamecenter/report': 'Report Game Center Information',
        '/measures': 'Chart Rating Measurement',
        '/song': 'Search Chart',
        '/song/[songNo]': 'No result',
        '/song/[songNo]/edit': 'Request Edit',
        '/song/add': 'Add Song'
    },
    dani: {
        dan: {
            "senpo": "Senpo",
            "jiho": "Jiho",
            "chiuken": "Chiuken",
            "fukusho": "Fukusho",
            "taisho": "Taisho",
            "beginner": "Beginner",
            "10kyu": "10th Kyu",
            "9kyu": "9th Kyu",
            "8kyu": "8th Kyu",
            "7kyu": "7th Kyu",
            "6kyu": "6th Kyu",
            '5kyu': '5th Kyu',
            '4kyu': '4th Kyu',
            '3kyu': '3rd Kyu',
            '2kyu': '2nd Kyu',
            '1kyu': '1st Kyu',
            '1dan': 'Shodan',
            '2dan': '2nd Dan',
            '3dan': '3rd Dan',
            '4dan': '4th Dan',
            '5dan': '5th Dan',
            '6dan': '6th Dan',
            '7dan': '7th Dan',
            '8dan': '8th Dan',
            '9dan': '9th Dan',
            '10dan': '10th Dan',
            'kuroto': 'Kuroto',
            'meijin': 'Meijin',
            'chojin': 'Chojin',
            'tatsujin': 'Tatsujin',
            'gaiden': 'Gaiden'
        },
        version: {
            'katsudon': 'Katsudon',
            'sorairo': 'Sorairo',
            'momoiro': 'Momoiro',
            'kimidori': 'Kimidori',
            'murasaki': 'Murasaki',
            'white': 'White',
            'red': 'Red',
            'yellow': 'Yellow',
            'blue': 'Blue',
            'green': 'Green',
            'nijiiro_gaiden': 'Nijiiro Gaiden',
            '20': 'Nijiiro 2020',
            '21': 'Nijiiro 2021',
            '22': 'Nijiiro 2022',
            '23': 'Nijiiro 2023',
            '24': 'Nijiiro 2024',
            '25': 'Nijiiro 2025',
            '26': 'Nijiiro 2026',
            '27': 'Nijiiro 2027',
            '28': 'Nijiiro 2028',
            '29': 'Nijiiro 2029',
            '30': 'Nijiiro 2030'
        }
    },
    song:{
        difficulty: {
            easy: 'Easy',
            normal: 'Normal',
            hard: 'Hard',
            oni: 'Extreme (Front)',
            ura: 'Extreme (Inner)'
        }
    },
    page:{
        
    }
}

const en: LangFile = {
    other: {
        title: {
            base: 'Taiko no Tatsujin Wiki',
            '/auth/login': 'Login',
            '/auth/user': 'My Data',
            '/auth/user/donder': 'Donder Data',
            '/dani': 'Dan-i Dojo',
            '/diffchart/clear': 'Clear Difficulty Chart',
            '/gamecenter': 'Game Center Map',
            '/gamecenter/report': 'Report Game Center Information',
            '/measures': 'Chart Rating Measurement',
            '/song': 'Search Chart',
            '/song/[songNo]': 'No result',
            '/song/[songNo]/edit': 'Request Edit',
            '/song/add': 'Add Song'
        },
        dani: {
            dan: {
                "senpo": "Senpo",
                "jiho": "Jiho",
                "chiuken": "Chiuken",
                "fukusho": "Fukusho",
                "taisho": "Taisho",
                "beginner": "Beginner",
                "10kyu": "10th Kyu",
                "9kyu": "9th Kyu",
                "8kyu": "8th Kyu",
                "7kyu": "7th Kyu",
                "6kyu": "6th Kyu",
                '5kyu': '5th Kyu',
                '4kyu': '4th Kyu',
                '3kyu': '3rd Kyu',
                '2kyu': '2nd Kyu',
                '1kyu': '1st Kyu',
                '1dan': 'Shodan',
                '2dan': '2nd Dan',
                '3dan': '3rd Dan',
                '4dan': '4th Dan',
                '5dan': '5th Dan',
                '6dan': '6th Dan',
                '7dan': '7th Dan',
                '8dan': '8th Dan',
                '9dan': '9th Dan',
                '10dan': '10th Dan',
                'kuroto': 'Kuroto',
                'meijin': 'Meijin',
                'chojin': 'Chojin',
                'tatsujin': 'Tatsujin',
                'gaiden': 'Gaiden'
            },
            version: {
                'katsudon': 'Katsudon',
                'sorairo': 'Sorairo',
                'momoiro': 'Momoiro',
                'kimidori': 'Kimidori',
                'murasaki': 'Murasaki',
                'white': 'White',
                'red': 'Red',
                'yellow': 'Yellow',
                'blue': 'Blue',
                'green': 'Green',
                'nijiiro_gaiden': 'Nijiiro Gaiden',
                '20': 'Nijiiro 2020',
                '21': 'Nijiiro 2021',
                '22': 'Nijiiro 2022',
                '23': 'Nijiiro 2023',
                '24': 'Nijiiro 2024',
                '25': 'Nijiiro 2025',
                '26': 'Nijiiro 2026',
                '27': 'Nijiiro 2027',
                '28': 'Nijiiro 2028',
                '29': 'Nijiiro 2029',
                '30': 'Nijiiro 2030'
            }
        },
        difficulty: {
            easy: 'Easy',
            normal: 'Normal',
            hard: 'Hard',
            oni: 'Extreme (Front)',
            ura: 'Extreme (Inner)'
        }
    },
    //path
    '/auth/login': {
        forLogin: 'for Login'
    },
    '/auth/user': {
        nickname: 'Username',
        change: 'Change',
        nickRule: `Only alphabets, Hangul(Korean), numbers, and '-' can be used for nicknames and no spaces.`,
        nickChangeSuccess: 'Changed',
        provider: 'Login Provider',
        delete: 'Delete Account',
        error: {
            'New nickname is not in the correct format': 'Username is not in the correct form.',
            'Duplicated Nickname': 'The Username is already in use.'
        }
    },
    '/auth/user/donder': {
        noDonderData: 'No data found. Please upload your Donderhiroba data.',
        myDon: 'My Don',
        lastUpdate: 'Last Update',
        songRating: 'Song Ratings',
        songTitle: 'Song title',
        accuracy: 'Accuracy',
        crown: 'Crown',
        rating: 'Ratings',
        hiroba: 'Hiroba',
        measureValue: 'Mesurements',
        uploadGuide: mdToHtml(ratingUploadGuide),
        explanation: mdToHtml(ratingExplanation)
    },
    '/song': {
        placeholder: 'Keywords',
        difficulty: 'Difficulty',
        easy: 'Easy',
        normal: 'Normal',
        hard: 'Hard',
        oni: 'Extreme',
        omote: 'Extreme (Front)',
        ura: 'Extreme (Inner)',
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
        languages: {
            jp: 'Japanese',
            ko: 'Korean',
            ako: 'Korean (Unofficial)'
        }
    },
    '/song/[songNo]': {
        noSong: 'The song has not found.',
        genres: {
            pops: 'POPS',
            anime: 'Anime',
            kids: 'KIDS',
            vocaloid: 'Vocaloid',
            game: 'Game Music',
            namco: 'Namco Original',
            variety: 'Variety',
            classic: 'Classic'
        }
    },
    '/song/add': {
        genres: {
            pops: 'POPS',
            anime: 'Anime',
            kids: 'KIDS',
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
        },
        download: "Download",
        go: "Go"
    },
    '/diffchart/clear/[level]': {
        '10 level clear': '★10 Clear Difficulty Chart',
        '9 level clear': '★9 Clear Difficulty Chart',
        '8 level clear': '★8 Clear Difficulty Chart',
        '7 level clear': '★7 Clear Difficulty Chart',
        '6 level clear': '★6 Clear Difficulty Chart',
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
            'X': 'Personal'
        },
        subname: "🔴 Makes big difference between person&nbsp;&nbsp;&nbsp;🟢 Care on first play&nbsp;&nbsp;&nbsp;🟣 Hard to full combo"
    },
    '/gamecenter': {
        koreanGamecenterAlert: 'This is a map of Korean Gamecenters where Taiko no Tatsujin exists.',
        amenity: {
            'water': 'Water tab',
            'toilet': 'W/C',
            'park': 'Parking',
            'capture': 'Screen Record',
            'rental': 'Rental',
            'night': 'Overnight',
            'atm': 'ATM',
            'fan': 'Fans',
            'mybachi': 'My bachi'
        },
        date: {
            "0": "SUN",
            "1": "MON",
            "2": "TUE",
            "3": "WED",
            "4": "THU",
            "5": "FRI",
            "6": "SAT"
        },
        report: 'Report',
        favorites: 'Favorites',
        keyword: 'Keywords',
        region: 'Region',
        all: 'All',
        amenityText: 'Facilities',
        machineData: 'Machine Data',
        price: 'Price',
        tunes: 'Tunes',
        count: '',
        login: 'Login',
        needed: 'is(are) required.'
    },
    '/measures': {
        measureTable: 'Chart Rating Mesurements',
        donderData: 'Donder Data'
    },
    '/notice': {
        type: {
            wiki: 'Wiki',
            official: 'Official'
        }
    },
    ...newEn
} as const;

export default en;
