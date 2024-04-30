import Song from "$lib/module/common/song/song.server";

export async function load(){
    /*
    await Song.addSong({
        songNo: 1149,
        title: 'フォニイ',
        titleKo: null,
        titleEn: null,
        aliasEn: null,
        aliasKo: null,
        bpm: {
            min: 170,
            max: 170
        },
        bpmShiver: 0,
        version: ['NAC'],
        isAsiaBanned: 0,
        isKrBanned: 0,
        genre: ["pops"],
        artists: ["ツミキ", "可不"],
        addedDate: null,
        courses:{
            ura: {
                level: 9,
                isBranched: 0,
                maxCombo: 921,
                playTime: 135,
                balloon: [0],
                rollTime: [0],
                maxDensity: 6.8,
                daniUsed: 0,
                dani: []
            }
        }
    })
    */
    return {
        songs: await Song.getAll()
    }
}