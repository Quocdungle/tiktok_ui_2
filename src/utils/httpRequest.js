import axios from 'axios';

console.log(process.env);
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (url, options = {}) => {
    const respone = await httpRequest.get(url, options);
    return respone.data;
};

export default httpRequest;
