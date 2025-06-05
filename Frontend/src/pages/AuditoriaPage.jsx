import React, { useState, useMemo, useEffect } from "react";
import { NavBar} from '../components/Navbar';
import { SideBar } from '../components/Sidebar';

// --- Ejemplos Iniciales ---
const initialPendingInspectionsData = [
    {
        id: "SOL-2025-042",
        date: "2025-04-27",
        welder: "Juan Pérez",
        type: "MIG",
        priority: "Alta",
        status: "Pendiente",
        material: "Acero Carbono",
        thickness: 4.5,
        images: ["/api/placeholder/120/120", "/api/placeholder/120/120"],
        criteria: {
            visual: { porosity: false, uniformity: true, penetration: false },
            dimensional: { height: true, throat: false },
            documentation: { complete: true, params: false },
        },
        observations: "",
        decision: "",
        inspectionDate: null,
    },
    {
        id: "SOL-2025-041",
        date: "2025-04-27",
        welder: "Carlos Rodríguez",
        type: "TIG",
        priority: "Media",
        status: "Pendiente",
        material: "Acero Inoxidable",
        thickness: 3.0,
        images: ["/api/placeholder/120/120"],
        criteria: {
            visual: { porosity: true, uniformity: true, penetration: true },
            dimensional: { height: true, throat: true },
            documentation: { complete: true, params: true },
        },
        observations: "",
        decision: "",
        inspectionDate: null,
    },
    {
        id: "SOL-2025-040",
        date: "2025-04-26",
        welder: "Ana Martínez",
        type: "SMAW",
        priority: "Alta",
        status: "Pendiente",
        material: "Acero Carbono",
        thickness: 6.0,
        images: [],
        criteria: {
            visual: { porosity: false, uniformity: false, penetration: false },
            dimensional: { height: false, throat: false },
            documentation: { complete: false, params: false },
        },
        observations: "",
        decision: "",
        inspectionDate: null,
    },
    {
        id: "SOL-2025-039",
        date: "2025-04-26",
        welder: "Juan Pérez",
        type: "MIG",
        priority: "Media",
        status: "Pendiente",
        material: "Aluminio",
        thickness: 5.0,
        images: ["/api/placeholder/120/120"],
        criteria: {
            visual: { porosity: true, uniformity: true, penetration: true },
            dimensional: { height: true, throat: true },
            documentation: { complete: true, params: true },
        },
        observations: "",
        decision: "",
        inspectionDate: null,
    },
    {
        id: "SOL-2025-038",
        date: "2025-04-25",
        welder: "Carlos Rodríguez",
        type: "FCAW",
        priority: "Baja",
        status: "Pendiente",
        material: "Acero Carbono",
        thickness: 8.0,
        images: [
            "/api/placeholder/120/120",
            "/api/placeholder/120/120",
            "/api/placeholder/120/120",
        ],
        criteria: {
            visual: { porosity: true, uniformity: true, penetration: true },
            dimensional: { height: true, throat: true },
            documentation: { complete: true, params: true },
        },
        observations: "",
        decision: "",
        inspectionDate: null,
    },
];

