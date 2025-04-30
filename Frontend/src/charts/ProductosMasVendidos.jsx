import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const ProductosMasVendidos = () => {
  const data = [
    { name: "Pintura Roja", value: 120 },
    { name: "Barniz Acrílico", value: 80 },
    { name: "Lija 400", value: 60 },
    { name: "Masilla Poliester", value: 40 },
    { name: "Pintura Negra", value: 100 },
    { name: "Lija 1500", value: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Productos Más Vendidos
      </h2>
      <ResponsiveContainer width={450} height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
