import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllUsuarios = () => axios.get(`${api}/usuarios`);

export const getUsuario = (id) => axios.get(`${api}/usuarios/${id}`);

export const createUsuario = (usuario) => axios.post(`${api}/usuarios`, usuario);

export const updateUsuario = (id, usuario) => axios.put(`${api}/usuarios/${id}`, usuario);

export const deleteUsuario = (id) => axios.delete(`${api}/usuarios/${id}`);
