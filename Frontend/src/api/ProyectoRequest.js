import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllProyectos = () => axios.get(`${api}/proyectos/obtener`);

export const getProyecto = (id) => axios.get(`${api}/proyectos/obtenerporId/${id}`);

export const createProyecto = (proyecto) => axios.post(`${api}/proyectos/crear/`, proyecto);

export const updateProyecto = (id, proyecto) => axios.put(`${api}/proyectos/actualizar/${id}`, proyecto);

export const deleteProyecto = (id) => axios.delete(`${api}/proyectos/eliminar/${id}`);
