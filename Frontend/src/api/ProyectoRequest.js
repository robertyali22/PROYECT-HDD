import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllProyectos = () => axios.get(`${api}/proyectos/`);

export const getProyecto = (id) => axios.get(`${api}/proyectos/${id}`);

export const createProyecto = (proyecto) => axios.post(`${api}/proyectos/`, proyecto);

export const updateProyecto = (id, proyecto) => axios.put(`${api}/proyectos/${id}`, proyecto);

export const deleteProyecto = (id) => axios.delete(`${api}/proyectos/${id}`);
