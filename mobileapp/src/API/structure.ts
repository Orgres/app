import { GET } from './http';

export type Area = {
    id: number,
    name: string
}

export type Substation = {
    id: number,
    name: string
}

export type Feeder = {
    id: number,
    name: string
}

export type Transformer = {
    id: number,
    name: string,
    guid: string
}

const URL = 'tp';

export const getAreas = async (): Promise<Area[]> => {
    return new Promise((res, rej) => {
        GET(`${URL}/areas`)
            .then(responce => {
                res(responce.data);
            })
            .catch(() => {
                rej(undefined);
            })
    });
}

export const getSubstations = async (id: number): Promise<Substation[]> => {
    return new Promise((res, rej) => {
        GET(`${URL}/substations`, [{ key: 'id', value: id }])
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    });
}

export const getFeeders = async (id: number): Promise<Feeder[]> => {
    return new Promise((res, rej) => {
        GET(`${URL}/feeders`, [{ key: 'id', value: id }])
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    });
}

export const getTransformers = async (id: number): Promise<Transformer[]> => {
    return new Promise((res, rej) => {
        GET(`${URL}/transformers`, [{ key: 'id', value: id }])
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    });
}
