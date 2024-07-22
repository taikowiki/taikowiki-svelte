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
        [date: number]: string;
    }
    machines: Machine[];
    region: typeof GAMECENTERREGION[number];
}

export interface Machine{
    price: number;
    tunes: number;
    count: number;
}