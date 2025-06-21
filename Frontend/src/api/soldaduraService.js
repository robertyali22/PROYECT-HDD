import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerSoldaduras = () => axios.get(`${api}/soldaduras/obtener`);
export const obtenerSoldaduraPorId = (id) => axios.get(`${api}/soldaduras/obtenerporId/${id}`);
export const crearSoldadura = (soldadura) => axios.post(`${api}/soldaduras/crear/`, soldadura);
export const actualizarSoldadura = (id, soldadura) => axios.put(`${api}/soldaduras/actualizar/${id}`, soldadura);
export const eliminarSoldadura = (id) => axios.delete(`${api}/soldaduras/eliminar/${id}`);
