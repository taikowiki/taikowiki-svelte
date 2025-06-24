import type { defineDBHandler } from "@yowza/db-handler";
import type { defineRequestHandler } from "@yowza/rrequestor";
import type { RRequestHandler } from "@yowza/rrequestor/types";
import { z } from "zod";

// module
export namespace Gamecenter {
    export namespace CONST {
        export const GAMECENTERREGION = ["서울", "경기", "대전", "인천", "충남", "강원", "부산", "울산", "경남", "대구", "경북", "광주", "전남", "전북", "제주"] as const;
        export const AMENITY = ['water', 'toilet', 'park', 'capture', 'rental', 'night', 'atm', 'fan', 'mybachi'] as const;
    }
}

// client/server
export namespace Gamecenter {
    export declare namespace Client {
        function getKakaoMap(): typeof kakao.maps;
        const request: {
            getFavorites: ReturnType<typeof defineRequestHandler<null, number[]>>,
            addFavorite: ReturnType<typeof defineRequestHandler<{ gamecenterOrder: number }, void>>,
            deleteFavorite: ReturnType<typeof defineRequestHandler<{ gamecenterOrder: number }, void>>,
            report: ReturnType<typeof defineRequestHandler<{ gamecenterData: Omit<Gamecenter.Gamecenter, 'order' | 'favoriteCount' | 'coor'> }, void>>
        }
        const adminRequest: {
            edit: RRequestHandler<{gamecenterData: Gamecenter.GamecenterWithoutOrder}, void>,
            delete: RRequestHandler<{order: number;}, void>,
            add: RRequestHandler<{ gamecenterData: Gamecenter.GamecenterWithoutOrder }, void>,
            approve: RRequestHandler<{ order: number }, void>,
            disapprove: RRequestHandler<{ order: number }, void>
        }
    }

    export declare namespace Server{
        const DBController:{
            getFavorites: ReturnType<typeof defineDBHandler<[string], number[]>>,
            addFavorite: ReturnType<typeof defineDBHandler<[string, number], void>>,
            deleteFavorite: ReturnType<typeof defineDBHandler<[string, number], void>>,
            getAll: ReturnType<typeof defineDBHandler<[], Gamecenter.Gamecenter[]>>,
            getByOrder: ReturnType<typeof defineDBHandler<[number], Gamecenter.Gamecenter | null>>,
            getAllNames: ReturnType<typeof defineDBHandler<[], Pick<Gamecenter.Gamecenter, 'name' | 'order'>[]>>,
            addGamecenter: ReturnType<typeof defineDBHandler<[Gamecenter.GamecenterWithoutOrderAndFavoriteCount], void>>,
            editGamecenter: ReturnType<typeof defineDBHandler<[Gamecenter.Gamecenter], void>>,
            deleteGamecenter: ReturnType<typeof defineDBHandler<[number], void>>,
            addReport: ReturnType<typeof defineDBHandler<[{ gamecenterData: Gamecenter.Req; UUID: string, ip: string }], void>>,
            getReports: ReturnType<typeof defineDBHandler<['none' | 'approved' | 'disapproved'], { order: number; UUID: string, ip: string, data: Gamecenter.Req }[]>>,
            getReportByOrder: ReturnType<typeof defineDBHandler<[number], { order: number; UUID: string, ip: string, data: Gamecenter.Req } | null>>,
            approveRequest: ReturnType<typeof defineDBHandler<[number, string], void>>,
            disapproveRequest: ReturnType<typeof defineDBHandler<[number], void>>,
        }

        const serverRequest:{
            searchCoorWithAddress(address: string, origin: string): Promise<Gamecenter.CoorSearchResult[]>
        }
    }
}

// types
export namespace Gamecenter {
    export namespace Schema {
        export const Machine = z.object({
            price: z.number(),
            tunes: z.number(),
            count: z.number()
        });

        export const Req = z.object({
            name: z.string(),
            address: z.string(),
            amenity: z.object(Object.fromEntries(CONST.AMENITY.map(key => [key, z.boolean()])) as Record<typeof CONST.AMENITY[number], z.ZodBoolean>),
            businessHours: z.object({
                1: z.string(),
                2: z.string(),
                3: z.string(),
                4: z.string(),
                5: z.string(),
                6: z.string(),
                0: z.string()
            }),
            machines: z.array(Machine),
            region: z.enum(CONST.GAMECENTERREGION),
        });

        export const GamecenterWithoutOrder = z.intersection(Req, z.object({
            favoriteCount: z.number(),
            coor: z.object({
                x: z.union([z.number(), z.null()]),
                y: z.union([z.number(), z.null()])
            })
        }))

        export const Gamecenter = z.intersection(GamecenterWithoutOrder, z.object({
            order: z.number()
        }));

        export const CoorSearchResult = z.object({
            address: z.object({
                address_name: z.string(),
                b_code: z.string(),
                h_code: z.string(),
                main_address_no: z.string(),
                mountain_yn: z.string(),
                region_1depth_name: z.string(),
                region_2depth_name: z.string(),
                region_3depth_h_name: z.string(),
                region_3depth_name: z.string(),
                sub_address_no: z.string(),
                x: z.string(),
                y: z.string()
            }),
            address_name: z.string(),
            address_type: z.string(),
            road_address: z.object({
                address_name: z.string(),
                building_name: z.string(),
                main_building_no: z.string(),
                region_1depth_name: z.string(),
                region_2depth_name: z.string(),
                region_3depth_name: z.string(),
                road_name: z.string(),
                sub_building_no: z.string(),
                underground_yn: z.string(),
                x: z.string(),
                y: z.string(),
                zone_no: z.string()
            }),
            x: z.string(),
            y: z.string()
        })
    }

    export type Machine = z.infer<typeof Schema.Machine>;
    export type Req = z.infer<typeof Schema.Req>;
    export type Gamecenter = z.infer<typeof Schema.Gamecenter>;
    export type CoorSearchResult = z.infer<typeof Schema.CoorSearchResult>;
    export type GamecenterWithoutOrder = Pick<Gamecenter, Exclude<keyof Gamecenter, 'order'>>;
    export type GamecenterWithoutOrderAndFavoriteCount = Pick<GamecenterWithoutOrder, Exclude<keyof GamecenterWithoutOrder, 'favoriteCount'>>;
}