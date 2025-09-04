import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-blue-500 text-white mt-16 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Email: info@fortesa.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Security Ave, Safety City</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">Protection & Physical Security</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">Security & Escorting Values</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">CCTV Systems</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">Alarm Systems</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">GPS Systems</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Sectors</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">Business Center and Supermarket</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">Travel and Tourism</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">Hospitals and Health Care</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">Embassies and Money Institution</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">Cultural Activities and National Fairs</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">Hydropower plants and Factories</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">Services</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-row border-t border-white/10 bg-[#05224C]">
        <div className="max-w-7xl mx-auto px-6 py-4 justify-between text-gray-400 text-sm">
          ©Copyright @ {year} Fortesa. All Rights Reserved.
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4 justify-between text-gray-400 text-sm">
          <Link href="/">Complains Policy & Procedures</Link>
        </div>
      </div>
    </footer>
  );
}


