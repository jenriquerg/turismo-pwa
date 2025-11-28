"use client";

import { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface ReservaFormProps {
  precioBase: number;
  onSubmit: (data: ReservaFormData) => Promise<void>;
  tipo?: "alojamiento" | "alimento" | "experiencia";
  capacidadMaxima?: number;
  loading?: boolean;
}

export interface ReservaFormData {
  fecha_inicio: string;
  fecha_fin?: string;
  cantidad_personas: number;
  notas?: string;
}

export default function ReservaForm({
  precioBase,
  onSubmit,
  tipo = "alojamiento",
  capacidadMaxima,
  loading = false,
}: ReservaFormProps) {
  const toast = useToast();
  const [formData, setFormData] = useState<ReservaFormData>({
    fecha_inicio: "",
    fecha_fin: "",
    cantidad_personas: 1,
    notas: "",
  });

  const calcularPrecioTotal = () => {
    if (tipo === "alojamiento" && formData.fecha_inicio && formData.fecha_fin) {
      const inicio = new Date(formData.fecha_inicio);
      const fin = new Date(formData.fecha_fin);
      const dias = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
      return precioBase * Math.max(1, dias);
    }
    return precioBase * formData.cantidad_personas;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar capacidad máxima si está definida
    if (capacidadMaxima && formData.cantidad_personas > capacidadMaxima) {
      toast.error(`La capacidad máxima es de ${capacidadMaxima} personas`);
      return;
    }

    await onSubmit(formData);
  };

  const requiresFechaFin = tipo === "alojamiento";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha {requiresFechaFin ? "de inicio" : ""}
        </label>
        <input
          type="date"
          id="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      {requiresFechaFin && (
        <div>
          <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de salida
          </label>
          <input
            type="date"
            id="fecha_fin"
            value={formData.fecha_fin || ""}
            onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
            min={formData.fecha_inicio || new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>
      )}

      <div>
        <label htmlFor="cantidad_personas" className="block text-sm font-medium text-gray-700 mb-1">
          Cantidad de personas {capacidadMaxima ? `(máx. ${capacidadMaxima})` : ""}
        </label>
        <input
          type="number"
          id="cantidad_personas"
          value={formData.cantidad_personas}
          onChange={(e) =>
            setFormData({ ...formData, cantidad_personas: parseInt(e.target.value) || 1 })
          }
          onFocus={(e) => e.target.select()}
          min={1}
          max={capacidadMaxima}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-1">
          Notas adicionales (opcional)
        </label>
        <textarea
          id="notas"
          value={formData.notas || ""}
          onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Información adicional sobre tu reserva..."
        />
      </div>

      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Precio total:</span>
          <span className="text-2xl font-bold text-emerald-600">
            ${calcularPrecioTotal().toLocaleString()}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Procesando..." : "Confirmar Reserva"}
      </button>
    </form>
  );
}
