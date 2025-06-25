import { useState, useEffect } from "react";
import { Package, DollarSign, Users, CreditCard, TrendingUp, Search, X, ChevronDown, Filter, Plus, Shield, Activity, Settings, UserCheck, Clock, UserPlus, Download, FileText } from 'lucide-react';
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';
import { getAllUsuarios, createUsuario, deleteUsuario, updateUsuario } from "../api/UsuarioRequest";


// Componente principal de Gestión de Usuarios
export function GestionUsuarioPage() {
    const [activeTab, setActiveTab] = useState('usuarios');
    const [usuarios, setUsuarios] = useState([]);
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [showCertificationsField, setShowCertificationsField] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        dni: "",
        contrasena: "",
        confirmarContrasena: "",
        rol: "soldador",
        estado: true,
        certificaciones: "",
    });

    const cargarUsuarios = async () => {
        try {
            const response = await getAllUsuarios();
            const usuariosFormateados = response.data.map((u) => ({
                id: u.id,
                nombre: u.nombre,
                apellido: u.apellido,
                name: `${u.nombre} ${u.apellido}`,
                initials: u.nombre[0] + u.apellido[0],
                email: u.email,
                role: u.rol.charAt(0).toUpperCase() + u.rol.slice(1),
                certifications: u?.Soldador?.certificaciones || "",
                status: u.estado ? "Activo" : "Inactivo",
                estado: u.estado,
                since: new Date(u.fechaCreacion).toLocaleDateString(),
                lastAccess: new Date(u.updatedAt || u.fechaCreacion).toLocaleDateString(),
            }));
            setUsuarios(usuariosFormateados);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setFormData({ ...formData, rol: role });
        setShowCertificationsField(role === "soldador" || role === "inspector");
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleNewUserClick = () => {
        setFormData({
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            dni: "",
            contrasena: "",
            confirmarContrasena: "",
            rol: "soldador",
            estado: true,
            certificaciones: "",
        });
        setUserToEdit(null);
        setShowCertificationsField(true);
        setShowNewUserModal(true);
    };

    const handleEditUser = (user) => {
        const [nombre, apellido] = user.name.split(" ");
        setUserToEdit(user);
        setFormData({
            nombre: nombre || "",
            apellido: apellido || "",
            email: user.email,
            contrasena: "",
            confirmarContrasena: "",
            rol: user.role.toLowerCase(),
            estado: user.estado,
            certificaciones: user.certifications || "",
        });
        setShowCertificationsField(user.role.toLowerCase() === "soldador" || user.role.toLowerCase() === "inspector");
        setShowEditUserModal(true);
    };


    const handleDeleteUser = async (id) => {
        if (confirm("¿Seguro que deseas eliminar este usuario?")) {
            try {
                await deleteUsuario(id);
                await cargarUsuarios();
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userToEdit && formData.contrasena !== formData.confirmarContrasena) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            if (userToEdit) {
                await updateUsuario(userToEdit.id, formData);
                setShowEditUserModal(false);
            } else {
                await createUsuario(formData);
                setShowNewUserModal(false);
            }
            cargarUsuarios();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }

    };

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
                                    Gestión de Usuarios
                                </h1>
                                <p className="text-gray-600 text-sm mt-3">
                                    Administración de usuarios, roles y permisos del sistema
                                </p>
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

                                {/* Contenido de filtros avanzados (como idea por el momento, da flojera) */}
                                {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de registro</label>
                                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificaciones</label>
                                    <input type="text" placeholder="MIG, TIG, 6G..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Última actividad</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                                        <option value="">Cualquier momento</option>
                                        <option value="today">Hoy</option>
                                        <option value="week">Esta semana</option>
                                        <option value="month">Este mes</option>
                                    </select>
                                </div>
                            </div> */}
                            </div>

                            {/* Indicadores de filtros activos */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {/* <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                    Rol: Soldador
                                    <button className="ml-1 hover:bg-blue-200 rounded-full p-0.5">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Estado: Activo
                                    <button className="ml-1 hover:bg-green-200 rounded-full p-0.5">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span> */}
                            </div>
                        </div>


                        {/* Cabecera de tabla y botón nuevo usuario */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Lista de Usuarios</h2>
                                <p className="text-gray-600 mt-1">Gestiona y administra todos los usuarios del sistema</p>
                            </div>
                            <button
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl text-sm px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                onClick={handleNewUserClick}
                            >
                                <Plus size={18} />
                                Nuevo Usuario
                            </button>
                        </div>

                        {/* Tabla de usuarios mejorada */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            {/* Header de la tabla con gradiente */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                                        <h3 className="text-lg font-semibold text-gray-800">Usuarios Registrados</h3>
                                    </div>
                                    <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                                        {usuarios.length} usuarios totales
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Usuario
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Contacto
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Rol
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Certificaciones
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Último acceso
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {usuarios.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                                            >
                                                {/* Usuario */}
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative">
                                                            <div className={`w-12 h-12 rounded-xl ${user.avatarBg || 'bg-gradient-to-br from-blue-500 to-blue-600'} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                                {user.initials}
                                                            </div>
                                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                                Desde {user.since}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contacto */}
                                                <td className="px-6 py-5">
                                                    <div className="text-sm text-gray-700 font-medium">{user.email}</div>
                                                </td>

                                                {/* Rol */}
                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${getRoleBadgeColor(user.role)} group-hover:scale-105 transition-transform duration-300`}>
                                                        <div className="w-2 h-2 rounded-full bg-current opacity-60 mr-2"></div>
                                                        {user.role}
                                                    </span>
                                                </td>

                                                {/* Certificaciones */}
                                                <td className="px-6 py-5">
                                                    {user.certifications ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {user.certifications.split(', ').map((cert, idx) => (
                                                                <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border">
                                                                    {cert}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 italic">Sin certificaciones</span>
                                                    )}
                                                </td>

                                                {/* Estado */}
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center">
                                                        <span className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold shadow-sm ${getStatusBadgeColor(user.status)} group-hover:scale-105 transition-transform duration-300`}>
                                                            <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Activo' ? 'bg-green-400' : user.status === 'Inactivo' ? 'bg-red-400' : 'bg-yellow-400'} animate-pulse`}></div>
                                                            {user.status}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Último acceso */}
                                                <td className="px-6 py-5">
                                                    <div className="text-sm text-gray-700 font-medium">{user.lastAccess}</div>
                                                </td>

                                                {/* Acciones */}
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-center flex-wrap gap-2">
                                                        {/* Botón Editar */}
                                                        <button
                                                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                                            onClick={() => handleEditUser(user)}
                                                        >
                                                            Editar
                                                        </button>

                                                        {/* Botón Eliminar */}
                                                        {user.name !== 'Robert Yali' && (
                                                            <button
                                                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                            >
                                                                Eliminar
                                                            </button>
                                                        )}

                                                        {/* Otros estados */}
                                                        {user.name === 'Robert Yali' ? (
                                                            <button
                                                                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md opacity-50 cursor-not-allowed"
                                                                disabled
                                                            >
                                                                Protegido
                                                            </button>
                                                        ) : user.status === 'Inactivo' ? (
                                                            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                                                Activar
                                                            </button>
                                                        ) : user.status === 'Pendiente' ? (
                                                            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                                                Aprobar
                                                            </button>
                                                        ) : (
                                                            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                                                Desactivar
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Paginación mejorada */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Mostrando <span className="font-semibold text-gray-900">1-10</span> de <span className="font-semibold text-gray-900">{usuarios.length}</span> usuarios
                                    </div>
                                    <nav className="flex items-center space-x-1">
                                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-xl hover:bg-gray-50 hover:text-blue-600 transition-colors duration-300 shadow-sm">
                                            <span className="sr-only">Anterior</span>
                                            ←
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-600 shadow-sm">
                                            1
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-300 shadow-sm">
                                            2
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-300 shadow-sm">
                                            3
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-xl hover:bg-gray-50 hover:text-blue-600 transition-colors duration-300 shadow-sm">
                                            <span className="sr-only">Siguiente</span>
                                            →
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>


                        {/* Modal para Nuevo Usuario */}
                        {showNewUserModal && (
                            <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 to-black/60 flex items-center justify-center z-50 p-4">
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] transform transition-all duration-300 animate-in zoom-in-95 flex flex-col"
                                >
                                    {/* Header */}
                                    <div className="relative bg-gradient-to-r from-blue-700 to-blue-800 rounded-t-3xl px-8 py-6 flex-shrink-0">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                                    <Users size={24} className="text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white">Añadir Nuevo Usuario</h3>
                                                    <p className="text-blue-100 text-sm mt-1">Complete la información del nuevo usuario</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:text-gray-100 transition-all duration-300 hover:scale-110"
                                                onClick={() => setShowNewUserModal(false)}
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1 overflow-y-auto p-8 space-y-12">

                                        {/* Información Personal */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                                Información Personal
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Nombre</label>
                                                    <input name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Ingrese el nombre" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white" required />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Apellidos</label>
                                                    <input name="apellido" value={formData.apellido} onChange={handleInputChange} placeholder="Ingrese los apellidos" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white" required />
                                                </div>
                                            </div>
                                        </section> */}

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Información Personal</h4>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="Ingrese el nombre"
                                                        required
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Apellidos</label>
                                                    <input
                                                        type="text"
                                                        name="apellido"
                                                        value={formData.apellido}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="Ingrese los apellidos"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        {/* Contacto */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                                                Información de Contacto
                                            </h4>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Correo Electrónico</label>
                                                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="ejemplo@soldacontrol.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white" required />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Teléfono</label>
                                                        <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white" placeholder="+51 999 999 999" required />
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">DNI</label>
                                                        <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white" placeholder="12345678" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </section> */}

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Información de Contacto</h4>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="ejemplo@soldacontrol.com"
                                                        required
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="relative group">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                                                        <input
                                                            type="tel"
                                                            name="telefono"
                                                            value={formData.telefono}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            placeholder="+51 999 999 999"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="relative group">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">DNI</label>
                                                        <input
                                                            type="text"
                                                            name="dni"
                                                            value={formData.dni}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            placeholder="12345678"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Profesional */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                                                Información Profesional
                                            </h4>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Rol</label>
                                                    <select name="rol" value={formData.rol} onChange={handleRoleChange} className="input-style" required>
                                                        <option value="">Seleccionar rol</option>
                                                        <option value="administrador">Administrador</option>
                                                        <option value="supervisor">Supervisor</option>
                                                        <option value="soldador">Soldador</option>
                                                        <option value="inspector">Inspector</option>
                                                        <option value="ayudante">Ayudante</option>
                                                    </select>
                                                </div>
                                                {showCertificationsField && (
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Certificaciones</label>
                                                        <input name="certificaciones" value={formData.certificaciones} onChange={handleInputChange} placeholder="MIG, TIG, 6G" className="input-style" />
                                                        <p className="mt-1 text-sm text-gray-500">Separar múltiples certificaciones con comas</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section> */}

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Información Profesional</h4>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                                                    <select
                                                        name="rol"
                                                        value={formData.rol}
                                                        onChange={handleRoleChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        required
                                                    >
                                                        <option value="">Seleccionar rol</option>
                                                        <option value="admin">Administrador</option>
                                                        <option value="supervisor">Supervisor</option>
                                                        <option value="soldador">Soldador</option>
                                                        <option value="inspector">Inspector</option>
                                                        <option value="ayudante">Ayudante</option>
                                                    </select>
                                                </div>

                                                {showCertificationsField && (
                                                    <div className="relative group animate-in slide-in-from-top-4 duration-300">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Certificaciones</label>
                                                        <input
                                                            type="text"
                                                            name="certificaciones"
                                                            value={formData.certificaciones}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            placeholder="MIG, TIG, 6G, etc."
                                                        />
                                                        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                                                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                                            Separar múltiples certificaciones con comas
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Seguridad */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                                                Seguridad
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Contraseña</label>
                                                    <input name="contrasena" type="password" value={formData.contrasena} onChange={handleInputChange} className="input-style" required />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirmar Contraseña</label>
                                                    <input name="confirmarContrasena" type="password" value={formData.confirmarContrasena} onChange={handleInputChange} className="input-style" required />
                                                </div>
                                            </div>
                                        </section> */}

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Seguridad</h4>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
                                                    <input
                                                        type="password"
                                                        name="contrasena"
                                                        value={formData.contrasena}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="Mínimo 8 caracteres"
                                                        required
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Contraseña</label>
                                                    <input
                                                        type="password"
                                                        name="confirmarContrasena"
                                                        value={formData.confirmarContrasena}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="Confirme la contraseña"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-3xl px-8 py-6 border-t border-gray-200">
                                        <div className="flex flex-col sm:flex-row justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowNewUserModal(false)}
                                                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"

                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                            >
                                                <Users size={18} />
                                                Guardar Usuario
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Modal para Editar Usuario */}
                        {showEditUserModal && userToEdit && (
                            <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 to-black/60 flex items-center justify-center z-50 p-4">
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        try {
                                            await updateUsuario(userToEdit.id, formData);
                                            setShowEditUserModal(false);
                                            cargarUsuarios();
                                        } catch (error) {
                                            console.error("Error al actualizar usuario:", error);
                                        }
                                    }}
                                    className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] transform transition-all duration-300 animate-in zoom-in-95 flex flex-col"
                                >
                                    {/* Header */}
                                    <div className="relative bg-gradient-to-r from-blue-700 to-blue-800 rounded-t-3xl px-8 py-6 flex-shrink-0">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                                    <Search size={24} className="text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white">Editar Usuario</h3>
                                                    <p className="text-indigo-100 text-sm mt-1">Modifique la información del usuario</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setShowEditUserModal(false)}
                                                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:text-gray-100 transition-all duration-300 hover:scale-110"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1 overflow-y-auto p-8 space-y-10">
                                        {/* Usuario actual */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                    {userToEdit.initials}
                                                </div>
                                                <div>
                                                    <p className="text-blue-700 font-semibold text-lg">Editando usuario</p>
                                                    <p className="text-blue-600 font-bold text-xl">{userToEdit.name}</p>
                                                    <p className="text-blue-500 text-sm">Miembro desde {userToEdit.since}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Información personal */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                                Información Personal
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <input
                                                    name="nombre"
                                                    value={formData.nombre}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                    placeholder="Nombre"
                                                    required
                                                />
                                                <input
                                                    name="apellido"
                                                    value={formData.apellido}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                    placeholder="Apellidos"
                                                    required
                                                />
                                            </div>
                                        </section> */}

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Información Personal</h4>
                                            </div>

                                            <div className="grid grid-cols-1 mds:grid-cols-2 gap-6">
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="Nombre"
                                                        required
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Apellidos</label>
                                                    <input
                                                        type="text"
                                                        name="apellido"
                                                        value={formData.apellido}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="Apellidos"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contacto */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                                                Información de Contacto
                                            </h4>
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                type="email"
                                                className="input-style"
                                                placeholder="Correo Electrónico"
                                                required
                                            />
                                        </section> */}


                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Información de Contacto</h4>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="relative group">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                        placeholder="Correo Electrónico"
                                                        required
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="relative group">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                                                        <input
                                                            type="tel"
                                                            name="telefono"
                                                            value={formData.telefono}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            placeholder="Teléfono"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="relative group">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">DNI</label>
                                                        <input
                                                            type="text"
                                                            name="dni"
                                                            value={formData.dni}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            placeholder="DNI"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Profesional */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                                                Información Profesional
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <select
                                                    name="rol"
                                                    value={formData.rol}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        setShowCertificationsField(["soldador", "inspector"].includes(e.target.value));
                                                    }}
                                                    className="input-style"
                                                    required
                                                >
                                                    <option value="administrador">Administrador</option>
                                                    <option value="supervisor">Supervisor</option>
                                                    <option value="soldador">Soldador</option>
                                                    <option value="inspector">Inspector</option>
                                                    <option value="ayudante">Ayudante</option>
                                                </select>

                                                <select
                                                    name="estado"
                                                    value={formData.estado ? "activo" : "inactivo"}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, estado: e.target.value === "activo" })
                                                    }
                                                    className="input-style"
                                                >
                                                    <option value="activo">Activo</option>
                                                    <option value="inactivo">Inactivo</option>
                                                </select>
                                            </div>

                                            {showCertificationsField && (
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Certificaciones</label>
                                                    <input
                                                        name="certificaciones"
                                                        value={formData.certificaciones}
                                                        onChange={handleInputChange}
                                                        className="input-style"
                                                        placeholder="MIG, TIG, etc."
                                                    />
                                                    <p className="text-sm text-gray-500 mt-1">Separar con comas</p>
                                                </div>
                                            )}
                                        </section> */}

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Información Profesional</h4>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="relative group">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                                                        <select
                                                            name="rol"
                                                            value={formData.rol}
                                                            onChange={(e) => {
                                                                handleInputChange(e);
                                                                setShowCertificationsField(["soldador", "inspector"].includes(e.target.value));
                                                            }}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            required
                                                        >
                                                            <option value="administrador">Administrador</option>
                                                            <option value="supervisor">Supervisor</option>
                                                            <option value="soldador">Soldador</option>
                                                            <option value="inspector">Inspector</option>
                                                            <option value="ayudante">Ayudante</option>
                                                        </select>
                                                    </div>
                                                    <div className="relative group">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                                                        <select
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            defaultValue={userToEdit.status.toLowerCase()}
                                                        >
                                                            <option value="activo">Activo</option>
                                                            <option value="inactivo">Inactivo</option>
                                                            <option value="pendiente">Pendiente</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {showCertificationsField && (
                                                    <div className="relative group">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Certificaciones</label>
                                                        <input
                                                            type="text"
                                                            name="certificaciones"
                                                            value={formData.certificaciones}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                            placeholder="MIG, TIG, etc."
                                                        />
                                                        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                                                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                                            Separar múltiples certificaciones con comas
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Seguridad */}
                                        {/* <section>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
                                                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                                                Cambiar Contraseña
                                            </h4>

                                            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4 mb-4">
                                                <p className="text-yellow-800 text-sm">
                                                    Deje en blanco si no desea cambiar la contraseña
                                                </p>
                                            </div>

                                            <input
                                                name="contrasena"
                                                type="password"
                                                value={formData.contrasena}
                                                onChange={handleInputChange}
                                                className="input-style"
                                                placeholder="Nueva contraseña (opcional)"
                                            />
                                        </section> */}

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                                                <h4 className="text-lg font-semibold text-gray-800">Cambiar Contraseña</h4>
                                            </div>

                                            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-4 mb-6">
                                                <p className="text-yellow-800 text-sm flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                    Deje en blanco si no desea cambiar la contraseña actual
                                                </p>
                                            </div>

                                            <div className="relative group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nueva Contraseña</label>
                                                <input
                                                    name="contrasena"
                                                    type="password"
                                                    value={formData.contrasena}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                                                    placeholder="Nueva contraseña (opcional)"


                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-3xl px-8 py-6 border-t border-gray-200">
                                        <div className="flex flex-col sm:flex-row justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowEditUserModal(false)}
                                                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                            >
                                                <Search size={18} />
                                                Guardar Cambios
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}



// Función para determinar color del badge de rol
function getRoleBadgeColor(role) {
    switch (role.toLowerCase()) {
        case 'administrador':
            return 'bg-red-100 text-red-800';
        case 'supervisor':
            return 'bg-blue-100 text-blue-800';
        case 'soldador':
            return 'bg-green-100 text-green-800';
        case 'inspector':
            return 'bg-indigo-100 text-indigo-800';
        case 'ayudante':
            return 'bg-orange-100 text-orange-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// Función para determinar color del badge de estado
function getStatusBadgeColor(status) {
    switch (status.toLowerCase()) {
        case 'activo':
            return 'bg-green-100 text-green-800';
        case 'inactivo':
            return 'bg-red-100 text-red-800';
        case 'pendiente':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
