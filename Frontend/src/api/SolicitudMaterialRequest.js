import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllSolicitudesMaterial = () => axios.get(`${api}/solicitudesmaterial/obtener`);

export const getSolicitudMaterial = (id) => axios.get(`${api}/solicitudesmaterial/obtenerporId/${id}`);

export const createSolicitudMaterial = (solicitud) => axios.post(`${api}/solicitudesmaterial/crear/`, solicitud);

export const updateSolicitudMaterial = (id, solicitud) => axios.put(`${api}/solicitudesmaterial/actualizar/${id}`, solicitud);

export const deleteSolicitudMaterial = (id) => axios.delete(`${api}/solicitudesmaterial/eliminar/${id}`);
