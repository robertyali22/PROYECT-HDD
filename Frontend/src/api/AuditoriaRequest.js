import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllAuditorias = () => axios.get(`${api}/auditorias/obtener`);

export const getAuditoria = (id) => axios.get(`${api}/auditorias/obtenerporId/${id}`);

export const createAuditoria = (auditoria) => axios.post(`${api}/auditorias/crear/`, auditoria);

export const updateAuditoria = (id, auditoria) => axios.put(`${api}/auditorias/actualizar/${id}`, auditoria);

export const deleteAuditoria = (id) => axios.delete(`${api}/auditorias/eliminar/${id}`);
