export default function AnimatedServiceCard({ 
  leftIcon, 
  text, 
  rightIcon, 
  borderColor = "border-gray-300", 
  animationColor, 
  hoverBorderColor = "hover:border-gray-400" 
}) {
  return (
    <div className={`flex items-center justify-between gap-4 p-4 border rounded-lg w-full relative overflow-hidden group ${borderColor} ${hoverBorderColor} transition-all duration-300 hover:shadow-lg`}>
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center relative z-20">
        <span className="text-white text-lg">{leftIcon}</span>
      </div>
      <span className="text-white font-semibold flex-1 text-center relative z-10">{text}</span>
      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center relative z-20">
        <span className="text-white text-lg">{rightIcon}</span>
      </div>
      <div className={`absolute inset-0 ${animationColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1200 origin-left z-0`}></div>
    </div>
  );
} 