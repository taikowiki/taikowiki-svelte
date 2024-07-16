import { GAMECENTERREGION, AMENITY } from "./const";

export interface GameCenterData{
    order: number;
    name: string;
    address: string;
    amenity: Record<typeof AMENITY[number], boolean>;
    machines: Machine[];
    region: typeof GAMECENTERREGION[number];
}

export interface Machine{
    price: number;
    tune: number;
    count: number;
}