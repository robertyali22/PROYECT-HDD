import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerSoldadores = () => axios.get(`${api}/soldadores/obtener`);
export const obtenerSoldadorPorId = (id) => axios.get(`${api}/soldadores/obtenerporId/${id}`);
export const crearSoldador = (soldador) => axios.post(`${api}/soldadores/crear/`, soldador);
export const actualizarSoldador = (id, soldador) => axios.put(`${api}/soldadores/actualizar/${id}`, soldador);
export const eliminarSoldador = (id) => axios.delete(`${api}/soldadores/eliminar/${id}`);
