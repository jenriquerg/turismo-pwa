import React from "react";
import Link from "next/link";

export default function TermsPage() {
    return (
        <section className="min-h-screen bg-emerald-50 py-16 px-6 md:px-20 lg:px-40 text-gray-800">
            <div className="bg-white rounded-2xl shadow p-10 md:p-14 lg:p-16">
                <h1 className="text-4xl font-extrabold mb-2 text-center text-emerald-700">
                    Términos y Condiciones de Turiexpress
                </h1>
                <p className="text-center text-gray-600 mb-10">Turiexpress</p>

                <p className="mb-6 text-justify leading-relaxed">
                    Bienvenido a <strong>Turiexpress</strong>. Al acceder o utilizar nuestros servicios, aceptas los presentes Términos y Condiciones. Por favor, léelos detenidamente antes de utilizar la plataforma.
                </p>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    1. Aceptación de los Términos
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    Al registrarte o utilizar nuestros servicios, confirmas que has leído, entendido y aceptas los presentes Términos y Condiciones, así como nuestro Aviso de Privacidad.
                </p>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    2. Uso de la Plataforma
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    Turiexpress ofrece una plataforma en línea para la gestión y reserva de servicios de transporte. Los usuarios se comprometen a utilizar la plataforma de manera responsable y conforme a la ley.
                </p>

                <ul className="list-disc ml-8 mb-6 text-justify leading-relaxed">
                    <li>No realizar actividades fraudulentas o ilícitas.</li>
                    <li>No intentar dañar o interrumpir el funcionamiento del sistema.</li>
                    <li>Proporcionar información veraz y actualizada al registrarse o realizar una compra.</li>
                </ul>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    3. Responsabilidad del Usuario
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    El usuario es responsable del uso que haga de su cuenta. Cualquier actividad realizada bajo sus credenciales será considerada como efectuada por el propio usuario.
                </p>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    4. Pagos y Reservas
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    Los precios de los servicios se muestran en pesos mexicanos (MXN) e incluyen los impuestos correspondientes. El usuario deberá realizar el pago completo antes de confirmar una reserva. Turiexpress se reserva el derecho de modificar precios o condiciones de pago en cualquier momento.
                </p>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    5. Cancelaciones y Reembolsos
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    Las cancelaciones estarán sujetas a las políticas vigentes de Turiexpress. En caso de cancelación, el reembolso se efectuará conforme a los términos establecidos al momento de la compra.
                </p>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    6. Propiedad Intelectual
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    Todo el contenido disponible en la plataforma, incluyendo textos, logotipos, imágenes y software, es propiedad de Turiexpress o de sus respectivos licenciantes, y está protegido por las leyes de derechos de autor y propiedad industrial.
                </p>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    7. Limitación de Responsabilidad
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    Turiexpress no será responsable por daños directos o indirectos derivados del uso o imposibilidad de uso de los servicios, salvo que la ley aplicable disponga lo contrario.
                </p>

                <h2 className="text-xl font-bold mt-10 mb-4 text-emerald-700">
                    8. Modificaciones
                </h2>
                <p className="mb-6 text-justify leading-relaxed">
                    Turiexpress se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor una vez publicadas en la plataforma.
                </p>

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


                <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <Link
                        href="/politicas"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        Política de Privacidad →
                    </Link>
                </div>

            </div>
        </section>
    );
}
