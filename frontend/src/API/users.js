import { POST, GET } from './http';

const url = 'users';

export const createUser = async (user) => {

    try {
        const response = await POST(`${url}/create`, user);
        return response.data;
    }
    catch (ex) {
        throw new Error(ex.response.data.errorMessage);
    }
}

export const getRoles = async () => {
    try {
        const response = await GET(`${url}/roles`);
        return response.data;
    }
    catch (ex) {
        throw ex;
    }
}

export const getUsers = async () => {
    try {
        const response = await GET(`${url}/`);
        return response.data;
    }
    catch (ex) {
        throw ex;
    }
}
