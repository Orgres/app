import { Images } from '../types/image';
import { FormInputs, MeterType, ValidationScheme, FormInputsUser } from '../types/meter/indes';
import { GET, POST } from './http';

const URL = 'meter';

export const getType = async (number: string): Promise<MeterType | undefined> => {
    return new Promise((res, rej) => {
        GET(`${URL}/type`, [{ key: 'number', value: number }])
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    });
}

const getImage = async (url: string) => {
    return new Promise<any>((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.responseType = "blob";

        request.onload = function () {
            resolve(request.response);
        }

        request.onerror = function (error) {
            reject(error)
        }

        request.open("GET", url);
        request.send();
    });
}

export const createMeter = async (form: { inputs: ValidationScheme<FormInputsUser> }, guid: string) => {
    try {

        const body: any = {
            'transformer_guid': guid
        };

        const formElemetns = Object.entries(form.inputs);

        for (let i = 0; i < formElemetns.length; i++) {
            body[formElemetns[i][0]] = formElemetns[i][1].value
        }

        const response = await POST(`${URL}/create`, body);
        return response.data;
    }
    catch (ex: any) {
        throw new Error(ex.response.data.message)
    }
}

export const updateMeter = async (form: {
    inputs: ValidationScheme<FormInputs>, images: Images
}, point: any, id: string): Promise<any> => {

    const formData = new FormData();

    formData.append('transformer_guid', point?.guid as string);

    const formElemetns = Object.entries(form.inputs);

    for (let i = 0; i < formElemetns.length; i++) {
        formData.append(formElemetns[i][0], formElemetns[i][1].value)
    }

    const formImages = Object.entries(form.images);

    for (let i = 0; i < formImages.length; i++) {
        for (let y = 0; y < formImages[i][1].files.length; y++) {
            const file = await getImage(formImages[i][1].files[y].file.webPath as string);
            formData.append(formImages[i][0], file)
        }
    }

    return new Promise((res, rej) => {
        POST(`${URL}/update?id=${id}`, formData)
            .then(responce => {
                res(responce.data);
            })
            .catch((error) => {
                rej(error);
            })
    });
}

export const searchByID = async (id: string) => {
    try {
        const response = await GET(`${URL}/searchByID?id=${id}`);
        return response.data;
    }
    catch (ex: any) {
        throw new Error(ex.response.data.message)
    }
}

export const getAllFromTP = async (guid: string) => {
    try {
        const response = await GET(`${URL}/fromtp?guid=${guid}`);
        return response.data;
    }
    catch (ex: any) {
        throw new Error(ex.response.data.message)
    }
}
