export default function Services() {
  const services = [
    {
      id: 1,
      icon: (
        <div className="border-1 border-[#1e3a8a] p-4 inline-block rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-siren-icon lucide-siren"><path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/></svg>
        </div>
      ),
      title: "Instalimi i Kamerave të Sigurisë (CCTV)",
      description: "Ne ofrojmë kamera sigurie me cilësi të lartë që mundësojnë monitorim 24/7 nga telefoni ose kompjuteri juaj, duke garantuar mbrojtje të plotë për shtëpi dhe biznese."
    },
    {
      id: 2,
      icon: (
        <div className="border-1 border-[#1e3a8a] p-4 inline-block rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-siren-icon lucide-siren"><path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/></svg>
        </div>
      ),
      title: "Sisteme Alarmesh dhe Sinjalizimi",
      description: "Sistemet tona të alarmit ju mbrojnë nga hyrjet e paautorizuara me sensorë të avancuar dhe njoftime të menjëhershme në rast rreziku."
    },
    {
      id: 3,
      icon: (
        <div className="border-1 border-[#1e3a8a] p-4 inline-block rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brick-wall-shield-icon lucide-brick-wall-shield"><path d="M12 9v1.258"/><path d="M16 3v5.46"/><path d="M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75"/><path d="M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"/><path d="M3 15h7"/><path d="M3 9h12.142"/><path d="M8 15v6"/><path d="M8 3v6"/></svg>
        </div>
      ),
      title: "Zgjidhje të Integruara të Sigurisë",
      description: "Kombinojmë kamera, alarme dhe kontroll të aksesit për një mbrojtje të personalizuar, të përshtatur për nevojat e çdo klienti."
    },
    {
      id: 4,
      icon: (
        <div className="border-1 border-[#1e3a8a] p-4 inline-block rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
        </div>
      ),
      title: "Mirëmbajtje dhe Konsulencë Teknike",
      description: "Kujdesemi që sistemet tuaja të funksionojnë gjithmonë në mënyrë të sigurt përmes kontrolleve periodike, përditësimeve dhe asistencës teknike."
    },
    {
      id: 5,
      icon: (
        <div className="border-1 border-[#1e3a8a] p-4 inline-block rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-handshake-icon lucide-handshake"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>
        </div>
      ),
      title: "Shërbime për Klientë Privatë dhe Biznese",
      description: "Ofron siguri për familjet, mbrojtje të aseteve për biznese dhe zgjidhje të avancuara për institucione publike e private."
    },
    {
      id: 6,
      icon: (
        <div className="border-1 border-[#1e3a8a] p-4 inline-block rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alarm-clock-check-icon lucide-alarm-clock-check"><circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="m9 13 2 2 4-4"/></svg>
        </div>
      ),
      title: "Monitorim në Kohë Reale dhe Reagim i Shpejtë",
      description: "Sistemet tona lidhen me qendra monitorimi që ndjekin çdo aktivitet të dyshimtë dhe reagojnë menjëherë në rast incidenti."
    }
  ];

  return (
      <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-46 py-8 sm:py-12 w-full text-[#0e0129]">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Shërbimet Tona</h1>
          <p className="mt-4 sm:mt-8 px-2 sm:px-12 md:px-24 lg:px-74">Ne ofrojmë zgjidhje sigurie të avancuara për shtëpi, biznese dhe institucione.Çdo shërbim është i personalizuar për të garantuar mbrojtje maksimale dhe qetësi të plotë.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-22">
          {services.slice(0, 9).map((service) => (
            <div key={service.id} className="relative px-4 sm:px-6 py-4 sm:py-2 hover:-translate-y-2 transition-transform duration-300 ease-in-out bg-white rounded-lg shadow-md">
              <div className="absolute top-4 left-4">
                {service.icon}
              </div>
              <div className="ml-24 sm:ml-24">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{service.title}</h1>
                <p className="text-black text-sm sm:text-base">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 sm:mt-14 text-center px-2 sm:px-12 md:px-24 lg:px-74">Me Fortesa Security, ju merrni më shumë se thjesht pajisje sigurie merrni një partner të besueshëm që kujdeset për mbrojtjen tuaj.Ne kombinojmë teknologjinë më të fundit me përvojën tonë për të ofruar zgjidhje të sigurta dhe afatgjata.</p>
      </div>
  );
}

