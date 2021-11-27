import { POST, GET } from "./http";

const url = 'auth';

export const authenticate = (auth, history, from, data) => {
    auth.signin(() => {
        return new Promise((resolve, reject) => {
            POST(`${url}/login`, data)
                .then(response => {
                    resolve({
                        responseData: response.data,
                        history,
                        from
                    });
                })
                .catch(e => {
                    reject(e);
                });
        });
    });
};

export const getRole = async () => {
    try {
        const responce = await GET(`${url}/getrole`)
        return responce.data
    }
    catch (ex) {
        throw new Error(ex.responce.data.message)
    }
}
