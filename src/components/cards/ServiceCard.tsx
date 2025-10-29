import Link from "next/link";
import Image from "next/image";
import type { Alojamiento, Alimento, Experiencia } from "@/types";

type Service = Alojamiento | Alimento | Experiencia;

interface ServiceCardProps {
  service: Service;
  type: "alojamiento" | "alimento" | "experiencia";
}

export default function ServiceCard({ service, type }: ServiceCardProps) {
  const imagenPrincipal = service.imagenes?.[0] || '/placeholder-image.jpg';

  const getPrecio = () => {
    if ('precio_noche' in service) {
      return `$${service.precio_noche.toLocaleString()}/noche`;
    }
    return `$${service.precio.toLocaleString()}`;
  };

  const getSubtitle = () => {
    if (type === 'alojamiento' && 'capacidad' in service) {
      return `${service.capacidad} personas • ${service.ubicacion}`;
    }
    if (type === 'experiencia' && 'duracion_horas' in service) {
      return `${service.duracion_horas}h • ${service.ubicacion}`;
    }
    if (type === 'alimento' && 'horario_recogida' in service) {
      return service.horario_recogida || 'Disponible';
    }
    return '';
  };

  const getTitulo = () => {
    if ('titulo' in service) return service.titulo;
    if ('nombre' in service) return service.nombre;
    return 'Sin título';
  };

  const href = `/${type}s/${service.id}`;

  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 h-full">
        {/* Imagen */}
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={imagenPrincipal}
            alt={getTitulo()}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Badge de disponibilidad */}
          {('disponible' in service || 'disponibilidad' in service) && (
            <div className="absolute top-3 right-3">
              {'disponible' in service ? (
                service.disponible ? (
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                    Disponible
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                    No disponible
                  </span>
                )
              ) : 'disponibilidad' in service && service.disponibilidad ? (
                <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                  Disponible
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                  No disponible
                </span>
              )}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {getTitulo()}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {getSubtitle()}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {service.descripcion}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-emerald-600">
              {getPrecio()}
            </span>
            <span className="text-sm text-emerald-600 font-medium hover:underline">
              Ver detalles →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
