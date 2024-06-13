import type { Course, SongData } from "./types";

export default function compareSong(song1: SongData, song2: SongData) {
    const keys: (Exclude<keyof SongData, "courses">)[] = [];

    const primitiveKeys: (Exclude<keyof SongData, "courses">)[] = ["songNo", "title", "titleKo", "aliasKo", "bpmShiver", "isAsiaBanned", "isDeleted", "isKrBanned", "addedDate"];
    primitiveKeys.forEach(key => {
        if (song1[key] !== song2[key]) {
            keys.push(key);
        }
    })

    //bpm
    if (song1.bpm.min !== song2.bpm.min || song1.bpm.max !== song2.bpm.max) {
        keys.push('bpm');
    }

    //version
    if (song1.version.length !== song2.version.length) {
        keys.push("version");
    }
    else {
        for (const version of song1.version) {
            if (!song2.version.includes(version)) {
                keys.push("version");
                break;
            }
        }
    }

    //genre
    if (song1.genre.length !== song2.genre.length) {
        keys.push("genre");
    }
    else {
        for (const genre of song1.genre) {
            if (!song2.genre.includes(genre)) {
                keys.push("genre");
                break;
            }
        }
    }

    //artist
    if (song1.artists.length !== song2.artists.length) {
        keys.push("artists");
    }
    else {
        for (const artist of song1.artists) {
            if (!song2.artists.includes(artist)) {
                keys.push("artists");
                break;
            }
        }
    }

    const courseKeys: ("easy" | "normal" | "hard" | "oni" | "ura")[] = [];
    (["easy", "normal", "hard", "oni", "ura"] as (keyof SongData['courses'])[]).forEach(diff => {
        const diff1 = song1.courses[diff];
        const diff2 = song2.courses[diff];

        if (diff1 === null) {
            if (diff1 !== diff2) {
                courseKeys.push(diff);
            }
            return;
        }

        if (diff2 === null) {
            courseKeys.push(diff);
            return;
        }

        if (!isSameCourse(diff1, diff2)) {
            courseKeys.push(diff);
            return;
        }
    })

    return {
        keys,
        courseKeys
    }
}

export function isSameCourse(course1: Course, course2: Course) {
    if (course1.level !== course2.level) {
        return false;
    }

    if (course1.isBranched !== course2.isBranched) {
        return false;
    }

    if (course1.maxCombo !== course2.maxCombo) {
        return false;
    }

    if (course1.playTime !== course2.playTime) {
        return false;
    }

    if (course1.maxDensity !== course2.maxDensity) {
        return false;
    }

    if (course1.daniUsed !== course2.daniUsed) {
        return false;
    }

    if (course1.balloon.length !== course2.balloon.length) {
        return false;
    }
    for (const balloon of course1.balloon) {
        if (!course2.balloon.includes(balloon)) {
            return false;
        }
    }

    if (course1.rollTime.length !== course2.rollTime.length) {
        return false;
    }
    for (const rollTime of course1.rollTime) {
        if (!course2.rollTime.includes(rollTime)) {
            return false;
        }
    }

    if (course1.images.length !== course2.images.length) {
        return false;
    }
    for (const image of course1.images) {
        if (!course2.images.includes(image)) {
            return false;
        }
    }

    if (course1.dani.length !== course2.dani.length) {
        return false;
    }
    for (const dani of course1.dani) {
        if (!course2.dani.find(d => {
            return dani.dan === d.dan && dani.order === d.order && dani.version === d.version
        })) {
            return false;
        }
    }

    return true;
}