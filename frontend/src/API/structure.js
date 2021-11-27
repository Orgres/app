import { GET } from "./http";

const URL = 'tp'

export const getAreas =  async () => {
    try {
        const response = await GET(`${URL}/areas`);
        return response.data; 
    } catch (error) {
        console.error(error);
        throw new Error('Can not found area');
    };
}

export const getSubstations = async id => {
    try {
        const response = await GET(`${URL}/substations`, [{ key: 'id', value: id }]);
        return response.data;
    } catch (error) {
        console.error(error);
    };
}

export const getFeeders = async id => {
    try {
        const response = await GET(`${URL}/feeders`,[{key: 'id', value: id}]);
        return response.data;
    } catch (error) {
        console.error(error);
    };
}

export const getTransformers = async id => {
    try {
        const response = await GET(`${URL}/transformers`, [{key: 'id', value: id}]);
        return response.data;
    } catch (error) {
        console.error(error);
    };
}
