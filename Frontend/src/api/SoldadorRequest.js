import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllSoldadores = () => axios.get(`${api}/soldadores`);

export const getSoldador = (id) => axios.get(`${api}/soldadores/${id}`);

export const createSoldador = (soldador) => axios.post(`${api}/soldadores/`, soldador);

export const updateSoldador = (id, soldador) => axios.put(`${api}/soldadores/${id}`, soldador);

export const deleteSoldador = (id) => axios.delete(`${api}/soldadores/${id}`);
