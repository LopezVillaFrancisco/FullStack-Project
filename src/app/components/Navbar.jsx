'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCarrito } from '../../context/CarritoContext'

export default function Navbar() {
  const { carrito } = useCarrito()

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <header className="bg-black/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-semibold tracking-widest text-white/45 uppercase">
          RelojPage
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-white/45">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Inicio
          </Link>
          <Link href="/productos" className="hover:text-white transition-colors duration-200">
            Productos
          </Link>
          <Link href="/Contactanos" className="hover:text-white transition-colors duration-200">
            Contactanos
          </Link>
          <Link href="/carrito" className="relative hover:text-white transition-colors duration-200">
            <ShoppingCart className="w-6 h-6" />
            {cantidadTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cantidadTotal}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}
