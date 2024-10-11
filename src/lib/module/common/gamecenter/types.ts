import { GAMECENTERREGION, AMENITY } from "./const";

export interface GameCenterData {
    order: number;
    name: string;
    address: string;
    amenity: Record<typeof AMENITY[number], boolean>;
    businessHours: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        0: string;
        [day: number]: string;
    }
    machines: Machine[];
    region: typeof GAMECENTERREGION[number];
    favoriteCount: number;
    coor: {
        x: number | null;
        y: number | null;
    }
}

export type GameCenterDataWithoutOrder = Pick<GameCenterData, Exclude<keyof GameCenterData, 'order'>>;
export type GameCenterDataWithoutOrderAndFavoriteCount = Pick<GameCenterDataWithoutOrder, Exclude<keyof GameCenterDataWithoutOrder, 'favoriteCount'>>;
export type GameCenterRequestData = Pick<GameCenterDataWithoutOrder, Exclude<keyof GameCenterDataWithoutOrder, 'favoriteCount' | 'coor'>>

export interface Machine {
    price: number;
    tunes: number;
    count: number;
}

export interface CoorSearchResult {
    address: {
        address_name: string,
        b_code: string,
        h_code: string,
        main_address_no: string,
        mountain_yn: string,
        region_1depth_name: string,
        region_2depth_name: string,
        region_3depth_h_name: string,
        region_3depth_name: string,
        sub_address_no: string,
        x: string,
        y: string
    },
    address_name: string,
    address_type: string,
    road_address: {
        address_name: string,
        building_name: string,
        main_building_no: string,
        region_1depth_name: string,
        region_2depth_name: string,
        region_3depth_name: string,
        road_name: string,
        sub_building_no: string
        underground_yn: string,
        x: string,
        y: string,
        zone_no: string
    },
    x: string,
    y: string
}