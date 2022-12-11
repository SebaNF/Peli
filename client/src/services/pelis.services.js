import axios from 'axios';

export const simpleGet = (url) => {
    const response = axios.get(url);
    return response;
};

export const simplePost = (url, values) => {
    const response = axios.post(url, values);
    return response;
};

export const simplePut = (url, values) => {
    const response = axios.put(url, values);
    return response;
};

export const simpleDelete = (url) => {
    const response = axios.delete(url);
    return response;
};
