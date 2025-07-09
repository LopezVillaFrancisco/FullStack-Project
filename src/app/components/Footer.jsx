export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-semibold">RelojPage</p>
            <p className="text-sm">La exclusividad del tiempo.</p>
          </div>
          <div className="flex space-x-6 justify-center md:justify-end">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-center">© {new Date().getFullYear()} RelojPage. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
