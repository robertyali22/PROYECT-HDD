import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllTareas = () => axios.get(`${api}/tareas/obtener`);

export const getTarea = (id) => axios.get(`${api}/tareas/obtenerporId/${id}`);

export const createTarea = (tarea) => axios.post(`${api}/tareas/crear/`, tarea);

export const updateTarea = (id, tarea) => axios.put(`${api}/tareas/actualizar/${id}`, tarea);

export const deleteTarea = (id) => axios.delete(`${api}/tareas/eliminar/${id}`);
