"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2 pb-6 border-b border-gray-200">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Aviso de Privacidad
                        </h1>
                        <p className="text-gray-600">TuriExpress</p>
                    </div>

                    {/* Section 1 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            1. Responsable del tratamiento
                        </h2>
                        <p>
                            <strong>TuriExpress S. de R. L.</strong>, con domicilio en
                            Avenida Pie de la Cuesta 2600, 76140 Santiago de Querétaro,
                            correo de contacto:{" "}
                            <a
                                href="mailto:pruebasturiexpress@gmail.com"
                                className="text-emerald-600 hover:text-emerald-700"
                            >
                                pruebasturiexpress@gmail.com
                            </a>
                            , es responsable del tratamiento de tus datos personales a
                            través de nuestra plataforma.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            2. Datos que recopilamos
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>
                                <strong>Personales proporcionados por el usuario:</strong>{" "}
                                nombre, correo electrónico, teléfono, dirección, información
                                de pago, preferencias de viaje.
                            </li>
                            <li>
                                <strong>Datos de uso y técnicos:</strong> ubicación GPS (si
                                autorizas), historial de reservas, dispositivo, sistema
                                operativo.
                            </li>
                            <li>
                                <strong>Datos de terceros:</strong> cuando interactúas con
                                proveedores externos como restaurantes, hospedaje o guías
                                turísticos.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            3. Finalidad del tratamiento
                        </h2>
                        <p>Usamos tus datos para:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Procesar reservas y pagos de servicios turísticos.</li>
                            <li>
                                Comunicaciones sobre tu cuenta, promociones o alertas.
                            </li>
                            <li>
                                Conectar visitantes con anfitriones y proveedores de
                                servicios.
                            </li>
                            <li>
                                Mejorar nuestra plataforma y ofrecer experiencias
                                personalizadas.
                            </li>
                            <li>Cumplir obligaciones legales.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            4. Transferencia de datos
                        </h2>
                        <p>Podemos compartir tus datos con:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Proveedores de pago y servicios financieros.</li>
                            <li>Proveedores de hospedaje, guías y restaurantes.</li>
                            <li>Servicios de correo electrónico y notificaciones push.</li>
                            <li>Autoridades competentes si la ley lo requiere.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            5. Conservación de datos
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>
                                <strong>Datos de transacciones:</strong> 5 años
                            </li>
                            <li>
                                <strong>Datos de uso:</strong> mientras la cuenta esté activa
                            </li>
                            <li>
                                Los usuarios pueden solicitar la eliminación de sus datos en
                                cualquier momento.
                            </li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            6. Derechos de los usuarios
                        </h2>
                        <p>Tienes derecho a:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Acceder, rectificar o eliminar tus datos</li>
                            <li>Oponerte a tratamientos para marketing</li>
                            <li>Solicitar portabilidad de tus datos</li>
                            <li>
                                Presentar reclamaciones ante la autoridad de privacidad
                            </li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            7. Seguridad
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Datos cifrados y almacenados de manera segura</li>
                            <li>Acceso restringido al personal autorizado</li>
                            <li>Protocolos de respuesta ante brechas de seguridad</li>
                        </ul>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            8. Uso de cookies
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Cookies esenciales, de rendimiento y marketing</li>
                            <li>
                                Los usuarios pueden desactivarlas desde la configuración de su
                                navegador
                            </li>
                        </ul>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            9. Menores de edad
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>
                                <strong>Edad mínima:</strong> 16 años
                            </li>
                            <li>Consentimiento de padres requerido si son menores</li>
                        </ul>
                    </section>

                    {/* Section 10 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            10. Cambios al aviso
                        </h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Se notificarán por correo y en la plataforma</li>
                            <li>
                                La continuación del uso implica aceptación de cambios
                            </li>
                        </ul>
                    </section>

                    {/* Section 11 - Contact */}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
