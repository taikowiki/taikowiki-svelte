import { runQuery } from "@sveltekit-board/db";
import type { GameCenterData, GameCenterDataWithoutOrder } from "./types";

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
            const favoritesResult = await run("SELECT * FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);

            if (favoritesResult.length === 0) {
                const result = await run("INSERT INTO `user/gamecenter_favorites` (`UUID`, `favorites`) VALUES (?, ?)", [UUID, JSON.stringify([gamecenterOrder])]);
                if(result.affectedRows > 0){
                    await run("UPDATE `gamecenter/data` SET `favoriteCount` = `favoriteCount` + 1 WHERE `order` = ?", [gamecenterOrder])
                }
            }
            else {
                const favorites: number[] = JSON.parse(favoritesResult[0].favorites);
                if (favorites.includes(gamecenterOrder)) {
                    return;
                }
                const result = await run("UPDATE `user/gamecenter_favorites` SET `favorites` = ? WHERE `UUID` = ?", [JSON.stringify([...favorites, gamecenterOrder]), UUID]);
                if(result.affectedRows > 0){
                    await run("UPDATE `gamecenter/data` SET `favoriteCount` = `favoriteCount` + 1 WHERE `order` = ?", [gamecenterOrder])
                }
            }
        })
    }

    /**
     * 즐겨찾기 삭제하기
     */
    static async deleteFavorite(UUID: string, gamecenterOrder: number) {
        return await runQuery(async (run) => {
            const favoritesResult = await run("SELECT * FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);

            if (favoritesResult.length === 0) {
                return;
            }
            else {
                const favorites: number[] = JSON.parse(favoritesResult[0].favorites);
                if (!favorites.includes(gamecenterOrder)) {
                    return;
                }
                const result = await run("UPDATE `user/gamecenter_favorites` SET `favorites` = ? WHERE `UUID` = ?", [JSON.stringify(favorites.filter(e => e !== gamecenterOrder)), UUID]);
                if(result.affectedRows > 0){
                    await run("UPDATE `gamecenter/data` SET `favoriteCount` = IF( 0 > `favoriteCount` - 1, 0, `favoriteCount` - 1) WHERE `order` = ?", [gamecenterOrder])
                }
            }
        })
    }

    /**
     * 오락실 데이터 전체 가져오기
     */
    static async getAll(run?: any): Promise<GameCenterData[]> {
        const queryCallback = async (run: any) => {
            const result = await run("SELECT * FROM `gamecenter/data`");
            result.forEach((r: any) => {
                r.amenity = JSON.parse(r.amenity);
                r.machines = JSON.parse(r.machines);
                r.businessHours = JSON.parse(r.businessHours)
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
     * 오락실 데이터 가져오기
     */
    static async getByOrder(order: number): Promise<GameCenterData | null> {
        const result = await runQuery(async (run) => {
            return await run("SELECT * FROM `gamecenter/data` WHERE `order` = ?", [order])
        })

        if (result.length === 0) {
            return null;
        }

        result.forEach((r: any) => {
            r.amenity = JSON.parse(r.amenity);
            r.machines = JSON.parse(r.machines);
            r.businessHours = JSON.parse(r.businessHours)
        })

        return result[0]
    }

    /**
     * 오락실 이름, order만 가져오기
     */
    static async getAllNames(): Promise<Pick<GameCenterData, 'name' | 'order'>[]> {
        return await runQuery(async (run) => {
            return await run("SELECT `order`, `name` FROM `gamecenter/data`");
        })
    }

    /**
     * 오락실 데이터 추가
     */
    static async addGamecenter(gamecenterData: GameCenterDataWithoutOrder, run?: any) {
        const queryCallback = async (run: any) => {
            await run("INSERT INTO `gamecenter/data` (`name`, `address`, `amenity`, `machines`, `region`, `businessHours`) VALUES (?, ?, ?, ?, ?, ?)", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours)])
        }

        if (run) {
            return await queryCallback(run);
        }
        else {
            return await runQuery(queryCallback);
        }
    }

    /**
     * 오락실 데이터 수정
     */
    static async editGamecenter(gamecenterData: GameCenterData) {
        return await runQuery(async (run) => {
            return await run("UPDATE `gamecenter/data` SET `name`=?, `address`=?, `amenity`=?, `machines`=?, `region`=?, `businessHours`=? WHERE `order` = ?", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours), gamecenterData.order])
        })
    }

    /**
     * 오락실 데이터 삭제
     */
    static async deleteGamecenter(order: number, run?: any) {
        const queryCallback = async (run: any) => {
            await run("DELETE FROM `gamecenter/data` WHERE `order` = ?", [order]);
        }

        if (run) {
            return await queryCallback(run);
        }
        else {
            return await runQuery(queryCallback);
        }
    }

    /**
     * 오락실 제보 넣기
     */
    static async addReport(data: { gamecenterData: GameCenterDataWithoutOrder; UUID: string, ip: string }) {
        return await runQuery(async (run) => {
            await run("INSERT INTO `gamecenter/report` (`UUID`, `ip`, `data`) VALUES (?, ?, ?)", [data.UUID, data.ip, JSON.stringify(data.gamecenterData)]);
        })
    }

    /**
     * 모든 제보 가져오기
     */
    static async getReports(status: 'none' | 'approved' | 'disapproved' = 'none'): Promise<{ order: number; UUID: string, ip: string, data: GameCenterDataWithoutOrder }[]> {
        return await runQuery(async (run) => {
            const result = await run("SELECT * FROM `gamecenter/report` WHERE `status` = ?", [status]);

            result.forEach((e: any) => {
                e.data = JSON.parse(e.data)
            })

            return result;
        })
    }

    /**
     * 제보 가져오기
     */
    static async getReportByOrder(order: number): Promise<{ order: number; UUID: string, ip: string, data: GameCenterDataWithoutOrder } | null> {
        return await runQuery(async (run) => {
            const result = await run("SELECT * FROM `gamecenter/report` WHERE `order` = ? AND `status` = 'none'", [order]);

            if (result.length === 0) {
                return null;
            }

            result.forEach((e: any) => {
                e.data = JSON.parse(e.data)
            })

            return result[0];
        })
    }

    /**
     * 제보 수락
     */
    static async approveRequest(order: number) {
        return await runQuery(async (run) => {
            const report = await this.getReportByOrder(order);
            if (!report) {
                return;
            }

            await this.addGamecenter(report.data);

            return await run("UPDATE `gamecenter/report` SET `status`='approved' WHERE `order` = ?", [order]);
        })
    }

    /**
     * 제보 거부
     */
    static async disapproveRequest(order: number) {
        return await runQuery(async (run) => {
            return await run("UPDATE `gamecenter/report` SET `status`='disapproved' WHERE `order` = ?", [order]);
        })
    }
}