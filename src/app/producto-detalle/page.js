'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import relojes from '../../data/relojes.json'
import { useCarrito } from '../../context/CarritoContext'
import { useState } from 'react'

export default function ProductoDetallePage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const reloj = relojes.find(r => r.id === parseInt(id))

  const { agregarAlCarrito } = useCarrito()

  const [agregado, setAgregado] = useState(false)

  if (!reloj) {
    return <p>Reloj no encontrado.</p>
  }

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(reloj)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden shadow-lg animate-fade-in">
          <Image
            src={reloj.imagen}
            alt={reloj.nombre}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {reloj.nombre}
          </h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {reloj.descripcion}
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 w-32">Marca:</span>
              <p className="text-gray-600">{reloj.marca}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 w-32">Material:</span>
              <p className="text-gray-600">{reloj.material}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 w-32">Movimiento:</span>
              <p className="text-gray-600">{reloj.movimiento}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 w-32">Resistencia al agua:</span>
              <p className="text-gray-600">{reloj.resistencia}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 w-32">Diámetro:</span>
              <p className="text-gray-600">{reloj.diametro} mm</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 w-32">Género:</span>
              <p className="text-gray-600">{reloj.genero}</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-black mb-6">
            ${reloj.precio.toLocaleString()}
          </p>
          <button
            onClick={handleAgregarAlCarrito}
            className={`bg-black text-white px-8 py-3 rounded-full text-lg transition duration-300 shadow-lg cursor-pointer ${
              agregado
                ? 'bg-green-500 text-white'
                : 'hover:bg-gray-800'
            }`}
          >
            {agregado ? (
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Agregado al Carrito
              </span>
            ) : (
              'Agregar al Carrito'
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
