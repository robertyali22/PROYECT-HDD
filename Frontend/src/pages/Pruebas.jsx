import { useState, useEffect } from "react";
import { Package, DollarSign, Users, CreditCard, TrendingUp, Search, X, ChevronDown, Filter, Plus, Shield, Activity, Settings, UserCheck, Clock, UserPlus, Download, FileText } from 'lucide-react';
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';


// Componente principal de Gestión de Usuarios
export function Pruebas() {
    const [activeTab, setActiveTab] = useState('usuarios');

    return (
        <>
            <NavBar />
            <SideBar />

            <div className="sm:ml-64 bg-slate-100">
                <div className="p-4 mt-16">
                    <div className="bg-white rounded-lg shadow p-6">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2 border-b-2 border-blue-500 pb-2 inline-block">
                                    Pagina de Pruebas
                                </h1> 
                                
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="mb-8">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                                    {[
                                        { id: 'usuarios', label: 'Usuarios', icon: Users, count: 24 },
                                        { id: 'roles y permisos', label: 'Roles y Permisos', icon: Shield, count: 8 },
                                        { id: 'actividad', label: 'Actividad', icon: Activity },
                                        { id: 'configuración', label: 'Configuración', icon: Settings }
                                    ].map((tab) => {
                                        const Icon = tab.icon;
                                        const isActive = activeTab === tab.id;

                                        return (
                                            <button
                                                key={tab.id}
                                                className={`group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${isActive
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                    }`}
                                                onClick={() => setActiveTab(tab.id)}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {tab.label}
                                                {tab.count && (
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800 group-hover:bg-gray-200'
                                                        }`}>
                                                        {tab.count}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>

                        {/* Tarjetas de estadísticas - Estilo moderno con bordes laterales */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                            {/* Tarjeta 1: Total de Usuarios */}
                            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border-l-4 border-blue-500 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                {/* Efecto de brillo sutil */}
                                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative">
                                    {/* Header con título e icono */}
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-blue-600 mb-3 tracking-wide">
                                                Total de Usuarios
                                            </p>

                                            {/* Valor principal */}
                                            <div className="mb-4">
                                                <p className="text-4xl font-bold text-gray-800 leading-none">24</p>
                                            </div>
                                        </div>

                                        {/* Icono principal */}
                                        <div className="bg-blue-500 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                                            <Users size={24} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Badge informativo */}
                                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 text-green-600 text-sm font-medium shadow-sm">
                                        <TrendingUp size={16} className="flex-shrink-0" />
                                        <span>3 nuevos este mes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 2: Soldadores */}
                            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg border-l-4 border-orange-500 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-orange-600 mb-3 tracking-wide">
                                                Soldadores
                                            </p>

                                            <div className="mb-4">
                                                <p className="text-4xl font-bold text-gray-800 leading-none">12</p>
                                            </div>
                                        </div>

                                        <div className="bg-orange-500 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                                            <Package size={24} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 text-orange-600 text-sm font-medium shadow-sm">
                                        <Package size={16} className="flex-shrink-0" />
                                        <span>5 activos en proyectos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 3: Inspectores */}
                            <div className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-lg border-l-4 border-indigo-500 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-indigo-600 mb-3 tracking-wide">
                                                Inspectores
                                            </p>

                                            <div className="mb-4">
                                                <p className="text-4xl font-bold text-gray-800 leading-none">6</p>
                                            </div>
                                        </div>

                                        <div className="bg-indigo-500 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                                            <Search size={24} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 text-indigo-600 text-sm font-medium shadow-sm">
                                        <Search size={16} className="flex-shrink-0" />
                                        <span>2 certificaciones nuevas</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 4: Usuarios Activos */}
                            <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg border-l-4 border-green-500 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-green-600 mb-3 tracking-wide">
                                                Usuarios Activos
                                            </p>

                                            <div className="mb-4">
                                                <p className="text-4xl font-bold text-gray-800 leading-none">92%</p>
                                            </div>
                                        </div>

                                        <div className="bg-green-500 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                                            <TrendingUp size={24} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 text-green-600 text-sm font-medium shadow-sm">
                                        <Users size={16} className="flex-shrink-0" />
                                        <span>Último acceso: hoy</span>
                                    </div>
                                </div>
                            </div>      
                        </div>
                        
                        {/* Sección de filtros */}
                        <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200/60 rounded-2xl p-6 mb-8 shadow-sm">
                            {/* Header de filtros */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Search className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Filtros de Búsqueda</h3>
                                        <p className="text-sm text-gray-500">Encuentra usuarios específicos usando los filtros</p>
                                    </div>
                                </div>

                                {/* Botón limpiar filtros */}
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm">
                                    <X className="w-4 h-4" />
                                    Limpiar filtros
                                </button>
                            </div>

                            {/* Grid de filtros */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Búsqueda por texto */}
                                <div className="lg:col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Búsqueda general
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 group-hover:shadow-sm"
                                            placeholder="Nombre, email, DNI o rol..."
                                        />
                                    </div>
                                </div>

                                {/* Filtro por rol */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Filtrar por rol
                                    </label>
                                    <div className="relative group">
                                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer">
                                            <option value="">Todos los roles</option>
                                            <option value="admin">Administrador</option>
                                            <option value="supervisor">Supervisor</option>
                                            <option value="soldador">Soldador</option>
                                            <option value="inspector">Inspector</option>
                                            <option value="ayudante">Ayudante</option>
                                        </select>
                                        {/* Icono personalizado del select */}
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                            <ChevronDown className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                                        </div>
                                    </div>
                                </div>

                                {/* Filtro por estado */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Filtrar por estado
                                    </label>
                                    <div className="relative group">
                                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 appearance-none cursor-pointer">
                                            <option value="">Todos los estados</option>
                                            <option value="active">Activo</option>
                                            <option value="inactive">Inactivo</option>
                                            <option value="pending">Pendiente</option>
                                        </select>
                                        {/* Icono personalizado del select */}
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                            <ChevronDown className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Filtros avanzados (colapsables) */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                    <Filter className="w-4 h-4" />
                                    Filtros avanzados
                                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
