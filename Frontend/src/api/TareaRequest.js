import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllTareas = () => axios.get(`${api}/tareas/`);

export const getTarea = (id) => axios.get(`${api}/tareas/${id}`);

export const createTarea = (tarea) => axios.post(`${api}/tareas/`, tarea);

export const updateTarea = (id, tarea) => axios.put(`${api}/tareas/${id}`, tarea);

export const deleteTarea = (id) => axios.delete(`${api}/tareas/${id}`);
