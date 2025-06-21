import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllUsuarios = () => axios.get(`${api}/usuarios/obtener`);

export const getUsuario = (id) => axios.get(`${api}/usuarios/obtenerporId/${id}`);

export const createUsuario = (usuario) => axios.post(`${api}/usuarios/crear/`, usuario);

export const updateUsuario = (id, usuario) => axios.put(`${api}/usuarios/actualizar/${id}`, usuario);

export const deleteUsuario = (id) => axios.delete(`${api}/usuarios/eliminar/${id}`);
