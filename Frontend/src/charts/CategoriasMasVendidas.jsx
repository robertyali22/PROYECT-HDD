import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const CategoriasMasVendidas = () => {
  const data = [
    { fecha: "Ene-2025", categoria: "Barnices", cantidad: 120 },
    { fecha: "Feb-2025", categoria: "Masillas", cantidad: 150 },
    { fecha: "Mar-2025", categoria: "Lijas", cantidad: 100 },
    { fecha: "Abr-2025", categoria: "Barnices", cantidad: 170 },
    { fecha: "May-2025", categoria: "Lijas", cantidad: 90 },
  ];

  return (
    <div className="card bg-white rounded-lg shadow">
      <div className="card-header">
        <p className="card-title text-lg font-semibold text-gray-700 mb-4 text-center">
          Categorías Más Vendidas
        </p>
      </div>
      <div className="card-body p-0">
        <ResponsiveContainer width="101%" height={400}>
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip cursor={false} formatter={(value) => `${value}`} />

            <XAxis
              dataKey="fecha"
              strokeWidth={0}
              stroke="#475569"
              tickMargin={6}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="cantidad"
              strokeWidth={0}
              stroke="#475569"
              tickFormatter={(value) => `${value}`}
              tickMargin={6}
              domain={[0, "dataMax"]}
            />

            <Area
              type="monotone"
              dataKey="cantidad"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
