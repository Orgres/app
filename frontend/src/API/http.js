import axios from "axios";

const baseUrl = 'https://msorgres.ru:8080/api/v1/';
//const baseUrl = 'http://localhost:4000/api/v1/';

const getHeaders = () => {
    const token = localStorage.getItem('token');

    if (!token)
        return;

    return { authorization: 'Bearer ' + token };
}

export const GET = (url, params) => {
    let fullUrl = baseUrl + url;

    if (params && params.length > 0) {
        fullUrl += `?${params.reduce((pr, cr) => (`${pr}${pr.length > 0 ? '&' : ''}${cr.key}=${cr.value}`), '')}`
    };

    return axios.get(fullUrl, {
        headers: getHeaders(),
    });
};

export const POST = (url, body) => {
    let fullUrl = baseUrl + url;
    return axios.post(fullUrl, body, {
        headers: getHeaders(),
    });
};
