import axios from "axios";
import { Gamecenter } from ".";
import { defineDBHandler } from "@yowza/db-handler";

namespace GamecenterServer {
    export const DBController = {
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
        getAll: defineDBHandler<[], Gamecenter.Gamecenter[]>(() => {
            return async (run) => {
                const result = await run("SELECT * FROM `gamecenter/data`");
                result.forEach((r: any) => {
                    r.amenity = JSON.parse(r.amenity);
                    r.machines = JSON.parse(r.machines);
                    r.businessHours = JSON.parse(r.businessHours);
                    r.coor = {
                        x: r.x,
                        y: r.y
                    }
                    delete r.x;
                    delete r.y;
                })

                return result as Gamecenter.Gamecenter[];
            }
        }),

        /**
         * Retrieves arcade data by order.
         */
        getByOrder: defineDBHandler<[number], Gamecenter.Gamecenter | null>((order) => {
            return async (run) => {
                const result = await run("SELECT * FROM `gamecenter/data` WHERE `order` = ?", [order])

                if (result.length === 0) {
                    return null;
                }

                result.forEach((r: any) => {
                    r.amenity = JSON.parse(r.amenity);
                    r.machines = JSON.parse(r.machines);
                    r.businessHours = JSON.parse(r.businessHours);
                    r.coor = {
                        x: r.x,
                        y: r.y
                    }
                    delete r.x;
                    delete r.y;
                })

                return result[0]
            }
        }),

        /**
         * Retrieves only the names and orders of all arcades.
         */
        getAllNames: defineDBHandler<[], Pick<Gamecenter.Gamecenter, 'name' | 'order'>[]>(() => {
            return async (run) => {
                return await run("SELECT `order`, `name` FROM `gamecenter/data`");
            }
        }),

        /**
         * Adds arcade data.
         */
        addGamecenter: defineDBHandler<[Gamecenter.GamecenterWithoutOrderAndFavoriteCount], void>((gamecenterData) => {
            return async (run) => {
                await run("INSERT INTO `gamecenter/data` (`name`, `address`, `amenity`, `machines`, `region`, `businessHours`, `x`, `y`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours), gamecenterData.coor.x, gamecenterData.coor.y])
            }
        }),

        /**
         * Edits arcade data.
         */
        editGamecenter: defineDBHandler<[Gamecenter.Gamecenter], void>((gamecenterData) => {
            return async (run) => {
                return await run("UPDATE `gamecenter/data` SET `name`=?, `address`=?, `amenity`=?, `machines`=?, `region`=?, `businessHours`=?, `x` = ?, `y` = ? WHERE `order` = ?", [gamecenterData.name, gamecenterData.address, JSON.stringify(gamecenterData.amenity), JSON.stringify(gamecenterData.machines), gamecenterData.region, JSON.stringify(gamecenterData.businessHours), gamecenterData.coor.x, gamecenterData.coor.y, gamecenterData.order])
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
        addReport: defineDBHandler<[{ gamecenterData: Gamecenter.Req; UUID: string, ip: string }], void>((data) => {
            return async (run) => {
                await run("INSERT INTO `gamecenter/report` (`UUID`, `ip`, `data`) VALUES (?, ?, ?)", [data.UUID, data.ip, JSON.stringify(data.gamecenterData)]);
            }
        }),

        /**
         * Retrieves all reports.
         */
        getReports: defineDBHandler<['none' | 'approved' | 'disapproved'], { order: number; UUID: string, ip: string, data: Gamecenter.Req }[]>((status = 'none') => {
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
        getReportByOrder: defineDBHandler<[number], { order: number; UUID: string, ip: string, data: Gamecenter.Req } | null>((order) => {
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
        approveRequest: defineDBHandler<[number, string], void>((order, origin) => {
            return async (run) => {
                const report = await DBController.getReportByOrder.getCallback(order)(run);
                if (!report) {
                    return;
                }

                const coorData = await serverRequest.searchCoorWithAddress(report.data.address, origin);

                const data = {
                    ...report.data,
                    coor: {
                        x: coorData?.[0]?.x !== undefined ? Number(coorData?.[0]?.x) : null,
                        y: coorData?.[0]?.y !== undefined ? Number(coorData?.[0]?.y) : null
                    }
                }

                await DBController.addGamecenter.getCallback(data)(run);

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

    export const serverRequest = {
        async searchCoorWithAddress(address: string, origin: string): Promise<Gamecenter.CoorSearchResult[]> {
            const fetchUrl = new URL("https://dapi.kakao.com");
            fetchUrl.pathname = '/v2/local/search/address.json';
            fetchUrl.searchParams.set('query', address);
            fetchUrl.searchParams.set('page', '1');
            fetchUrl.searchParams.set('size', '1');

            const headers: Record<string, string> = {};
            headers['authorization'] = `KakaoAK ${process.env.KAKAO_JAVASCRIPT_KEY}`;
            headers['ka'] = `sdk/4.4.19 os/javascript lang/ko-KR device/Win32 origin/${encodeURIComponent(origin)}`;
            headers['Referer'] = origin;

            const response = await axios({
                method: 'GET',
                url: fetchUrl.href,
                headers
            });

            return response.data.documents;
        }
    }
}

Gamecenter.Server = GamecenterServer;