const initialAuditHistoryData = [
    {
        id: "SOL-2025-037",
        date: "2025-04-24",
        welder: "Ana Martínez",
        type: "TIG",
        priority: "Media",
        status: "Aprobado",
        material: "Acero Inoxidable",
        thickness: 2.5,
        images: [],
        criteria: {
            visual: { porosity: true, uniformity: true, penetration: true },
            dimensional: { height: true, throat: true },
            documentation: { complete: true, params: true },
        },
        observations: "Cumple con todos los criterios.",
        decision: "Aprobado",
        inspectionDate: "2025-04-25",
    },
    {
        id: "SOL-2025-036",
        date: "2025-04-23",
        welder: "Juan Pérez",
        type: "SMAW",
        priority: "Alta",
        status: "Rechazado",
        material: "Acero Carbono",
        thickness: 6.0,
        images: ["/api/placeholder/120/120"],
        criteria: {
            visual: { porosity: false, uniformity: false, penetration: false },
            dimensional: { height: true, throat: false },
            documentation: { complete: true, params: true },
        },
        observations: "Porosidad excesiva y falta de uniformidad.",
        decision: "Rechazado",
        inspectionDate: "2025-04-24",
    },
    {
        id: "SOL-2025-035",
        date: "2025-04-22",
        welder: "Carlos Rodríguez",
        type: "MIG",
        priority: "Baja",
        status: "Aprobado",
        material: "Aluminio",
        thickness: 4.0,
        images: [],
        criteria: {
            visual: { porosity: true, uniformity: true, penetration: true },
            dimensional: { height: true, throat: true },
            documentation: { complete: true, params: true },
        },
        observations: "Correcto.",
        decision: "Aprobado",
        inspectionDate: "2025-04-23",
    },
    {
        id: "SOL-2025-034",
        date: "2025-04-21",
        welder: "Juan Pérez",
        type: "MIG",
        priority: "Media",
        status: "Aprobado",
        material: "Acero Carbono",
        thickness: 5.0,
        images: [],
        criteria: {
            visual: { porosity: true, uniformity: true, penetration: true },
            dimensional: { height: true, throat: true },
            documentation: { complete: true, params: true },
        },
        observations: "Ok.",
        decision: "Aprobado",
        inspectionDate: "2025-04-22",
    },
    {
        id: "SOL-2025-033",
        date: "2025-04-20",
        welder: "Ana Martínez",
        type: "SMAW",
        priority: "Alta",
        status: "Requiere Reproceso",
        material: "Acero Carbono",
        thickness: 6.5,
        images: [],
        criteria: {
            visual: { porosity: true, uniformity: true, penetration: false },
            dimensional: { height: true, throat: true },
            documentation: { complete: true, params: true },
        },
        observations: "Falta de penetración en sección inicial.",
        decision: "Requiere Reproceso",
        inspectionDate: "2025-04-21",
    },
];

