'use client'

import { useCarrito } from '../../context/CarritoContext'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2,CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CheckoutPage() {
  const { carrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito } = useCarrito()
  const [total, setTotal] = useState(0)
  const [payment, setPayment] = useState(false)

  useEffect(() => {
    const suma = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    setTotal(suma)
  }, [carrito])

  if (carrito.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">Tu carrito está vacío</h1>
        <Link
          href="/productos"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Ver Productos
        </Link>
      </section>
    )
  }
  
  return payment == true?(
         <section className="min-h-screen flex flex-col items-center justify-center bg-green-700 px-4 md:px-12">
            <CheckCircle className="w-24 h-24 text-white mb-6" />
            <h2 className="text-5xl font-bold text-white mb-8 text-center">
                ¡Gracias por tu compra!
            </h2>
            <Link href="/productos">
                <button className="bg-white text-green-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition cursor-pointer">
                Volver a la tienda
                </button>
            </Link>
        </section>
    ):(
        <section className="min-h-screen bg-gray-100 py-12 px-4 md:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Checkout</h1>

            <div className="space-y-4">
            {carrito.map(item => (
                <div
                key={item.id}
                className="flex items-center space-x-4 border-b border-gray-300 pb-4"
                >
                <div className="w-20 h-20 relative">
                    <Image src={item.imagen} alt={item.nombre} fill className="object-contain" />
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">{item.nombre}</h2>
                    <p className="text-gray-800">
                    ${item.precio.toLocaleString('es-AR')}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                    <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                        className="px-2 py-1 bg-gray-300 text-gray-900 rounded disabled:opacity-50 cursor-pointer"
                    >
                        -
                    </button>
                    <span className="text-gray-900">{item.cantidad}</span>
                    <button
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        className="px-2 py-1 bg-gray-300 text-gray-900 rounded cursor-pointer"
                    >
                        +
                    </button>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                    ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                    </p>
                    <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="mt-2 text-sm text-gray-800 hover:underline cursor-pointer"
                    >
                    <Trash2 className="w-5 h-5 text-red-700" />
                    </button>
                </div>
                </div>
            ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
            <button
                onClick={vaciarCarrito}
                className="text-gray-800 hover:underline cursor-pointer"
            >
                Vaciar Carrito
            </button>
            <p className="text-2xl font-semibold text-gray-900">
                Total: ${total.toLocaleString('es-AR')}
            </p>
            </div>

            <div className="mt-6 text-right">
            <button
                onClick={() => {
                setPayment(true)
                setTimeout(() => vaciarCarrito(), 1000)
                }}
                className="bg-black text-white px-8 py-3 cursor-pointer rounded-full text-lg hover:bg-gray-800 transition"
            >
                Pagar Ahora
            </button> 
            </div>
        </div>
        </section>
  )
}
