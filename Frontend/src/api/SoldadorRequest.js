import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllSoldadores = () => axios.get(`${api}/soldadores/obtener`);

export const getSoldador = (id) => axios.get(`${api}/soldadores/obtenerporId/${id}`);

export const createSoldador = (soldador) => axios.post(`${api}/soldadores/crear/`, soldador);

export const updateSoldador = (id, soldador) => axios.put(`${api}/soldadores/actualizar/${id}`, soldador);

export const deleteSoldador = (id) => axios.delete(`${api}/soldadores/eliminar/${id}`);
