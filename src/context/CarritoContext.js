'use client'
import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export const useCarrito = () => {
  return useContext(CarritoContext)
}

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id)
    
    if (productoExistente) {
      setCarrito((prevCarrito) => 
        prevCarrito.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      )
    } else {
      setCarrito((prevCarrito) => [...prevCarrito, { ...producto, cantidad: 1 }])
    }
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(producto => producto.id !== id))
  }

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) => 
      prevCarrito.map(item => 
        item.id === id ? { ...item, cantidad } : item
      )
    )
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  )
}
