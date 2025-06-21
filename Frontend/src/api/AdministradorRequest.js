import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllAdministradores = () => axios.get(`${api}/administradores/obtener`);

export const getAdministrador = (id) => axios.get(`${api}/administradores/obtenerporId/${id}`);

export const createAdministrador = (admin) => axios.post(`${api}/administradores/crear/`, admin);

export const updateAdministrador = (id, admin) => axios.put(`${api}/administradores/actualizar/${id}`, admin);

export const deleteAdministrador = (id) => axios.delete(`${api}/administradores/eliminar/${id}`);
