import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8000'
});

export const getData = (formData) => http.post('', formData, { headers: { "Content-Type": "multipart/form-data" } });
