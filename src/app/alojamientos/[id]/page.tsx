"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ReservaForm, { type ReservaFormData } from "@/components/forms/ReservaForm";
import ResenaCard from "@/components/cards/ResenaCard";
import ResenaForm, { type ResenaFormData } from "@/components/forms/ResenaForm";
import { getCurrentUser } from "@/lib/auth";
import type { Alojamiento, Resena } from "@/types";

export default function AlojamientoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [alojamiento, setAlojamiento] = useState<Alojamiento | null>(null);
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
        const [alojamientoRes, resenasRes] = await Promise.all([
          fetch(`/api/alojamientos?id=${params.id}`),
          fetch(`/api/resenas?servicioId=${params.id}`),
        ]);

        const alojamientoData = await alojamientoRes.json();
        const resenasData = await resenasRes.json();

        if (alojamientoData.success) {
          setAlojamiento(alojamientoData.data);
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
  }, [params.id]);

  const handleReserva = async (data: ReservaFormData) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setReserving(true);

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_servicio: "alojamiento",
          servicio_id: params.id,
          user_id: user.id,
          fecha_inicio: data.fecha_inicio,
          fecha_fin: data.fecha_fin,
          cantidad_personas: data.cantidad_personas,
          precio_total:
            alojamiento!.precio_noche *
            Math.ceil(
              (new Date(data.fecha_fin!).getTime() - new Date(data.fecha_inicio).getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          notas: data.notas,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("¡Reserva creada exitosamente!");
        router.push("/mis-reservas");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("Error al crear la reserva");
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
          servicio_id: params.id,
          tipo_servicio: "alojamiento",
          user_id: user.id,
          calificacion: data.calificacion,
          comentario: data.comentario,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("¡Reseña publicada exitosamente!");
        setShowResenaForm(false);
        // Recargar reseñas
        const resenasRes = await fetch(`/api/resenas?servicioId=${params.id}`);
        const resenasData = await resenasRes.json();
        if (resenasData.success) {
          setResenas(resenasData.data);
        }
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("Error al publicar la reseña");
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

  if (!alojamiento) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Alojamiento no encontrado
            </h2>
            <button
              onClick={() => router.push("/alojamientos")}
              className="text-emerald-600 hover:text-emerald-700"
            >
              ← Volver a alojamientos
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const imagenPrincipal = alojamiento.imagenes?.[0] || "/placeholder-image.jpg";
  const promedioCalificacion =
    resenas.length > 0
      ? (resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length).toFixed(1)
      : "N/A";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/alojamientos")}
          className="flex items-center text-gray-600 hover:text-emerald-600 mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a alojamientos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative h-96 w-full bg-gray-200 rounded-xl overflow-hidden mb-6">
              <Image
                src={imagenPrincipal}
                alt={alojamiento.titulo}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Title and Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {alojamiento.titulo}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {alojamiento.ubicacion}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {alojamiento.capacidad} personas
                    </span>
                    <span className="flex items-center">
                      ⭐ {promedioCalificacion} ({resenas.length})
                    </span>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    alojamiento.disponible
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {alojamiento.disponible ? "Disponible" : "No disponible"}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">{alojamiento.descripcion}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Reseñas ({resenas.length})
                </h2>
                {user && (
                  <button
                    onClick={() => setShowResenaForm(!showResenaForm)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    {showResenaForm ? "Cancelar" : "Dejar reseña"}
                  </button>
                )}
              </div>

              {showResenaForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <ResenaForm onSubmit={handleResena} loading={reviewing} />
                </div>
              )}

              {resenas.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No hay reseñas todavía. ¡Sé el primero en dejar una!
                </p>
              ) : (
                <div className="space-y-4">
                  {resenas.map((resena) => (
                    <ResenaCard key={resena.id} resena={resena} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reservation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  ${alojamiento.precio_noche.toLocaleString()}
                </span>
                <span className="text-gray-600"> / noche</span>
              </div>

              {alojamiento.disponible ? (
                user ? (
                  <ReservaForm
                    precioBase={alojamiento.precio_noche}
                    onSubmit={handleReserva}
                    tipo="alojamiento"
                    loading={reserving}
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Inicia sesión para hacer una reserva
                    </p>
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                )
              ) : (
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-gray-700 font-medium">
                    Este alojamiento no está disponible actualmente
                  </p>
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
