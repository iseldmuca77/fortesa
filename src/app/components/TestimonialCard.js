import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialCard = ({ text, rating }) => {
  return (
    <div className="relative flex flex-col justify-between text-center rounded-sm p-6 bg-[#3b82f6] text-white w-full">
      {/* Quote Icon */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#3b82f6] p-3 rounded-full text-xl">
        <FaQuoteLeft />
      </div>

      {/* Text */}
      <p className="mt-6 text-sm leading-relaxed">{text}</p>

      {/* Stars */}
      <div className="mt-4 flex justify-center space-x-1">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="text-white" />
        ))}
      </div>

      {/* Speech bubble tail */}
      <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-[#3b82f6] border-r-[12px] border-r-transparent"></div>
    </div>
  );
};

export default TestimonialCard;