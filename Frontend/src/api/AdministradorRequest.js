import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllAdministradores = () => axios.get(`${api}/administradores`);

export const getAdministrador = (id) => axios.get(`${api}/administradores/${id}`);

export const createAdministrador = (admin) => axios.post(`${api}/administradores/`, admin);

export const updateAdministrador = (id, admin) => axios.put(`${api}/administradores/${id}`, admin);

export const deleteAdministrador = (id) => axios.delete(`${api}/administradores/${id}`);
