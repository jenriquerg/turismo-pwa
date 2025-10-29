"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Loading from "@/components/common/Loading";
import ServiceCard from "@/components/cards/ServiceCard";
import SearchBar from "@/components/common/SearchBar";
import type { Experiencia } from "@/types";

export default function ExperienciasPage() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [filteredExperiencias, setFilteredExperiencias] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipoFilter, setTipoFilter] = useState<string>("");
  const [ubicacionFilter, setUbicacionFilter] = useState<string>("");
  const [capacidadFilter, setCapacidadFilter] = useState<number>(0);
  const [disponibleFilter, setDisponibleFilter] = useState<boolean>(true);

  useEffect(() => {
    async function loadExperiencias() {
      try {
        const res = await fetch("/api/experiencias");
        const data = await res.json();

        if (data.success) {
          setExperiencias(data.data);
          setFilteredExperiencias(data.data);
        }
      } catch (error) {
        console.error("Error al cargar experiencias:", error);
      } finally {
        setLoading(false);
      }
    }

    loadExperiencias();
  }, []);

  useEffect(() => {
    let filtered = [...experiencias];

    // Filtrar por tipo
    if (tipoFilter) {
      filtered = filtered.filter((e) => e.tipo === tipoFilter);
    }

    // Filtrar por ubicación
    if (ubicacionFilter) {
      filtered = filtered.filter((e) =>
        e.ubicacion.toLowerCase().includes(ubicacionFilter.toLowerCase())
      );
    }

    // Filtrar por capacidad
    if (capacidadFilter > 0) {
      filtered = filtered.filter((e) => e.capacidad_maxima >= capacidadFilter);
    }

    // Filtrar por disponibilidad
    if (disponibleFilter) {
      filtered = filtered.filter((e) => e.disponible);
    }

    setFilteredExperiencias(filtered);
  }, [experiencias, tipoFilter, ubicacionFilter, capacidadFilter, disponibleFilter]);

  const handleSearch = (query: string) => {
    const filtered = experiencias.filter(
      (e) =>
        e.titulo.toLowerCase().includes(query.toLowerCase()) ||
        e.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        e.ubicacion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredExperiencias(filtered);
  };

  const ubicaciones = Array.from(new Set(experiencias.map((e) => e.ubicacion)));
  const tipos = [
    { value: "senderismo", label: "Senderismo" },
    { value: "ciclismo", label: "Ciclismo" },
    { value: "cultural", label: "Cultural" },
    { value: "gastronomica", label: "Gastronómica" },
    { value: "aventura", label: "Aventura" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎨 Experiencias Turísticas
          </h1>
          <p className="text-gray-600">
            Vive aventuras inolvidables y conoce la cultura local
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Buscar experiencias por nombre, ubicación..."
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

                {/* Tipo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de experiencia
                  </label>
                  <select
                    value={tipoFilter}
                    onChange={(e) => setTipoFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todos los tipos</option>
                    {tipos.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ubicación */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <select
                    value={ubicacionFilter}
                    onChange={(e) => setUbicacionFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todas las ciudades</option>
                    {ubicaciones.map((ubicacion) => (
                      <option key={ubicacion} value={ubicacion}>
                        {ubicacion}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Capacidad */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidad mínima: {capacidadFilter} personas
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={capacidadFilter}
                    onChange={(e) => setCapacidadFilter(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Disponibilidad */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={disponibleFilter}
                      onChange={(e) => setDisponibleFilter(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Solo disponibles
                    </span>
                  </label>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setTipoFilter("");
                    setUbicacionFilter("");
                    setCapacidadFilter(0);
                    setDisponibleFilter(true);
                    setFilteredExperiencias(experiencias);
                  }}
                  className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <p className="text-sm text-gray-600 mb-4">
                {filteredExperiencias.length} experiencia
                {filteredExperiencias.length !== 1 && "s"} encontrada
                {filteredExperiencias.length !== 1 && "s"}
              </p>

              {filteredExperiencias.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No se encontraron experiencias
                  </h3>
                  <p className="text-gray-600">
                    Intenta ajustar los filtros para ver más resultados
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredExperiencias.map((experiencia) => (
                    <ServiceCard
                      key={experiencia.id}
                      service={experiencia}
                      type="experiencia"
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
