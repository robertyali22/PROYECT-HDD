import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllSoldaduras = () => axios.get(`${api}/soldaduras/obtener`);
export const getSoldadura = (id) => axios.get(`${api}/soldaduras/obtenerporId/${id}`);
export const createSoldadura = (soldadura) => axios.post(`${api}/soldaduras/crear/`, soldadura);
export const updateSoldadura = (id, soldadura) => axios.put(`${api}/soldaduras/actualizar/${id}`, soldadura);
export const deleteSoldadura = (id) => axios.delete(`${api}/soldaduras/eliminar/${id}`);
