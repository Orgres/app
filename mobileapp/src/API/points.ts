import { QueryParams } from '../types/http';
import { GET } from './http';

export type Point = {
    id: number;
    area: string;
    address: string;
    type: string;
    account: string;
    name: string;
    guid: string;
    code: string;
}

const URL = 'meteringpoints';

export const getPoints = async (params: QueryParams[]): Promise<Point[]> => {
    return new Promise((res, rej) => {
        GET(`${URL}/`, params)
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    });
}