// --- Componente Principal ---
export function AuditoriaPage() {
    const [activeTab, setActiveTab] = useState("pendientes");
    const [showInspectionForm, setShowInspectionForm] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [pendingInspections, setPendingInspections] = useState( initialPendingInspectionsData
    );
    const [auditHistory, setAuditHistory] = useState(initialAuditHistoryData);

    // Estado para los filtros
    const [pendingFilters, setPendingFilters] = useState({
        date: "",
        welder: "",
        status: "Pendiente",
    });
    const [historyFilters, setHistoryFilters] = useState({
        date: "",
        welder: "",
        status: "",
    });

    // Estado para el formulario de inspección
    const [formData, setFormData] = useState({
        observations: "",
        decision: "",
        inspectionDate: new Date().toISOString().split("T")[0], 
    });
    const [checklistState, setChecklistState] = useState({});

    // --- Efecto para cargar datos de la inspección seleccionada en el formulario ---
    useEffect(() => {
        if (selectedInspection) {
            setFormData({
                observations: selectedInspection.observations || "",
                decision: selectedInspection.decision || "",
                inspectionDate:
                    selectedInspection.inspectionDate ||
                    new Date().toISOString().split("T")[0],
            });
            // Inicializar checklist basado en los criterios de la inspección seleccionada
            const initialChecklist = {};
            if (selectedInspection.criteria) {
                // Asegurarse de que todos los grupos existan antes de iterar
                const groups = ["visual", "dimensional", "documentation"];
                groups.forEach((groupKey) => {
                    if (selectedInspection.criteria[groupKey]) {
                        Object.keys(
                            selectedInspection.criteria[groupKey]
                        ).forEach((itemKey) => {
                            initialChecklist[`${groupKey}-${itemKey}`] =
                                selectedInspection.criteria[groupKey][itemKey];
                        });
                    }
                });
            }
            setChecklistState(initialChecklist);
        } else {
            // Resetear formulario si no hay inspección seleccionada
            setFormData({
                observations: "",
                decision: "",
                inspectionDate: new Date().toISOString().split("T")[0],
            });
            setChecklistState({});
        }
    }, [selectedInspection]);

    // --- Manejadores de Eventos ---
    const handleReviewClick = (inspectionId) => {
        const inspection = pendingInspections.find(
            (insp) => insp.id === inspectionId
        );
        setSelectedInspection(inspection);
        setShowInspectionForm(true);
    };

    const handleCloseForm = () => {
        setShowInspectionForm(false);
        setSelectedInspection(null); // Deseleccionar al cerrar
    };

    const handleFilterChange = (e, filterType) => {
        const { name, value } = e.target;
        if (filterType === "pending") {
            setPendingFilters((prev) => ({ ...prev, [name]: value }));
        } else if (filterType === "history") {
            setHistoryFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChecklistChange = (e) => {
        const { name, checked } = e.target;
        setChecklistState((prev) => ({ ...prev, [name]: checked }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!selectedInspection || !formData.decision) {
            alert("Por favor, seleccione una decisión final.");
            return;
        }

        // Reconstruir el objeto de criterios desde el estado del checklist
        const updatedCriteria = {
            visual: {},
            dimensional: {},
            documentation: {},
        };
        Object.keys(checklistState).forEach((key) => {
            const [group, item] = key.split("-");
            if (updatedCriteria[group]) {
                updatedCriteria[group][item] = checklistState[key];
            } else {
                
                updatedCriteria[group] = { [item]: checklistState[key] };
            }
        });

        // Crear la inspección actualizada
        const updatedInspection = {
            ...selectedInspection,
            status: formData.decision, // 'Aprobado', 'Rechazado', 'Requiere Reproceso'
            observations: formData.observations,
            decision: formData.decision,
            inspectionDate: formData.inspectionDate,
            criteria: updatedCriteria, // Guardar el estado actualizado del checklist
        };

        // Mover de pendientes a historial
        setAuditHistory((prev) =>
            [updatedInspection, ...prev].sort(
                (a, b) =>
                    new Date(b.inspectionDate) - new Date(a.inspectionDate)
            )
        ); // Ordenar por fecha de inspección descendente
        setPendingInspections((prev) =>
            prev.filter((insp) => insp.id !== selectedInspection.id)
        );

        // Cerrar y resetear formulario
        handleCloseForm();
    };

    // --- Filtrado de Datos (useMemo para optimización) ---
    const filteredPendingInspections = useMemo(() => {
        return pendingInspections.filter((insp) => {
            const dateMatch =
                !pendingFilters.date || insp.date === pendingFilters.date;
            const welderMatch =
                !pendingFilters.welder || insp.welder === pendingFilters.welder;
            return dateMatch && welderMatch && insp.status === "Pendiente";
        });
    }, [pendingInspections, pendingFilters]);

    const filteredAuditHistory = useMemo(() => {
        return auditHistory.filter((insp) => {
            const dateMatch =
                !historyFilters.date ||
                insp.inspectionDate === historyFilters.date;
            const welderMatch =
                !historyFilters.welder || insp.welder === historyFilters.welder;
            const statusMatch =
                !historyFilters.status || insp.status === historyFilters.status;
            return dateMatch && welderMatch && statusMatch;
        });
    }, [auditHistory, historyFilters]);

    // --- Cálculos para Reportes  ---
    const reportData = useMemo(() => {
        const total = auditHistory.length;
        const approved = auditHistory.filter(
            (insp) => insp.decision === "Aprobado"
        ).length;
        const rejected = auditHistory.filter(
            (insp) => insp.decision === "Rechazado"
        ).length;
        const rework = auditHistory.filter(
            (insp) => insp.decision === "Requiere Reproceso"
        ).length;
        const approvalRate =
            total > 0 ? ((approved / total) * 100).toFixed(1) : 0;

        // Por Soldador
        const statsByWelder = auditHistory.reduce((acc, insp) => {
            const welder = insp.welder;
            if (!acc[welder]) {
                acc[welder] = { total: 0, approved: 0, rejected: 0, rework: 0 };
            }
            acc[welder].total++;
            if (insp.decision === "Aprobado") acc[welder].approved++;
            else if (insp.decision === "Rechazado") acc[welder].rejected++;
            else if (insp.decision === "Requiere Reproceso")
                acc[welder].rework++;
            return acc;
        }, {});

        // Por Tipo de Soldadura
        const statsByType = auditHistory.reduce((acc, insp) => {
            const type = insp.type;
            if (!acc[type]) {
                acc[type] = { total: 0, approved: 0, rejected: 0, rework: 0 };
            }
            acc[type].total++;
            if (insp.decision === "Aprobado") acc[type].approved++;
            else if (insp.decision === "Rechazado") acc[type].rejected++;
            else if (insp.decision === "Requiere Reproceso") acc[type].rework++;
            return acc;
        }, {});

        // Criterios comunes de fallo (ejemplo simple: cuenta cuántas veces falló cada criterio en inspecciones rechazadas)
        const failureCriteriaCount = auditHistory
            .filter((insp) => insp.decision === "Rechazado" && insp.criteria)
            .reduce((acc, insp) => {
                Object.keys(insp.criteria).forEach((groupKey) => {
                    Object.keys(insp.criteria[groupKey]).forEach((itemKey) => {
                        if (insp.criteria[groupKey][itemKey] === false) {
                            // Si el criterio es 'false' (falló)
                            const key = `${groupKey}-${itemKey}`;
                            acc[key] = (acc[key] || 0) + 1;
                        }
                    });
                });
                return acc;
            }, {});

        // Convertir a array y ordenar por frecuencia de fallo
        const commonFailures = Object.entries(failureCriteriaCount)
            .map(([key, count]) => ({
                criterion: key
                    .replace("-", " - ")
                    .replace(/([A-Z])/g, " $1")
                    .toLowerCase(),
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Mostrar los 5 más comunes

        return {
            total,
            approved,
            rejected,
            rework,
            approvalRate,
            statsByWelder: Object.entries(statsByWelder)
                .map(([welder, stats]) => ({ welder, ...stats }))
                .sort((a, b) => b.total - a.total), // Ordenar por total
            statsByType: Object.entries(statsByType)
                .map(([type, stats]) => ({ type, ...stats }))
                .sort((a, b) => b.total - a.total), // Ordenar por total
            commonFailures,
        };
    }, [auditHistory]);

    // --- Función para obtener clases CSS de estado ---
    const getStatusClass = (status) => {
        const lowerStatus = status?.toLowerCase() || "";
        switch (lowerStatus) {
            case "pendiente":
                return "status-pending bg-yellow-100 text-yellow-800";
            case "alta":
                return "status-warning bg-orange-100 text-orange-800"; // Prioridad Alta
            case "media":
                return "status-pending bg-yellow-100 text-yellow-800"; // Prioridad Media
            case "baja":
                return "status-completed bg-green-100 text-green-800"; // Prioridad Baja
            case "aprobado":
                return "status-completed bg-green-100 text-green-800";
            case "rechazado":
                return "status-rejected bg-red-100 text-red-800";
            case "requiere reproceso":
                return "status-rework bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // --- Renderizado ---
    return (
        <>
            
            <div className="sm:ml-64 bg-slate-100 min-h-screen">
                
                <div className="mx-w-7xl mx-auto p-5">
                    <h1 className="section-title text-2xl mb-6 text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">
                        Control de Calidad y Auditoría
                    </h1>

                    {/* Pestañas */}
                    <div className="tabs flMejex mb-6 border-b border-gray-300 overflow-x-auto">
                        {["pendientes", "historico", "reportes"].map((tab) => (
                            <div
                                key={tab}
                                className={`tab py-3 px-6 cursor-pointer border-b-2 font-medium capitalize whitespace-nowrap ${
                                    activeTab === tab
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-gray-800"
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === "pendientes"
                                    ? `Inspecciones Pendientes (${pendingInspections.length})`
                                    : tab.replace("_", " ")}
                            </div>
                        ))}
                    </div>

                    {/* --- Contenido Pestaña Pendientes --- */}
                    {activeTab === "pendientes" && (
                        <div>
                            {/* ... (código de filtros y tabla de pendientes sin cambios) ... */}
                            {pendingInspections.length > 0 && (
                                <div className="alert alert-warning bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-6">
                                    <strong>¡Atención!</strong> Hay{" "}
                                    {pendingInspections.length} registros
                                    pendientes de inspección.
                                </div>
                            )}

                            {/* Filtros Pendientes */}
                            <div className="filter-section bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="form-row grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="form-group">
                                        <label
                                            htmlFor="pending-date"
                                            className="form-label block mb-1 font-medium text-sm"
                                        >
                                            Filtrar por Fecha Registro
                                        </label>
                                        <input
                                            type="date"
                                            id="pending-date"
                                            name="date"
                                            value={pendingFilters.date}
                                            onChange={(e) =>
                                                handleFilterChange(e, "pending")
                                            }
                                            className="form-control w-full p-2 border border-gray-300 rounded text-sm"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="pending-welder"
                                            className="form-label block mb-1 font-medium text-sm"
                                        >
                                            Soldador
                                        </label>
                                        <select
                                            id="pending-welder"
                                            name="welder"
                                            value={pendingFilters.welder}
                                            onChange={(e) =>
                                                handleFilterChange(e, "pending")
                                            }
                                            className="form-control w-full p-2 border border-gray-300 rounded text-sm bg-white"
                                        >
                                            <option value="">Todos</option>
                                            {/* Opciones únicas de soldadores */}
                                            {[
                                                ...new Set(
                                                    initialPendingInspectionsData.map(
                                                        (i) => i.welder
                                                    )
                                                ),
                                            ].map((w) => (
                                                <option key={w} value={w}>
                                                    {w}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Podrías añadir más filtros si es necesario */}
                                </div>
                            </div>

                            {/* Tabla Pendientes */}
                            <div className="card bg-white rounded-lg p-4 md:p-6 shadow-sm mb-8">
                                <div className="table-responsive overflow-x-auto">
                                    <table className="w-full border-collapse min-w-[600px]">
                                        {/* ... thead ... */}
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Código
                                                </th>
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Fecha Reg.
                                                </th>
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Soldador
                                                </th>
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Tipo
                                                </th>
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Prioridad
                                                </th>
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Estado
                                                </th>
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPendingInspections.length >
                                            0 ? (
                                                filteredPendingInspections.map(
                                                    (inspection) => (
                                                        <tr
                                                            key={inspection.id}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="p-3 text-sm text-gray-700 border-b">
                                                                {inspection.id}
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b">
                                                                {
                                                                    inspection.date
                                                                }
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b">
                                                                {
                                                                    inspection.welder
                                                                }
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b">
                                                                {
                                                                    inspection.type
                                                                }
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b">
                                                                <span
                                                                    className={`status ${getStatusClass(
                                                                        inspection.priority
                                                                    )} inline-block px-2 py-1 rounded-full text-xs font-medium`}
                                                                >
                                                                    {
                                                                        inspection.priority
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b">
                                                                <span
                                                                    className={`status ${getStatusClass(
                                                                        inspection.status
                                                                    )} inline-block px-2 py-1 rounded-full text-xs font-medium`}
                                                                >
                                                                    {
                                                                        inspection.status
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b">
                                                                <div className="action-buttons flex gap-2">
                                                                    <button
                                                                        className="btn btn-primary bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700"
                                                                        onClick={() =>
                                                                            handleReviewClick(
                                                                                inspection.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Revisar
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        className="p-4 text-center text-gray-500"
                                                    >
                                                        No hay inspecciones
                                                        pendientes que coincidan
                                                        con los filtros.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* --- Formulario de Inspección (Modal) --- */}
                            {showInspectionForm && selectedInspection && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-40 overflow-y-auto p-4 pt-10">
                                    {/* ... (código del formulario modal sin cambios) ... */}
                                    <div className="card bg-white rounded-lg p-6 shadow-xl mb-8 w-full max-w-3xl relative">
                                        <button
                                            onClick={handleCloseForm}
                                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                                        >
                                            &times;
                                        </button>
                                        <h2 className="text-xl font-semibold mb-6">
                                            Inspección de Soldadura:{" "}
                                            {selectedInspection.id}
                                        </h2>

                                        {/* Resumen de Datos */}
                                        <div className="summary-box bg-gray-50 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                            <div>
                                                <span className="font-medium">
                                                    Soldador:
                                                </span>{" "}
                                                {selectedInspection.welder}
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Fecha Registro:
                                                </span>{" "}
                                                {selectedInspection.date}
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Tipo Soldadura:
                                                </span>{" "}
                                                {selectedInspection.type}
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Material Base:
                                                </span>{" "}
                                                {selectedInspection.material}
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Espesor:
                                                </span>{" "}
                                                {selectedInspection.thickness}{" "}
                                                mm
                                            </div>
                                        </div>

                                        {/* Galería de Imágenes */}
                                        {selectedInspection.images &&
                                            selectedInspection.images.length >
                                                0 && (
                                                <div className="mb-6">
                                                    <h3 className="text-md font-semibold mb-2">
                                                        Imágenes Adjuntas
                                                    </h3>
                                                    <div className="image-gallery flex flex-wrap gap-3 my-4">
                                                        {selectedInspection.images.map(
                                                            (imgSrc, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="gallery-item w-24 h-24 rounded overflow-hidden relative cursor-pointer bg-gray-200"
                                                                >
                                                                    <img
                                                                        src={
                                                                            imgSrc
                                                                        }
                                                                        alt={`Imagen ${
                                                                            index +
                                                                            1
                                                                        }`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Formulario de Auditoría */}
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="audit-criteria mb-8">
                                                <h3 className="text-md font-semibold mb-3 text-gray-800 border-b pb-1">
                                                    Criterios de Inspección
                                                </h3>
                                                {/* Mapeo dinámico de criterios */}
                                                {selectedInspection.criteria &&
                                                    Object.entries(
                                                        selectedInspection.criteria
                                                    ).map(
                                                        ([
                                                            groupKey,
                                                            groupItems,
                                                        ]) => (
                                                            <div
                                                                key={groupKey}
                                                                className="criteria-group mb-4"
                                                            >
                                                                <div className="criteria-title font-medium mb-2 capitalize text-gray-700">
                                                                    {groupKey.replace(
                                                                        /([A-Z])/g,
                                                                        " $1"
                                                                    )}
                                                                </div>
                                                                {Object.entries(
                                                                    groupItems
                                                                ).map(
                                                                    ([
                                                                        itemKey,
                                                                        initialValue,
                                                                    ]) => (
                                                                        <div
                                                                            key={`${groupKey}-${itemKey}`}
                                                                            className="checklist-item flex items-center mb-2 pl-2"
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                id={`${groupKey}-${itemKey}`}
                                                                                name={`${groupKey}-${itemKey}`}
                                                                                checked={
                                                                                    checklistState[
                                                                                        `${groupKey}-${itemKey}`
                                                                                    ] ||
                                                                                    false
                                                                                }
                                                                                onChange={
                                                                                    handleChecklistChange
                                                                                }
                                                                                className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`${groupKey}-${itemKey}`}
                                                                                className="text-sm capitalize"
                                                                            >
                                                                                {itemKey.replace(
                                                                                    /([A-Z])/g,
                                                                                    " $1"
                                                                                )}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                            </div>

                                            {/* Observaciones y Decisión */}
                                            <div className="form-group mb-6">
                                                <label
                                                    htmlFor="observations"
                                                    className="form-label block mb-1 font-medium text-sm"
                                                >
                                                    Observaciones
                                                </label>
                                                <textarea
                                                    id="observations"
                                                    name="observations"
                                                    value={
                                                        formData.observations
                                                    }
                                                    onChange={
                                                        handleFormInputChange
                                                    }
                                                    className="form-control w-full p-2 border border-gray-300 rounded text-sm"
                                                    rows="3"
                                                    placeholder="Ingrese sus observaciones..."
                                                ></textarea>
                                            </div>

                                            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="decision"
                                                        className="form-label block mb-1 font-medium text-sm"
                                                    >
                                                        Decisión Final{" "}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </label>
                                                    <select
                                                        id="decision"
                                                        name="decision"
                                                        value={
                                                            formData.decision
                                                        }
                                                        onChange={
                                                            handleFormInputChange
                                                        }
                                                        required
                                                        className="form-control w-full p-2 border border-gray-300 rounded text-sm bg-white"
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Seleccionar...
                                                        </option>
                                                        <option value="Aprobado">
                                                            Aprobado
                                                        </option>
                                                        <option value="Rechazado">
                                                            Rechazado
                                                        </option>
                                                        <option value="Requiere Reproceso">
                                                            Requiere Reproceso
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="inspectionDate"
                                                        className="form-label block mb-1 font-medium text-sm"
                                                    >
                                                        Fecha de Inspección
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="inspectionDate"
                                                        name="inspectionDate"
                                                        value={
                                                            formData.inspectionDate
                                                        }
                                                        onChange={
                                                            handleFormInputChange
                                                        }
                                                        className="form-control w-full p-2 border border-gray-300 rounded text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Botones */}
                                            <div className="text-right mt-6">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-600 mr-2"
                                                    onClick={handleCloseForm}
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700"
                                                >
                                                    Guardar Inspección
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- Contenido Pestaña Histórico --- */}
                    {activeTab === "historico" && (
                        <div className="card bg-white rounded-lg p-4 md:p-6 shadow-sm">
                            {/* ... (código de filtros y tabla de histórico sin cambios) ... */}
                            <h2 className="text-lg font-semibold mb-4">
                                Histórico de Auditorías
                            </h2>

                            {/* Filtros Histórico */}
                            <div className="filter-section bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="form-row grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="form-group">
                                        <label
                                            htmlFor="history-date"
                                            className="form-label block mb-1 font-medium text-sm"
                                        >
                                            Filtrar por Fecha Inspección
                                        </label>
                                        <input
                                            type="date"
                                            id="history-date"
                                            name="date"
                                            value={historyFilters.date}
                                            onChange={(e) =>
                                                handleFilterChange(e, "history")
                                            }
                                            className="form-control w-full p-2 border border-gray-300 rounded text-sm"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="history-welder"
                                            className="form-label block mb-1 font-medium text-sm"
                                        >
                                            Soldador
                                        </label>
                                        <select
                                            id="history-welder"
                                            name="welder"
                                            value={historyFilters.welder}
                                            onChange={(e) =>
                                                handleFilterChange(e, "history")
                                            }
                                            className="form-control w-full p-2 border border-gray-300 rounded text-sm bg-white"
                                        >
                                            <option value="">Todos</option>
                                            {[
                                                ...new Set(
                                                    initialAuditHistoryData.map(
                                                        (i) => i.welder
                                                    )
                                                ),
                                            ].map((w) => (
                                                <option key={w} value={w}>
                                                    {w}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="history-status"
                                            className="form-label block mb-1 font-medium text-sm"
                                        >
                                            Estado Final
                                        </label>
                                        <select
                                            id="history-status"
                                            name="status"
                                            value={historyFilters.status}
                                            onChange={(e) =>
                                                handleFilterChange(e, "history")
                                            }
                                            className="form-control w-full p-2 border border-gray-300 rounded text-sm bg-white"
                                        >
                                            <option value="">Todos</option>
                                            <option value="Aprobado">
                                                Aprobado
                                            </option>
                                            <option value="Rechazado">
                                                Rechazado
                                            </option>
                                            <option value="Requiere Reproceso">
                                                Requiere Reproceso
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Tabla Histórico */}
                            <div className="table-responsive overflow-x-auto">
                                <table className="w-full border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                Código
                                            </th>
                                            <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                Fecha Insp.
                                            </th>
                                            <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                Soldador
                                            </th>
                                            <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                Tipo
                                            </th>
                                            <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                Decisión
                                            </th>
                                            <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                Observaciones
                                            </th>
                                            {/* Podrías añadir un botón para ver detalles si es necesario */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAuditHistory.length > 0 ? (
                                            filteredAuditHistory.map(
                                                (inspection) => (
                                                    <tr
                                                        key={inspection.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="p-3 text-sm text-gray-700 border-b">
                                                            {inspection.id}
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-700 border-b">
                                                            {
                                                                inspection.inspectionDate
                                                            }
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-700 border-b">
                                                            {inspection.welder}
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-700 border-b">
                                                            {inspection.type}
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-700 border-b">
                                                            <span
                                                                className={`status ${getStatusClass(
                                                                    inspection.decision
                                                                )} inline-block px-2 py-1 rounded-full text-xs font-medium`}
                                                            >
                                                                {
                                                                    inspection.decision
                                                                }
                                                            </span>
                                                        </td>
                                                        <td
                                                            className="p-3 text-sm text-gray-700 border-b max-w-xs truncate"
                                                            title={
                                                                inspection.observations
                                                            }
                                                        >
                                                            {inspection.observations ||
                                                                "-"}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="p-4 text-center text-gray-500"
                                                >
                                                    No hay registros históricos
                                                    que coincidan con los
                                                    filtros.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- Contenido Pestaña Reportes (Mejorado) --- */}
                    {activeTab === "reportes" && (
                        <div className="space-y-8">
                            {/* Sección Resumen General */}
                            <div className="card bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                                    Resumen General de Auditorías
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div className="report-stat p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                                        <p className="text-sm font-medium text-blue-800">
                                            Total Realizadas
                                        </p>
                                        <p className="text-3xl font-bold text-blue-600 mt-1">
                                            {reportData.total}
                                        </p>
                                    </div>
                                    <div className="report-stat p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                                        <p className="text-sm font-medium text-green-800">
                                            Aprobadas
                                        </p>
                                        <p className="text-3xl font-bold text-green-600 mt-1">
                                            {reportData.approved}
                                        </p>
                                    </div>
                                    <div className="report-stat p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                                        <p className="text-sm font-medium text-red-800">
                                            Rechazadas
                                        </p>
                                        <p className="text-3xl font-bold text-red-600 mt-1">
                                            {reportData.rejected}
                                        </p>
                                    </div>
                                    <div className="report-stat p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                                        <p className="text-sm font-medium text-yellow-800">
                                            Reproceso
                                        </p>
                                        <p className="text-3xl font-bold text-yellow-600 mt-1">
                                            {reportData.rework}
                                        </p>
                                    </div>
                                    <div className="report-stat p-4 bg-indigo-50 rounded-lg border border-indigo-200 text-center">
                                        <p className="text-sm font-medium text-indigo-800">
                                            Tasa Aprobación
                                        </p>
                                        <p className="text-3xl font-bold text-indigo-600 mt-1">
                                            {reportData.approvalRate}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sección Rendimiento por Soldador */}
                            <div className="card bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    Rendimiento por Soldador
                                </h2>
                                <div className="table-responsive overflow-x-auto">
                                    <table className="w-full border-collapse min-w-[500px]">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Soldador
                                                </th>
                                                <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Total Insp.
                                                </th>
                                                <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Aprobadas
                                                </th>
                                                <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Rechazadas
                                                </th>
                                                <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Reproceso
                                                </th>
                                                <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase border-b">
                                                    Tasa Aprob. (%)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.statsByWelder.map(
                                                (stat) => (
                                                    <tr
                                                        key={stat.welder}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="p-3 text-sm text-gray-700 border-b font-medium">
                                                            {stat.welder}
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-700 border-b text-center">
                                                            {stat.total}
                                                        </td>
                                                        <td className="p-3 text-sm text-green-700 border-b text-center">
                                                            {stat.approved}
                                                        </td>
                                                        <td className="p-3 text-sm text-red-700 border-b text-center">
                                                            {stat.rejected}
                                                        </td>
                                                        <td className="p-3 text-sm text-yellow-700 border-b text-center">
                                                            {stat.rework}
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-700 border-b text-center font-medium">
                                                            {stat.total > 0
                                                                ? (
                                                                      (stat.approved /
                                                                          stat.total) *
                                                                      100
                                                                  ).toFixed(1)
                                                                : "0.0"}
                                                            %
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Sección Resultados por Tipo de Soldadura y Fallos Comunes */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="card bg-white rounded-lg p-6 shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                        Resultados por Tipo de Soldadura
                                    </h2>
                                    <div className="table-responsive overflow-x-auto">
                                        <table className="w-full border-collapse min-w-[400px]">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase border-b">
                                                        Tipo
                                                    </th>
                                                    <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase border-b">
                                                        Total
                                                    </th>
                                                    <th className="p-3 text-center text-xs font-semibold text-gray-600 uppercase border-b">
                                                        Aprob. (%)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportData.statsByType.map(
                                                    (stat) => (
                                                        <tr
                                                            key={stat.type}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="p-3 text-sm text-gray-700 border-b font-medium">
                                                                {stat.type}
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b text-center">
                                                                {stat.total}
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-700 border-b text-center font-medium">
                                                                {stat.total > 0
                                                                    ? (
                                                                          (stat.approved /
                                                                              stat.total) *
                                                                          100
                                                                      ).toFixed(
                                                                          1
                                                                      )
                                                                    : "0.0"}
                                                                %
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="card bg-white rounded-lg p-6 shadow-sm">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                        Criterios Comunes de Rechazo
                                    </h2>
                                    {reportData.commonFailures.length > 0 ? (
                                        <ul className="space-y-2">
                                            {reportData.commonFailures.map(
                                                (failure, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between items-center text-sm border-b pb-1 last:border-0"
                                                    >
                                                        <span className="text-gray-700 capitalize">
                                                            {failure.criterion}
                                                        </span>
                                                        <span className="font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                                                            {failure.count}{" "}
                                                            {failure.count > 1
                                                                ? "veces"
                                                                : "vez"}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No se han registrado criterios de
                                            fallo específicos en las
                                            inspecciones rechazadas.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Sección Generar Reporte */}
                            <div className="card bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">
                                    Generar Reporte Detallado
                                </h2>
                                <button
                                    className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                    disabled
                                >
                                    Descargar PDF (Próximamente)
                                </button>
                                <p className="text-xs text-gray-500 mt-2">
                                    Esta función estará disponible en futuras
                                    actualizaciones.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

           
        </>
    );
}