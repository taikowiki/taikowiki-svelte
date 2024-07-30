import type { GameCenterData, GameCenterDataWithoutOrder } from "./types";
import { defineDBHandler } from "@yowza/db-handler";

export const gamecenterDBController = {
    /**
     * Retrieves the arcade favorites for a specific UUID user.
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
     * Adds an arcade favorite for a specific UUID user.
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
     * Deletes an arcade favorite.
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
                    await run("UPDATE `gamecenter/data` SET `favoriteCount` = IF(0 > `favoriteCount` - 1, 0, `favoriteCount` - 1) WHERE `order` = ?", [gamecenterOrder])
                }
            }
        }
    }),

    /**
     * Retrieves all arcade data.
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
     * Retrieves arcade data by order.
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
     * Retrieves only the names and orders of all arcades.
     */
    getAllNames: defineDBHandler<[], Pick<GameCenterData, 'name' | 'order'>[]>(() => {
        return async (run) => {
            return await run("SELECT `order`, `name` FROM `gamecenter/data`");
        }
    }),

    /**
     * Adds arcade data.
     */
    addGamecenter: defineDBHandler<[GameCenterDataWithoutOrder], void>((gamecenterData) => {
        return async (run) => {
            await run("INSERT INTO `gamecenter/data` (`name`, `address`, `amenity`, `machines`, `region`, `businessHours`) VALUES (?, ?, ?, ?, ?, ?)", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours)])
        }
    }),

    /**
     * Edits arcade data.
     */
    editGamecenter: defineDBHandler<[GameCenterData], void>((gamecenterData) => {
        return async (run) => {
            return await run("UPDATE `gamecenter/data` SET `name`=?, `address`=?, `amenity`=?, `machines`=?, `region`=?, `businessHours`=? WHERE `order` = ?", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours), gamecenterData.order])
        }
    }),

    /**
     * Deletes arcade data.
     */
    deleteGamecenter: defineDBHandler<[number], void>((order) => {
        return async (run: any) => {
            await run("DELETE FROM `gamecenter/data` WHERE `order` = ?", [order]);
        }
    }),

    /**
     * Submits an arcade report.
     */
    addReport: defineDBHandler<[{ gamecenterData: GameCenterDataWithoutOrder; UUID: string, ip: string }], void>((data) => {
        return async (run) => {
            await run("INSERT INTO `gamecenter/report` (`UUID`, `ip`, `data`) VALUES (?, ?, ?)", [data.UUID, data.ip, JSON.stringify(data.gamecenterData)]);
        }
    }),

    /**
     * Retrieves all reports.
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
     * Retrieves a report by order.
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
     * Approves a report.
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
     * Disapproves a report.
     */
    disapproveRequest: defineDBHandler<[number], void>((order) => {
        return async (run) => {
            return await run("UPDATE `gamecenter/report` SET `status`='disapproved' WHERE `order` = ?", [order]);
        }
    })
}
