import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllMateriales = () => axios.get(`${api}/materiales/`);

export const getMaterial = (id) => axios.get(`${api}/materiales/${id}`);

export const createMaterial = (material) => axios.post(`${api}/materiales/`, material);

export const updateMaterial = (id, material) => axios.put(`${api}/materiales/${id}`, material);

export const deleteMaterial = (id) => axios.delete(`${api}/materiales/${id}`);
