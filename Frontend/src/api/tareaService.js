import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerTareas = () => axios.get(`${api}/tareas/obtener`);
export const obtenerTareaPorId = (id) => axios.get(`${api}/tareas/obtenerporId/${id}`);
export const crearTarea = (tarea) => axios.post(`${api}/tareas/crear/`, tarea);
export const actualizarTarea = (id, tarea) => axios.put(`${api}/tareas/actualizar/${id}`, tarea);
export const eliminarTarea = (id) => axios.delete(`${api}/tareas/eliminar/${id}`);
