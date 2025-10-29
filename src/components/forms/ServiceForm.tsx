"use client";

import { useState, useEffect } from "react";
import { TipoExperiencia } from "@/types";
import type { Alojamiento, Alimento, Experiencia } from "@/types";

type ServiceType = "alojamiento" | "alimento" | "experiencia";
type ServiceData = Partial<Alojamiento> | Partial<Alimento> | Partial<Experiencia>;

interface ServiceFormProps {
  type: ServiceType;
  initialData?: ServiceData;
  onSubmit: (data: ServiceData) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function ServiceForm({
  type,
  initialData,
  onSubmit,
  loading = false,
  submitLabel = "Guardar",
}: ServiceFormProps) {
  // Estados para Alojamiento
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioNoche, setPrecioNoche] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [imagenes, setImagenes] = useState("");
  const [disponible, setDisponible] = useState(true);

  // Estados para Alimento
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [horarioRecogida, setHorarioRecogida] = useState("");
  const [disponibilidad, setDisponibilidad] = useState(true);

  // Estados para Experiencia
  const [tipoExp, setTipoExp] = useState<TipoExperiencia>(TipoExperiencia.CULTURAL);
  const [duracionHoras, setDuracionHoras] = useState("");
  const [capacidadMaxima, setCapacidadMaxima] = useState("");

  useEffect(() => {
    if (initialData) {
      if (type === "alojamiento" && "titulo" in initialData) {
        const data = initialData as Partial<Alojamiento>;
        setTitulo(data.titulo || "");
        setDescripcion(data.descripcion || "");
        setPrecioNoche(data.precio_noche?.toString() || "");
        setUbicacion(data.ubicacion || "");
        setCapacidad(data.capacidad?.toString() || "");
        setImagenes(data.imagenes?.join(", ") || "");
        setDisponible(data.disponible ?? true);
      } else if (type === "alimento" && "nombre" in initialData) {
        const data = initialData as Partial<Alimento>;
        setNombre(data.nombre || "");
        setDescripcion(data.descripcion || "");
        setPrecio(data.precio?.toString() || "");
        setHorarioRecogida(data.horario_recogida || "");
        setImagenes(data.imagenes?.join(", ") || "");
        setDisponibilidad(data.disponibilidad ?? true);
      } else if (type === "experiencia" && "titulo" in initialData) {
        const data = initialData as Partial<Experiencia>;
        setTitulo(data.titulo || "");
        setDescripcion(data.descripcion || "");
        setPrecio(data.precio?.toString() || "");
        setTipoExp(data.tipo || TipoExperiencia.CULTURAL);
        setDuracionHoras(data.duracion_horas?.toString() || "");
        setCapacidadMaxima(data.capacidad_maxima?.toString() || "");
        setUbicacion(data.ubicacion || "");
        setImagenes(data.imagenes?.join(", ") || "");
        setDisponible(data.disponible ?? true);
      }
    }
  }, [initialData, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let data: ServiceData;

    if (type === "alojamiento") {
      data = {
        titulo,
        descripcion,
        precio_noche: parseFloat(precioNoche),
        ubicacion,
        capacidad: parseInt(capacidad),
        imagenes: imagenes.split(",").map((img) => img.trim()).filter(Boolean),
        disponible,
      };
    } else if (type === "alimento") {
      data = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        horario_recogida: horarioRecogida,
        imagenes: imagenes.split(",").map((img) => img.trim()).filter(Boolean),
        disponibilidad,
      };
    } else {
      // experiencia
      data = {
        titulo,
        descripcion,
        precio: parseFloat(precio),
        tipo: tipoExp,
        duracion_horas: parseFloat(duracionHoras),
        capacidad_maxima: parseInt(capacidadMaxima),
        ubicacion,
        imagenes: imagenes.split(",").map((img) => img.trim()).filter(Boolean),
        disponible,
      };
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Formulario Alojamiento */}
      {type === "alojamiento" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: Casa Campestre en Cali"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Describe tu alojamiento..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio por noche *
              </label>
              <input
                type="number"
                value={precioNoche}
                onChange={(e) => setPrecioNoche(e.target.value)}
                required
                min="0"
                step="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="250000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad (personas) *
              </label>
              <input
                type="number"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación *
            </label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Cali"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes (URLs separadas por comas)
            </label>
            <input
              type="text"
              value={imagenes}
              onChange={(e) => setImagenes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label className="ml-2 text-sm text-gray-700">Disponible</label>
          </div>
        </>
      )}

      {/* Formulario Alimento */}
      {type === "alimento" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: Sancocho Valluno"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe tu alimento..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                min="0"
                step="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="25000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario de recogida
              </label>
              <input
                type="text"
                value={horarioRecogida}
                onChange={(e) => setHorarioRecogida(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="11:00 - 14:00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes (URLs separadas por comas)
            </label>
            <input
              type="text"
              value={imagenes}
              onChange={(e) => setImagenes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={disponibilidad}
              onChange={(e) => setDisponibilidad(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label className="ml-2 text-sm text-gray-700">Disponible</label>
          </div>
        </>
      )}

      {/* Formulario Experiencia */}
      {type === "experiencia" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Tour del Café"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe tu experiencia..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                value={tipoExp}
                onChange={(e) => setTipoExp(e.target.value as TipoExperiencia)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={TipoExperiencia.SENDERISMO}>Senderismo</option>
                <option value={TipoExperiencia.CICLISMO}>Ciclismo</option>
                <option value={TipoExperiencia.CULTURAL}>Cultural</option>
                <option value={TipoExperiencia.GASTRONOMICA}>Gastronómica</option>
                <option value={TipoExperiencia.AVENTURA}>Aventura</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                min="0"
                step="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="80000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (horas) *
              </label>
              <input
                type="number"
                value={duracionHoras}
                onChange={(e) => setDuracionHoras(e.target.value)}
                required
                min="0.5"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad máxima *
              </label>
              <input
                type="number"
                value={capacidadMaxima}
                onChange={(e) => setCapacidadMaxima(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="15"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación *
            </label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Pereira"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes (URLs separadas por comas)
            </label>
            <input
              type="text"
              value={imagenes}
              onChange={(e) => setImagenes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">Disponible</label>
          </div>
        </>
      )}

      {/* Botón de Submit */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
            type === "alojamiento"
              ? "bg-emerald-600 hover:bg-emerald-700"
              : type === "alimento"
              ? "bg-orange-600 hover:bg-orange-700"
              : "bg-blue-600 hover:bg-blue-700"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
