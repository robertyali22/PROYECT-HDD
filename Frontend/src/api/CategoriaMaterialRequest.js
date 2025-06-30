import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllCategoriasMaterial = () => axios.get(`${api}/categorias-material`);

export const getCategoriaMaterial = (id) => axios.get(`${api}/categorias-material/${id}`);

export const createCategoriaMaterial = (categoria) => axios.post(`${api}/categorias-material`, categoria);

export const updateCategoriaMaterial = (id, categoria) => axios.put(`${api}/categorias-material/${id}`, categoria);

export const deleteCategoriaMaterial = (id) => axios.delete(`${api}/categorias-material/${id}`);
