import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllRoles = () => axios.get(`${api}/roles`);

export const getRol = (id) => axios.get(`${api}/roles/${id}`);

export const createRol = (rol) => axios.post(`${api}/roles`, rol);

export const updateRol = (id, rol) => axios.put(`${api}/roles/${id}`, rol);

export const deleteRol = (id) => axios.delete(`${api}/roles/${id}`);
