import Link from "next/link";
import type { Reserva } from "@/types";

interface ReservaCardProps {
  reserva: Reserva;
  onCancel?: (id: string) => void;
}

export default function ReservaCard({ reserva, onCancel }: ReservaCardProps) {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'confirmada':
      case 'pagada':
        return 'bg-emerald-100 text-emerald-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'completada':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'alojamiento':
        return '🏠';
      case 'alimento':
        return '🍽️';
      case 'experiencia':
        return '🚵';
      default:
        return '📦';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getTipoIcon(reserva.tipo_servicio)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Reserva de {reserva.tipo_servicio}
            </h3>
            <p className="text-sm text-gray-500">
              ID: {reserva.id.slice(0, 8)}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
            reserva.estado
          )}`}
        >
          {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {formatDate(reserva.fecha_inicio)}
            {reserva.fecha_fin && ` - ${formatDate(reserva.fecha_fin)}`}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{reserva.cantidad_personas} persona{reserva.cantidad_personas > 1 ? 's' : ''}</span>
        </div>

        {reserva.notas && (
          <p className="text-sm text-gray-500 italic">
            &quot;{reserva.notas}&quot;
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-xl font-bold text-emerald-600">
          ${reserva.precio_total.toLocaleString()}
        </span>
        <div className="flex space-x-2">
          <Link
            href={`/mis-reservas/${reserva.id}`}
            className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            Ver detalles
          </Link>
          {reserva.estado === 'pendiente' && onCancel && (
            <button
              onClick={() => onCancel(reserva.id)}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
