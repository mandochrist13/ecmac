import React from 'react';
import Image from 'next/image';
import Image1 from '@/public/images1.png';
import Image2 from '@/public/image2.png';
import Image3 from '@/public/image3.png';
import Image4 from '@/public/cybersecurité.png';
import { Icon } from "@iconify/react";


const AnimatedBackground = ({ children, className = '' }) => {
  return (
    <div className={`relative w-full h-full ${className}`}> {/* Utilisez relative, w-full, h-full pour s'adapter au parent */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute w-40 h-40 md:w-40 md:h-40 rounded-full bg-gray-400 filter opacity-30 animate-float2"
          style={{ bottom: '90%', right: '0%'  }} // Coin supérieur droit
        >
        <Image
            src={Image2}
            alt="Image 2"
            className="w-full h-full object-cover rotate-45"
          />
        </div>

        <div
          className="absolute w-40 h-40 md:w-70 md:h-70 filter rounded-full bg-gray-400 grayscale opacity-30 animate-float3"
          style={{ bottom: '90%', left: '0%' }} // milieu
        >
        <Image
            src={Image4}
            alt="Image 4"
            className="w-full h-full object-cover rotate-45"
          />
        </div>

      </div>
              <div
          className="absolute w-12 h-12 md:w-40 md:h-40 filter grayscale opacity-30 animate-float7"
          style={{ top: '5%', right: '0%' }} // Coin supérieur gauche
        >
        <Image
            src={Image3}
            alt="Image 3"
            className="w-full h-full object-cover rotate-45"
          />
        </div>

        <div
          className="absolute w-10 h-10 md:w-40 md:h-40  filter  opacity-30 animate-float9"
          style={{ bottom: '95%', left: '0%' }} // Coin supérieur gauche
        >
        <Image
            src={Image1}
            alt="Image 1"
            className="w-full h-full object-cover rotate-45 "
          />
        </div>



      {/* Le contenu enfant sera positionné au-dessus de l'arrière-plan */}
      <div className="relative z-10 w-full h-full p-4"> {/* Assure que le contenu est au-dessus */}
        {children}
      </div>

      {/* Styles pour l'animation */}
      <style jsx global>
        {`
          @keyframes float2 {
            0% { transform: translateY(-600px); }
            50% { transform: translateY(-500px); }
            100% { transform: translateY(-600px); }
          }
          @keyframes float3 {
            0% { transform: translateY(-300px); }
            50% { transform: translateY(-400px); }
            100% { transform: translateY(-300px); }
          }
          @keyframes float7 {
            0% { transform: translateY(-1100px); }
            50% { transform: translateY(-1000px); }
            100% { transform: translateY(-1100px); }
          
          @keyframes float9 {
            0% { transform: translateY(-900px); }
            50% { transform: translateY(-1000px); }
            100% { transform: translateY(-900px); }
          }


          .animate-float1 { animation: float1 10s infinite ease-in-out ;  }
          .animate-float2 { animation: float2 10s infinite ease-in-out; }
          .animate-float3 { animation: float3 10s infinite ease-in-out; }
          .animate-float4 { animation: float4 10s infinite ease-in-out; }
          .animate-float5 { animation: float5 10s infinite ease-in-out; }
          .animate-float6 { animation: float6 10s infinite ease-in-out; }
          .animate-float7 { animation: float7 10s infinite ease-in-out; }
          .animate-float8 { animation: float8 10s infinite ease-in-out; }
          .animate-float9 { animation: float9 10s infinite ease-in-out; }

        `}
      </style>
    </div>
  );
};

export default AnimatedBackground;