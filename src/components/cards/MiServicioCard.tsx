import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Alojamiento, Alimento, Experiencia } from "@/types";

type Service = Alojamiento | Alimento | Experiencia;

interface MiServicioCardProps {
  service: Service;
  type: "alojamiento" | "alimento" | "experiencia";
  onToggleDisponibilidad: (id: string, currentState: boolean) => void;
  onDelete: (id: string) => void;
}

export default function MiServicioCard({
  service,
  type,
  onToggleDisponibilidad,
  onDelete,
}: MiServicioCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const imagenPrincipal = service.imagenes?.[0] || "/placeholder-image.jpg";

  const getTitulo = () => {
    if ("titulo" in service) return service.titulo;
    if ("nombre" in service) return service.nombre;
    return "Sin título";
  };

  const getPrecio = () => {
    if ("precio_noche" in service) {
      return `$${service.precio_noche.toLocaleString()}/noche`;
    }
    return `$${service.precio.toLocaleString()}`;
  };

  const getDisponible = () => {
    if ("disponible" in service) return service.disponible;
    if ("disponibilidad" in service) return service.disponibilidad;
    return false;
  };

  const typeColors = {
    alojamiento: "bg-emerald-100 text-emerald-700 border-emerald-200",
    alimento: "bg-orange-100 text-orange-700 border-orange-200",
    experiencia: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const typeLabels = {
    alojamiento: "Alojamiento",
    alimento: "Alimento",
    experiencia: "Experiencia",
  };

  const handleDelete = () => {
    onDelete(service.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Imagen */}
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={imagenPrincipal}
          alt={getTitulo()}
          fill
          className="object-cover"
          unoptimized
        />
        {/* Badge de tipo */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${typeColors[type]}`}>
            {typeLabels[type]}
          </span>
        </div>
        {/* Badge de disponibilidad */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              getDisponible()
                ? "bg-emerald-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {getDisponible() ? "Disponible" : "No disponible"}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {getTitulo()}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {service.descripcion}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-gray-900">{getPrecio()}</span>
        </div>

        {/* Acciones */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/mis-servicios/${service.id}/editar`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
            >
              Editar
            </Link>
            <button
              onClick={() => onToggleDisponibilidad(service.id, getDisponible())}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                getDisponible()
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              {getDisponible() ? "Desactivar" : "Activar"}
            </button>
          </div>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirmar eliminación
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar &quot;{getTitulo()}&quot;? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
