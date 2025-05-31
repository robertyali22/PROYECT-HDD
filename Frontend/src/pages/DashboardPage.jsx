import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';
import { Package, DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';
import { useState, useEffect } from "react";

import { IngresosPorMes } from "../charts/IngresosPorMes";
import { CategoriasMasVendidas } from "../charts/CategoriasMasVendidas";

export function DashboardPage() {
  const [totalTiendas, setTotalTiendas] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [ventas, setVentas] = useState(0);
  const [ingresos, setIngresos] = useState(0);

  useEffect(() => {
    const tiendas = [
      { nombre: "Soldaduras Centro" },
      { nombre: "Soldaduras Norte" },
      { nombre: "Soldaduras Sur" },
    ];

    const productos = [
      { nombre: "Electrodo 7018", categoria: "Básicos" },
      { nombre: "Alambre MIG", categoria: "Consumibles" },
      { nombre: "Electrodo 6010", categoria: "Celulósicos" },
      { nombre: "Alambre TIG", categoria: "Consumibles" },
    ];

    const ventas = [
      {
        total: 1000,
        productos: [
          { cantidad: 10, producto_id: { nombre: "Electrodo 7018" } },
          { cantidad: 5, producto_id: { nombre: "Alambre MIG" } },
        ],
      },
      {
        total: 1500,
        productos: [
          { cantidad: 3, producto_id: { nombre: "Electrodo 6010" } },
          { cantidad: 2, producto_id: { nombre: "Alambre TIG" } },
        ],
      },
    ];

    setTotalTiendas(tiendas.length);

    const categoriasUnicas = new Set(productos.map(p => p.categoria));
    setTotalCategorias(categoriasUnicas.size);

    const totalIngresos = ventas.reduce((sum, venta) => sum + venta.total, 0);
    const ingresosConDescuento = totalIngresos * 0.8;
    setIngresos(ingresosConDescuento);

    const totalProductosVendidos = ventas.reduce((sum, venta) => {
      return sum + venta.productos.reduce((acc, p) => acc + p.cantidad, 0);
    }, 0);
    setVentas(totalProductosVendidos);
  }, []);

  return (
    <>
      <NavBar />
      <SideBar />
      
      <div className="sm:ml-64 bg-slate-100">
        <div className="p-4 mt-16">
          <div className="grid grid-cols-13 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">

            <Card 
              icon={<Package size={26} />}
              title="Total Soldaduras"
              value={totalTiendas}
              porcentaje="25%"
            />

            <Card 
              icon={<DollarSign size={26} />}
              title="Pendientes de Inspección"
              value={`$${ingresos.toFixed(2)}`}
              porcentaje="12%"
            />

            <Card 
              icon={<Users size={26} />}
              title="Tasa de Aprobación"
              value={`${totalCategorias}%`}
              porcentaje="15%"
            />

            <Card 
              icon={<CreditCard size={26} />}
              title="Consumibles Críticos"
              value={ventas}
              porcentaje="19%"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard title="">
              <CategoriasMasVendidas />
            </ChartCard>

            <ChartCard title="">
              <IngresosPorMes />
            </ChartCard>
          </div>

          {/* Tabla de Actividad Reciente */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md border border-blue-100">
                <thead className="bg-blue-100 text-blue-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium">Usuario</th>
                    <th className="text-left py-3 px-4 font-medium">Actividad</th>
                    <th className="text-left py-3 px-4 font-medium">Detalles</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="py-3 px-4">27/04/2025 14:32</td>
                    <td className="py-3 px-4">Juan Pérez</td>
                    <td className="py-3 px-4">Registro de soldadura</td>
                    <td className="py-3 px-4">SOL-2025-042 (MIG)</td>
                  </tr>
                  <tr className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="py-3 px-4">27/04/2025 13:45</td>
                    <td className="py-3 px-4">Ana Martínez</td>
                    <td className="py-3 px-4">Inspección completada</td>
                    <td className="py-3 px-4">SOL-2025-037 (Aprobada)</td>
                  </tr>
                  <tr className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="py-3 px-4">27/04/2025 11:20</td>
                    <td className="py-3 px-4">Carlos Rodríguez</td>
                    <td className="py-3 px-4">Registro de soldadura</td>
                    <td className="py-3 px-4">SOL-2025-041 (TIG)</td>
                  </tr>
                  <tr className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="py-3 px-4">27/04/2025 10:05</td>
                    <td className="py-3 px-4">María García</td>
                    <td className="py-3 px-4">Asignación de tarea</td>
                    <td className="py-3 px-4">Asignada a Juan Pérez (Alta prioridad)</td>
                  </tr>
                  <tr className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="py-3 px-4">26/04/2025 16:18</td>
                    <td className="py-3 px-4">Luis Sánchez</td>
                    <td className="py-3 px-4">Ingreso de inventario</td>
                    <td className="py-3 px-4">Electrodos 6013 (200 unidades)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// Componentes reutilizables

function Card({ icon, title, value, porcentaje }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
      <div className="flex items-center mb-4 gap-4">
        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-800">{title}</p>
      </div>
      <div className="bg-blue-100/50 p-4 rounded-lg mx-auto">
        <p className="text-3xl font-bold text-blue-500">{value}</p>
        <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
          <TrendingUp size={18} />
          {porcentaje}
        </span>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100 h-[500px]">
      <h3 className="text-center text-lg font-semibold mb-4 text-gray-700">{title}</h3>
      <div className="flex justify-center items-center h-full">
        {children}
      </div>
    </div>
  );
}
