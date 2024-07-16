import { runQuery } from "@sveltekit-board/db";

export class GamecenterController {
    /**
     * 즐겨찾기 가져오기
     */
    static async getFavorites(UUID: string): Promise<number[]> {
        return await runQuery(async (run) => {
            const result = await run("SELECT * FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return [];
            }

            return JSON.parse(result[0].favorites)
        })
    }

    /**
     * 즐겨찾기 추가하기
     */
    static async addFavorite(UUID: string, gamecenterOrder: number) {
        return await runQuery(async (run) => {
            const result = await run("SELECT * FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return await run("INSERT INTO `user/gamecenter_favorites` (`UUID`, `favorites`) VALUES (?, ?)", [UUID, JSON.stringify([gamecenterOrder])]);
            }
            else {
                const favorites: number[] = JSON.parse(result[0].favorites);
                if (favorites.includes(gamecenterOrder)) {
                    return;
                }
                return await run("UPDATE `user/gamecenter_favorites` SET `favorites` = ? WHERE `UUID` = ?", [JSON.stringify([...favorites, gamecenterOrder]), UUID]);
            }
        })
    }

    /**
     * 즐겨찾기 삭제하기
     */
    static async deleteFavorite(UUID: string, gamecenterOrder: number) {
        return await runQuery(async (run) => {
            const result = await run("SELECT * FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return;
            }
            else {
                const favorites: number[] = JSON.parse(result[0].favorites);
                if (!favorites.includes(gamecenterOrder)) {
                    return;
                }
                return await run("UPDATE `user/gamecenter_favorites` SET `favorites` = ? WHERE `UUID` = ?", [JSON.stringify(favorites.filter(e => e !== gamecenterOrder)), UUID]);
            }
        })
    }
}