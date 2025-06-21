import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllMateriales = () => axios.get(`${api}/materiales/obtener`);

export const getMaterial = (id) => axios.get(`${api}/materiales/obtenerporId/${id}`);

export const createMaterial = (material) => axios.post(`${api}/materiales/crear/`, material);

export const updateMaterial = (id, material) => axios.put(`${api}/materiales/actualizar/${id}`, material);

export const deleteMaterial = (id) => axios.delete(`${api}/materiales/eliminar/${id}`);
