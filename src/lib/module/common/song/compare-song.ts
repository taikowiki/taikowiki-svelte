import type { Course, SongData } from "./types";

export default function compareSong(song1: SongData, song2: SongData) {
    const keys: any = {
        songNo: song1.songNo !== song2.songNo,
        title: song1.title !== song2.title,
        titleKo: song1.titleKo !== song2.titleKo,
        aliasKo: song1.aliasKo !== song2.aliasKo,
        bpmShiver: song1.bpmShiver !== song2.bpmShiver,
        isAsiaBanned: song1.isAsiaBanned !== song2.isAsiaBanned,
        isDeleted: song1.isDeleted !== song2.isDeleted,
        isKrBanned: song1.isKrBanned !== song2.isKrBanned,
        addedDate: song1.addedDate !== song2.addedDate,
        bpm: false,
        version: false,
        genre: false,
        artists: false,
        courses: {}
    }

    //bpm
    if (song1?.bpm?.min !== song2?.bpm?.min || song1?.bpm?.max !== song2?.bpm?.max) {
        keys.bpm = true;
    }

    //version
    if (song1?.version?.length !== song2?.version?.length) {
        keys.version = true;
    }
    else if (song1.version) {
        for (const version of song1.version) {
            if (!song2?.version?.includes(version)) {
                keys.version = true;
                break;
            }
        }
    }

    //genre
    if (song1?.genre?.length !== song2?.genre?.length) {
        keys.genre = true;
    }
    else if (song1.genre) {
        for (const genre of song1.genre) {
            if (!song2.genre.includes(genre)) {
                keys.genre = true;
                break;
            }
        }
    }

    //artist
    if (song1?.artists?.length !== song2?.artists?.length) {
        keys.artists = true
    }
    else if (song1.artists) {
        for (const artist of song1.artists) {
            if (!song2.artists.includes(artist)) {
                keys.artists = true
                break;
            }
        }
    }

    (['easy', 'normal', 'hard', 'oni', 'ura'] as (keyof SongData['courses'])[]).forEach((diff) => {
        if (song1.courses[diff] === null && song2.courses[diff] === null) {
            return;
        }

        if ((song1.courses[diff] === null && song2.courses[diff] !== null) || (song1.courses[diff] !== null && song2.courses[diff] === null)) {
            keys.courses[diff] = {
                exists: true
            };
            return;
        }

        keys.courses[diff] = compareCourse(song1.courses[diff] as Course, song2.courses[diff] as Course)
    })

    return keys;
}

export function compareCourse(course1: Course, course2: Course) {
    const course = {
        level: false,
        isBranched: false,
        maxCombo: false,
        playTime: false,
        maxDensity: false,
        daniUsed: false,
        balloon: false,
        rollTime: false,
        images: false,
        dani: false
    }

    if (course1?.level !== course2?.level) {
        course.level = true;
    }

    if (course1?.isBranched !== course2?.isBranched) {
        course.isBranched = true;
    }

    if (course1?.maxCombo !== course2?.maxCombo) {
        course.maxCombo = true;
    }

    if (course1?.playTime !== course2?.playTime) {
        course.playTime = true;
    }

    if (course1?.maxDensity !== course2?.maxDensity) {
        course.maxDensity = true;
    }

    if (course1?.daniUsed !== course2?.daniUsed) {
        course.daniUsed = true;
    }

    if (JSON.stringify(course1?.balloon) !== JSON.stringify(course2?.balloon)) {
        course.balloon = true;
    }

    if (JSON.stringify(course1?.rollTime) !== JSON.stringify(course2?.rollTime)) {
        course.rollTime = true;
    }

    if (JSON.stringify(course1?.images) !== JSON.stringify(course2?.images)) {
        course.images = true;
    }

    if (course1?.dani?.length !== course2?.dani?.length) {
        course.dani = true;
    }
    if (course1.dani) {
        for (const dani of course1.dani) {
            if (!course2?.dani.find(d => {
                return dani.dan === d.dan && dani.order === d.order && dani.version === d.version
            })) {
                course.dani = true;
                break;
            }
        }
    }

    return course;
}