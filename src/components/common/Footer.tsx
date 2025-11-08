import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Acerca de */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">La Perversoapp</h3>
            <p className="text-sm text-gray-400">
              Conectando viajeros con servicios turísticos locales de forma
              sencilla y confiable.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/alojamientos" className="text-sm hover:text-emerald-400 transition-colors">
                  Alojamientos
                </Link>
              </li>
              <li>
                <Link href="/alimentos" className="text-sm hover:text-emerald-400 transition-colors">
                  Alimentos
                </Link>
              </li>
              <li>
                <Link href="/experiencias" className="text-sm hover:text-emerald-400 transition-colors">
                  Experiencias
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-emerald-400 transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-emerald-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-emerald-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <span className="text-gray-400">Email:</span>
                <a href="mailto:pruebasturiexpress@gmail.com" className="ml-1 hover:text-emerald-400 transition-colors">
                    pruebasturiexpress@gmail.com
                </a>
              </li>
              <li className="text-sm">
                <span className="text-gray-400">Teléfono:</span>
                <a href="tel:+573001234567" className="ml-1 hover:text-emerald-400 transition-colors">
                  +57 300 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} La Perversoapp. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Desarrollado por José Ángel, Lizet Jazmín y Jesús Enrique
          </p>
        </div>
      </div>
    </footer>
  );
}
