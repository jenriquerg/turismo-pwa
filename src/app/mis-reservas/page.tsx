"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ReservaCard from "@/components/cards/ReservaCard";
import { getCurrentUser } from "@/lib/auth";
import type { Reserva } from "@/types";
import { useToast } from "@/hooks/useToast";

export default function MisReservasPage() {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { name?: string; user_type?: string } } | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filteredReservas, setFilteredReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"todas" | "activas" | "pasadas" | "canceladas">("todas");

  useEffect(() => {
    async function loadData() {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      try {
        const res = await fetch(`/api/reservas?userId=${currentUser.id}`);
        const data = await res.json();

        if (data.success) {
          setReservas(data.data);
          setFilteredReservas(data.data);
        }
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  useEffect(() => {
    let filtered = [...reservas];

    switch (activeTab) {
      case "activas":
        filtered = reservas.filter((r) => ["pendiente", "confirmada", "pagada"].includes(r.estado));
        break;
      case "pasadas":
        filtered = reservas.filter((r) => r.estado === "completada");
        break;
      case "canceladas":
        filtered = reservas.filter((r) => r.estado === "cancelada");
        break;
      default:
        // "todas" excluye las canceladas
        filtered = reservas.filter((r) => r.estado !== "cancelada");
    }

    setFilteredReservas(filtered);
  }, [activeTab, reservas]);

  const handleCancel = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      return;
    }

    if (!user) return;

    try {
      const res = await fetch(`/api/reservas?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado: "cancelada",
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Actualizar la lista de reservas
        const updatedRes = await fetch(`/api/reservas?userId=${user.id}`);
        const updatedData = await updatedRes.json();

        if (updatedData.success) {
          setReservas(updatedData.data);
        }

        toast.success("Reserva cancelada exitosamente");
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch {
      toast.error("Error al cancelar la reserva");
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Reservas</h1>
          <p className="text-gray-600">Gestiona todas tus reservas en un solo lugar</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          {[
            { id: "todas", label: "Todas" },
            { id: "activas", label: "Activas" },
            { id: "pasadas", label: "Pasadas" },
            { id: "canceladas", label: "Canceladas" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "todas" | "activas" | "pasadas" | "canceladas")}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-emerald-600 border-emerald-600"
                  : "text-gray-600 border-transparent hover:text-emerald-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredReservas.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes reservas {activeTab !== "todas" && activeTab}
            </h3>
            <p className="text-gray-600 mb-6">
              Explora nuestros servicios y haz tu primera reserva
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Explorar servicios
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReservas.map((reserva) => (
              <ReservaCard key={reserva.id} reserva={reserva} onCancel={handleCancel} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
