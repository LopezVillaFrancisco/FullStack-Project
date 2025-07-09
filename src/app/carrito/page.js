'use client'
import Link from 'next/link'
import { useCarrito } from '../../context/CarritoContext'
import Image from 'next/image'

export default function CarritoPage() {
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useCarrito()

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  const handleIncrementar = (producto) => {
    actualizarCantidad(producto.id, producto.cantidad + 1)
  }

  const handleDecrementar = (producto) => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.id, producto.cantidad - 1)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-extrabold text-center text-black mb-8">Tu Carrito</h2>

        {carrito.length > 0 ? (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-lg font-semibold text-gray-700">Producto</th>
                    <th className="py-3 px-4 text-lg font-semibold text-gray-700">Precio</th>
                    <th className="py-3 px-4 text-lg font-semibold text-gray-700">Cantidad</th>
                    <th className="py-3 px-4 text-lg font-semibold text-gray-700">Subtotal</th>
                    <th className="py-3 px-4 text-lg font-semibold text-gray-700">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((producto) => (
                    <tr key={producto.id} className="border-b hover:bg-gray-100">
                      <td className="py-4 px-4 flex items-center">
                        <Image src={producto.imagen} alt={producto.nombre} width={100} height={100} className="mr-4 rounded-full" />
                        <span className="font-medium text-gray-800">{producto.nombre}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">${producto.precio.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrementar(producto)}
                            className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-gray-800">{producto.cantidad}</span>
                          <button
                            onClick={() => handleIncrementar(producto)}
                            className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">${(producto.precio * producto.cantidad).toLocaleString()}</td>
                      <td className="py-4 px-4 text-red-600 cursor-pointer hover:text-red-800" onClick={() => eliminarDelCarrito(producto.id)}>
                        <span>&#10005;</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div className="text-xl font-medium text-gray-800">
                <span>Total: </span>
                <span className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</span>
              </div>
              <div>
                <Link href="/checkout" className="inline-block bg-black text-white px-8 py-3 rounded-full text-lg font-medium tracking-wide hover:bg-gray-800 transition duration-300">
                  Proceder a la Compra
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600">Tu carrito está vacío. ¡Explora nuestra colección de relojes de lujo y encuentra el indicado para ti!</p>
            <Link href="/productos" className="mt-4 inline-block bg-black text-white px-8 py-3 rounded-full text-lg font-medium tracking-wide hover:bg-gray-800 transition duration-300">
              Explorar Colección
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
