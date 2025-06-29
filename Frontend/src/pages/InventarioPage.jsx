
import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';

// --- Componentes de Iconos (Sin cambios) ---
const ElectrodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const MetalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>;
const GasIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>;
const PPEIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path></svg>;
const ConsumableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>;
const ToolIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const ArrowUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>;
const ArrowDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;


// --- Datos de Ejemplo ---
const initialInventoryItems = [
    { id: 1, name: 'Electrodo 6013 3/32"', category: 'Electrodos', sku: 'EL-6013-332', stock: 15, unit: 'kg', minStock: 20, idealStock: 50 },
    { id: 2, name: 'Argón 99.99% Pureza', category: 'Gases', sku: 'GS-AR-9999', stock: 4, unit: 'cilindros', minStock: 5, idealStock: 10 },
    { id: 3, name: 'Plancha de Acero 1/4" ASTM A36', category: 'Metales Base', sku: 'MB-AC-A36-14', stock: 12, unit: 'unidades', minStock: 10, idealStock: 20 },
    { id: 4, name: 'Careta Fotosensible SPEEDGLAS', category: 'EPP', sku: 'EP-CR-SG100', stock: 5, unit: 'unidades', minStock: 8, idealStock: 15 },
    { id: 5, name: 'Alambre Tubular E71T-1', category: 'Consumibles', sku: 'CN-ALM-E71T1', stock: 2, unit: 'carretes', minStock: 5, idealStock: 10 },
    { id: 6, name: 'Amoladora Angular 4 1/2" DEWALT', category: 'Herramientas', sku: 'HR-AMO-DW4112', stock: 8, unit: 'unidades', minStock: 5, idealStock: 10 },
];

const initialRequests = [
    { id: '#SOL-2542', date: '25/04/2025', applicant: 'Carlos Mendoza', project: 'Estructura Metálica Torres del Este', items: 5, status: 'Pendiente' },
    { id: '#SOL-2541', date: '24/04/2025', applicant: 'Luis Suárez', project: 'Reparación Tanque GLP', items: 3, status: 'Pendiente' },
    { id: '#SOL-2540', date: '23/04/2025', applicant: 'Diana Rodriguez', project: 'Mantenimiento Planta Sur', items: 8, status: 'Aprobado' },
    { id: '#SOL-2539', date: '22/04/2025', applicant: 'Pedro Gutiérrez', project: 'Escalera de Emergencia Edificio B', items: 12, status: 'Rechazado' },
    { id: '#SOL-2538', date: '21/04/2025', applicant: 'Mario Torres', project: 'Estructura Soporte Cinta Transportadora', items: 6, status: 'Aprobado' },
];

const initialMovements = [
    { id: 1, date: '28/04/2025 10:15', type: 'entrada', itemId: 3, itemName: 'Plancha de Acero 1/4" ASTM A36', quantity: 5, user: 'Admin', notes: 'Recepción proveedor X' },
    { id: 2, date: '27/04/2025 14:30', type: 'salida', itemId: 1, itemName: 'Electrodo 6013 3/32"', quantity: 10, user: 'Carlos Mendoza', notes: 'Solicitud #SOL-2537' },
    { id: 3, date: '26/04/2025 09:00', type: 'ajuste', itemId: 4, itemName: 'Careta Fotosensible SPEEDGLAS', quantity: -1, user: 'Admin', notes: 'Ajuste por daño' },
    { id: 4, date: '25/04/2025 11:00', type: 'entrada', itemId: 2, itemName: 'Argón 99.99% Pureza', quantity: 2, user: 'Admin', notes: 'Recepción proveedor Y' },
];

const categoriesData = [
    { name: 'Electrodos', count: 42, icon: <ElectrodeIcon /> },
    { name: 'Metales Base', count: 28, icon: <MetalIcon /> },
    { name: 'Gases', count: 15, icon: <GasIcon /> },
    { name: 'EPP', count: 23, icon: <PPEIcon /> },
    { name: 'Consumibles', count: 38, icon: <ConsumableIcon /> },
    { name: 'Herramientas', count: 52, icon: <ToolIcon /> },
];

