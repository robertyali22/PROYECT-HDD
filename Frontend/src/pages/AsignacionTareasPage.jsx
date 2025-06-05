import { useState } from 'react';
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';

export function AsignacionTareasPage() {
  const [isKanbanView, setIsKanbanView] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState({ search: '', proyecto: '', estado: '' });

  const toggleView = () => setIsKanbanView(!isKanbanView);

  const filteredTasks = tasks.filter(task => {
    const searchMatch = task.title.toLowerCase().includes(filter.search.toLowerCase());
    const proyectoMatch = !filter.proyecto || task.proyecto === filter.proyecto;
    const estadoMatch = !filter.estado || task.estado === filter.estado;
    return searchMatch && proyectoMatch && estadoMatch;
  });

  return (
    <>
      <NavBar />
      <SideBar />
      <div className="sm:ml-64 bg-slate-100">
        <div className="p-4 mt-16">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 inline-block mb-6">
              Asignación de Tareas
            </h1>

            <div className="flex space-x-4 border-b mb-6">
              {['Resumen', 'Kanban', 'Calendario', 'Reportes'].map((tab, idx) => (
                <button key={idx} className={`py-2 px-4 border-b-2 ${idx === 0 ? 'border-blue-600 text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600 hover:border-blue-400'}`}>{tab}</button>
              ))}
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg border-l-4 border-blue-600 mb-6">
              <strong>Recordatorio:</strong> Reunión de planificación semanal mañana a las 9:00 AM.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard title="Tareas Activas" value="18" change="3 creadas hoy" />
              <StatCard title="Tareas Completadas" value="42" change="↑ 12% desde la semana pasada" up />
              <StatCard title="Tareas Retrasadas" value="4" change="↓ 2 desde ayer" down />
              <StatCard title="Porcentaje de Cumplimiento" value="87%" change="↑ 5% este mes" up />
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Progreso de Proyectos</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Vista de Lista</span>
                <label className="relative inline-block w-10 h-5">
                  <input type="checkbox" className="opacity-0 w-0 h-0" checked={isKanbanView} onChange={toggleView} />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-300 before:content-[''] before:absolute before:left-1 before:bottom-1 before:bg-white before:h-3 before:w-3 before:rounded-full before:transition before:duration-300" style={{ transform: isKanbanView ? 'translateX(20px)' : 'translateX(0)' }}></span>
                </label>
                <span className="text-sm font-medium text-gray-700">Vista Kanban</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow mb-6">
              <ProjectProgress title="Estructura Metálica Torres del Este" percent={75} color="bg-blue-600" />
              <ProjectProgress title="Reparación Tanque GLP" percent={40} color="bg-yellow-500" />
              <ProjectProgress title="Mantenimiento Planta Sur" percent={90} color="bg-green-500" />
              <ProjectProgress title="Escalera de Emergencia Edificio B" percent={20} color="bg-red-500" />
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-lg p-6 shadow mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Buscar</label>
                  <input type="text" className="form-input mt-1 w-full" placeholder="Buscar tarea..." value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Proyecto</label>
                  <select className="form-select mt-1 w-full" value={filter.proyecto} onChange={(e) => setFilter({ ...filter, proyecto: e.target.value })}>
                    <option value="">Todos</option>
                    <option value="torres">Estructura Metálica Torres del Este</option>
                    <option value="tanque">Reparación Tanque GLP</option>
                    <option value="mantenimiento">Mantenimiento Planta Sur</option>
                    <option value="escalera">Escalera de Emergencia Edificio B</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Estado</label>
                  <select className="form-select mt-1 w-full" value={filter.estado} onChange={(e) => setFilter({ ...filter, estado: e.target.value })}>
                    <option value="">Todos</option>
                    <option value="pending">Pendiente</option>
                    <option value="progress">En Progreso</option>
                    <option value="review">En Revisión</option>
                    <option value="completed">Completado</option>
                    <option value="delayed">Retrasado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lista de tareas */}
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Tareas Asignadas</h2>
            <div className="space-y-4">
              {filteredTasks.map((task, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">{task.title}</h3>
                    <span className="text-sm text-gray-500">{task.fecha}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{task.descripcion}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm text-blue-600 font-medium">{task.estado}</div>
                    <button onClick={() => setShowDetailsModal(true)} className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Detalles</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow" onClick={() => setShowTaskModal(true)}>
                Nueva Tarea
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
                Ver Todas
              </button>
            </div>
          </div>
        </div>

        {showTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Nueva Tarea</h2>
                <button onClick={() => setShowTaskModal(false)} className="text-gray-500 hover:text-gray-800">×</button>
              </div>
              <p className="text-sm text-gray-600 mb-2">Formulario de creación de tareas próximamente...</p>
            </div>
          </div>
        )}

        {showDetailsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Detalles de Tarea</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-800">×</button>
              </div>
              <p className="text-sm text-gray-600 mb-2">Contenido del detalle de tarea próximamente...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function StatCard({ title, value, change, up, down }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-blue-100">
      <div className="text-gray-500 text-sm mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className={`text-sm ${up ? 'text-green-600' : down ? 'text-red-600' : 'text-gray-600'}`}>{change}</div>
    </div>
  );
}

function ProjectProgress({ title, percent, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-800">{title}</span>
        <span className="text-sm text-gray-500">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

const mockTasks = [
  {
    title: 'Soldadura de vigas principales - Sector A',
    descripcion: 'Realizar soldadura MIG en juntas de vigas principales.',
    proyecto: 'torres',
    estado: 'progress',
    fecha: '05/05/2025'
  },
  {
    title: 'Inspección de soldaduras - Tanque GLP',
    descripcion: 'Realizar inspección visual y por ultrasonido.',
    proyecto: 'tanque',
    estado: 'pending',
    fecha: '03/05/2025'
  },
  {
    title: 'Mantenimiento preventivo - Equipos de soldar',
    descripcion: 'Mantenimiento a equipos de soldadura MIG y TIG.',
    proyecto: 'mantenimiento',
    estado: 'review',
    fecha: '10/05/2025'
  },
  {
    title: 'Reparación de grieta - Escalera de emergencia',
    descripcion: 'Reparar grieta en soporte principal.',
    proyecto: 'escalera',
    estado: 'delayed',
    fecha: '01/05/2025'
  }
];
