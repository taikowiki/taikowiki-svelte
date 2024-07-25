import {RESPONSE_ERROR_REASON} from './const'

export type HTTPResponse<T = any> = HTTPResponseData<T> | HTTPResponseError;

export interface HTTPResponseData<T extends any = any>{
    status: 'success',
    statusCode: number,
    data: T;
}

export interface HTTPResponseError{
    status: 'error',
    statusCode: number,
    reason?: typeof RESPONSE_ERROR_REASON[number]
}