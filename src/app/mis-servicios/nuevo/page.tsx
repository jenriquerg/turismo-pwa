"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ServiceForm from "@/components/forms/ServiceForm";
import { getCurrentUser } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";

type ServiceType = "alojamiento" | "alimento" | "experiencia";

export default function NuevoServicioPage() {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string; user_type?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null);

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (currentUser.user_metadata?.user_type !== "proveedor") {
        toast.error("Solo los proveedores pueden crear servicios");
        router.push("/dashboard");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    }

    loadData();
  }, [router, toast]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!user || !selectedType) return;

    setCreating(true);

    try {
      const endpoint =
        selectedType === "alojamiento"
          ? "alojamientos"
          : selectedType === "alimento"
          ? "alimentos"
          : "experiencias";

      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          user_id: user.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("¡Servicio creado exitosamente!");
        router.push("/mis-servicios");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al crear el servicio");
    } finally {
      setCreating(false);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/mis-servicios")}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Mis Servicios
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Servicio</h1>
          <p className="text-gray-600">
            Completa el formulario para publicar tu servicio
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {!selectedType ? (
            /* Selector de Tipo */
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ¿Qué tipo de servicio deseas crear?
              </h2>
              <p className="text-gray-600 mb-6">
                Selecciona una categoría para comenzar
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedType("alojamiento")}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center group"
                >
                  <div className="text-5xl mb-3">🏠</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Alojamiento</h3>
                  <p className="text-sm text-gray-600">
                    Casas, apartamentos, cabañas y más
                  </p>
                </button>

                <button
                  onClick={() => setSelectedType("alimento")}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-center group"
                >
                  <div className="text-5xl mb-3">🍽️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Alimento</h3>
                  <p className="text-sm text-gray-600">
                    Comida típica, platos locales y más
                  </p>
                </button>

                <button
                  onClick={() => setSelectedType("experiencia")}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                >
                  <div className="text-5xl mb-3">🎨</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Experiencia</h3>
                  <p className="text-sm text-gray-600">
                    Tours, actividades, eventos y más
                  </p>
                </button>
              </div>
            </div>
          ) : (
            /* Formulario */
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {selectedType === "alojamiento" && "🏠"}
                    {selectedType === "alimento" && "🍽️"}
                    {selectedType === "experiencia" && "🎨"}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedType === "alojamiento" && "Nuevo Alojamiento"}
                      {selectedType === "alimento" && "Nuevo Alimento"}
                      {selectedType === "experiencia" && "Nueva Experiencia"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Completa todos los campos requeridos (*)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedType(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cambiar tipo
                </button>
              </div>

              <ServiceForm
                type={selectedType}
                onSubmit={handleSubmit}
                loading={creating}
                submitLabel="Crear Servicio"
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => router.push("/mis-servicios")}
                  disabled={creating}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
