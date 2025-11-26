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
                            AVISO DE PRIVACIDAD INTEGRAL
                        </h1>
                        <p className="text-xl text-gray-700 font-semibold">TuriExpress S. de R.L.</p>
                        <p className="text-sm text-gray-600">Última actualización: 26 de noviembre de 2025</p>
                    </div>

                    {/* Section 1 */}
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            1. IDENTIFICACIÓN DEL RESPONSABLE
                        </h2>
                        <div className="space-y-2">
                            <p><strong>Denominación social:</strong> TuriExpress S. de R.L.</p>
                            <p><strong>Domicilio:</strong> Avenida Pie de la Cuesta 2600, Colonia Desarrollo San Pablo, C.P. 76140, Santiago de Querétaro, Querétaro, México</p>
                            <p><strong>Representante Legal:</strong> José Ángel González Santafé, Asesor de Implementaciones Frontend</p>
                            <p><strong>Correo electrónico general:</strong> <a href="mailto:soporte@turiexpress.com" className="text-emerald-600 hover:text-emerald-700">soporte@turiexpress.com</a></p>
                            <p><strong>Correo para asuntos de privacidad:</strong> <a href="mailto:privacidad@turiexpress.com" className="text-emerald-600 hover:text-emerald-700">privacidad@turiexpress.com</a></p>
                            <p><strong>Teléfono de contacto:</strong> <a href="tel:+524425851526" className="text-emerald-600 hover:text-emerald-700">+52 (442) 585-1526</a></p>
                            <p><strong>Sitio web:</strong> <a href="https://turiexpress.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://turiexpress.com</a></p>
                        </div>
                        <p className="mt-4">TuriExpress es responsable del tratamiento de sus datos personales de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) vigente.</p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            2. DATOS PERSONALES QUE RECOPILAMOS
                        </h2>
                        <p>El presente aviso de privacidad tiene por objeto informarle sobre el tratamiento que se dará a sus datos personales cuando utiliza nuestra plataforma móvil (aplicación Android) y versión web (PWA - Progressive Web App) de TuriExpress.</p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">2.1 Datos Personales de Identificación y Contacto</h3>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Nombre completo</li>
                                <li>Correo electrónico</li>
                                <li>Número telefónico</li>
                                <li>Dirección (calle, número, colonia, ciudad, estado, código postal)</li>
                                <li>Fotografía de perfil (opcional)</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">2.2 Datos Financieros y de Pago</h3>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Información de tarjetas de crédito o débito (procesada mediante proveedores certificados PCI-DSS)</li>
                                <li>Historial de transacciones y pagos realizados</li>
                                <li>Datos de facturación</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">2.3 Datos de Uso y Técnicos</h3>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Dirección IP del dispositivo</li>
                                <li>Tipo y modelo de dispositivo móvil</li>
                                <li>Sistema operativo y versión</li>
                                <li>Identificador único del dispositivo (Android ID)</li>
                                <li>Navegador utilizado</li>
                                <li>Historial de navegación dentro de la plataforma</li>
                                <li>Páginas visitadas y tiempo de permanencia</li>
                                <li>Búsquedas realizadas</li>
                                <li>Servicios visualizados y reservas efectuadas</li>
                                <li>Preferencias de viaje y experiencias guardadas</li>
                                <li>Interacciones con la aplicación (clics, scroll, funciones utilizadas)</li>
                                <li>Reportes de errores y fallos técnicos (crash reports)</li>
                                <li>Métricas de rendimiento de la aplicación</li>
                            </ul>
                        </div>

                        <div className="space-y-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                            <h3 className="text-xl font-semibold text-gray-800">2.4 Datos de Geolocalización (Datos Sensibles)</h3>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li><strong>Ubicación GPS aproximada</strong> (únicamente cuando el usuario busca servicios cercanos y ha otorgado permisos explícitos)</li>
                                <li>Ubicación basada en dirección IP</li>
                                <li>Ubicación proporcionada manualmente por el usuario</li>
                            </ul>
                            <p className="mt-3 font-semibold text-amber-900"><strong>IMPORTANTE:</strong> La recopilación de datos de geolocalización GPS se considera tratamiento de datos sensibles según la LFPDPPP. Esta funcionalidad es <strong>completamente opcional</strong> y solo se activa cuando usted otorga permisos explícitos en su dispositivo y utiliza la función &quot;Buscar servicios cercanos&quot;. Puede revocar estos permisos en cualquier momento desde la configuración de su dispositivo.</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">2.5 Datos Generados por el Uso del Servicio</h3>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Reseñas y calificaciones otorgadas</li>
                                <li>Mensajes enviados a anfitriones o soporte</li>
                                <li>Contenido publicado (fotografías, comentarios)</li>
                                <li>Listas de favoritos</li>
                                <li>Historial de reservas completadas</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">2.6 Datos Proporcionados por Terceros</h3>
                            <p>Cuando interactúa con proveedores de servicios turísticos (anfitriones, restaurantes, guías, hospedajes) a través de nuestra plataforma, estos pueden compartir con nosotros:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Confirmaciones de reservas</li>
                                <li>Evaluaciones de su experiencia como usuario</li>
                                <li>Información relevante para completar el servicio contratado</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            3. FINALIDADES DEL TRATAMIENTO
                        </h2>
                        <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">3.1 Finalidades Necesarias (NO requieren su consentimiento)</h3>
                            <p>Estas finalidades son indispensables para la prestación del servicio que solicita:</p>

                            <div className="ml-4 space-y-3">
                                <div>
                                    <p className="font-semibold">a) Gestión de cuenta de usuario</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Creación, administración y mantenimiento de su cuenta</li>
                                        <li>Autenticación y control de acceso a la plataforma</li>
                                        <li>Recuperación de contraseña</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">b) Prestación de servicios turísticos</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Procesamiento de reservas de hospedaje, alimentos, tours y experiencias</li>
                                        <li>Facilitación de la comunicación entre usuarios y anfitriones</li>
                                        <li>Gestión de pagos y transacciones financieras</li>
                                        <li>Emisión de comprobantes y confirmaciones de servicio</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">c) Cumplimiento de obligaciones legales</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Emisión de comprobantes fiscales cuando aplique</li>
                                        <li>Cumplimiento de obligaciones fiscales y contables</li>
                                        <li>Atención a requerimientos de autoridades competentes</li>
                                        <li>Prevención de fraude y lavado de dinero</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">d) Seguridad de la plataforma</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Prevención, detección y respuesta a fraudes</li>
                                        <li>Protección contra accesos no autorizados</li>
                                        <li>Mantenimiento de la seguridad e integridad de nuestros sistemas</li>
                                        <li>Identificación y corrección de errores técnicos</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="text-xl font-semibold text-gray-800">3.2 Finalidades Voluntarias (SÍ requieren su consentimiento)</h3>
                            <p>Estas finalidades no son necesarias para el servicio principal, pero nos permiten mejorar su experiencia:</p>

                            <div className="ml-4 space-y-3">
                                <div>
                                    <p className="font-semibold">a) Marketing y comunicaciones promocionales</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Envío de boletines informativos</li>
                                        <li>Notificaciones sobre promociones, descuentos y ofertas especiales</li>
                                        <li>Comunicación de nuevos servicios y funcionalidades</li>
                                        <li>Invitaciones a eventos y experiencias exclusivas</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">b) Personalización de la experiencia</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Recomendaciones personalizadas de servicios turísticos</li>
                                        <li>Sugerencias basadas en sus preferencias y búsquedas previas</li>
                                        <li>Creación de paquetes turísticos personalizados</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">c) Análisis y mejora del servicio</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Análisis estadístico del comportamiento de usuarios</li>
                                        <li>Estudios de mercado y encuestas de satisfacción</li>
                                        <li>Desarrollo de nuevas funcionalidades</li>
                                        <li>Optimización de la interfaz de usuario</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">d) Publicidad dirigida</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Envío de publicidad segmentada según sus intereses</li>
                                        <li>Campañas de retargeting en redes sociales y plataformas digitales</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="mt-4 font-semibold"><strong>Si no desea que sus datos sean tratados para estas finalidades voluntarias</strong>, puede manifestarlo enviando un correo a <a href="mailto:privacidad@turiexpress.com" className="text-emerald-600 hover:text-emerald-700">privacidad@turiexpress.com</a> con el asunto &quot;Oposición a finalidades secundarias&quot;. La negativa para estas finalidades NO afectará la prestación de nuestros servicios principales.</p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            4. TRANSFERENCIAS DE DATOS PERSONALES
                        </h2>
                        <p>Para cumplir con las finalidades descritas, sus datos personales pueden ser transferidos y tratados dentro y fuera del país por las siguientes personas, empresas, organizaciones o autoridades:</p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">4.1 Transferencias Nacionales</h3>

                            <div className="ml-4 space-y-3">
                                <div>
                                    <p className="font-semibold">Proveedores de Servicios Turísticos</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li><strong>Destinatarios:</strong> Anfitriones, prestadores de servicios de hospedaje, alimentos, guías turísticos y operadores de experiencias registrados en nuestra plataforma</li>
                                        <li><strong>Finalidad:</strong> Completar las reservas y prestación de servicios contratados</li>
                                        <li><strong>Datos transferidos:</strong> Nombre, teléfono, correo electrónico, detalles de la reserva</li>
                                        <li><strong>Consentimiento:</strong> Al realizar una reserva, usted autoriza esta transferencia</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">Autoridades Mexicanas</p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li><strong>Destinatarios:</strong> Secretaría de Hacienda y Crédito Público (SHCP), Servicio de Administración Tributaria (SAT), Secretaría Anticorrupción y Buen Gobierno, autoridades judiciales</li>
                                        <li><strong>Finalidad:</strong> Cumplimiento de obligaciones legales y atención a requerimientos oficiales</li>
                                        <li><strong>Consentimiento:</strong> No se requiere consentimiento (artículo 37, fracción I de la LFPDPPP)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">4.2 Transferencias Internacionales</h3>
                            <p>Sus datos personales serán transferidos a los siguientes proveedores de servicios ubicados en Estados Unidos, quienes cuentan con certificaciones de seguridad y cumplen con estándares internacionales de protección de datos:</p>

                            <div className="ml-4 space-y-4">
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold text-lg">Supabase Inc. (Estados Unidos)</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li><strong>Finalidad:</strong> Almacenamiento y gestión de base de datos</li>
                                        <li><strong>Región del servidor:</strong> US West 2 (Oregón, Estados Unidos)</li>
                                        <li><strong>Datos transferidos:</strong> Todos los datos de usuario almacenados en la plataforma</li>
                                        <li><strong>Medidas de seguridad:</strong> Cifrado AES-256 en reposo, cifrado TLS 1.3 en tránsito, certificación SOC 2 Type II</li>
                                        <li><strong>Política de privacidad:</strong> <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://supabase.com/privacy</a></li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold text-lg">Vercel Inc. (Estados Unidos)</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li><strong>Finalidad:</strong> Alojamiento de aplicación web (PWA) y servicios de infraestructura</li>
                                        <li><strong>Datos transferidos:</strong> Datos de navegación, dirección IP, información técnica del dispositivo</li>
                                        <li><strong>Medidas de seguridad:</strong> Cifrado SSL/TLS, protección DDoS, certificación SOC 2</li>
                                        <li><strong>Política de privacidad:</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://vercel.com/legal/privacy-policy</a></li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold text-lg">Google LLC - Firebase Services (Estados Unidos)</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li><strong>Finalidad:</strong> Análisis de uso de aplicación (Analytics), gestión de errores (Crashlytics), envío de notificaciones push (Cloud Messaging)</li>
                                        <li><strong>Datos transferidos:</strong> Datos de uso, métricas de rendimiento, reportes de errores, tokens de notificaciones</li>
                                        <li><strong>Medidas de seguridad:</strong> Certificación ISO 27001, cumplimiento GDPR</li>
                                        <li><strong>Política de privacidad:</strong> <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://firebase.google.com/support/privacy</a></li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold text-lg">Stripe Inc. (Estados Unidos) - En implementación futura</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li><strong>Finalidad:</strong> Procesamiento seguro de pagos con tarjeta de crédito/débito</li>
                                        <li><strong>Datos transferidos:</strong> Información de pago (procesada directamente por Stripe, TuriExpress NO almacena números de tarjeta completos)</li>
                                        <li><strong>Medidas de seguridad:</strong> Certificación PCI-DSS Level 1 (máximo nivel de seguridad en pagos)</li>
                                        <li><strong>Política de privacidad:</strong> <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://stripe.com/privacy</a></li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold text-lg">Google LLC - Google Play Billing (Estados Unidos)</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li><strong>Finalidad:</strong> Procesamiento de suscripciones y pagos dentro de la aplicación Android</li>
                                        <li><strong>Datos transferidos:</strong> Información de transacciones y suscripciones</li>
                                        <li><strong>Medidas de seguridad:</strong> Cumplimiento PCI-DSS</li>
                                        <li><strong>Política de privacidad:</strong> <a href="https://payments.google.com/payments/apis-secure/get_legal_document?ldo=0&ldt=privacynotice" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">Google Payments Privacy</a></li>
                                    </ul>
                                </div>
                            </div>

                            <p className="mt-4 font-semibold bg-yellow-50 p-3 rounded border border-yellow-200"><strong>Consentimiento para transferencias internacionales:</strong> Al aceptar este aviso de privacidad, usted autoriza expresamente las transferencias internacionales descritas. Estos proveedores se comprometen contractualmente a mantener el mismo nivel de protección establecido en este aviso y la legislación mexicana aplicable.</p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            5. MEDIOS Y PROCEDIMIENTO PARA EJERCER DERECHOS ARCO
                        </h2>
                        <p>Como titular de datos personales, usted tiene derecho a:</p>
                        <ul className="list-disc list-inside ml-4">
                            <li><strong>Acceder</strong> a sus datos personales que poseemos y los detalles del tratamiento</li>
                            <li><strong>Rectificar</strong> sus datos personales en caso de ser inexactos o incompletos</li>
                            <li><strong>Cancelar</strong> sus datos personales cuando considere que no se requieren para alguna de las finalidades señaladas, no estén siendo utilizados conforme a principios, deberes y obligaciones previstas en la LFPDPPP</li>
                            <li><strong>Oponerse</strong> al tratamiento de sus datos personales para fines específicos</li>
                        </ul>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">5.1 Procedimiento para Ejercer Derechos ARCO</h3>
                            <p>Para ejercer cualquiera de estos derechos, deberá presentar una solicitud mediante los siguientes medios:</p>
                            <div className="ml-4 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                                <p><strong>Correo electrónico:</strong> <a href="mailto:privacidad@turiexpress.com" className="text-emerald-600 hover:text-emerald-700">privacidad@turiexpress.com</a></p>
                                <p><strong>Correo físico:</strong> Avenida Pie de la Cuesta 2600, Colonia Desarrollo San Pablo, C.P. 76140, Santiago de Querétaro, Querétaro, México</p>
                                <p><strong>Asunto:</strong> Solicitud de Derechos ARCO - [Especifique: Acceso / Rectificación / Cancelación / Oposición]</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">5.2 Requisitos de la Solicitud</h3>
                            <p>Su solicitud deberá contener:</p>
                            <ol className="list-decimal list-inside ml-4 space-y-1">
                                <li><strong>Nombre completo del titular</strong> y domicilio u otro medio para comunicarle la respuesta</li>
                                <li><strong>Documentos de identidad:</strong> Copia de identificación oficial vigente (INE/IFE, pasaporte, cédula profesional)</li>
                                <li><strong>Descripción clara del derecho ARCO que desea ejercer</strong></li>
                                <li>En caso de <strong>Acceso:</strong> Especificar los datos personales sobre los que desea acceder</li>
                                <li>En caso de <strong>Rectificación:</strong> Indicar las modificaciones a realizar y aportar documentación que sustente la solicitud</li>
                                <li>En caso de <strong>Cancelación:</strong> Indicar las razones por las cuales considera procedente la cancelación</li>
                                <li>En caso de <strong>Oposición:</strong> Indicar los motivos de su oposición y las finalidades específicas respecto de las cuales se opone</li>
                                <li><strong>Cualquier elemento que facilite la localización</strong> de sus datos personales</li>
                            </ol>
                            <p className="mt-3"><strong>Representación legal:</strong> Si actúa a través de representante legal, deberá acreditar dicha representación mediante poder notarial o carta poder firmada ante dos testigos.</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">5.3 Plazos de Respuesta</h3>
                            <p>De conformidad con la LFPDPPP:</p>
                            <ul className="list-disc list-inside ml-4">
                                <li><strong>20 días hábiles</strong> para dar respuesta a su solicitud, contados a partir de la fecha en que recibimos la solicitud completa</li>
                                <li>La respuesta se comunicará mediante el medio indicado en su solicitud (correo electrónico o físico)</li>
                                <li>El acceso a los datos o la entrega de estos se realizará previa acreditación de identidad</li>
                                <li>En caso de resultar procedente, se hará efectiva dentro de los <strong>15 días hábiles</strong> siguientes a la fecha en que comunicamos la respuesta</li>
                            </ul>
                            <p className="mt-3"><strong>Prórroga:</strong> Los plazos pueden prorrogarse una única vez por período igual, siempre que así lo justifiquen las circunstancias del caso.</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">5.4 Derecho a Revocar el Consentimiento</h3>
                            <p>Usted puede revocar el consentimiento otorgado para el tratamiento de sus datos personales para las <strong>finalidades voluntarias</strong> descritas en la sección 3.2, mediante el mismo procedimiento para ejercer derechos ARCO.</p>
                            <p className="mt-2"><strong>Importante:</strong> La revocación del consentimiento no tendrá efectos retroactivos y no afectará el tratamiento realizado previamente con su consentimiento.</p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            6. CONSERVACIÓN DE DATOS PERSONALES
                        </h2>
                        <p>TuriExpress conservará sus datos personales únicamente durante el tiempo necesario para cumplir con las finalidades descritas y las obligaciones legales aplicables:</p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">Plazos de Conservación</h3>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li><strong>Datos de cuenta activa:</strong> Mientras su cuenta permanezca activa (Fundamento: Prestación del servicio)</li>
                                <li><strong>Datos de transacciones y reservas:</strong> 5 años desde la última transacción (Fundamento: Obligaciones fiscales y contables, Código Fiscal de la Federación)</li>
                                <li><strong>Datos de facturación:</strong> 5 años (Fundamento: Art. 30 Código Fiscal de la Federación)</li>
                                <li><strong>Registros de acceso (logs del sistema):</strong> 90 días (Fundamento: Seguridad informática)</li>
                                <li><strong>Reportes de errores (crash reports):</strong> 90 días (Fundamento: Mejora técnica de la plataforma)</li>
                                <li><strong>Datos de marketing (si otorgó consentimiento):</strong> Hasta que revoque su consentimiento o cierre su cuenta (Fundamento: Consentimiento del titular)</li>
                                <li><strong>Datos de ubicación GPS:</strong> No se almacenan permanentemente; solo se procesan en tiempo real para búsquedas (Fundamento: Minimización de datos)</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">Eliminación de Datos</h3>
                            <p>Una vez transcurridos los plazos de conservación, o cuando usted solicite la cancelación de sus datos (ejerciendo derechos ARCO), procederemos a:</p>
                            <ol className="list-decimal list-inside ml-4 space-y-1">
                                <li><strong>Bloquear</strong> sus datos personales, impidiendo cualquier tratamiento excepto el almacenamiento</li>
                                <li><strong>Suprimir o eliminar</strong> definitivamente sus datos personales mediante borrado seguro de nuestros sistemas</li>
                                <li>Conservar únicamente aquellos datos necesarios para cumplir obligaciones legales</li>
                            </ol>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            7. MEDIDAS DE SEGURIDAD TÉCNICAS, ADMINISTRATIVAS Y FÍSICAS
                        </h2>
                        <p>TuriExpress implementa medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o divulgación indebidos:</p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">7.1 Medidas Técnicas</h3>
                            <div className="ml-4 space-y-2">
                                <p className="font-semibold">Cifrado de datos:</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Cifrado <strong>TLS 1.3</strong> para transmisión de datos entre su dispositivo y nuestros servidores</li>
                                    <li>Cifrado <strong>AES-256</strong> para datos almacenados en base de datos</li>
                                    <li>Certificados SSL/TLS con renovación automática</li>
                                </ul>

                                <p className="font-semibold mt-3">Autenticación y control de acceso:</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Autenticación mediante tokens JWT (JSON Web Tokens) con tiempo de expiración</li>
                                    <li>Políticas de contraseñas robustas (mínimo 8 caracteres, combinación de letras, números y símbolos)</li>
                                    <li>Row Level Security (RLS) en base de datos para protección granular</li>
                                    <li>Acceso restringido mediante roles y permisos diferenciados</li>
                                </ul>

                                <p className="font-semibold mt-3">Monitoreo y respuesta:</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Sistemas de detección de intrusiones (IDS)</li>
                                    <li>Monitoreo continuo de amenazas y vulnerabilidades</li>
                                    <li>Respaldos automáticos diarios con retención de 30 días</li>
                                    <li>Plan de respuesta ante incidentes de seguridad</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">7.2 Medidas Administrativas</h3>
                            <div className="ml-4 space-y-2">
                                <p className="font-semibold">Políticas internas:</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Política de privacidad y protección de datos personales</li>
                                    <li>Acuerdos de confidencialidad con empleados y colaboradores</li>
                                    <li>Capacitación anual en protección de datos personales</li>
                                    <li>Procedimientos documentados para tratamiento de datos</li>
                                </ul>

                                <p className="font-semibold mt-3">Control de personal:</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Acceso a datos personales limitado exclusivamente al personal autorizado</li>
                                    <li>Obligación de confidencialidad que persiste incluso después de finalizar la relación laboral o contractual</li>
                                    <li>Revisión periódica de permisos de acceso</li>
                                </ul>

                                <p className="font-semibold mt-3">Proveedores:</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Contratos con cláusulas de protección de datos con todos los proveedores que procesan datos personales</li>
                                    <li>Auditorías de cumplimiento a proveedores críticos</li>
                                    <li>Verificación de certificaciones de seguridad (SOC 2, ISO 27001, PCI-DSS)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">7.3 Medidas Físicas</h3>
                            <div className="ml-4">
                                <p className="font-semibold">Infraestructura:</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Servidores alojados en centros de datos con certificaciones internacionales de seguridad</li>
                                    <li>Controles de acceso físico a instalaciones (biométricos, videovigilancia)</li>
                                    <li>Sistemas redundantes de energía y conectividad</li>
                                    <li>Protección contra desastres naturales y eventos ambientales</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">7.4 Protocolos de Respuesta ante Brechas de Seguridad</h3>
                            <p>En caso de detectarse una violación de seguridad que afecte significativamente sus derechos patrimoniales o morales:</p>
                            <ol className="list-decimal list-inside ml-4 space-y-1">
                                <li><strong>Notificación a autoridad:</strong> Informaremos a la Secretaría Anticorrupción y Buen Gobierno dentro de las <strong>72 horas</strong> siguientes a que tengamos conocimiento del incidente</li>
                                <li><strong>Notificación al titular:</strong> Le comunicaremos de forma inmediata por correo electrónico o el medio de contacto registrado</li>
                                <li><strong>Información proporcionada:</strong>
                                    <ul className="list-disc list-inside ml-8">
                                        <li>Naturaleza de la violación de seguridad</li>
                                        <li>Datos personales comprometidos</li>
                                        <li>Recomendaciones para mitigar posibles efectos adversos</li>
                                        <li>Medidas correctivas implementadas</li>
                                    </ul>
                                </li>
                                <li><strong>Medidas de contención:</strong> Implementación inmediata de acciones para contener y remediar la brecha</li>
                            </ol>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            8. USO DE COOKIES Y TECNOLOGÍAS DE RASTREO
                        </h2>
                        <p>Nuestra plataforma web (PWA) utiliza cookies y tecnologías similares para mejorar su experiencia de usuario y analizar el uso del servicio.</p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">8.1 Tipos de Cookies que Utilizamos</h3>

                            <div className="space-y-3 ml-4">
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold">Cookies Esenciales (Necesarias)</p>
                                    <ul className="list-none ml-2 space-y-1">
                                        <li><strong>Propósito:</strong> Funcionamiento básico de la plataforma</li>
                                        <li><strong>Duración:</strong> Sesión (se eliminan al cerrar el navegador) o persistentes (hasta 1 año)</li>
                                        <li><strong>Datos recopilados:</strong> ID de sesión, preferencias de idioma, estado de autenticación</li>
                                        <li><strong>¿Se pueden desactivar?</strong> No, son indispensables para el funcionamiento del servicio</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold">Cookies de Rendimiento y Análisis</p>
                                    <ul className="list-none ml-2 space-y-1">
                                        <li><strong>Propósito:</strong> Analizar cómo los usuarios utilizan la plataforma para mejorarla</li>
                                        <li><strong>Proveedor:</strong> Google Analytics (Firebase Analytics)</li>
                                        <li><strong>Duración:</strong> Hasta 2 años</li>
                                        <li><strong>Datos recopilados:</strong> Páginas visitadas, tiempo de permanencia, navegador, dispositivo, ubicación aproximada (ciudad/país)</li>
                                        <li><strong>¿Se pueden desactivar?</strong> Sí, mediante configuración del navegador o rechazando cookies opcionales</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold">Cookies de Funcionalidad</p>
                                    <ul className="list-none ml-2 space-y-1">
                                        <li><strong>Propósito:</strong> Recordar sus preferencias y personalizar su experiencia</li>
                                        <li><strong>Duración:</strong> Hasta 1 año</li>
                                        <li><strong>Datos recopilados:</strong> Preferencias de configuración, favoritos, historial de búsquedas recientes</li>
                                        <li><strong>¿Se pueden desactivar?</strong> Sí, pero algunas funcionalidades pueden verse limitadas</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="font-semibold">Cookies de Marketing y Publicidad (Futuras)</p>
                                    <ul className="list-none ml-2 space-y-1">
                                        <li><strong>Propósito:</strong> Mostrar publicidad relevante según sus intereses</li>
                                        <li><strong>Proveedores:</strong> Meta (Facebook/Instagram), Google Ads</li>
                                        <li><strong>Duración:</strong> Hasta 1 año</li>
                                        <li><strong>Datos recopilados:</strong> Interacciones con anuncios, productos visualizados</li>
                                        <li><strong>¿Se pueden desactivar?</strong> Sí, y solo se activarán con su consentimiento explícito</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">8.2 Cómo Gestionar las Cookies</h3>
                            <p>Usted puede controlar y gestionar las cookies de las siguientes formas:</p>

                            <p className="font-semibold mt-2">Configuración del navegador:</p>
                            <ul className="list-disc list-inside ml-4">
                                <li><strong>Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios</li>
                                <li><strong>Firefox:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y datos del sitio</li>
                                <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Administrar datos de sitios web</li>
                                <li><strong>Edge:</strong> Configuración &gt; Cookies y permisos del sitio</li>
                            </ul>

                            <p className="font-semibold mt-3">Banner de cookies:</p>
                            <p className="ml-4">Al ingresar por primera vez, se mostrará un banner que le permitirá:</p>
                            <ul className="list-disc list-inside ml-8">
                                <li>Aceptar todas las cookies</li>
                                <li>Rechazar cookies opcionales (manteniendo solo las esenciales)</li>
                                <li>Personalizar sus preferencias</li>
                            </ul>

                            <p className="mt-3 bg-yellow-50 p-3 rounded border border-yellow-200"><strong>Advertencia:</strong> Desactivar cookies puede afectar la funcionalidad completa de la plataforma.</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">8.3 Tecnologías Similares</h3>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><strong>Service Workers:</strong> Tecnología que permite funcionalidad offline de la PWA. Almacena temporalmente contenido en caché local (hasta 100 MB aproximadamente).</li>
                                <li><strong>Local Storage:</strong> Almacenamiento local del navegador para guardar preferencias de usuario. Los datos permanecen hasta que sean eliminados manualmente.</li>
                                <li><strong>Web App Manifest:</strong> Archivo que permite instalar la PWA en su dispositivo. No recopila datos personales.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            9. DATOS PERSONALES DE MENORES DE EDAD
                        </h2>
                        <p>Nuestra plataforma está dirigida a personas <strong>mayores de 16 años</strong>.</p>

                        <div className="space-y-3 ml-4">
                            <p><strong>Usuarios entre 16 y 17 años:</strong> Si usted tiene entre 16 y 17 años, debe contar con el <strong>consentimiento de sus padres o tutores legales</strong> para utilizar nuestros servicios. Al registrarse, confirma que sus padres o tutores han leído y aceptado este Aviso de Privacidad.</p>

                            <p><strong>Menores de 16 años:</strong> TuriExpress no recopila intencionalmente datos personales de menores de 16 años. Si detectamos que un menor de 16 años nos ha proporcionado información personal sin consentimiento parental verificable, eliminaremos dichos datos de nuestros sistemas de forma inmediata.</p>

                            <p><strong>Padres y tutores:</strong> Si usted considera que su hijo(a) menor de 16 años nos ha proporcionado datos personales sin su consentimiento, o si desea ejercer derechos ARCO en representación de un menor de edad (16-17 años), contáctenos en <a href="mailto:privacidad@turiexpress.com" className="text-emerald-600 hover:text-emerald-700">privacidad@turiexpress.com</a> con evidencia de su relación parental o tutela legal.</p>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            10. CAMBIOS AL AVISO DE PRIVACIDAD
                        </h2>
                        <p>TuriExpress se reserva el derecho de modificar, actualizar o complementar este Aviso de Privacidad en cualquier momento para:</p>
                        <ul className="list-disc list-inside ml-4">
                            <li>Cumplir con cambios legislativos</li>
                            <li>Reflejar cambios en nuestras prácticas de tratamiento de datos</li>
                            <li>Incorporar nuevas funcionalidades o servicios</li>
                            <li>Mejorar la claridad y transparencia del aviso</li>
                        </ul>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">10.1 Notificación de Cambios</h3>
                            <p><strong>Cambios sustanciales</strong> (que afecten significativamente sus derechos) se comunicarán mediante:</p>
                            <ol className="list-decimal list-inside ml-4">
                                <li>Correo electrónico a la dirección registrada en su cuenta</li>
                                <li>Notificación destacada en nuestra aplicación móvil y sitio web</li>
                                <li>Publicación en <a href="https://turiexpress.com/aviso-privacidad" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://turiexpress.com/aviso-privacidad</a></li>
                            </ol>
                            <p className="mt-2">Usted tendrá un plazo de <strong>10 días naturales</strong> para manifestar su oposición a los cambios. Si no manifiesta oposición, se entenderá que acepta las modificaciones.</p>
                            <p className="mt-2"><strong>Cambios menores</strong> (correcciones de formato, actualizaciones de datos de contacto, clarificaciones) se publicarán en nuestro sitio web con la fecha de &quot;Última actualización&quot;.</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">10.2 Aceptación de Cambios</h3>
                            <p>La continuación del uso de nuestros servicios después de la publicación de cambios constituye su aceptación de los mismos. Si no está de acuerdo, puede cerrar su cuenta ejerciendo su derecho de cancelación conforme a la Sección 5.</p>
                            <p className="mt-2"><strong>Versión vigente:</strong> Siempre disponible en <a href="https://turiexpress.com/aviso-privacidad" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://turiexpress.com/aviso-privacidad</a></p>
                        </div>
                    </section>

                    {/* Section 11 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            11. LEGISLACIÓN APLICABLE Y AUTORIDAD COMPETENTE
                        </h2>
                        <p>Este Aviso de Privacidad se rige por la legislación mexicana vigente, particularmente:</p>
                        <ul className="list-disc list-inside ml-4">
                            <li><strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> (publicada en el DOF el 20 de marzo de 2025)</li>
                            <li>Reglamento de la LFPDPPP</li>
                            <li>Lineamientos y disposiciones emitidas por la autoridad competente</li>
                        </ul>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">11.1 Autoridad de Protección de Datos</h3>
                            <p>La autoridad competente para conocer de cualquier inconformidad relacionada con el tratamiento de sus datos personales es:</p>
                            <div className="ml-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p><strong>Secretaría de Anticorrupción y Buen Gobierno</strong></p>
                                <p>Sitio web: <a href="https://www.gob.mx/sfp" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://www.gob.mx/sfp</a></p>
                                <p>Atención ciudadana: <a href="https://www.gob.mx/sfp/acciones-y-programas/contacto-sfp" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://www.gob.mx/sfp/acciones-y-programas/contacto-sfp</a></p>
                            </div>
                            <p className="mt-3">De conformidad con el artículo transitorio de la LFPDPPP vigente, la Secretaría Anticorrupción y Buen Gobierno asumió las funciones que anteriormente correspondían al Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800">11.2 Procedimiento ante la Autoridad</h3>
                            <p>Si considera que su derecho a la protección de datos personales ha sido lesionado por alguna conducta u omisión de nuestra parte, o presume alguna violación a las disposiciones de la LFPDPPP, podrá interponer su inconformidad o denuncia ante dicha autoridad.</p>
                            <p className="mt-2"><strong>Recomendación:</strong> Le sugerimos agotar primero el procedimiento de derechos ARCO descrito en la Sección 5 antes de acudir a la autoridad.</p>
                        </div>
                    </section>

                    {/* Section 12 */}
                    <section className="space-y-4 bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            12. INFORMACIÓN DE CONTACTO
                        </h2>
                        <p>Para cualquier duda, comentario o solicitud relacionada con este Aviso de Privacidad o el tratamiento de sus datos personales:</p>

                        <div className="space-y-2 ml-4">
                            <p><strong>Departamento de Privacidad de TuriExpress</strong></p>
                            <p><strong>Correo electrónico:</strong> <a href="mailto:privacidad@turiexpress.com" className="text-emerald-600 hover:text-emerald-700">privacidad@turiexpress.com</a></p>
                            <p><strong>Teléfono:</strong> <a href="tel:+524425851526" className="text-emerald-600 hover:text-emerald-700">+52 (442) 585-1526</a></p>
                            <p><strong>Dirección:</strong> Avenida Pie de la Cuesta 2600, Colonia Desarrollo San Pablo, C.P. 76140, Santiago de Querétaro, Querétaro, México</p>
                            <p><strong>Sitio web:</strong> <a href="https://turiexpress.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">https://turiexpress.com</a></p>
                        </div>

                        <p className="mt-4"><strong>Horario de atención:</strong></p>
                        <p className="ml-4">Lunes a Viernes: 9:00 - 18:00 hrs (Zona Centro de México)</p>
                    </section>

                    {/* Section 13 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            13. ACEPTACIÓN DEL AVISO DE PRIVACIDAD
                        </h2>
                        <p>Al registrarse en TuriExpress, utilizar nuestra aplicación móvil o plataforma web, usted reconoce que:</p>
                        <ul className="list-disc list-inside ml-4">
                            <li>Ha leído y comprendido completamente este Aviso de Privacidad</li>
                            <li>Conoce las finalidades del tratamiento de sus datos personales</li>
                            <li>Comprende sus derechos ARCO y cómo ejercerlos</li>
                            <li>Autoriza el tratamiento de sus datos conforme a lo establecido</li>
                            <li>Consiente expresamente las transferencias nacionales e internacionales descritas</li>
                        </ul>

                        <p className="mt-4"><strong>Para finalidades voluntarias (marketing, análisis, publicidad):</strong> Durante el registro o en la configuración de su cuenta, podrá marcar o desmarcar opciones específicas para otorgar o negar su consentimiento.</p>
                    </section>

                    {/* Footer */}
                    <div className="pt-6 border-t-2 border-gray-300 text-center space-y-2">
                        <p className="font-semibold text-gray-700">Fecha de última actualización: 26 de noviembre de 2025</p>
                        <p className="font-semibold text-gray-700">Versión: 2.0 (LFPDPPP 2025)</p>
                        <p className="text-sm text-gray-600 italic mt-4">Este aviso de privacidad cumple con los requisitos establecidos en los artículos 15 y 16 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares vigente.</p>
                    </div>

                    {/* Buttons */}
                    <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <Link
                            href="/terminos"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            ← Ver Términos y Condiciones
                        </Link>
                        <Link
                            href="/"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
