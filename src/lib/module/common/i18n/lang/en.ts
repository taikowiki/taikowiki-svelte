import type { LangFile } from "../types";

const en: LangFile = {
    layout: {
        main: {
            song: 'Song',
            doc: 'Documents',
            newSong: 'New Song',
            diffchart: 'Difficulty Chart',
            dani: 'Dan-i Dojo',
            gamecenter: 'Gamecenter',
            measures: 'measures'
        },
        'dedicated diffchart': {
            type: {
                clear: 'Clear',
                fc: 'Full Combo',
                dfc: 'Donder Full Combo'
            }
        },
        '/auth/user': {
            myData: 'My data',
            donderData: 'Donder data'
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
                "gauge": "Soul Gauge",
                "combo": "Combo",
                "score": "Score",
                "roll": "Drumrolls",
                "hit": "Hits",
                "good": "Good",
                "ok": "Ok",
                "bad": "Bad"
            },
            suffix1: {
                percent: "%",
                times: " Times",
                point: " Points",
                count: ""
            },
            suffix2: {
                up: 'or more',
                down: 'under'
            }
        },
        Diffchart: {
            diffchart: 'Difficulty chart',
            downloadMessage: 'The image will be downloaded soon.'
        }
    },
    other:{
        title: {
            base: 'Taiko no Tatsujin Wiki',
            '/auth/login': 'Login',
            '/auth/user': 'My data',
            '/auth/user/donder': 'Donder data',
            '/dani': 'Dan-i dojo',
            '/diffchart/clear': 'Clear difficulty chart',
            '/gamecenter': 'Gamecenter map',
            '/gamecenter/report': 'Report Gamecenter',
            '/measures': 'Fumen measures',
            '/song': 'Search song',
            '/song/[songNo]': 'No song',
            '/song/[songNo]/edit': 'Edit song',
            '/song/add': 'Add song'
        },
        dani: {
            dan: {
                "senpo": "senpo",
                "jiho": "jiho",
                "chiuken": "chiuken",
                "fukusho": "fukusho",
                "taisho": "taisho",
                "beginner": "beginner",
                "10kyu": "10kyu",
                "9kyu": "9kyu",
                "8kyu": "8kyu",
                "7kyu": "7kyu",
                "6kyu": "6kyu",
                '5kyu': '5kyu',
                '4kyu': '4kyu',
                '3kyu': '3kyu',
                '2kyu': '2kyu',
                '1kyu': '1kyu',
                '1dan': '1dan',
                '2dan': '2dan',
                '3dan': '3dan',
                '4dan': '4dan',
                '5dan': '5dan',
                '6dan': '6dan',
                '7dan': '7dan',
                '8dan': '8dan',
                '9dan': '9dan',
                '10dan': '10dan',
                'kuroto': 'kuroto',
                'meijin': 'meijin',
                'chojin': 'chojin',
                'tatsujin': 'tatsujin'
            },
            version: {
                'katsudon': 'katsudon',
                'sorairo': 'sorairo',
                'momoiro': 'momoiro',
                'kimidori': 'kimidori',
                'murasaki': 'murasaki',
                'white': 'white',
                'red': 'red',
                'yellow': 'yellow',
                'blue': 'blue',
                'green': 'green',
                '20': 'Nijiiro 2020',
                '21': 'Nijiiro 2021',
                '22': 'Nijiiro 2022',
                '23': 'Nijiiro 2023',
                '24': 'Nijiiro 2024'
            }
        }
    },
    //path
    '/auth/login': {
        forLogin: 'to Login'
    },
    '/auth/user': {
        nickname: 'Nickname',
        change: 'Change',
        nickRule: `Only alphabets, Hangul(Korean), numbers, and '-' can be used for nicknames and no spaces.`,
        nickChangeSuccess: 'Change complete',
        provider: 'Login provider',
        delete: 'Delete account',
        error: {
            'New nickname is not in the correct format': 'New nickname is not in the correct format.',
            'Duplicated Nickname': 'Duplicated Nickname.'
        }
    },
    '/auth/user/donder':{
        noDonderData: 'Do donderhiroba data. Please upload your donderhiroba data.',
        uploadGuide: 'Upload guide(English not yet supported).',
        myDon: 'My Don',
        lastUpdate: 'Last update',
        songRating: 'Song rating',
        songTitle: 'Song title',
        accuracy: 'Accuracy',
        crown: 'Crown',
        rating: 'Rating'
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
    '/song/add': {
        genres: {
            pops: 'Pops',
            anime: 'Animation',
            kids: 'Kids',
            vocaloid: 'Vocaloid',
            game: 'Game music',
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
    },
    '/gamecenter': {
        koreanGamecenterAlert: 'This is a map of Korean Gamecenters where Taiko no Tatsujin exists.',
        amenity: {
            'water': 'water purifier',
            'toilet': 'toilet',
            'park': 'Parking lot',
            'capture': 'Captureboard',
            'rental': 'Rental',
            'night': 'Overnight',
            'atm': 'ATM',
            'fan': 'Fan',
            'mybachi': 'My bacchi'
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
        report: 'Report',
        favorites: 'Favorites',
        keyword: 'Keyword',
        region: 'Region',
        all: 'All',
        amenityText: 'Amenities',
        machineData: 'Machine data',
        price: 'Price',
        tunes: 'Tunes',
        count: 'Count',
        login: 'Login',
        needed: 'is needed.'
    },
    '/measures': {
        measureTable: 'Song measures',
    }   
}

export default en;