// --- Componente Principal ---
export function InventarioPage() {
    const [activeTab, setActiveTab] = useState('Resumen');
    const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
    const [requests, setRequests] = useState(initialRequests);
    const [movements, setMovements] = useState(initialMovements); // Estado para movimientos
    const [filters, setFilters] = useState({ search: '', category: '', status: '' });
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '', category: '', sku: '', stock: '', unit: 'unit', minStock: '', idealStock: '', location: '', description: ''
    });
    const [itemQuantities, setItemQuantities] = useState(
        initialInventoryItems.reduce((acc, item) => {
            acc[item.id] = 1;
            return acc;
        }, {})
    );

    // --- Funciones Auxiliares ---
    const getStockLevel = (stock, minStock, idealStock) => {
        const safeIdealStock = idealStock || minStock * 1.5;
        if (stock <= minStock) return { level: 'critical', className: 'text-red-600', progressClass: 'bg-red-500' };
        if (stock < safeIdealStock) return { level: 'low', className: 'text-yellow-600', progressClass: 'bg-yellow-500' };
        return { level: 'normal', className: 'text-green-600', progressClass: 'bg-green-500' };
    };

    const calculateProgress = (stock, idealStock) => {
        if (!idealStock || idealStock <= 0) return 50;
        return Math.min(100, Math.max(0, (stock / idealStock) * 100));
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'pendiente': return 'bg-yellow-100 text-yellow-800';
            case 'aprobado': return 'bg-green-100 text-green-800';
            case 'rechazado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getMovementTypeClass = (type) => {
        switch (type?.toLowerCase()) {
            case 'entrada': return 'bg-green-100 text-green-800';
            case 'salida': return 'bg-red-100 text-red-800';
            case 'ajuste': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        // Simple formatter, assumes "DD/MM/YYYY HH:MM" or similar
        // You might want a more robust date parsing/formatting library
        return dateString;
    };

    // --- Manejadores de Eventos ---
    useEffect(() => {
        console.log('Sistema de Inventario cargado correctamente');
        // Aquí podrías cargar datos iniciales desde una API
    }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleQuantityChange = (itemId, amount) => {
        setItemQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(1, (prev[itemId] || 0) + amount)
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProduct = () => {
        const stock = parseInt(newItem.stock) || 0;
        const minStock = parseInt(newItem.minStock) || 0;
        const idealStock = parseInt(newItem.idealStock) || 0;

        const newProduct = {
            id: Date.now(), // Usar un ID único real en producción
            name: newItem.name,
            category: newItem.category,
            sku: newItem.sku,
            stock: stock,
            unit: newItem.unit,
            minStock: minStock,
            idealStock: idealStock,
            location: newItem.location,
            description: newItem.description,
        };

        // Añadir al inventario
        setInventoryItems(prev => [...prev, newProduct]);

        // Registrar movimiento de entrada inicial
        const newMovement = {
            id: Date.now() + 1, // Usar un ID único real
            date: new Date().toLocaleString('es-ES'), // Formato local
            type: 'entrada',
            itemId: newProduct.id,
            itemName: newProduct.name,
            quantity: newProduct.stock,
            user: 'Admin', // O el usuario actual
            notes: 'Stock inicial al añadir producto',
        };
        setMovements(prev => [newMovement, ...prev]); // Añadir al principio

        // Resetear y cerrar modal
        setShowModal(false);
        setNewItem({ name: '', category: '', sku: '', stock: '', unit: 'unit', minStock: '', idealStock: '', location: '', description: '' });
        console.log('Producto guardado:', newProduct);
        console.log('Movimiento registrado:', newMovement);
    };

    const handleAddItemToRequest = (item) => {
        const quantityToAdd = itemQuantities[item.id] || 1;
        // Lógica para añadir al carrito/solicitud pendiente
        // En una app real, esto actualizaría un estado de 'carrito' o llamaría a una API
        console.log(`Añadir ${quantityToAdd} de ${item.name} (ID: ${item.id}) a la solicitud.`);
        // Podrías mostrar una notificación aquí
    };

    const handleApproveRequest = (requestId) => {
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === requestId ? { ...req, status: 'Aprobado' } : req
            )
        );
        // Aquí iría la lógica para descontar stock y registrar movimientos de salida
        console.log(`Solicitud ${requestId} aprobada.`);
        // Ejemplo: Registrar movimiento (simplificado)
        // const request = requests.find(r => r.id === requestId);
        // if (request) {
        //     // ... buscar items de la solicitud, descontar stock, crear movimientos ...
        // }
    };

    const handleRejectRequest = (requestId) => {
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === requestId ? { ...req, status: 'Rechazado' } : req
            )
        );
        console.log(`Solicitud ${requestId} rechazada.`);
    };

    const handleRequestDetails = (requestId) => {
        // Lógica para mostrar detalles (modal, nueva página, etc.)
        const request = requests.find(r => r.id === requestId);
        console.log(`Ver detalles de la solicitud ${requestId}:`, request);
        alert(`Detalles de la Solicitud ${requestId}:\nSolicitante: ${request?.applicant}\nProyecto: ${request?.project}\nItems: ${request?.items}\nEstado: ${request?.status}`);
    };

    const handleNewRequest = () => {
        // Lógica para iniciar una nueva solicitud (abrir modal, navegar, etc.)
        console.log("Iniciar nueva solicitud de material.");
        alert("Funcionalidad 'Nueva Solicitud' pendiente de implementación.");
    };


    // --- Cálculos para Resumen (Ejemplo) ---
    const totalInventoryValue = inventoryItems.reduce((sum, item) => {
        // Cálculo muy simplificado del valor. Necesitarías precios por item.
        const pricePerUnit = 10; // Precio placeholder
        return sum + (item.stock * pricePerUnit);
    }, 0).toLocaleString('es-ES', { style: 'currency', currency: 'USD' }); // Formato de moneda

    const criticalItemsCount = inventoryItems.filter(item => getStockLevel(item.stock, item.minStock, item.idealStock).level === 'critical').length;
    const pendingRequestsCount = requests.filter(req => req.status === 'Pendiente').length;
    const totalItemsCount = inventoryItems.length; // O podrías sumar cantidades si 'count' en categoriesData no es fiable

    // Actualizar statsData (si quieres que sea dinámico)
    const dynamicStatsData = [
        { title: 'Total de Materiales', value: totalItemsCount, change: '+X este mes' }, // Necesitarías historial para el cambio
        { title: 'Valor de Inventario', value: totalInventoryValue, change: '↑ Y% mes pasado', changeType: 'up' }, // Necesitarías historial
        { title: 'Solicitudes Pendientes', value: pendingRequestsCount, change: 'Actualizado ahora' },
        { title: 'Materiales Críticos', value: criticalItemsCount, change: '↓ Z desde ayer', changeType: 'down' }, // Necesitarías historial
    ];


    // --- Filtrado ---
    const filteredInventoryItems = inventoryItems.filter(item => {
        const searchMatch = item.name.toLowerCase().includes(filters.search.toLowerCase()) || item.sku.toLowerCase().includes(filters.search.toLowerCase());
        const categoryMatch = !filters.category || item.category === filters.category;
        const statusMatch = !filters.status || getStockLevel(item.stock, item.minStock, item.idealStock).level === filters.status;
        return searchMatch && categoryMatch && statusMatch;
    });

    // --- Renderizado ---
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
                                    Inventario de Materiales
                                </h1>

                            </div>
                        </div>
                        {/* Pestañas */}
                        <div className="flex mb-6 border-b border-slate-300 overflow-x-auto">
                            {['Resumen', 'Catálogo', 'Movimientos', 'Solicitudes'].map(tab => (
                                <div
                                    key={tab}
                                    className={`py-3 px-6 cursor-pointer border-b-2 font-medium whitespace-nowrap ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-800'}`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </div>
                            ))}
                        </div>

                        {/* Contenido Condicional */}
                        {activeTab === 'Resumen' && (
                            <div className="space-y-8">
                                {criticalItemsCount > 0 && (
                                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md">
                                        <strong>¡Atención!</strong> {criticalItemsCount} {criticalItemsCount === 1 ? 'material está' : 'materiales están'} por debajo del nivel mínimo requerido.
                                    </div>
                                )}

                                {/* Stats Grid (Usando datos dinámicos) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {dynamicStatsData.map((stat, index) => (
                                        <div key={index} className="bg-white rounded-lg p-4 shadow">
                                            <div className="text-sm text-slate-500 mb-1">{stat.title}</div>
                                            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                                            <div className={`text-xs mt-1 ${stat.changeType === 'up' ? 'text-green-600' : stat.changeType === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                                                {stat.changeType === 'up' && <ArrowUpIcon />}
                                                {stat.changeType === 'down' && <ArrowDownIcon />}
                                                {stat.change}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-xl font-semibold text-slate-800">Categorías de Materiales</h2>

                                {/* Categories Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {categoriesData.map((cat, index) => {
                                        // Contar items por categoría dinámicamente
                                        const countInCategory = inventoryItems.filter(item => item.category === cat.name).length;
                                        return (
                                            <div
                                                key={index}
                                                className="bg-white rounded-lg p-4 shadow text-center cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg"
                                                onClick={() => { setActiveTab('Catálogo'); setFilters(prev => ({ ...prev, category: cat.name, search: '', status: '' })); }}
                                            >
                                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                                                    {cat.icon}
                                                </div>
                                                <div className="font-semibold text-sm mb-1">{cat.name}</div>
                                                <div className="text-xs text-slate-500">{countInCategory} {countInCategory === 1 ? 'producto' : 'productos'}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Catálogo' && (
                            <div className="space-y-6">
                                {/* Filtros (Sin cambios) */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Buscar</label>
                                            <input
                                                type="text"
                                                name="search"
                                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                placeholder="Buscar material..."
                                                value={filters.search}
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                                            <select
                                                name="category"
                                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                                value={filters.category}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">Todas</option>
                                                {/* Obtener categorías únicas del inventario */}
                                                {[...new Set(inventoryItems.map(item => item.category))].sort().map(catName => (
                                                    <option key={catName} value={catName}>{catName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                                            <select
                                                name="status"
                                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                                value={filters.status}
                                                onChange={handleFilterChange}
                                            >
                                                <option value="">Todos</option>
                                                <option value="critical">Crítico</option>
                                                <option value="low">Bajo</option>
                                                <option value="normal">Normal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Catálogo */}
                                <div className="bg-white rounded-lg p-4 md:p-6 shadow">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                        <h2 className="text-xl font-semibold text-slate-800">Catálogo de Materiales ({filteredInventoryItems.length})</h2>
                                        <button
                                            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
                                            onClick={() => setShowModal(true)}
                                        >
                                            <PlusIcon /> Añadir Producto
                                        </button>
                                    </div>

                                    {/* Listado de Productos */}
                                    <div className="space-y-4">
                                        {filteredInventoryItems.map(item => {
                                            const stockInfo = getStockLevel(item.stock, item.minStock, item.idealStock);
                                            const categoryInfo = categoriesData.find(c => c.name === item.category); // Para el icono
                                            const itemProgress = calculateProgress(item.stock, item.idealStock);

                                            return (
                                                <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center p-4 border border-slate-200 rounded-md bg-white gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0 text-blue-600">
                                                        {categoryInfo?.icon || <MetalIcon />}
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <div className="font-semibold text-slate-800">{item.name}</div>
                                                        <div className="text-xs text-slate-500 mt-1">
                                                            Categoría: {item.category} | SKU: {item.sku} | Ubic: {item.location || 'N/A'}
                                                        </div>
                                                        <div className="flex items-center mt-2 gap-2">
                                                            <div className="w-full md:w-1/2 bg-slate-200 rounded-full h-2 overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full ${stockInfo.progressClass}`}
                                                                    style={{ width: `${itemProgress}%` }}
                                                                ></div>
                                                            </div>
                                                            <div className={`text-sm font-medium ${stockInfo.className} whitespace-nowrap`}>
                                                                {item.stock} {item.unit} ({stockInfo.level})
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Acciones Catálogo */}
                                                    <div className="flex items-center gap-2 mt-2 md:mt-0 flex-shrink-0">
                                                        <div className="flex items-center">
                                                            <button className="w-7 h-7 flex items-center justify-center bg-slate-100 border border-slate-300 rounded-l-md hover:bg-slate-200 text-slate-700" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                                            <input type="number" className="w-12 h-7 text-center border-t border-b border-slate-300 text-sm focus:outline-none appearance-none [-moz-appearance:textfield]" value={itemQuantities[item.id] || 1} readOnly />
                                                            <button className="w-7 h-7 flex items-center justify-center bg-slate-100 border border-slate-300 rounded-r-md hover:bg-slate-200 text-slate-700" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAddItemToRequest(item)}
                                                            className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-700 transition"
                                                            title={`Añadir ${itemQuantities[item.id] || 1} a la solicitud`}
                                                        >
                                                            Añadir
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {filteredInventoryItems.length === 0 && (
                                            <p className="text-center text-slate-500 py-8">No se encontraron materiales que coincidan con los filtros.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Movimientos' && (
                            <div className="bg-white rounded-lg p-4 md:p-6 shadow">
                                <h2 className="text-xl font-semibold mb-4">Historial de Movimientos</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[800px]">
                                        <thead>
                                            <tr className="bg-slate-50">
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Fecha</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Tipo</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Material (ID)</th>
                                                <th className="p-3 text-right text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Cantidad</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Usuario</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Notas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {movements.map(mov => (
                                                <tr key={mov.id} className="hover:bg-slate-50">
                                                    <td className="p-3 text-sm text-slate-700 whitespace-nowrap">{formatDate(mov.date)}</td>
                                                    <td className="p-3 text-sm">
                                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getMovementTypeClass(mov.type)}`}>
                                                            {mov.type}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-sm text-slate-700">{mov.itemName} ({mov.itemId})</td>
                                                    <td className={`p-3 text-sm text-right font-medium ${mov.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                                                    </td>
                                                    <td className="p-3 text-sm text-slate-700">{mov.user}</td>
                                                    <td className="p-3 text-sm text-slate-500">{mov.notes}</td>
                                                </tr>
                                            ))}
                                            {movements.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="p-4 text-center text-slate-500">No hay movimientos registrados.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Solicitudes' && (
                            <div className="bg-white rounded-lg p-4 md:p-6 shadow">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                    <h2 className="text-xl font-semibold text-slate-800">Solicitudes de Material ({requests.length})</h2>
                                    <button
                                        onClick={handleNewRequest}
                                        className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
                                    >
                                        <PlusIcon /> Nueva Solicitud
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[700px]">
                                        <thead>
                                            <tr className="bg-slate-50">
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">ID</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Fecha</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Solicitante</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Proyecto</th>
                                                <th className="p-3 text-center text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Items</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Estado</th>
                                                <th className="p-3 text-left text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {requests.map(req => (
                                                <tr key={req.id} className="hover:bg-slate-50">
                                                    <td className="p-3 text-sm text-slate-700">{req.id}</td>
                                                    <td className="p-3 text-sm text-slate-700 whitespace-nowrap">{req.date}</td>
                                                    <td className="p-3 text-sm text-slate-700">{req.applicant}</td>
                                                    <td className="p-3 text-sm text-slate-700">{req.project}</td>
                                                    <td className="p-3 text-sm text-slate-700 text-center">{req.items}</td>
                                                    <td className="p-3 text-sm">
                                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(req.status)}`}>
                                                            {req.status}
                                                        </span>
                                                    </td>
                                                    {/* Acciones Solicitudes */}
                                                    <td className="p-3 text-sm">
                                                        <div className="flex gap-1">
                                                            {req.status === 'Pendiente' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleApproveRequest(req.id)}
                                                                        title="Aprobar Solicitud"
                                                                        className="p-1 rounded text-green-600 hover:bg-green-100"
                                                                    >
                                                                        <CheckIcon />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleRejectRequest(req.id)}
                                                                        title="Rechazar Solicitud"
                                                                        className="p-1 rounded text-red-600 hover:bg-red-100"
                                                                    >
                                                                        <XIcon />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleRequestDetails(req.id)}
                                                                    title="Ver Detalles"
                                                                    className="p-1 rounded text-blue-600 hover:bg-blue-100"
                                                                >
                                                                    <EyeIcon />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {requests.length === 0 && (
                                                <tr>
                                                    <td colSpan="7" className="p-4 text-center text-slate-500">No hay solicitudes registradas.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Botones de Acción Globales (Sin cambios) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <button
                                onClick={handleNewRequest}
                                className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
                            >
                                <PlusIcon /> Nueva Solicitud de Material
                            </button>
                            <button className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
                                <DownloadIcon /> Exportar Inventario
                            </button>
                            <button className="w-full flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition">
                                <SettingsIcon /> Configuración de Inventario
                            </button>
                        </div>
                    </div>


                </div>


                {/* Modal para añadir producto (Sin cambios en la estructura, solo en handleSaveProduct) */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">Añadir Nuevo Producto</h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                            </div>
                            {/* Modal Body */}
                            <div className="p-6 space-y-4 overflow-y-auto">
                                {/* Campos del formulario (sin cambios) */}
                                <div className="form-group">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Producto</label>
                                    <input type="text" name="name" value={newItem.name} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ingrese nombre" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                                        <select name="category" value={newItem.category} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                                            <option value="">Seleccione categoría</option>
                                            {categoriesData.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                                        <input type="text" name="sku" value={newItem.sku} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="SKU del producto" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Stock Inicial</label>
                                        <input type="number" name="stock" value={newItem.stock} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Cantidad" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Unidad de Medida</label>
                                        <select name="unit" value={newItem.unit} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-white">
                                            <option value="unit">Unidad</option>
                                            <option value="kg">Kilogramos</option>
                                            <option value="meter">Metros</option>
                                            <option value="liter">Litros</option>
                                            <option value="pack">Paquete</option>
                                            <option value="cilindros">Cilindros</option>
                                            <option value="carretes">Carretes</option>
                                            <option value="unidades">Unidades</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Stock Mínimo</label>
                                        <input type="number" name="minStock" value={newItem.minStock} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Nivel mínimo" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Stock Ideal</label>
                                        <input type="number" name="idealStock" value={newItem.idealStock} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Nivel ideal" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ubicación en Almacén</label>
                                    <input type="text" name="location" value={newItem.location} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Ejemplo: Estante A-12" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                                    <textarea name="description" value={newItem.description} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" rows="3" placeholder="Descripción del producto"></textarea>
                                </div>
                            </div>
                            {/* Modal Footer */}
                            <div className="flex justify-end p-4 border-t border-slate-200 bg-slate-50 rounded-b-lg">
                                <button onClick={() => setShowModal(false)} className="bg-slate-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-600 transition mr-2">Cancelar</button>
                                <button onClick={handleSaveProduct} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">Guardar Producto</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}