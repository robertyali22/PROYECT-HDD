import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerSolicitudesMaterial = () => axios.get(`${api}/solicitudesmaterial/obtener`);
export const obtenerSolicitudMaterialPorId = (id) => axios.get(`${api}/solicitudesmaterial/obtenerporId/${id}`);
export const crearSolicitudMaterial = (solicitud) => axios.post(`${api}/solicitudesmaterial/crear/`, solicitud);
export const actualizarSolicitudMaterial = (id, solicitud) => axios.put(`${api}/solicitudesmaterial/actualizar/${id}`, solicitud);
export const eliminarSolicitudMaterial = (id) => axios.delete(`${api}/solicitudesmaterial/eliminar/${id}`);
