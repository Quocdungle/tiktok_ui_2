import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (url, options = {}) => {
    const respone = await request.get(url, options);
    return respone.data;
};

export default request;
