import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Novembre 2010",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[16px] font-normal mb-8">
            Le projet de création de l'École Communautaire de Monétique
            d'Afrique Centrale (ECMAC) est né au mois de novembre 2010 à
            l'ENSICAEN, École Nationale Supérieure d'Ingénieurs de Caen, en
            Normandie dans le département du Calvados.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-[16px]  font-normal mb-8">
            L'idée du projet apparait suite à une conversation entre le
            fondateur, Emile KOMBILA, et un de ses enseignants au cours d'une
            pause-café à l'ENSICAEN.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Image
              src="/ensicaen.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/emile 3.jpg"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2012",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[16px] font-normal mb-4">
            la fusion de l'OMAC et de la SMAC donne naissance au GIMAC
            (Groupement Interbancaire Monétique d'Afrique Centrale), structure
            destinée à promouvoir le développement de la monétique intégrale
            pour les banques de la zone CEMAC.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-[16px]  font-normal mb-4">
          C'est ainsi que germe l'idée du fondateur de créer une école spécialisée dans la formation de cadres africains dans le domaine de la monétique et des transactions électroniques sécurisées, capables de s'intégrer dans les projets monétiques de la sous-région
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Image
              src="/gimac.png"
              alt="hero template"
              width={1000}
              height={1000}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/cemac.jpg"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2015",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[16px]  font-normal mb-8">
          Rencontre avec le professeur Guy-Serge BIGNOUMBA, professeur titulaire de Géographie à l'UOB, ancien Secrétaire Général du Ministère de l'Enseignement Supérieur, de la Recherche Scientifique et du Transfert de Technologies.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Image
              src="/emile2.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/guy 2.webp"
              alt="startup template"
              width={1000}
              height={1000}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[16px]  font-normal mb-8">
          L'ECMAC a obtenu l'avis favorable de la Commission de l'Enseignement Supérieur Privé, l'autorisant à ouvrir et à démarrer ses activités d'enseignement. L'établissement a officiellement ouvert ses portes le 1er septembre 2020, au quartier Kalikak, situé rue Laurent Akanda Kingbell.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Image
              src="/ecmac2.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/minis.png"
              alt="startup template"
              width={1000}
              height={1000}
              className="rounded-lg object-cover lg:p-4 bg-center bg-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Novembre 2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-[16px]  font-normal mb-8">
            l&apos;ECMAC a signé une convention de partenariat stratégique avec
            le GIMAC. La présente convention témoigne de la volonté des
            signataires de contribuer au rapprochement entre l&apos;évolution
            des technologies monétiques et le monde économique.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Image
              src="/gimac.png"
              alt="startup template"
              width={1000}
              height={1000}
              className="rounded-lg object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/Logo-removebg-preview.png"
              alt="startup template"
              width={400}
              height={400}
              className="rounded-lg lg:pt-14 lg:pb-5 lg:px-4 object-cover h-60 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
