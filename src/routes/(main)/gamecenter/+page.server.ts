import type { GameCenterData } from "$lib/module/common/gamecenter/types"

export async function load() {
    const gamecenterDatas: GameCenterData[] = [
        {   
            order: 1,
            name: '노량진 어뮤즈타운',
            address: '서울특별시 동작구 만양로14가길 26, 어뮤즈타운',
            amenity: {
                atm: true,
                water: true,
                toilet: true,
                park: false,
                capture: true,
                rental: true,
                night: true,
                fan: true,
                mybachi: true
            },
            machines: [{
                price: 1000,
                tune: 4,
                count: 3
            }],
            region: '서울'
        },
        {
            order: 2,
            name: '서현게임파크',
            address: '경기도 성남시 분당구 서현로210번길 14',
            amenity: {
                atm: true,
                water: true,
                toilet: true,
                park: false,
                capture: false,
                rental: false,
                night: false,
                fan: true,
                mybachi: true
            },
            machines: [{
                price: 1000,
                tune: 3,
                count: 1
            }],
            region: '경기'
        }
    ]
    return {
        gamecenterDatas
    }
}