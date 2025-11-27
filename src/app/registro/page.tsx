"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";

// Validación de contraseña robusta
const validatePassword = (password: string) => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Mínimo 8 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Al menos una mayúscula");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Al menos una minúscula");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Al menos un número");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Calcular fortaleza de contraseña
const getPasswordStrength = (password: string) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { level: "Débil", color: "bg-red-500", width: "w-1/3" };
  if (strength <= 4) return { level: "Media", color: "bg-yellow-500", width: "w-2/3" };
  return { level: "Fuerte", color: "bg-green-500", width: "w-full" };
};

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "turista" as "turista" | "proveedor",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validar contraseña
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(`Contraseña no cumple requisitos: ${passwordValidation.errors.join(", ")}`);
      setLoading(false);
      return;
    }

    // Validar que coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      userType: formData.userType,
    });

    if (result.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(result.error || "Error al registrar usuario");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Crear Cuenta</h1>
            <p className="text-gray-600">Únete a nuestra comunidad</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type */}
            <div className="space-y-2">
              <label
                htmlFor="userType"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de Usuario
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              >
                <option value="turista">Turista</option>
                <option value="proveedor">Proveedor de Servicios</option>
              </select>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre Completo
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setShowPasswordRequirements(true)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                required
                minLength={8}
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Fortaleza:</span>
                    <span className={`font-medium ${
                      getPasswordStrength(formData.password).color.replace('bg-', 'text-')
                    }`}>
                      {getPasswordStrength(formData.password).level}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        getPasswordStrength(formData.password).color
                      } ${getPasswordStrength(formData.password).width}`}
                    />
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              {showPasswordRequirements && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs space-y-1">
                  <p className="font-semibold text-blue-900 mb-2">Requisitos de contraseña:</p>
                  <div className="space-y-1 text-blue-800">
                    <p className={formData.password.length >= 8 ? "text-green-600" : ""}>
                      {formData.password.length >= 8 ? "✓" : "○"} Mínimo 8 caracteres
                    </p>
                    <p className={/[A-Z]/.test(formData.password) ? "text-green-600" : ""}>
                      {/[A-Z]/.test(formData.password) ? "✓" : "○"} Al menos una mayúscula
                    </p>
                    <p className={/[a-z]/.test(formData.password) ? "text-green-600" : ""}>
                      {/[a-z]/.test(formData.password) ? "✓" : "○"} Al menos una minúscula
                    </p>
                    <p className={/[0-9]/.test(formData.password) ? "text-green-600" : ""}>
                      {/[0-9]/.test(formData.password) ? "✓" : "○"} Al menos un número
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                required
                minLength={8}
              />
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <p className={`text-xs ${
                  formData.password === formData.confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                  {formData.password === formData.confirmPassword
                    ? "✓ Las contraseñas coinciden"
                    : "✗ Las contraseñas no coinciden"}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                required
              />
                <label htmlFor="terms" className="text-sm text-gray-600">
                    Acepto los{" "}
                    <Link
                        href="/terminos"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                        target="_blank"
                    >
                        términos y condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link
                        href="/politicas"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                        target="_blank"
                    >
                        política de privacidad
                    </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">o</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>

            {/* Back to Home */}
            <Link
              href="/"
              className="inline-block text-sm text-gray-500 hover:text-gray-700"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
