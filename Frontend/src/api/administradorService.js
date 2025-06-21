import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerAdministradores = () => axios.get(`${api}/administradores/obtener`);
export const obtenerAdministradorPorId = (id) => axios.get(`${api}/administradores/obtenerporId/${id}`);
export const crearAdministrador = (admin) => axios.post(`${api}/administradores/crear/`, admin);
export const actualizarAdministrador = (id, admin) => axios.put(`${api}/administradores/actualizar/${id}`, admin);
export const eliminarAdministrador = (id) => axios.delete(`${api}/administradores/eliminar/${id}`);
