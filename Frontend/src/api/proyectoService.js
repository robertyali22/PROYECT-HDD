import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerProyectos = () => axios.get(`${api}/proyectos/obtener`);
export const obtenerProyectoPorId = (id) => axios.get(`${api}/proyectos/obtenerporId/${id}`);
export const crearProyecto = (proyecto) => axios.post(`${api}/proyectos/crear/`, proyecto);
export const actualizarProyecto = (id, proyecto) => axios.put(`${api}/proyectos/actualizar/${id}`, proyecto);
export const eliminarProyecto = (id) => axios.delete(`${api}/proyectos/eliminar/${id}`);
