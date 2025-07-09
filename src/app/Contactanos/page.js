'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)

  const handleChange = () => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    e.preventDefault()
    console.log('Formulario enviado:', form)
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
    setForm({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.h1
          className="text-5xl font-extrabold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contactanos
        </motion.h1>

        <motion.p
          className="text-lg text-center text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ¿Tenés alguna consulta sobre nuestros relojes? Completá el formulario y nos pondremos en contacto a la brevedad.
        </motion.p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea
              name="mensaje"
              rows={5}
              value={form.mensaje}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Enviar Mensaje
          </button>

          {enviado && (
            <p className="text-green-600 text-center mt-4">
              ✅ ¡Mensaje enviado correctamente!
            </p>
          )}
        </form>

        <div className="mt-12 text-center text-sm text-gray-600">
          También podés escribirnos a: <strong>contacto@relojpage.com</strong>
          <br />
          o llamarnos al <strong>+54 11 1234-5678</strong>
        </div>
      </div>
    </div>
  )
}
