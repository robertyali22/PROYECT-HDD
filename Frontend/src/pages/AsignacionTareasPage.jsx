import React, { useState } from 'react';
import { Calendar, BarChart3, Plus, Search, Eye, X, MessageCircle, Clock, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';

export function AsignacionTareasPage() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [viewMode, setViewMode] = useState('list');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const stats = [
    { title: 'Tareas Activas', value: '18', change: '3 creadas hoy', trend: 'neutral' },
    { title: 'Tareas Completadas', value: '42', change: '↑ 12% desde la semana pasada', trend: 'up' },
    { title: 'Tareas Retrasadas', value: '4', change: '↓ 2 desde ayer', trend: 'down' },
    { title: 'Porcentaje de Cumplimiento', value: '87%', change: '↑ 5% este mes', trend: 'up' }
  ];

  const projects = [
    { name: 'Estructura Metálica Torres del Este', progress: 75, color: 'bg-blue-500' },
    { name: 'Reparación Tanque GLP', progress: 40, color: 'bg-yellow-500' },
    { name: 'Mantenimiento Planta Sur', progress: 90, color: 'bg-green-500' },
    { name: 'Escalera de Emergencia Edificio B', progress: 20, color: 'bg-red-500' }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Soldadura de vigas principales - Sector A',
      description: 'Realizar soldadura MIG en juntas de vigas principales según plano estructural ST-2025-V1.',
      dueDate: '05/05/2025',
      priority: 'high',
      status: 'progress',
      progress: 65,
      tags: ['Estructural', 'Prioridad Alta'],
      assignees: [
        { name: 'Carlos Méndez', initials: 'CM', color: 'bg-blue-200' },
        { name: 'Juana Ramírez', initials: 'JR', color: 'bg-indigo-200' }
      ]
    },
    {
      id: 2,
      title: 'Inspección de soldaduras - Tanque GLP',
      description: 'Realizar inspección visual y por ultrasonido de las soldaduras realizadas en la reparación del tanque GLP, según protocolo QA-TANK-2025.',
      dueDate: '03/05/2025',
      priority: 'medium',
      status: 'pending',
      progress: 0,
      tags: ['Control de Calidad', 'Tanque GLP'],
      assignees: [
        { name: 'Luis Prado', initials: 'LP', color: 'bg-red-200' }
      ]
    },
    {
      id: 3,
      title: 'Mantenimiento preventivo - Equipos de soldar',
      description: 'Realizar mantenimiento preventivo a los equipos de soldadura MIG y TIG según programa de mantenimiento.',
      dueDate: '10/05/2025',
      priority: 'low',
      status: 'review',
      progress: 85,
      tags: ['Mantenimiento', 'Prioridad Baja'],
      assignees: [
        { name: 'Francisco Torres', initials: 'FT', color: 'bg-green-200' }
      ]
    },
    {
      id: 4,
      title: 'Reparación de grieta - Escalera de emergencia',
      description: 'Reparar grieta detectada en soporte principal de escalera de emergencia Edificio B.',
      dueDate: '01/05/2025',
      priority: 'high',
      status: 'delayed',
      progress: 30,
      tags: ['Reparación', 'Urgente'],
      assignees: [
        { name: 'María Gonzáles', initials: 'MG', color: 'bg-orange-200' },
        { name: 'Pedro Tafur', initials: 'PT', color: 'bg-cyan-200' }
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      delayed: 'bg-red-100 text-red-800',
      review: 'bg-purple-100 text-purple-800'
    };

    const labels = {
      pending: 'Pendiente',
      progress: 'En Progreso',
      completed: 'Completado',
      delayed: 'Retrasado',
      review: 'En Revisión'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const TaskModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${showTaskModal ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">Nueva Tarea</h2>
            <button
              onClick={() => setShowTaskModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título de la tarea"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Seleccionar proyecto</option>
                  <option>Estructura Metálica Torres del Este</option>
                  <option>Reparación Tanque GLP</option>
                  <option>Mantenimiento Planta Sur</option>
                  <option>Escalera de Emergencia Edificio B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Baja</option>
                  <option>Media</option>
                  <option>Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción detallada de la tarea"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de inicio</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha límite</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asignar a</label>
              <select
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Carlos Méndez</option>
                <option>Juana Ramírez</option>
                <option>Luis Prado</option>
                <option>María Gonzáles</option>
                <option>Francisco Torres</option>
                <option>Pedro Tafur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Etiquetas</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Estructural, Reparación, Control de Calidad..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={() => setShowTaskModal(false)}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Guardar Tarea
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TaskDetailsModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${showDetailsModal ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">Detalles de Tarea</h2>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Soldadura de vigas principales - Sector A</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Proyecto:</span> Estructura Metálica Torres del Este</p>
                <p><span className="font-medium">Estado:</span> {getStatusBadge('progress')}</p>
                <p><span className="font-medium">Prioridad:</span> <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Alta</span></p>
                <p><span className="font-medium">Asignado a:</span> Carlos Méndez, Juana Ramírez</p>
                <p><span className="font-medium">Fecha de inicio:</span> 28/04/2025</p>
                <p><span className="font-medium">Fecha límite:</span> 05/05/2025</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Descripción</h4>
              <p className="text-sm text-gray-700">
                Realizar soldadura MIG en juntas de vigas principales según plano estructural ST-2025-V1.
                Usar electrodos E7018 y seguir especificaciones técnicas del proyecto. Se requiere
                inspección visual al 100% y ensayos no destructivos en juntas críticas.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Progreso</span>
                <span className="text-sm text-gray-600">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Historial de Actividad</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">02/05/2025 - 10:15</div>
                    <div className="text-sm">Juana Ramírez actualizó el progreso a 65%.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">30/04/2025 - 14:22</div>
                    <div className="text-sm">Carlos Méndez añadió comentario: "Se completó la soldadura del sector A-1 y A-2, pendiente A-3."</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">28/04/2025 - 08:30</div>
                    <div className="text-sm">Robert Yali creó la tarea y la asignó a Carlos Méndez y Juana Ramírez.</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Añadir comentario</label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe un comentario..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
              Actualizar Estado
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <SideBar />
      <div className="sm:ml-64 bg-slate-100">
        <div className="p-4 mt-16">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Header */}

            <h1 className="text-3xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 inline-block mb-6">
              Asignación de Tareas
            </h1>


            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {['resumen', 'kanban', 'calendario', 'reportes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm border-b-2 capitalize ${activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Alert */}
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg border-l-4 border-blue-600 mb-6">
              <strong>Recordatorio:</strong> Reunión de planificación semanal mañana a las 9:00 AM.
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500 mb-2">{stat.title}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className={`text-sm flex items-center ${stat.trend === 'up' ? 'text-green-600' :
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                    {stat.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                    {stat.trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Progreso de Proyectos</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Vista de Lista</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={viewMode === 'kanban'}
                    onChange={(e) => setViewMode(e.target.checked ? 'kanban' : 'list')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm font-medium">Vista Kanban</span>
              </div>
            </div>

            {/* Project Progress */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Buscar tarea..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Todos</option>
                    <option>Estructura Metálica Torres del Este</option>
                    <option>Reparación Tanque GLP</option>
                    <option>Mantenimiento Planta Sur</option>
                    <option>Escalera de Emergencia Edificio B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Todos</option>
                    <option>Pendiente</option>
                    <option>En Progreso</option>
                    <option>En Revisión</option>
                    <option>Completado</option>
                    <option>Retrasado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Tareas Asignadas</h2>
            </div>

            {/* Task List */}
            <div className="space-y-4 mb-8">
              {tasks.map((task) => (
                <div key={task.id} className={`bg-white rounded-lg shadow overflow-hidden border-l-4 ${getPriorityColor(task.priority)}`}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <span className="text-sm text-gray-500">Vence: {task.dueDate}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                        {getStatusBadge(task.status)}
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          {task.assignees.map((assignee, index) => (
                            <div
                              key={index}
                              className={`w-8 h-8 rounded-full ${assignee.color} flex items-center justify-center text-xs font-medium border-2 border-white`}
                            >
                              {assignee.initials}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowDetailsModal(true)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Detalles
                        </button>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowTaskModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nueva Tarea
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Ver Todas
              </button>
            </div>

            {/* Modals */}
            <TaskModal />
            <TaskDetailsModal />
          </div>
        </div>
      </div>
    </>
  );
}
