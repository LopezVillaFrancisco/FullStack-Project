import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CarritoProvider } from '../context/CarritoContext' 

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 font-sans">
        <CarritoProvider> 
          <Navbar />
          <main className="min-h-screen flex flex-col">{children}</main>
        </CarritoProvider>
          <Footer />
      </body>
    </html>
  )
}
