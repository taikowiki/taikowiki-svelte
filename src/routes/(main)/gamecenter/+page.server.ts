import type { GameCenterData } from "$lib/module/common/gamecenter/types"

export async function load() {
    const gamecenterDatas: GameCenterData[] = [
        {
            name: '노량진 어뮤즈타운',
            address: '서울특별시 동작구 만양로14가길 26, 어뮤즈타운',
            amenity: {
                atm: true,
                water: true,
                toilet: true
            },
            machines: [{
                price: 1000,
                tune: 4,
                count: 3
            }]
        }
    ]
    return {
        gamecenterDatas
    }
}