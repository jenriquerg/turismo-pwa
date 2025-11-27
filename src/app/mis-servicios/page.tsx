"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import MiServicioCard from "@/components/cards/MiServicioCard";
import { getCurrentUser } from "@/lib/auth";
import type { Alojamiento, Alimento, Experiencia } from "@/types";
import { useToast } from "@/hooks/useToast";

type TabType = "todos" | "alojamientos" | "alimentos" | "experiencias";

export default function MisServiciosPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("todos");

  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (currentUser.user_metadata?.user_type !== "proveedor") {
        toast.error("Solo los proveedores pueden acceder a esta página");
        router.push("/dashboard");
        return;
      }

      setUser(currentUser);

      try {
        const [alojamientosRes, alimentosRes, experienciasRes] = await Promise.all([
          fetch(`/api/alojamientos?userId=${currentUser.id}`),
          fetch(`/api/alimentos?userId=${currentUser.id}`),
          fetch(`/api/experiencias?userId=${currentUser.id}`),
        ]);

        const alojamientosData = await alojamientosRes.json();
        const alimentosData = await alimentosRes.json();
        const experienciasData = await experienciasRes.json();

        if (alojamientosData.success) {
          setAlojamientos(alojamientosData.data);
        }

        if (alimentosData.success) {
          setAlimentos(alimentosData.data);
        }

        if (experienciasData.success) {
          setExperiencias(experienciasData.data);
        }
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  const handleToggleDisponibilidad = async (
    id: string,
    currentState: boolean,
    type: "alojamiento" | "alimento" | "experiencia"
  ) => {
    try {
      const endpoint = type === "alojamiento" ? "alojamientos" : type === "alimento" ? "alimentos" : "experiencias";
      const field = type === "alimento" ? "disponibilidad" : "disponible";

      const response = await fetch(`/api/${endpoint}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !currentState }),
      });

      const result = await response.json();

      if (result.success) {
        // Actualizar estado local
        if (type === "alojamiento") {
          setAlojamientos((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, disponible: !currentState } : item
            )
          );
        } else if (type === "alimento") {
          setAlimentos((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, disponibilidad: !currentState } : item
            )
          );
        } else {
          setExperiencias((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, disponible: !currentState } : item
            )
          );
        }
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al actualizar disponibilidad");
    }
  };

  const handleDelete = async (id: string, type: "alojamiento" | "alimento" | "experiencia") => {
    try {
      const endpoint = type === "alojamiento" ? "alojamientos" : type === "alimento" ? "alimentos" : "experiencias";

      const response = await fetch(`/api/${endpoint}?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        // Eliminar del estado local
        if (type === "alojamiento") {
          setAlojamientos((prev) => prev.filter((item) => item.id !== id));
        } else if (type === "alimento") {
          setAlimentos((prev) => prev.filter((item) => item.id !== id));
        } else {
          setExperiencias((prev) => prev.filter((item) => item.id !== id));
        }
        toast.success("Servicio eliminado exitosamente");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al eliminar servicio");
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

  const totalServicios = alojamientos.length + alimentos.length + experiencias.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Servicios</h1>
            <p className="text-gray-600">
              Gestiona tus alojamientos, alimentos y experiencias
            </p>
          </div>
          <Link
            href="/mis-servicios/nuevo"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear Servicio
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{totalServicios}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Alojamientos</p>
            <p className="text-2xl font-bold text-emerald-600">{alojamientos.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Alimentos</p>
            <p className="text-2xl font-bold text-orange-600">{alimentos.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Experiencias</p>
            <p className="text-2xl font-bold text-blue-600">{experiencias.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("todos")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "todos"
                  ? "border-b-2 border-emerald-600 text-emerald-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Todos ({totalServicios})
            </button>
            <button
              onClick={() => setActiveTab("alojamientos")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "alojamientos"
                  ? "border-b-2 border-emerald-600 text-emerald-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Alojamientos ({alojamientos.length})
            </button>
            <button
              onClick={() => setActiveTab("alimentos")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "alimentos"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Alimentos ({alimentos.length})
            </button>
            <button
              onClick={() => setActiveTab("experiencias")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "experiencias"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Experiencias ({experiencias.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {totalServicios === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes servicios aún
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza creando tu primer servicio para que los turistas puedan encontrarte
            </p>
            <Link
              href="/mis-servicios/nuevo"
              className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Crear mi primer servicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Alojamientos */}
            {(activeTab === "todos" || activeTab === "alojamientos") &&
              alojamientos.map((alojamiento) => (
                <MiServicioCard
                  key={alojamiento.id}
                  service={alojamiento}
                  type="alojamiento"
                  onToggleDisponibilidad={(id, currentState) =>
                    handleToggleDisponibilidad(id, currentState, "alojamiento")
                  }
                  onDelete={(id) => handleDelete(id, "alojamiento")}
                />
              ))}

            {/* Alimentos */}
            {(activeTab === "todos" || activeTab === "alimentos") &&
              alimentos.map((alimento) => (
                <MiServicioCard
                  key={alimento.id}
                  service={alimento}
                  type="alimento"
                  onToggleDisponibilidad={(id, currentState) =>
                    handleToggleDisponibilidad(id, currentState, "alimento")
                  }
                  onDelete={(id) => handleDelete(id, "alimento")}
                />
              ))}

            {/* Experiencias */}
            {(activeTab === "todos" || activeTab === "experiencias") &&
              experiencias.map((experiencia) => (
                <MiServicioCard
                  key={experiencia.id}
                  service={experiencia}
                  type="experiencia"
                  onToggleDisponibilidad={(id, currentState) =>
                    handleToggleDisponibilidad(id, currentState, "experiencia")
                  }
                  onDelete={(id) => handleDelete(id, "experiencia")}
                />
              ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
