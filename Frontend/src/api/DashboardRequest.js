import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllDashboards = () => axios.get(`${api}/dashboards/obtener`);

export const getDashboard = (id) => axios.get(`${api}/dashboards/obtenerporId/${id}`);

export const createDashboard = (dashboard) => axios.post(`${api}/dashboards/crear/`, dashboard);

export const updateDashboard = (id, dashboard) => axios.put(`${api}/dashboards/actualizar/${id}`, dashboard);

export const deleteDashboard = (id) => axios.delete(`${api}/dashboards/eliminar/${id}`);
