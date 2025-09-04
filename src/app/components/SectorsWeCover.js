import Image from "next/image";

export default function SectorsWeCover() {
  return (
    <>
      <div className="flex flex-col text-center mt-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Sektorët Që Mbulojmë</h1>
        <p className="px-2 sm:px-12 md:px-24 lg:px-74">Sektorët që mbulojmë</p>
      </div>
      <div className="flex flex-col lg:flex-row p-4 sm:p-8 md:p-16 lg:p-46 gap-8 sm:gap-12">
        {/* Left side - Image */}
        <div className="flex-1 flex justify-center items-center lg:pl-28 mb-8 lg:mb-0">
          <Image 
            src="/images/home-img.png" 
            alt="Security Services" 
            width={350} 
            height={500} 
            className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
          />
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col justify-between min-h-[400px] sm:min-h-[600px] md:min-h-[800px] lg:-mt-26 lg:-mb-16 lg:pr-28">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Pse FORTESA Security?</h1>
            <p className="text-xs sm:text-sm mb-4">Ne u ofrojmë klientëve të korporatave dhe familjeve një paketë të integruar sigurie.</p>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-2 border-gray-100 relative hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-xl group">
              <div className="absolute top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#3b82f6] flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right group-hover:stroke-white transition-colors duration-300"><path d="m9 18 6-6-6-6"/></svg>
              </div>
              <Image 
                src="/images/ICoCA.jpg" 
                alt="ICOCA" 
                width={120} 
                height={120} 
                className="rounded-lg shadow-lg ml-10 sm:ml-12"
              />
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-2 border-gray-100 relative hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-xl mt-4 group">
              <div className="absolute top-8 left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#3b82f6] flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bug-icon lucide-bug group-hover:stroke-white transition-colors duration-300"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 ml-10 sm:ml-12">Më shumë se 700 punonjës të specializuar në fushën e sigurisë fizike dhe të objekteve</h3>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-2 border-gray-100 relative hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-xl group">
              <div className="absolute top-8 left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#3b82f6] flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-waypoints-icon lucide-waypoints group-hover:stroke-white transition-colors duration-300"><circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/></svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 ml-10 sm:ml-12">I çertifikuar me standardet më të mira në fushën e sigurisë ICoCA ISO9001 OHSAS18001 ISO14001</h3>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-2 border-gray-100 relative hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:shadow-xl group">
              <div className="absolute top-8 left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#3b82f6] flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-digit-icon lucide-file-digit group-hover:stroke-white transition-colors duration-300"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="4" height="6" x="2" y="12" rx="2"/><path d="M10 12h2v6"/><path d="M10 18h4"/></svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 ml-10 sm:ml-12">Ne ofrojmë asistencë gjithëpërfshirëse sigurie 24/7 për të gjithë klientët tanë</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
