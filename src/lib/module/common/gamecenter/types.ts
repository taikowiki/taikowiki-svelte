export interface GameCenterData{
    name: string;
    address: string;
    amenity: {
        atm: boolean;
        water: boolean;
        toilet: boolean;
    };
    machines: Machine[]
}

export interface Machine{
    price: number;
    tune: number;
    count: number;
}