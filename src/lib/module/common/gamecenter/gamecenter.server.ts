import type { GameCenterData, GameCenterDataWithoutOrder } from "./types";
import { defineDBHandler } from "@yowza/db-handler";

export const gamecenterDBController = {
    /**
     * 특정 UUID 사용자의 오락실 즐겨찾기를 가져옵니다.
     */
    getFavorites: defineDBHandler<[string], number[]>((UUID) => {
        return async (run) => {
            const result = await run("SELECT * FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);

            if (result.length === 0) {
                return [];
            }

            return JSON.parse(result[0].favorites)
        }
    }),

    /**
     * 특정 UUID 사용자에 오락실 즐겨찾기를 추가합니다.
     */
    addFavorite: defineDBHandler<[string, number], void>((UUID, gamecenterOrder) => {
        return async (run) => {
            const favoritesResult = await run("SELECT * FROM `user/gamecenter_favorites` WHERE `UUID` = ?", [UUID]);

            if (favoritesResult.length === 0) {
                const result = await run("INSERT INTO `user/gamecenter_favorites` (`UUID`, `favorites`) VALUES (?, ?)", [UUID, JSON.stringify([gamecenterOrder])]);
                if (result.affectedRows > 0) {
                    await run("UPDATE `gamecenter/data` SET `favoriteCount` = `favoriteCount` + 1 WHERE `order` = ?", [gamecenterOrder])
                }
            }
            else {
                const favorites: number[] = JSON.parse(favoritesResult[0].favorites);
                if (favorites.includes(gamecenterOrder)) {
                    return;
                }
                const result = await run("UPDATE `user/gamecenter_favorites` SET `favorites` = ? WHERE `UUID` = ?", [JSON.stringify([...favorites, gamecenterOrder]), UUID]);
                if (result.affectedRows > 0) {
                    await run("UPDATE `gamecenter/data` SET `favoriteCount` = `favoriteCount` + 1 WHERE `order` = ?", [gamecenterOrder])
                }
            }
        }
    }),

    /**
     * 즐겨찾기 삭제하기
     */
    deleteFavorite: defineDBHandler<[string, number], void>((UUID, gamecenterOrder) => {
        return async (run) => {
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
                if (result.affectedRows > 0) {
                    await run("UPDATE `gamecenter/data` SET `favoriteCount` = IF( 0 > `favoriteCount` - 1, 0, `favoriteCount` - 1) WHERE `order` = ?", [gamecenterOrder])
                }
            }
        }
    }),

    /**
     * 오락실 데이터 전체 가져오기
     */
    getAll: defineDBHandler<[], GameCenterData[]>(() => {
        return async (run) => {
            const result = await run("SELECT * FROM `gamecenter/data`");
            result.forEach((r: any) => {
                r.amenity = JSON.parse(r.amenity);
                r.machines = JSON.parse(r.machines);
                r.businessHours = JSON.parse(r.businessHours)
            })

            return result as GameCenterData[];
        }
    }),

    /**
     * 오락실 데이터 가져오기
     */
    getByOrder: defineDBHandler<[number], [GameCenterData | null]>((order) => {
        return async (run) => {
            const result = await run("SELECT * FROM `gamecenter/data` WHERE `order` = ?", [order])

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
    }),

    /**
     * 오락실 이름, order만 가져오기
     */
    getAllNames: defineDBHandler<[], Pick<GameCenterData, 'name' | 'order'>[]>(() => {
        return async (run) => {
            return await run("SELECT `order`, `name` FROM `gamecenter/data`");
        }
    }),

    /**
     * 오락실 데이터 추가
     */
    addGamecenter: defineDBHandler<[GameCenterDataWithoutOrder], void>((gamecenterData) => {
        return async (run) => {
            await run("INSERT INTO `gamecenter/data` (`name`, `address`, `amenity`, `machines`, `region`, `businessHours`) VALUES (?, ?, ?, ?, ?, ?)", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours)])
        }
    }),

    /**
     * 오락실 데이터 수정
     */
    editGamecenter: defineDBHandler<[GameCenterData], void>((gamecenterData) => {
        return async (run) => {
            return await run("UPDATE `gamecenter/data` SET `name`=?, `address`=?, `amenity`=?, `machines`=?, `region`=?, `businessHours`=? WHERE `order` = ?", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours), gamecenterData.order])
        }
    }),

    /**
     * 오락실 데이터 삭제
     */
    deleteGamecenter: defineDBHandler<[number], void>((order) => {
        return async (run: any) => {
            await run("DELETE FROM `gamecenter/data` WHERE `order` = ?", [order]);
        }
    }),

    /**
     * 오락실 제보 넣기
     */
    addReport: defineDBHandler<[{ gamecenterData: GameCenterDataWithoutOrder; UUID: string, ip: string }], void>((data) => {
        return async (run) => {
            await run("INSERT INTO `gamecenter/report` (`UUID`, `ip`, `data`) VALUES (?, ?, ?)", [data.UUID, data.ip, JSON.stringify(data.gamecenterData)]);
        }
    }),

    /**
     * 모든 제보 가져오기
     */
    getReports: defineDBHandler<['none' | 'approved' | 'disapproved'], { order: number; UUID: string, ip: string, data: GameCenterDataWithoutOrder }[]>((status = 'none') => {
        return async (run) => {
            const result = await run("SELECT * FROM `gamecenter/report` WHERE `status` = ?", [status]);

            result.forEach((e: any) => {
                e.data = JSON.parse(e.data)
            })

            return result;
        }
    }),

    /**
     * 제보 가져오기
     */
    getReportByOrder: defineDBHandler<[number], { order: number; UUID: string, ip: string, data: GameCenterDataWithoutOrder } | null>((order) => {
        return async (run) => {
            const result = await run("SELECT * FROM `gamecenter/report` WHERE `order` = ? AND `status` = 'none'", [order]);

            if (result.length === 0) {
                return null;
            }

            result.forEach((e: any) => {
                e.data = JSON.parse(e.data)
            })

            return result[0];
        }
    }),

    /**
     * 제보 수락
     */
    approveRequest: defineDBHandler<[number], void>((order) => {
        return async (run) => {
            const report = await gamecenterDBController.getReportByOrder.getCallback(order)(run);
            if (!report) {
                return;
            }

            await gamecenterDBController.addGamecenter.getCallback(report.data)(run);

            return await run("UPDATE `gamecenter/report` SET `status`='approved' WHERE `order` = ?", [order]);
        }
    }),

    /**
     * 제보 거부
     */
    disapproveRequest: defineDBHandler<[number], void>((order) => {
        return async (run) => {
            return await run("UPDATE `gamecenter/report` SET `status`='disapproved' WHERE `order` = ?", [order]);
        }
    })
}