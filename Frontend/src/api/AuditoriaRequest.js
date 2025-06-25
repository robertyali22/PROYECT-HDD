import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllAuditorias = () => axios.get(`${api}/auditorias`);

export const getAuditoria = (id) => axios.get(`${api}/auditorias/${id}`);

export const createAuditoria = (auditoria) => axios.post(`${api}/auditorias/`, auditoria);

export const updateAuditoria = (id, auditoria) => axios.put(`${api}/auditorias/${id}`, auditoria);

export const deleteAuditoria = (id) => axios.delete(`${api}/auditorias/${id}`);
