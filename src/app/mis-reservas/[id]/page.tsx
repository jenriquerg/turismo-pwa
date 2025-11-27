"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loading from "@/components/layout/Loading";
import { getUser } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import type { Reserva, Alojamiento, Alimento, Experiencia } from "@/types";

export default function DetalleReservaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [servicio, setServicio] = useState<Alojamiento | Alimento | Experiencia | null>(null);
  const [cancelando, setCancelando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificar autenticación
        const currentUser = await getUser();
        if (!currentUser) {
          router.push("/login");
          return;
        }

        // Obtener reserva
        const resReserva = await fetch(`/api/reservas?id=${params.id}`);
        if (!resReserva.ok) {
          throw new Error("No se pudo cargar la reserva");
        }
        const dataReserva = await resReserva.json();

        if (!dataReserva.success || !dataReserva.data) {
          throw new Error("Reserva no encontrada");
        }

        const reservaData = dataReserva.data;

        // Verificar que la reserva pertenece al usuario
        if (reservaData.user_id !== currentUser.id) {
          router.push("/mis-reservas");
          return;
        }

        setReserva(reservaData);

        // Obtener detalles del servicio según el tipo
        let endpoint = "";
        switch (reservaData.tipo_servicio) {
          case "alojamiento":
            endpoint = `/api/alojamientos?id=${reservaData.servicio_id}`;
            break;
          case "alimento":
            endpoint = `/api/alimentos?id=${reservaData.servicio_id}`;
            break;
          case "experiencia":
            endpoint = `/api/experiencias?id=${reservaData.servicio_id}`;
            break;
          default:
            throw new Error("Tipo de servicio desconocido");
        }

        const resServicio = await fetch(endpoint);
        if (resServicio.ok) {
          const dataServicio = await resServicio.json();
          if (dataServicio.success && dataServicio.data) {
            setServicio(dataServicio.data);
          }
        }
      } catch (error) {
        console.error("Error al cargar detalle de reserva:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const handleCancelar = async () => {
    if (!reserva) return;

    if (!confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      return;
    }

    setCancelando(true);
    try {
      const res = await fetch("/api/reservas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: reserva.id,
          estado: "cancelada",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReserva({ ...reserva, estado: "cancelada" });
        toast.success("Reserva cancelada exitosamente");
      } else {
        toast.error(data.error || "Error al cancelar la reserva");
      }
    } catch {
      toast.error("Error al cancelar la reserva");
    } finally {
      setCancelando(false);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "confirmada":
      case "pagada":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completada":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelada":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "alojamiento":
        return "🏠";
      case "alimento":
        return "🍽️";
      case "experiencia":
        return "🚵";
      default:
        return "📦";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (!reserva) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Reserva no encontrada
          </h1>
          <Link
            href="/mis-reservas"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            ← Volver a mis reservas
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const servicioTitulo = servicio
    ? "titulo" in servicio
      ? servicio.titulo
      : "nombre" in servicio
      ? servicio.nombre
      : "Servicio"
    : "Servicio";

  const servicioImagen = servicio?.imagenes?.[0] || "/placeholder-servicio.jpg";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header con breadcrumb */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/mis-reservas"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-2 inline-block"
            >
              ← Volver a mis reservas
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Detalle de Reserva
            </h1>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border capitalize ${getEstadoColor(
              reserva.estado
            )}`}
          >
            {reserva.estado}
          </span>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Imagen del servicio */}
          {servicio && (
            <div className="relative h-64 bg-gray-200">
              <img
                src={servicioImagen}
                alt={servicioTitulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                <span className="text-2xl mr-2">{getTipoIcon(reserva.tipo_servicio)}</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {reserva.tipo_servicio}
                </span>
              </div>
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* Información del servicio */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {servicioTitulo}
              </h2>
              {servicio && "descripcion" in servicio && (
                <p className="text-gray-600">{servicio.descripcion}</p>
              )}
            </div>

            {/* Grid de información */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Fechas */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">📅 Fechas</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Inicio:</span>
                    <p className="text-gray-900">{formatDate(reserva.fecha_inicio)}</p>
                  </div>
                  {reserva.fecha_fin && (
                    <div>
                      <span className="font-medium text-gray-700">Fin:</span>
                      <p className="text-gray-900">{formatDate(reserva.fecha_fin)}</p>
                    </div>
                  )}
                  {reserva.fecha_fin && (
                    <div>
                      <span className="font-medium text-gray-700">Duración:</span>
                      <p className="text-gray-900">
                        {Math.ceil(
                          (new Date(reserva.fecha_fin).getTime() -
                            new Date(reserva.fecha_inicio).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        {reserva.tipo_servicio === "alojamiento" ? "noches" : "días"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Detalles de reserva */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">👥 Detalles</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Personas:</span>
                    <p className="text-gray-900">{reserva.cantidad_personas}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Precio total:</span>
                    <p className="text-2xl font-bold text-emerald-600">
                      ${reserva.precio_total.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">ID de Reserva:</span>
                    <p className="text-gray-500 text-xs font-mono">{reserva.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notas */}
            {reserva.notas && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📝 Notas</h3>
                <p className="text-gray-700 text-sm">{reserva.notas}</p>
              </div>
            )}

            {/* Información del servicio adicional */}
            {servicio && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ℹ️ Información del Servicio
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {"ubicacion" in servicio && (
                    <div>
                      <span className="font-medium text-gray-700">📍 Ubicación:</span>
                      <p className="text-gray-900">{servicio.ubicacion}</p>
                    </div>
                  )}
                  {"capacidad" in servicio && (
                    <div>
                      <span className="font-medium text-gray-700">👥 Capacidad:</span>
                      <p className="text-gray-900">{servicio.capacidad} personas</p>
                    </div>
                  )}
                  {"capacidad_maxima" in servicio && (
                    <div>
                      <span className="font-medium text-gray-700">👥 Capacidad máxima:</span>
                      <p className="text-gray-900">{servicio.capacidad_maxima} personas</p>
                    </div>
                  )}
                  {"duracion_horas" in servicio && (
                    <div>
                      <span className="font-medium text-gray-700">⏱️ Duración:</span>
                      <p className="text-gray-900">{servicio.duracion_horas} horas</p>
                    </div>
                  )}
                  {"horario_recogida" in servicio && servicio.horario_recogida && (
                    <div>
                      <span className="font-medium text-gray-700">🕐 Horario de recogida:</span>
                      <p className="text-gray-900">{servicio.horario_recogida}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Historial */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Historial</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Creada:</span> {formatDate(reserva.created_at)}{" "}
                  a las {formatTime(reserva.created_at)}
                </p>
                <p>
                  <span className="font-medium">Última actualización:</span>{" "}
                  {formatDate(reserva.updated_at)} a las {formatTime(reserva.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h3>
          <div className="flex flex-wrap gap-3">
            {/* Cancelar reserva (solo si está pendiente o confirmada) */}
            {(reserva.estado === "pendiente" || reserva.estado === "confirmada") && (
              <button
                onClick={handleCancelar}
                disabled={cancelando}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelando ? "Cancelando..." : "Cancelar Reserva"}
              </button>
            )}

            {/* Dejar reseña (solo si está completada) */}
            {reserva.estado === "completada" && (
              <Link
                href={`/${reserva.tipo_servicio}s/${reserva.servicio_id}#resenas`}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Dejar Reseña
              </Link>
            )}

            {/* Ver servicio */}
            {servicio && (
              <Link
                href={`/${reserva.tipo_servicio}s/${reserva.servicio_id}`}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Ver Servicio
              </Link>
            )}

            {/* Contactar soporte */}
            <a
              href="mailto:soporte@turiexpress.com"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Contactar Soporte
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
