import { POST, GET } from './http';

export type Auth = {
    token: string
}

const URL = 'auth';

export const userAuth = async (login: string, password: string): Promise<Auth> => {
    return new Promise((res, rej) => {
        POST(`${URL}/login`, { login, password })
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    })
}

export const getRole = async () => {
    try {
        const responce = await GET(`${URL}/getrole`)
        return responce.data
    }
    catch (ex: any) {
        throw new Error(ex.responce.data.message)
    }
}
