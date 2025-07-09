'use client'
import Image from 'next/image'
import relojes from '../../data/relojes.json'
import Link from 'next/link'
import { useCarrito } from '../../context/CarritoContext'
import { useState } from 'react'

const colores = ['Oro blanco', 'Oro rosa', 'Acero', 'Titanio', 'Zafiro']
const movimientos = ['Automático', 'Manual']
const PRECIO_MIN = 0
const PRECIO_MAX = 200000

export default function ProductosPage() {
  const { agregarAlCarrito } = useCarrito()
  const [productoAgregado, setProductoAgregado] = useState(null)
  const [filtro, setFiltro] = useState({
    color: '',
    movimiento: '',
    precioMin: PRECIO_MIN,
    precioMax: PRECIO_MAX,
  })

  const handleAgregarAlCarrito = (reloj) => {
    agregarAlCarrito(reloj)
    setProductoAgregado(reloj.id)
    setTimeout(() => setProductoAgregado(null), 2000)
  }

  const aplicarFiltros = (reloj) => {
    const { color, movimiento, precioMin, precioMax } = filtro
    const cumpleColor = color ? reloj.color === color : true
    const cumpleMovimiento = movimiento ? reloj.movimiento.includes(movimiento) : true
    const cumplePrecio = reloj.precio >= precioMin && reloj.precio <= precioMax
    return cumpleColor && cumpleMovimiento && cumplePrecio
  }

  const toggleChip = (key, value) => {
    setFiltro(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }))
  }

  const handlePrecioMinChange = (e) => {
    const value = Math.min(Number(e.target.value), filtro.precioMax - 1000)
    setFiltro(prev => ({ ...prev, precioMin: value }))
  }

  const handlePrecioMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), filtro.precioMin + 1000)
    setFiltro(prev => ({ ...prev, precioMax: value }))
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-extrabold text-center mb-6 animate-fade-in-down">
          Nuestra Colección Exclusiva
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in">
          Descubre relojes exclusivos diseñados para los más exigentes. Cada pieza es una obra de arte que trasciende el tiempo.
        </p>

        <div className="flex gap-10">
          <aside className="w-64 sticky top-24 self-start h-fit bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase text-gray-600 mb-3 font-semibold">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colores.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleChip('color', color)}
                      className={`px-3 py-1.5 rounded-full border text-xs transition cursor-pointer ${ 
                        filtro.color === color
                          ? 'bg-black text-white border-black'
                          : 'bg-transparent text-black border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase text-gray-600 mb-3 font-semibold">Movimiento</h3>
                <div className="flex flex-wrap gap-2">
                  {movimientos.map((mov) => (
                    <button
                      key={mov}
                      onClick={() => toggleChip('movimiento', mov)}
                      className={`px-3 py-1.5 rounded-full border text-xs transition cursor-pointer ${
                        filtro.movimiento === mov
                          ? 'bg-black text-white border-black'
                          : 'bg-transparent text-black border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {mov}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase text-gray-600 mb-3 font-semibold">Precio</h3>

                <div className="relative h-10">
                  <input
                    type="range"
                    min={PRECIO_MIN}
                    max={PRECIO_MAX}
                    step={1000}
                    value={filtro.precioMin}
                    onChange={handlePrecioMinChange}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto"
                    style={{ zIndex: filtro.precioMin > filtro.precioMax - 2000 ? 5 : 3 }}
                  />
                  <input
                    type="range"
                    min={PRECIO_MIN}
                    max={PRECIO_MAX}
                    step={1000}
                    value={filtro.precioMax}
                    onChange={handlePrecioMaxChange}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto"
                    style={{ zIndex: 4 }}
                  />

                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 rounded-lg -translate-y-1/2" />

                  <div
                    className="absolute top-1/2 h-2 bg-black rounded-lg -translate-y-1/2"
                    style={{
                      left: `${(filtro.precioMin / PRECIO_MAX) * 100}%`,
                      right: `${100 - (filtro.precioMax / PRECIO_MAX) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs mt-2 font-medium text-gray-700"> 
                  <span>${filtro.precioMin.toLocaleString('es-AR')}</span>
                  <span>${filtro.precioMax.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="flex-1 min-h-[300px]">
            {relojes.filter(aplicarFiltros).length === 0 ? (
              <div className="text-center text-gray-500 text-lg mt-20">
                No se encontraron relojes con esos filtros.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {relojes.filter(aplicarFiltros).map((reloj) => (
                  <div
                    key={reloj.id}
                    className="bg-white text-black rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 relative border border-gray-200 flex flex-col"
                  >
                    <div className="relative w-full h-80">
                      <Image
                        src={reloj.imagen}
                        alt={reloj.nombre}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow justify-between min-h-[300px]">
                      <div>
                        <h3 className="text-xl font-semibold h-[56px] overflow-hidden leading-tight line-clamp-2">
                          {reloj.nombre}
                        </h3>
                        <p className="text-sm text-gray-700 mt-2 h-[48px] overflow-hidden line-clamp-2">
                          {reloj.descripcion}
                        </p>
                        <p className="text-lg font-medium mt-3">${reloj.precio.toLocaleString('es-AR')}</p>
                      </div>

                      <div className="mt-6 flex justify-between items-center gap-4"> 
                        <Link
                          href={`/producto-detalle?id=${reloj.id}`}
                          className="inline-block bg-black text-white px-5 py-1.5 rounded-xl text-center hover:bg-gray-700 transition text-sm" 
                        >
                          Ver Detalles
                        </Link>
                        <button
                          onClick={() => handleAgregarAlCarrito(reloj)}
                          className={`inline-block bg-black text-white px-5 py-1.5 rounded-xl text-center transition text-sm cursor-pointer ${
                            productoAgregado === reloj.id ? 'animate-pulse' : 'hover:bg-gray-700'
                          }`}
                        >
                          {productoAgregado === reloj.id ? 'Agregado al Carrito' : 'Agregar al Carrito'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
