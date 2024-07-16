import { runQuery } from "@sveltekit-board/db";
import type { GameCenterData } from "./types";

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

    /**
     * 오락실 데이터 가져오기
     */
    static async getGamecenters(run?: any): Promise<GameCenterData[]> {
        const queryCallback = async (run: any) => {
            const result = await run("SELECT * FROM `gamecenter`");
            result.forEach((r: any) => {
                r.amenity = JSON.parse(r.amenity);
                r.machines = JSON.parse(r.machines);
            })

            return result as GameCenterData[];
        }

        if (run) {
            return await queryCallback(run);
        }
        else {
            return await runQuery(queryCallback);
        }
    }

    /**
     * 오락실 데이터 추가
     */
    static async addGamecenter(gamecenterData: GameCenterData, run?: any) {
        const queryCallback = async (run: any) => {
            await run("INSERT INTO `gamecenter` (`name`, `address`, `amenity`, `machines`, `region`) VALUES (?, ?, ?, ?, ?)", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region])
        }

        if (run) {
            return await queryCallback(run);
        }
        else {
            return await runQuery(queryCallback);
        }
    }

    /**
     * 오락실 데이터 삭제
     */
    static async deleteGamecenter(order: number, run?: any) {
        const queryCallback = async (run: any) => {
            await run("DELETE FROM `gamecenter` WHERE `order` = ?", [order]);
        }

        if (run) {
            return await queryCallback(run);
        }
        else {
            return await runQuery(queryCallback);
        }
    }
}