import axios, { AxiosError } from "axios";
import type { HTTPResponse } from "../httpCorrespond/types";

export class GamecenterRequestor {
    /**
     * 즐겨찾기 가져오기
     */
    static async getFavorties(): Promise<HTTPResponse<number[]>>{
        try{
            const response = await axios({
                url: '/api/gamecenter/favorite',
                method: 'GET',
                responseType: 'json'
            });

            return {
                status: 'success',
                statusCode: 200,
                data: response.data as number[]
            };
        }
        catch (err: any) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return {
                        status: 'error',
                        statusCode: 401,
                        reason: "NOT_LOGINED"
                    }
                }
                return {
                    status: 'error',
                    statusCode: 500
                }
            }
            else {
                throw err;
            }
        }
    }

    /**
     * 즐겨찾기 추가 요청
     */
    static async addFavorite(gamecenterOrder: number): Promise<HTTPResponse> {
        try {
            await axios({
                url: '/api/gamecenter/add-favorite',
                method: 'POST',
                data: {
                    gamecenterOrder
                },
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            return {
                status: 'success',
                statusCode: 200,
                data: null
            }
        }
        catch (err: any) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return {
                        status: 'error',
                        statusCode: 401,
                        reason: "NOT_LOGINED"
                    }
                }
                if (err.response?.status === 400) {
                    return {
                        status: 'error',
                        statusCode: 400,
                        reason: "INVALID_REQUEST_DATA"
                    }
                }
                return {
                    status: 'error',
                    statusCode: 500
                }
            }
            else {
                throw err;
            }
        }
    }

    /**
     * 즐겨찾기 삭제 요청
     */
    static async deleteFavorite(gamecenterOrder: number): Promise<HTTPResponse> {
        try {
            await axios({
                url: '/api/gamecenter/delete-favorite',
                method: 'POST',
                data: {
                    gamecenterOrder
                },
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            return {
                status: 'success',
                statusCode: 200,
                data: null
            }
        }
        catch (err: any) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return {
                        status: 'error',
                        statusCode: 401,
                        reason: "NOT_LOGINED"
                    }
                }
                if (err.response?.status === 400) {
                    return {
                        status: 'error',
                        statusCode: 400,
                        reason: "INVALID_REQUEST_DATA"
                    }
                }
                return {
                    status: 'error',
                    statusCode: 500
                }
            }
            else {
                throw err;
            }
        }
    }
}