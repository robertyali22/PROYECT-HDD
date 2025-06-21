import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerControlesCalidad = () => axios.get(`${api}/controlescalidad/obtener`);
export const obtenerControlCalidadPorId = (id) => axios.get(`${api}/controlescalidad/obtenerporId/${id}`);
export const crearControlCalidad = (control) => axios.post(`${api}/controlescalidad/crear/`, control);
export const actualizarControlCalidad = (id, control) => axios.put(`${api}/controlescalidad/actualizar/${id}`, control);
export const eliminarControlCalidad = (id) => axios.delete(`${api}/controlescalidad/eliminar/${id}`);
