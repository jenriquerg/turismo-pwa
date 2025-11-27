"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ServiceForm from "@/components/forms/ServiceForm";
import { getCurrentUser } from "@/lib/auth";
import type { Alojamiento, Alimento, Experiencia } from "@/types";
import { useToast } from "@/hooks/useToast";

type ServiceType = "alojamiento" | "alimento" | "experiencia";
type ServiceData = Alojamiento | Alimento | Experiencia;

export default function EditarServicioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string; user_type?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [service, setService] = useState<ServiceData | null>(null);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push("/login");
        return;
      }

      if (currentUser.user_metadata?.user_type !== "proveedor") {
        toast.error("Solo los proveedores pueden editar servicios");
        router.push("/dashboard");
        return;
      }

      setUser(currentUser);

      // Intentar cargar el servicio desde cada endpoint
      try {
        // Intentar alojamiento
        let res = await fetch(`/api/alojamientos?id=${id}`);
        let data = await res.json();

        if (data.success && data.data) {
          setService(data.data);
          setServiceType("alojamiento");
          setLoading(false);
          return;
        }

        // Intentar alimento
        res = await fetch(`/api/alimentos?id=${id}`);
        data = await res.json();

        if (data.success && data.data) {
          setService(data.data);
          setServiceType("alimento");
          setLoading(false);
          return;
        }

        // Intentar experiencia
        res = await fetch(`/api/experiencias?id=${id}`);
        data = await res.json();

        if (data.success && data.data) {
          setService(data.data);
          setServiceType("experiencia");
          setLoading(false);
          return;
        }

        // No se encontró el servicio
        toast.error("Servicio no encontrado");
        router.push("/mis-servicios");
      } catch {
        toast.error("Error al cargar el servicio");
        router.push("/mis-servicios");
      }
    }

    loadData();
  }, [id, router]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!user || !serviceType) return;

    setUpdating(true);

    try {
      const endpoint =
        serviceType === "alojamiento"
          ? "alojamientos"
          : serviceType === "alimento"
          ? "alimentos"
          : "experiencias";

      const response = await fetch(`/api/${endpoint}?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("¡Servicio actualizado exitosamente!");
        router.push("/mis-servicios");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al actualizar el servicio");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!serviceType) return;

    if (!confirm("¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.")) {
      return;
    }

    setDeleting(true);

    try {
      const endpoint =
        serviceType === "alojamiento"
          ? "alojamientos"
          : serviceType === "alimento"
          ? "alimentos"
          : "experiencias";

      const response = await fetch(`/api/${endpoint}?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Servicio eliminado exitosamente");
        router.push("/mis-servicios");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch {
      toast.error("Error al eliminar el servicio");
    } finally {
      setDeleting(false);
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

  if (!service || !serviceType) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Servicio no encontrado</h1>
            <p className="text-gray-600 mb-4">El servicio que buscas no existe</p>
            <button
              onClick={() => router.push("/mis-servicios")}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Volver a Mis Servicios
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getTitulo = () => {
    if ("titulo" in service) return service.titulo;
    if ("nombre" in service) return service.nombre;
    return "Servicio";
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Servicio</h1>
          <p className="text-gray-600">
            Actualiza la información de tu servicio
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {serviceType === "alojamiento" && "🏠"}
                {serviceType === "alimento" && "🍽️"}
                {serviceType === "experiencia" && "🎨"}
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{getTitulo()}</h2>
                <p className="text-sm text-gray-600 capitalize">
                  {serviceType}
                </p>
              </div>
            </div>
          </div>

          <ServiceForm
            type={serviceType}
            initialData={service}
            onSubmit={handleSubmit}
            loading={updating}
            submitLabel="Guardar Cambios"
          />

          <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
            <button
              onClick={() => router.push("/mis-servicios")}
              disabled={updating || deleting}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={updating || deleting}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deleting ? "Eliminando..." : "Eliminar Servicio"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
