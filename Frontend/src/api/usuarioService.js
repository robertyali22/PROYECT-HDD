import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerUsuarios = () => axios.get(`${api}/usuarios/obtener`);
export const obtenerUsuarioPorId = (id) => axios.get(`${api}/usuarios/obtenerporId/${id}`);
export const crearUsuario = (usuario) => axios.post(`${api}/usuarios/crear/`, usuario);
export const actualizarUsuario = (id, usuario) => axios.put(`${api}/usuarios/actualizar/${id}`, usuario);
export const eliminarUsuario = (id) => axios.delete(`${api}/usuarios/eliminar/${id}`);
