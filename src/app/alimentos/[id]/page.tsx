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
import type { Alimento, Resena } from "@/types";
import { useToast } from "@/hooks/useToast";

export default function AlimentoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [alimento, setAlimento] = useState<Alimento | null>(null);
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
        const [alimentoRes, resenasRes] = await Promise.all([
          fetch(`/api/alimentos?id=${id}`),
          fetch(`/api/resenas?servicioId=${id}`),
        ]);

        const alimentoData = await alimentoRes.json();
        const resenasData = await resenasRes.json();

        if (alimentoData.success) {
          setAlimento(alimentoData.data);
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

    setReserving(true);

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_servicio: "alimento",
          servicio_id: id,
          user_id: user.id,
          fecha_inicio: data.fecha_inicio,
          fecha_fin: null, // Alimentos no tienen fecha_fin
          cantidad_personas: data.cantidad_personas,
          precio_total: alimento!.precio * data.cantidad_personas,
          notas: data.notas,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("¡Pedido creado exitosamente!");
        router.push("/mis-reservas");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al crear el pedido");
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
          tipo_servicio: "alimento",
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

  if (!alimento) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Alimento no encontrado</h1>
            <p className="text-gray-600 mb-4">El alimento que buscas no existe</p>
            <button
              onClick={() => router.push("/alimentos")}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Ver todos los alimentos
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <button onClick={() => router.push("/alimentos")} className="hover:text-orange-600">
            Alimentos
          </button>
          <span className="mx-2">/</span>
          <span>{alimento.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imagen Principal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative h-96 w-full bg-gray-200">
                <Image
                  src={alimento.imagenes?.[0] || "/placeholder-food.jpg"}
                  alt={alimento.nombre}
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{alimento.nombre}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      ⭐ {promedioCalificacion > 0 ? promedioCalificacion.toFixed(1) : "Sin calificación"}
                    </span>
                    <span>•</span>
                    <span>{resenas.length} reseña{resenas.length !== 1 && "s"}</span>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    alimento.disponibilidad
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {alimento.disponibilidad ? "Disponible" : "No disponible"}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h2>
                <p className="text-gray-600 leading-relaxed">{alimento.descripcion}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Detalles</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-sm text-gray-600">Precio</p>
                      <p className="font-semibold text-gray-900">
                        ${alimento.precio.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {alimento.horario_recogida && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🕐</span>
                      <div>
                        <p className="text-sm text-gray-600">Horario de recogida</p>
                        <p className="font-semibold text-gray-900">{alimento.horario_recogida}</p>
                      </div>
                    </div>
                  )}
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
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                <span className="text-3xl font-bold text-orange-600">
                  ${alimento.precio.toLocaleString()}
                </span>
                <span className="text-gray-600 ml-2">por persona</span>
              </div>

              {alimento.disponibilidad ? (
                user ? (
                  <ReservaForm
                    onSubmit={handleReserva}
                    loading={reserving}
                    precioBase={alimento.precio}
                    tipo="alimento"
                  />
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">Inicia sesión para hacer un pedido</p>
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                )
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600">Este alimento no está disponible actualmente</p>
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
