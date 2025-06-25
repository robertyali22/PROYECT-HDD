import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllControlesCalidad = () => axios.get(`${api}/controlescalidad`);

export const getControlCalidad = (id) => axios.get(`${api}/controlescalidad/${id}`);

export const createControlCalidad = (control) => axios.post(`${api}/controlescalidad/`, control);

export const updateControlCalidad = (id, control) => axios.put(`${api}/controlescalidad/${id}`, control);

export const deleteControlCalidad = (id) => axios.delete(`${api}/controlescalidad/${id}`);
