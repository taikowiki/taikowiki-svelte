import LZUTF8 from "lzutf8";
import type { DiffChart, DiffchartSectionTuple, DiffchartSongTuple, DiffchartTuple } from "./types";

/**
 * Decode stringified diffchart to object.
 * @param hash 
 * @returns 
 */
export function decodeDiffchart(hash: string) {
    const stringifiedCompressed = decodeURIComponent(atob(hash));
    const compressed = Uint8Array.from(JSON.parse(stringifiedCompressed));
    const stringified = LZUTF8.decompress(compressed);
    const diffchart = JSON.parse(stringified);
    if(Array.isArray(diffchart)){ // tuple 형식
        return detuplify(diffchart as DiffchartTuple);
    }
    else{ // object 형식
        return diffchart;
    }
}

/**
 * Encode diffchart object to string.
 * @param diffchart 
 * @returns 
 */
export function encodeDiffchart(diffchart: DiffChart) {
    const diffchartTuple = tuplify(diffchart);
    const stringified = JSON.stringify(diffchartTuple);
    const compressed = LZUTF8.compress(stringified, {
        outputEncoding: "ByteArray",
    });
    const stringifiedCompressed = JSON.stringify(Array.from(compressed));
    return btoa(encodeURIComponent(stringifiedCompressed));
}

/**
 * Convert diffchart object to tuple.
 * @param diffchart 
 * @returns 
 */
function tuplify(diffchart: DiffChart) {
    diffchart.sections.sort((a, b) => a.order - b.order);
    diffchart.sections.forEach((section) => {
        section.songs.sort((a, b) => a.order - b.order);
    })

    const diffchartTuple: DiffchartTuple = [
        diffchart.name,
        diffchart.sections.map((section): DiffchartSectionTuple => {
            return [
                section.name,
                section.songs.map((song): DiffchartSongTuple => {
                    return [
                        song.songNo,
                        song.title,
                        song.difficulty
                    ]
                }),
                section.color,
                section.backgroundColor
            ]
        }),
        diffchart.color,
        diffchart.backgroundColor
    ]

    return diffchartTuple;
}

/**
 * Convert diffchart tuple to object.
 * @param diffchartTuple 
 * @returns 
 */
function detuplify(diffchartTuple: DiffchartTuple) {
    const diffchart: DiffChart = {
        name: diffchartTuple[0],
        sections: diffchartTuple[1].map((sectionTuple, i) => {
            return {
                name: sectionTuple[0],
                songs: sectionTuple[1].map((songTuple, i) => {
                    return {
                        songNo: songTuple[0],
                        title: songTuple[1],
                        difficulty: songTuple[2],
                        order: i
                    }
                }),
                order: i,
                color: sectionTuple[2],
                backgroundColor: sectionTuple[3]
            }
        }),
        color: diffchartTuple[2],
        backgroundColor: diffchartTuple[3]
    };

    return diffchart;
}