"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Grid = () => {
  const Data2 = [
    {
      title1: "DATES",
      title2: "NIVEAUX",
      rows: [
        { label: "26 Août 2024", cost: "1ère Année Licence Professionnelle LP1-MSS-MTES" },
        { label: "27 Août 2024", cost: "2ème Année Licence Professionnelle LP2-MSS-MTES" },
        { label: "28 Août 2024", cost: "3ème Année Licence Professionnelle LP3-MSS-MTES" },
        { label: "29 Août 2024", cost: "1ère Année Master Professionnel MP1-MTES" },
      ],
    },
];

    const Data1 = [
    {
      title: "Licence Professionnelle (MSS) et Licence Professionnelle (MTES)",
      rows: [
        { label: "Inscription/Réinscription", cost: "280 000 FCFA" },
        { label: "1ère année", cost: "1 200 000 FCFA" },
        { label: "2ième année", cost: "1 320 000 FCFA" },
        { label: "3ième année", cost: "1 452 000 FCFA" },
      ],
    },
    {
      title:
        "Licence Professionnelle CyberSécurité Monétique et Certification Numérique (LP-CSM-CN)",
      rows: [
        { label: "Inscription/Réinscription", cost: "280 000 FCFA" },
        { label: "1ère année", cost: "1 400 000 FCFA" },
        { label: "2ième année", cost: "1 555 000 FCFA" },
        { label: "3ième année", cost: "1 666 000 FCFA" },
      ],
    },
    {
      title:
        "Master Professionnel Monétique et Transactions Electroniques Sécurisées (MP-MTES)",
      rows: [
        { label: "Inscription/Réinscription", cost: "280 000 FCFA" },
        { label: "Master Professionnel 1", cost: "1 900 000 FCFA" },
        { label: "Master Professionnel 2", cost: "1 999 000 FCFA" },
      ],
    },
  ];

    const Data3 = [
        {
      title: "DATES",
      rows: [
        { label: "2 Septembre 2024", cost: "1ère Année Licence Professionnelle LP1-MSS-MTES" },
        { label: "3 Septembre 2024", cost: "2ème Année Licence Professionnelle LP2-MSS-MTES" },
        { label: "4 Septembre 2024", cost: "3ème Année Licence Professionnelle LP3-MSS-MTES" },
        { label: "5 Septembre 2024", cost: "1ère Année Master Professionnel MP1-MTES" },
      ],
    },
];



  return (
    <section className="px-8 lg:px-32 flex gap-10 flex-col justify-center items-center py-20 ">
      <div className="container">
        <div className="flex justify-center">
          <div className="flex flex-col ">
            <h1 className="text-[#130159] mt-2 font-bold text-4xl md:text-5xl flex justify-center mb-3">
              Grille de tarifs
            </h1>
            <p className="text-gray-400 flex justify-center items-center">
                Pour toute question concernant votre inscription, nous vous invitons à contacter le service des admissions.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-10 justify-center items-center ">
          {Data1.map((category, index) => (
            <Table key={index}>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={2} className="">
                    {category.title}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.rows.map((row, i) => (
                  <TableRow i={i} key={i}>
                    <TableCell
                      className={
                        ("border w-[80%] border-gray-300",
                        i === 0 && "font-bold") // Applique le style gras uniquement à la première cellule de la première ligne
                      }
                    >
                      {row.label}
                    </TableCell>
                    <TableCell className="flex border-l border-[#130159] justify-end">
                      {row.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </div>

          <div className="flex flex-col mt-10 ">
            <h1 className="text-[#130159] mt-2 font-bold text-2xl md:text-2xl flex justify-center mb-3">
              Calendrier des inscriptions administratives pour l’année académique 2024-2025
            </h1>
            <p className="text-gray-400 flex justify-center mb-2">
                Périodes d’inscriptions
            </p>
            <p className="text-[#51be78] font-bold flex justify-center underline mb-2">
                Première vague
            </p>
            <p className="flex justify-center text-gray-400">
                Juin à Août 2024
            </p>
          </div>


    <div className="flex flex-col mt-10 justify-center items-center ">
          {Data2.map((category, index) => (
            <Table key={index}>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={2} className="">
                    {category.title1}
                    {category.title2}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.rows.map((row, i) => (
                  <TableRow i={i} key={i}>
                    <TableCell
                      className={
                        ("border w-[80%] border-gray-300 font-bold")
                      }
                    >
                      {row.label}
                    </TableCell>
                    <TableCell className="flex border-l border-[#130159] justify-end">
                      {row.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </div>

            <div className="flex flex-col mt-10">
            <h1 className="text-[#51be78]  font-bold flex justify-center underline mb-2">
                Deuxième vague
            </h1>
            <p className="text-gray-400 flex justify-center">
                Du 1er au 16 Septembre 2024
            </p>
          </div>


            <div className="flex flex-col mt-10 justify-center items-center ">
          {Data3.map((category, index) => (
            <Table key={index}>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={2} className="">
                    {category.title}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.rows.map((row, i) => (
                  <TableRow i={i} key={i}>
                    <TableCell
                      className={
                        "border w-[80%] border-gray-300 font-bold"     // Applique le style gras uniquement à la première cellule
                      }
                    >
                      {row.label}
                    </TableCell>
                    <TableCell className="flex border-l border-[#130159] justify-end">
                      {row.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </div>

      </div>
      <motion.div
        className="bg-cover md:w-[80%] justify-start rounded-md bg-center"
        style={{
          backgroundImage: "url('/bg.png')",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-black flex flex-col p-5 md:p-10 rounded-md gap-8 bg-opacity-25"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col gap-2 xl:w-[50%]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-white font-bold text-3xl">
              Frais d&apos;inscription à toutes les licences Pro et Master Pro :
              280.000 FCFA
            </h1>
            <h1 className="text-white text-base">
              Pour toute question concernant votre inscription, nous vous
              invitons à contacter le service des admissions.
            </h1>
          </motion.div>
          <motion.div
            className="flex flex-col lg:flex-row gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a
              href="mailto:admissions@exemple.com"
              className="px-6 py-3 flex justify-center items-center gap-2 text-[#419b60] bg-white hover:bg-white/80 rounded-md shadow-lg transition-colors duration-300"
            >
              <Icon className="text-xl" icon="line-md:email-twotone" />
              Envoyer un e-mail
            </a>
            <a
              href="tel:+1234567890"
              className="px-6 flex justify-center items-center gap-2 py-3 text-white bg-[#120158] hover:bg-[#0e013e] rounded-md shadow-lg transition-colors duration-300"
            >
              <Icon className="text-xl" icon="line-md:phone-call-loop" />
              Appeler Maintenant
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Grid;
