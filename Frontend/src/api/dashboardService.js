import axios from 'axios';

const api = 'http://localhost:3000/api';

export const obtenerDashboards = () => axios.get(`${api}/dashboards/obtener`);
export const obtenerDashboardPorId = (id) => axios.get(`${api}/dashboards/obtenerporId/${id}`);
export const crearDashboard = (dashboard) => axios.post(`${api}/dashboards/crear/`, dashboard);
export const actualizarDashboard = (id, dashboard) => axios.put(`${api}/dashboards/actualizar/${id}`, dashboard);
export const eliminarDashboard = (id) => axios.delete(`${api}/dashboards/eliminar/${id}`);
