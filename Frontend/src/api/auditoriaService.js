import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerAuditorias = () => axios.get(`${api}/auditorias/obtener`);
export const obtenerAuditoriaPorId = (id) => axios.get(`${api}/auditorias/obtenerporId/${id}`);
export const crearAuditoria = (auditoria) => axios.post(`${api}/auditorias/crear/`, auditoria);
export const actualizarAuditoria = (id, auditoria) => axios.put(`${api}/auditorias/actualizar/${id}`, auditoria);
export const eliminarAuditoria = (id) => axios.delete(`${api}/auditorias/eliminar/${id}`);
