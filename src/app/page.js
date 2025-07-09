export default function HomePage() {
  return (
    <section className="relative h-screen bg-[url('https://graziamagazine.com/es/wp-content/uploads/sites/12/2023/10/91c81a8d-763a-1707-df0c-54c00f945748.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-0" />
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-widest text-white mb-6 animate-fade-in-down">
          Elegancia que trasciende el tiempo
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto animate-fade-in">
          Relojes exclusivos diseñados para quienes valoran cada segundo como una obra de arte.
        </p>
        <a
          href="/productos"
          className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg font-medium tracking-wide hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-2xl animate-fade-in-up"
        >
          Ver Colección
        </a>
      </div>
    </section>
  )
}
