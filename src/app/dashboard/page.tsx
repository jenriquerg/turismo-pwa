"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ServiceCard from "@/components/cards/ServiceCard";
import ReservaCard from "@/components/cards/ReservaCard";
import { getCurrentUser } from "@/lib/auth";
import type { Alojamiento, Experiencia, Reserva } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string; user_type?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [serviciosDestacados, setServiciosDestacados] = useState<Alojamiento[]>([]);
  const [experienciasDestacadas, setExperienciasDestacadas] = useState<Experiencia[]>([]);
  const [reservasActivas, setReservasActivas] = useState<Reserva[]>([]);

  // Estadísticas del proveedor
  const [totalServicios, setTotalServicios] = useState(0);
  const [calificacionPromedio, setCalificacionPromedio] = useState<number | null>(null);

  // Estadísticas del turista
  const [totalReservas, setTotalReservas] = useState(0);
  const [totalResenas, setTotalResenas] = useState(0);

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      const userType = currentUser.user_metadata?.user_type || "turista";

      // Cargar datos según tipo de usuario
      try {
        if (userType === "proveedor") {
          // Estadísticas de proveedor
          const [alojamientosRes, alimentosRes, experienciasRes, reservasRes, resenasRes] = await Promise.all([
            fetch(`/api/alojamientos?userId=${currentUser.id}`),
            fetch(`/api/alimentos?userId=${currentUser.id}`),
            fetch(`/api/experiencias?userId=${currentUser.id}`),
            fetch(`/api/reservas?userId=${currentUser.id}&activas=true`),
            fetch(`/api/resenas?userId=${currentUser.id}`),
          ]);

          const alojamientosData = await alojamientosRes.json();
          const alimentosData = await alimentosRes.json();
          const experienciasData = await experienciasRes.json();
          const reservasData = await reservasRes.json();
          const resenasData = await resenasRes.json();

          // Calcular total de servicios
          const totalAlojamientos = alojamientosData.success ? alojamientosData.data.length : 0;
          const totalAlimentos = alimentosData.success ? alimentosData.data.length : 0;
          const totalExperiencias = experienciasData.success ? experienciasData.data.length : 0;
          setTotalServicios(totalAlojamientos + totalAlimentos + totalExperiencias);

          // Calcular calificación promedio
          if (resenasData.success && resenasData.data.length > 0) {
            const sumCalificaciones = resenasData.data.reduce((sum: number, resena: { calificacion: number }) => sum + resena.calificacion, 0);
            setCalificacionPromedio(parseFloat((sumCalificaciones / resenasData.data.length).toFixed(1)));
          }

          // Reservas activas
          if (reservasData.success) {
            setReservasActivas(reservasData.data);
          }
        } else {
          // Estadísticas y datos de turista
          const [alojamientosRes, experienciasRes, reservasRes, resenasRes, reservasActivasRes] = await Promise.all([
            fetch("/api/alojamientos?disponible=true"),
            fetch("/api/experiencias?disponible=true"),
            fetch(`/api/reservas?userId=${currentUser.id}`),
            fetch(`/api/resenas?userId=${currentUser.id}`),
            fetch(`/api/reservas?userId=${currentUser.id}&activas=true`),
          ]);

          const alojamientosData = await alojamientosRes.json();
          const experienciasData = await experienciasRes.json();
          const reservasData = await reservasRes.json();
          const resenasData = await resenasRes.json();
          const reservasActivasData = await reservasActivasRes.json();

          // Servicios destacados
          if (alojamientosData.success) {
            setServiciosDestacados(alojamientosData.data.slice(0, 3));
          }

          if (experienciasData.success) {
            setExperienciasDestacadas(experienciasData.data.slice(0, 3));
          }

          // Estadísticas de turista
          if (reservasData.success) {
            setTotalReservas(reservasData.data.length);
          }

          if (resenasData.success) {
            setTotalResenas(resenasData.data.length);
          }

          // Reservas activas
          if (reservasActivasData.success) {
            setReservasActivas(reservasActivasData.data);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }

      setLoading(false);
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  }

  const userType = user?.user_metadata?.user_type || "turista";
  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Usuario";

  if (userType === "proveedor") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Bienvenido, {userName}
            </h1>
            <p className="text-gray-600 mt-2">Panel de Control - Proveedor</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mis Servicios</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-2">{totalServicios}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reservas Activas</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{reservasActivas.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Calificación</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {calificacionPromedio !== null ? (
                      <span className="flex items-center gap-1">
                        {calificacionPromedio}
                        <span className="text-base">⭐</span>
                      </span>
                    ) : (
                      <span className="text-lg text-gray-400">Sin reseñas</span>
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/mis-servicios/nuevo"
                className="flex items-center justify-center px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Nuevo Servicio
              </Link>
              <Link
                href="/mis-servicios"
                className="flex items-center justify-center px-6 py-4 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Ver Mis Servicios
              </Link>
              <Link
                href="/mis-reservas"
                className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver Reservas
              </Link>
            </div>
          </div>

          {/* Recent Reservations */}
          {reservasActivas.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Reservas Recientes</h2>
                <Link href="/mis-reservas" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  Ver todas →
                </Link>
              </div>
              <div className="space-y-4">
                {reservasActivas.slice(0, 3).map((reserva) => (
                  <ReservaCard key={reserva.id} reserva={reserva} />
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    );
  }

  // Dashboard para Turistas
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Hola, {userName}! 👋
          </h1>
          <p className="text-gray-600 mt-2">¿Qué te gustaría hacer hoy?</p>
        </div>

        {/* Stats Cards para Turista */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mis Reservas</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{totalReservas}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reservas Activas</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{reservasActivas.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎫</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reseñas Publicadas</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{totalResenas}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/alojamientos"
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="text-xl font-semibold mb-2">Alojamientos</h3>
            <p className="text-emerald-100 text-sm">
              Encuentra el lugar perfecto para quedarte
            </p>
          </Link>

          <Link
            href="/alimentos"
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-3">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">Alimentos</h3>
            <p className="text-orange-100 text-sm">
              Descubre sabores locales auténticos
            </p>
          </Link>

          <Link
            href="/experiencias"
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-3">🚵</div>
            <h3 className="text-xl font-semibold mb-2">Experiencias</h3>
            <p className="text-blue-100 text-sm">
              Vive aventuras inolvidables
            </p>
          </Link>
        </div>

        {/* Active Reservations */}
        {reservasActivas.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Mis Reservas Activas</h2>
              <Link href="/mis-reservas" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                Ver todas →
              </Link>
            </div>
            <div className="space-y-4">
              {reservasActivas.slice(0, 3).map((reserva) => (
                <ReservaCard key={reserva.id} reserva={reserva} />
              ))}
            </div>
          </div>
        )}

        {/* Featured Alojamientos */}
        {serviciosDestacados.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Alojamientos Destacados</h2>
              <Link href="/alojamientos" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviciosDestacados.map((alojamiento) => (
                <ServiceCard key={alojamiento.id} service={alojamiento} type="alojamiento" />
              ))}
            </div>
          </div>
        )}

        {/* Featured Experiencias */}
        {experienciasDestacadas.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Experiencias Populares</h2>
              <Link href="/experiencias" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                Ver todas →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experienciasDestacadas.map((experiencia) => (
                <ServiceCard key={experiencia.id} service={experiencia} type="experiencia" />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
