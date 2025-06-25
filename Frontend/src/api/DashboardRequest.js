import axios from 'axios';

const api = 'http://localhost:3000/api';

export const getAllDashboards = () => axios.get(`${api}/dashboards/`);

export const getDashboard = (id) => axios.get(`${api}/dashboards/${id}`);

export const createDashboard = (dashboard) => axios.post(`${api}/dashboards/`, dashboard);

export const updateDashboard = (id, dashboard) => axios.put(`${api}/dashboards/${id}`, dashboard);

export const deleteDashboard = (id) => axios.delete(`${api}/dashboards/${id}`);
