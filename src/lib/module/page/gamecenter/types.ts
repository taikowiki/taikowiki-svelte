import { GAMECENTERREGION, AMENITY } from "./const";

export interface GameCenterData{
    order: number;
    name: string;
    address: string;
    amenity: Record<typeof AMENITY[number], boolean>;
    businessHours:{
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
}

export type GameCenterDataWithoutOrder = Pick<GameCenterData, Exclude<keyof GameCenterData, 'order'>>

export interface Machine{
    price: number;
    tunes: number;
    count: number;
}