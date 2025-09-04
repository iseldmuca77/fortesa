"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// AnimatedNumber component
function AnimatedNumber({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / value), 20);
    const increment = value / (duration / stepTime);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div>
      <div className="text-3xl font-bold text-blue-900">{count}{suffix}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-blue-900">Rreth Nesh</h1>
            <div className="flex items-center space-x-2">
              <Image
                className="dark:invert"
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={34}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Welcome Section */}
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Mirë se vini në<br />Fortesa Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                E themeluar si një kompani lider sigurie private në Shqipëri, Fortesa Security 
                është e përkushtuar në ofrimin e shërbimeve të mbrojtjes së nivelit të lartë. 
                Ekipi ynë me përvojë është i angazhuar për të garantuar sigurinë dhe mbrojtjen 
                e klientëve tanë përmes ekspertizës, vigjilencës dhe zgjidhjeve të avancuara.
              </p>
            </div>

            {/* Our History */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Historia Jonë</h3>
              <p className="text-gray-700 leading-relaxed">
                Me mbi 20 vjet përvojë, Fortesa Security është rritur nga një biznes i vogël lokal 
                në një emër të besuar në industrinë e sigurisë. Ne kemi ndërtuar reputacionin tonë 
                mbi një themel besueshmërie dhe përsosmërie.
              </p>
            </div>

            {/* Our Mission */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Misioni Ynë</h3>
              <p className="text-gray-700 leading-relaxed">
                Ne përpiqemi të ofrojmë zgjidhje sigurie novatore dhe të besueshme të përshtatura 
                për nevojat unike të çdo klienti, duke garantuar qetësi mendore.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Security Guard Image */}
            <div className="relative">
              <Image
                src="/images/about.jpg"
                alt="Security Guard"
                width={3129}
                height={4164}
                className="w-full h-[600px] object-cover rounded-lg shadow-lg"
                priority
              />
              
              {/* Quick Facts Card */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg p-6 shadow-xl">
                <div className="space-y-3">
                  <AnimatedNumber value={20} suffix="+" label="VJET NË BIZNES" />
                  <AnimatedNumber value={500} suffix="+" label="KLIENTË" />
                  <AnimatedNumber value={10} suffix="+" label="QYTETE" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Professionalism */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Profesionalizmi</h4>
              <p className="text-gray-600 text-sm">
                Ne mbajmë standardet më të larta të sjelljes dhe performancës në çdo aspekt 
                të punës sonë.
              </p>
            </div>

            {/* Trust */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Besimi</h4>
              <p className="text-gray-600 text-sm">
                Ndërtimi i besimit me klientët tanë është në thelb të asaj që bëjmë, duke 
                garantuar transparencë dhe integritet.
              </p>
            </div>

            {/* Customer Care */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Kujdesi për Klientin</h4>
              <p className="text-gray-600 text-sm">
                Siguria dhe kënaqësia e klientëve tanë janë prioritetet tona kryesore, dhe ne 
                shkojmë përtej për të plotësuar nevojat e tyre.
              </p>
            </div>

            {/* Innovation */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Inovacioni</h4>
              <p className="text-gray-600 text-sm">
                Ne përqafojmë teknologjinë dhe strategjitë më të avancuara për të qëndruar 
                përpara në industrinë e sigurisë.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;