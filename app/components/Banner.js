"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <motion.div
      className="banner1 relative bg-cover bg-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <video
        className="absolute opacity-20  bg-cover bg-center top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/ecmac.mp4" type="video/mp4" />
       
      </video>
      <div className="overlay bg-[white] bg-opacity-50 flex flex-col items-center justify-center text-center p-6 md:p-10 h-full">
        <motion.h1
          className="text-[#130159] text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Découvrez nos dernières actualités !
        </motion.h1>
        <motion.p
          className="text-[#130159] text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Restez à jour avec les nouvelles publications, annonces importantes et
          informations exclusives sur notre fil d&apos;actualité.
        </motion.p>
        <div className="mt-6">
          <motion.button
            href="/actualites"
            className="relative shadow-md text-lg text-white px-1 py-2  md:px-5 md:py-4 rounded-md inline-flex items-center justify-center border hover:border-[#130159] border-[#51be78] bg-[#51be78] animate-shimmer bg-[linear-gradient(110deg,#51be78,45%,#65e090,55%,#51be78)] bg-[length:200%_100%] font-medium transition-all duration-400 ease-out overflow-hidden group"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="absolute inset-0 w-full h-full bg-[#130159] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
            <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#ffffff]">
              Voir le fil d&apos;actualité
            </span>
            <Icon
              className="z-10 text-white"
              icon="solar:arrow-right-line-duotone"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
