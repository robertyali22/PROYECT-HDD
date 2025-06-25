import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllSoldaduras = () => axios.get(`${api}/soldaduras/`);
export const getSoldadura = (id) => axios.get(`${api}/soldaduras/${id}`);
export const createSoldadura = (soldadura) => axios.post(`${api}/soldaduras/`, soldadura);
export const updateSoldadura = (id, soldadura) => axios.put(`${api}/soldaduras/${id}`, soldadura);
export const deleteSoldadura = (id) => axios.delete(`${api}/soldaduras/${id}`);
