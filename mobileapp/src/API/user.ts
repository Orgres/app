import { GET } from './http';

export type Profile = {
    id: number,
    login: string,
    firstname: string | undefined | null,
    lastname: string | undefined | null,
    middlename: string | undefined | null,
    Role: {
        name: string
    }
}

const URL = 'users';

export const getProfile = async (): Promise<Profile> => {
    return new Promise((res, rej) => {
        GET(`${URL}/profile`)
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    })
}
