import type { LangFile } from "../types";

const en: LangFile = {
    layout: {
        main: {
            song: 'Song',
            doc: 'Documents',
            newSong: 'New Charts',
            diffchart: 'Difficulty Chart',
            dani: 'Dan-i Dojo',
            gamecenter: 'Gane Centers',
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
                "bad": "Bads"
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
    other: {
        title: {
            base: 'Taiko no Tatsujin Wiki',
            '/auth/login': 'Login',
            '/auth/user': 'My Data',
            '/auth/user/donder': 'Donder Data',
            '/dani': 'Dan-i Dojo',
            '/diffchart/clear': 'Clear difficulty Chart',
            '/gamecenter': 'Game Center Map',
            '/gamecenter/report': 'Request Game Center Infromation',
            '/measures': 'Chart Rating Mesurment',
            '/song': 'Search Song',
            '/song/[songNo]': 'No Song',
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
                '1dan': 'Shyodan',
                '2dan': '2dan',
                '3dan': '3dan',
                '4dan': '4dan',
                '5dan': '5dan',
                '6dan': '6dan',
                '7dan': '7dan',
                '8dan': '8dan',
                '9dan': '9dan',
                '10dan': '10dan',
                'kuroto': 'Kuroto',
                'meijin': 'Meijin',
                'chojin': 'Chojin',
                'tatsujin': 'Tatsujin'
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
        nickname: 'Username',
        change: 'Change',
        nickRule: `Only alphabets, Hangul(Korean), numbers, and '-' can be used for nicknames and no spaces.`,
        nickChangeSuccess: 'Changed',
        provider: 'Login Provider',
        delete: 'Delete Account',
        error: {
            'New nickname is not in the correct format': 'Username is not in the correct form.',
            'Duplicated Nickname': 'This Username is already in use.'
        }
    },
    '/auth/user/donder':{
        noDonderData: 'No information found. Please upload your Donderhiroba data.',
        uploadGuide: 'Upload guide(English not yet supported).',
        myDon: 'My Don',
        lastUpdate: 'Last Update',
        songRating: 'Song Rating',
        songTitle: 'Song Title',
        accuracy: 'Accuracy',
        crown: 'Crown',
        rating: 'Ratings'
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
            'capture': 'Screen Recording',
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
        measureTable: 'Chart Rating Mesurments',
        donderData: 'Donder Data'
    }
} as const;

export default en;