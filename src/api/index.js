import axios from 'axios';

const apiRequest = axios.create({
  baseURL: `https://fe-interview-api.unnotech.com/`,
});

export const apiGetBooks = () => apiRequest.get(`books`);
export const apiGetBook = (id) => apiRequest.get(`books/${id}`);
export const apiEditBook = (id, data) => apiRequest.patch(`books/${id}`, data);
export const apiPostBook = (data) => apiRequest.post(`books`, data);
