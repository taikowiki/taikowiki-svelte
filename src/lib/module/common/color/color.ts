import type { Difficulty, Genre } from "../song/types";

export const genre: Record<Genre, string> = {
    pops: "#59bec5",
    vocaloid: "#a5d1da",
    anime: "#e28dc8",
    namco: "#EB6B6A",
    game: "#b697d3",
    variety: "#40c977",
    classic: "#ccbd4a",
    kids: "#ccbd4a"
}

export const difficulty: Record<Difficulty | "oniura", string> = {
    "easy": "#ff2703",
    "normal": "#647e2f",
    "hard": "#364938",
    "oni": "#db1885",
    "ura": "#7135db",
    "oniura": "linear-gradient(rgb(219, 24, 133) 0%, rgb(219, 24, 133) 50%, rgb(113, 53, 219) 50%, rgb(113, 53, 219) 100% )"
}

const color = {
    genre,
    difficulty
}

function deepFreeze(target: Object) {
    Object.values(target).forEach(child => {
        if (typeof (child) === "object") {
            deepFreeze(child)
        }
    })
    Object.freeze(target);
}

deepFreeze(color);

export default color;