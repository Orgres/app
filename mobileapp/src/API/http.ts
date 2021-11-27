import axios from 'axios';
import { QueryParams } from '../types/http';

//const baseUrl = 'https://msorgres.ru:8080/api/v1/'
const baseUrl = 'http://localhost:4000/api/v1/';

const getHeaders = () => {
    const token = localStorage.getItem('token');

    if (!token)
        return;

    return { authorization: 'Bearer ' + token };
}


const GET = (url: string, params: QueryParams[] | undefined = undefined): Promise<any> => {

    let queryParams = '';

    if (params && params.length > 0) {
        queryParams = `?${params.reduce((pr, cr) => (`${pr}${pr.length > 0 ? '&' : ''}${cr.key}=${cr.value}`), '')}`
    };

    const fullUrl = baseUrl + url + queryParams;

    return axios.get(fullUrl, {
        headers: getHeaders()
    })
};

const POST = <T = any>(url: string, data: T): Promise<any> => {

    const fullUrl = baseUrl + url;

    return axios.post(fullUrl, data, {
        headers: getHeaders()
    });
};

export { GET, POST }
