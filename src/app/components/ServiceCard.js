import Image from 'next/image';

const ServiceCard = ({ service }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Background Image */}
      <div className="relative h-80 w-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-all duration-300"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <h3 className="text-xl font-bold mb-3 leading-tight">
          {service.title}
        </h3>
        
        <p className="text-sm text-gray-200 mb-4 line-clamp-4 leading-relaxed">
          {service.description}
        </p>
        
        <button className="self-start bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-200">
          Read More
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;