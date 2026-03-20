"use client";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=R.+Bancário+Waldemar+de+Mesquita+Accioly,+16+-+Bancários,+João+Pessoa+-+PB,+58051-420";

const MapSection = () => {
  return (
    <section className="relative w-full">
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-[300px] md:h-[400px] relative group cursor-pointer"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d-34.8367!3d-7.1398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace8391e5beb4d%3A0x0!2sR.+Banc%C3%A1rio+Waldemar+de+Mesquita+Accioly%2C+16+-+Banc%C3%A1rios%2C+Jo%C3%A3o+Pessoa+-+PB!5e0!3m2!1spt-BR!2sbr"
          className="w-full h-full border-0 pointer-events-none"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização da Paróquia Santo Menino Jesus de Praga"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-bold text-sm shadow-lg">
            Abrir no Google Maps
          </span>
        </div>
      </a>
    </section>
  );
};

export default MapSection;
