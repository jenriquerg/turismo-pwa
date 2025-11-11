"use client";

import Link from "next/link";

export default function DeleteAccountPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2 pb-6 border-b border-gray-200">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Eliminación de Cuenta
                        </h1>
                        <p className="text-gray-600">TuriExpress</p>
                    </div>

                    {/* Introduction */}
                    <div className="space-y-4 text-gray-700">
                        <p className="text-lg">
                            En TuriExpress respetamos tu privacidad y tu derecho a eliminar
                            tu cuenta y datos personales en cualquier momento.
                        </p>
                    </div>

                    {/* Steps */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Cómo solicitar la eliminación de tu cuenta
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded">
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Opción 1: Desde la aplicación
                                </h3>
                                <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700">
                                    <li>Abre la aplicación TuriExpress</li>
                                    <li>Ve a tu perfil</li>
                                    <li>Selecciona (Configuración de cuenta)</li>
                                    <li>Pulsa en (Eliminar mi cuenta) al final de la página</li>
                                    <li>Confirma tu decisión</li>
                                </ol>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Opción 2: Por correo electrónico
                                </h3>
                                <p className="text-gray-700 mb-2">
                                    Envía un correo a{" "}
                                    <a
                                        href="mailto:pruebasturiexpress@gmail.com"
                                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        pruebasturiexpress@gmail.com
                                    </a>{" "}
                                    con:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                                    <li>Asunto: Solicitud de eliminación de cuenta</li>
                                    <li>Tu correo electrónico registrado en TuriExpress</li>
                                    <li>Confirmación de que deseas eliminar tu cuenta</li>
                                </ul>
                            </div>

                            <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Opción 3: Por teléfono
                                </h3>
                                <p className="text-gray-700">
                                    Llama al{" "}
                                    <a
                                        href="tel:4427514220"
                                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        442 751 4220
                                    </a>{" "}
                                    y solicita la eliminación de tu cuenta.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Data Deletion Info */}
                    <section className="space-y-4 bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            ¿Qué datos se eliminarán?
                        </h2>
                        <div className="space-y-3 text-gray-700">
                            <p className="font-medium">Al eliminar tu cuenta, se borrarán:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Tu información personal (nombre, correo, teléfono)</li>
                                <li>Tus preferencias de viaje</li>
                                <li>Historial de búsquedas</li>
                                <li>Reseñas y calificaciones que hayas hecho</li>
                                <li>Fotos de perfil</li>
                                <li>Datos de ubicación guardados</li>
                            </ul>
                        </div>
                    </section>

                    {/* Retention Period */}
                    <section className="space-y-4 bg-red-50 p-6 rounded-lg border border-red-200">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            ⚠️ Datos que se conservarán
                        </h2>
                        <div className="space-y-3 text-gray-700">
                            <p>
                                Por obligaciones legales y fiscales, conservaremos durante{" "}
                                <strong>5 años</strong>:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    Registros de transacciones y pagos (sin datos de tarjeta)
                                </li>
                                <li>Facturas emitidas</li>
                                <li>Datos necesarios para cumplir con la ley fiscal mexicana</li>
                            </ul>
                            <p className="text-sm italic mt-4">
                                Estos datos se mantendrán bajo estrictas medidas de seguridad y
                                solo serán accesibles para auditorías legales.
                            </p>
                        </div>
                    </section>

                    {/* Timeline */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Tiempo de procesamiento
                        </h2>
                        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                            <p className="text-gray-700">
                                <strong>
                                    Tu cuenta será eliminada en un plazo máximo de 30 días
                                </strong>{" "}
                                después de recibir tu solicitud. Recibirás un correo de
                                confirmación cuando el proceso se complete.
                            </p>
                        </div>
                    </section>

                    {/* Important Notice */}
                    <section className="space-y-4 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            ⚠️ Importante
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                            <li>
                                <strong>La eliminación es permanente</strong> y no podrás
                                recuperar tu cuenta ni tus datos
                            </li>
                            <li>
                                Si tienes reservas activas, deberás cancelarlas antes de
                                eliminar tu cuenta
                            </li>
                            <li>
                                Los proveedores de servicios podrán conservar las reseñas
                                (anónimas) que hayas dejado
                            </li>
                        </ul>
                    </section>

                    {/* Contact */}
                    <section className="space-y-3 bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Contacto
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <strong>Correo:</strong>{" "}
                                <a
                                    href="mailto:pruebasturiexpress@gmail.com"
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    pruebasturiexpress@gmail.com
                                </a>
                            </p>
                            <p>
                                <strong>Teléfono:</strong>{" "}
                                <a
                                    href="tel:4427514220"
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    44 2751 4220
                                </a>
                            </p>
                            <p>
                                <strong>Dirección:</strong> Avenida Pie de la Cuesta 2600,
                                76140 Santiago de Querétaro
                            </p>
                        </div>
                    </section>

                    {/* Buttons */}
                    <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <Link
                            href="/terminos"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            Términos y Condiciones →
                        </Link>

                        <Link
                            href="/dashboard"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            Regresar
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
