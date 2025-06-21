import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllControlesCalidad = () => axios.get(`${api}/controlescalidad/obtener`);

export const getControlCalidad = (id) => axios.get(`${api}/controlescalidad/obtenerporId/${id}`);

export const createControlCalidad = (control) => axios.post(`${api}/controlescalidad/crear/`, control);

export const updateControlCalidad = (id, control) => axios.put(`${api}/controlescalidad/actualizar/${id}`, control);

export const deleteControlCalidad = (id) => axios.delete(`${api}/controlescalidad/eliminar/${id}`);
