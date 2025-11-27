"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ReservaForm, { type ReservaFormData } from "@/components/forms/ReservaForm";
import ResenaCard from "@/components/cards/ResenaCard";
import ResenaForm, { type ResenaFormData } from "@/components/forms/ResenaForm";
import { getCurrentUser } from "@/lib/auth";
import type { Experiencia, Resena } from "@/types";
import { useToast } from "@/hooks/useToast";

export default function ExperienciaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [experiencia, setExperiencia] = useState<Experiencia | null>(null);
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string; user_type?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [showResenaForm, setShowResenaForm] = useState(false);

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      try {
        const [experienciaRes, resenasRes] = await Promise.all([
          fetch(`/api/experiencias?id=${id}`),
          fetch(`/api/resenas?servicioId=${id}`),
        ]);

        const experienciaData = await experienciaRes.json();
        const resenasData = await resenasRes.json();

        if (experienciaData.success) {
          setExperiencia(experienciaData.data);
        }

        if (resenasData.success) {
          setResenas(resenasData.data);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleReserva = async (data: ReservaFormData) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (experiencia && data.cantidad_personas > experiencia.capacidad_maxima) {
      toast.error(`La capacidad máxima es de ${experiencia.capacidad_maxima} personas`);
      return;
    }

    setReserving(true);

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_servicio: "experiencia",
          servicio_id: id,
          user_id: user.id,
          fecha_inicio: data.fecha_inicio,
          fecha_fin: null, // Experiencias no tienen fecha_fin
          cantidad_personas: data.cantidad_personas,
          precio_total: experiencia!.precio * data.cantidad_personas,
          notas: data.notas,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("¡Reserva creada exitosamente!");
        router.push("/mis-reservas");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al crear la reserva");
    } finally {
      setReserving(false);
    }
  };

  const handleResena = async (data: ResenaFormData) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setReviewing(true);

    try {
      const response = await fetch("/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicio_id: id,
          tipo_servicio: "experiencia",
          user_id: user.id,
          calificacion: data.calificacion,
          comentario: data.comentario,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("¡Reseña publicada exitosamente!");
        setShowResenaForm(false);
        // Recargar reseñas
        const resenasRes = await fetch(`/api/resenas?servicioId=${id}`);
        const resenasData = await resenasRes.json();
        if (resenasData.success) {
          setResenas(resenasData.data);
        }
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al publicar la reseña");
    } finally {
      setReviewing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  }

  if (!experiencia) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Experiencia no encontrada</h1>
            <p className="text-gray-600 mb-4">La experiencia que buscas no existe</p>
            <button
              onClick={() => router.push("/experiencias")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Ver todas las experiencias
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const promedioCalificacion =
    resenas.length > 0
      ? resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length
      : 0;

  const tipoLabels: Record<string, string> = {
    senderismo: "Senderismo",
    ciclismo: "Ciclismo",
    cultural: "Cultural",
    gastronomica: "Gastronómica",
    aventura: "Aventura",
  };

  const tipoColors: Record<string, string> = {
    senderismo: "bg-green-100 text-green-700",
    ciclismo: "bg-yellow-100 text-yellow-700",
    cultural: "bg-purple-100 text-purple-700",
    gastronomica: "bg-orange-100 text-orange-700",
    aventura: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <button onClick={() => router.push("/experiencias")} className="hover:text-blue-600">
            Experiencias
          </button>
          <span className="mx-2">/</span>
          <span>{experiencia.titulo}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imagen Principal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative h-96 w-full bg-gray-200">
                <Image
                  src={experiencia.imagenes?.[0] || "/placeholder-experience.jpg"}
                  alt={experiencia.titulo}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Información Principal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{experiencia.titulo}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      ⭐ {promedioCalificacion > 0 ? promedioCalificacion.toFixed(1) : "Sin calificación"}
                    </span>
                    <span>•</span>
                    <span>{resenas.length} reseña{resenas.length !== 1 && "s"}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${tipoColors[experiencia.tipo]}`}
                  >
                    {tipoLabels[experiencia.tipo]}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                      experiencia.disponible
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {experiencia.disponible ? "Disponible" : "No disponible"}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h2>
                <p className="text-gray-600 leading-relaxed">{experiencia.descripcion}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Detalles</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm text-gray-600">Ubicación</p>
                      <p className="font-semibold text-gray-900">{experiencia.ubicacion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="text-sm text-gray-600">Duración</p>
                      <p className="font-semibold text-gray-900">
                        {experiencia.duracion_horas} hora{experiencia.duracion_horas !== 1 && "s"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="text-sm text-gray-600">Capacidad máxima</p>
                      <p className="font-semibold text-gray-900">
                        {experiencia.capacidad_maxima} personas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-sm text-gray-600">Precio</p>
                      <p className="font-semibold text-gray-900">
                        ${experiencia.precio.toLocaleString()}/persona
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Reseñas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Reseñas ({resenas.length})
                </h2>
                {user && !showResenaForm && (
                  <button
                    onClick={() => setShowResenaForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Dejar reseña
                  </button>
                )}
              </div>

              {showResenaForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <ResenaForm onSubmit={handleResena} loading={reviewing} />
                  <button
                    onClick={() => setShowResenaForm(false)}
                    className="mt-3 text-sm text-gray-600 hover:text-gray-900"
                  >
                    Cancelar
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {resenas.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aún no hay reseñas. ¡Sé el primero en dejar una!
                  </p>
                ) : (
                  resenas.map((resena) => <ResenaCard key={resena.id} resena={resena} />)
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Formulario de Reserva */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${experiencia.precio.toLocaleString()}
                </span>
                <span className="text-gray-600 ml-2">por persona</span>
              </div>

              {experiencia.disponible ? (
                user ? (
                  <ReservaForm
                    onSubmit={handleReserva}
                    loading={reserving}
                    precioBase={experiencia.precio}
                    tipo="experiencia"
                    capacidadMaxima={experiencia.capacidad_maxima}
                  />
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">Inicia sesión para hacer una reserva</p>
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                )
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600">Esta experiencia no está disponible actualmente</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
