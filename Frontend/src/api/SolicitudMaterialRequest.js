import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllSolicitudesMaterial = () => axios.get(`${api}/solicitudesmaterial`);

export const getSolicitudMaterial = (id) => axios.get(`${api}/solicitudesmaterial/${id}`);

export const createSolicitudMaterial = (solicitud) => axios.post(`${api}/solicitudesmaterial/`, solicitud);

export const updateSolicitudMaterial = (id, solicitud) => axios.put(`${api}/solicitudesmaterial/${id}`, solicitud);

export const deleteSolicitudMaterial = (id) => axios.delete(`${api}/solicitudesmaterial/${id}`);
