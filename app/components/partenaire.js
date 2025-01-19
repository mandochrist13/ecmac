"use client"

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "L'Agence Nationale des Bourses du Gabon (ANBG)",
    description:
      "Créée en 2011, placée sous la tutelle technique du ministère de l’Enseignement Supérieur, de la Recherche Scientifique et du Transfert de Technologies...",
    image: "/anbg.jpeg",
  },
  {
    name: "MINISTERE DE L'ENSEIGNEMENT SUPERIEUR, DE LA RECHERCHE SCIENTIFIQUE ET DE L'INNOVATION TECHNOLOGIQUE",
    description: "",
    image: "/minis.png",
  },
  {
    name: "Le SOSUP",
    description:
      "Le Sosup, entité publique chargée de mettre en œuvre la politique nationale en matière d’orientation et de formation, se voit confier une mission capitale...",
    image: "/sosup.jpg",
  },
  {
    name: "GIMAC",
    description:
      "Le Groupement Interbancaire Monétique de l’Afrique Centrale (GIMAC) est un GIE dont les membres d’Office sont la Banque des Etats de l’Afrique Centrale...",
    image: "/gimac.png",
  },
  {
    name: "La FNTC",
    description:
      "La Fédération des Tiers de Confiance du numérique (FnTC) rassemble éditeurs de logiciels, prestataires de services, experts, professionnels réglementés...",
    image: "/fntc.jpeg",
  },
  {
    name: "VALMA-STUDY",
    description:
      "Étudier en France. Candidate parmi 40 écoles partenaires et plus de 500 formations reconnues en France...",
    image: "/valma.jpg",
  },
];

export default function PartnersSection  () {
  return (
    <section className="relative bg-[#120158] py-16 text-white">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/partenaire.jpeg"
          alt="Background decoration"
          width={1000}
          height={1000}
          className="w-full h-full hidden md:flex bg-cover bg-center opacity-15"
        />
      </div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos partenaires
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ils nous font Confiance.
          </motion.p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-4 p-4 "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex-shrink-0">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{partner.name}</h3>
                <p className="text-sm">{partner.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

