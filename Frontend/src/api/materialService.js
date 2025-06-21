import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerMateriales = () => axios.get(`${api}/materiales/obtener`);
export const obtenerMaterialPorId = (id) => axios.get(`${api}/materiales/obtenerporId/${id}`);
export const crearMaterial = (material) => axios.post(`${api}/materiales/crear/`, material);
export const actualizarMaterial = (id, material) => axios.put(`${api}/materiales/actualizar/${id}`, material);
export const eliminarMaterial = (id) => axios.delete(`${api}/materiales/eliminar/${id}`);
