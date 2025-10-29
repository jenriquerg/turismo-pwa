"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ServiceCard from "@/components/cards/ServiceCard";
import SearchBar from "@/components/common/SearchBar";
import type { Alimento } from "@/types";

export default function AlimentosPage() {
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [filteredAlimentos, setFilteredAlimentos] = useState<Alimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [disponibleFilter, setDisponibleFilter] = useState<boolean>(true);

  useEffect(() => {
    async function loadAlimentos() {
      try {
        const res = await fetch("/api/alimentos");
        const data = await res.json();

        if (data.success) {
          setAlimentos(data.data);
          setFilteredAlimentos(data.data);
        }
      } catch (error) {
        console.error("Error al cargar alimentos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAlimentos();
  }, []);

  useEffect(() => {
    let filtered = [...alimentos];

    // Filtrar por disponibilidad
    if (disponibleFilter) {
      filtered = filtered.filter((a) => a.disponibilidad);
    }

    setFilteredAlimentos(filtered);
  }, [alimentos, disponibleFilter]);

  const handleSearch = (query: string) => {
    const filtered = alimentos.filter(
      (a) =>
        a.nombre.toLowerCase().includes(query.toLowerCase()) ||
        a.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAlimentos(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍽️ Alimentos Disponibles
          </h1>
          <p className="text-gray-600">
            Descubre la gastronomía local y pide comida típica
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Buscar alimentos por nombre, descripción..."
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>

                {/* Disponibilidad */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={disponibleFilter}
                      onChange={(e) => setDisponibleFilter(e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Solo disponibles
                    </span>
                  </label>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setDisponibleFilter(true);
                    setFilteredAlimentos(alimentos);
                  }}
                  className="w-full px-4 py-2 text-sm text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <p className="text-sm text-gray-600 mb-4">
                {filteredAlimentos.length} alimento
                {filteredAlimentos.length !== 1 && "s"} encontrado
                {filteredAlimentos.length !== 1 && "s"}
              </p>

              {filteredAlimentos.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No se encontraron alimentos
                  </h3>
                  <p className="text-gray-600">
                    Intenta ajustar los filtros para ver más resultados
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAlimentos.map((alimento) => (
                    <ServiceCard
                      key={alimento.id}
                      service={alimento}
                      type="alimento"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
