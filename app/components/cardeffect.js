"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Chemin standard pour Framer Motion

import { useOutsideClick } from "./useclick"; // Assurez-vous que ce fichier contient la DEFINITION UNIQUE du hook
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; // Assurez-vous que lucide-react est installé et que c'est le bon import
// ==============================================================


export function InteractiveCardsGrid() {
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const modalRef = useRef(null);
  const id = useId();

  // Logique pour la fermeture de la carte agrandie (modal)
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    }

    if (activeCard && typeof activeCard === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard]);

  // Hook pour fermer la carte agrandie en cliquant à l'extérieur
  // Assurez-vous que useOutsideClick est défini une seule fois dans le fichier ou importé correctement.
  useOutsideClick(modalRef, () => setActiveCard(null));

  return (
    <>
      {/* Superposition (overlay) du modal */}
      <AnimatePresence>
        {activeCard && typeof activeCard === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Modal de la carte agrandie */}
      <AnimatePresence>
        {activeCard && typeof activeCard === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`close-button-${activeCard.id || activeCard.title}-${id}`} // Utilise id pour plus de robustesse si title n'est pas unique
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActiveCard(null)}
            >
              <span className="sr-only">Fermer la carte</span>
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${activeCard.id || activeCard.title}-${id}`} // Utilise id
              ref={modalRef}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${activeCard.id || activeCard.title}-${id}`}> {/* Utilise id */}
                <img
                  width={200}
                  height={200}
                  src={activeCard.thumbnail || activeCard.src} // Utilise thumbnail ou src existant
                  alt={activeCard.title || activeCard.category} // Utilise title ou category
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${activeCard.id || activeCard.title}-${id}`} // Utilise id
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {activeCard.title || activeCard.category} {/* Utilise title ou category */}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${activeCard.id || activeCard.description}-${id}`} // Utilise id
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {activeCard.description || ''} {/* Assurez-vous que description existe ou est vide */}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`cta-button-${activeCard.id || activeCard.title}-${id}`} // Utilise id
                    href={activeCard.ctaLink || "#"} // Assurez-vous que ctaLink existe
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {activeCard.ctaText || 'En savoir plus'} {/* Assurez-vous que ctaText existe */}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof activeCard.content === "function"
                      ? activeCard.content()
                      : activeCard.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Grille de cartes avec effet de survol */}
      <div className="max-w-2xl mx-auto w-full py-10">
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4")}>
          {cards.map((item, idx) => (
            <a
              href="#"
              key={`card-grid-${item.id || item.title}-${idx}-${id}`} // Utilise item.id ou item.title pour la clé
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveCard(item)} // Ouvre la carte agrandie au clic
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                  />
                )}
              </AnimatePresence>
              {/* Contenu de la carte normale dans la grille */}
              <Card className="hover:!border-slate-700">
                <motion.div layoutId={`image-${item.id || item.title}-${id}`}> {/* Utilise item.id ou item.title */}
                  <img
                    width={100}
                    height={100}
                    src={item.thumbnail || item.src} // Utilise thumbnail ou src
                    alt={item.title || item.category} // Utilise title ou category
                    className="h-20 w-full md:h-14 md:w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <CardTitle>{item.title || item.category}</CardTitle> {/* Utilise title ou category */}
                <CardDescription>{item.description || ''}</CardDescription> {/* Utilise description ou vide */}

                {/* Bouton "Candidater maintenant" avec icône */}
                {/* J'ai réintégré la structure originale que vous aviez donnée.
                    Si le bouton doit faire quelque chose de différent du ctaLink de la carte agrandie,
                    ajustez la logique onClick ici.
                */}
                <Button className="flex-1 flex flex-col mt-4" variant="default">
                  <span className="absolute inset-0 w-full h-full bg-[#130159] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                  <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-[#ffffff] flex flex-row items-center justify-center">
                    Candidater maintenant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Button>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

// Composants de la carte (du HoverEffect)
export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}
    >
      {children}
    </p>
  );
};

// Les données des cartes, mises à jour avec votre nouvelle structure
const cards = [
  {
    id: 1,
    type: "image",
    title: "Campus ECMAC - Vue d'ensemble", // Ajouté pour le titre de la carte agrandie
    description: "Découvrez notre campus moderne.", // Ajouté pour la description
    category: "Campus",
    thumbnail: './assets/about.jpg', // Utilise votre image importée
    ctaText: "Voir le campus", // Texte CTA pour la carte agrandie
    ctaLink: "#", // Lien CTA pour la carte agrandie
    content: () => {
      return (
        <div>
          <p>Explorez les installations de pointe et les espaces verts du campus ECMAC. Un environnement propice à l'apprentissage et à l'épanouissement.</p>
        </div>
      );
    },
  },
  {
    id: 2,
    type: "image",
    title: "Cérémonie de remise des diplômes",
    description: "Célébrons la réussite de nos étudiants.",
    category: "Diplômes",
    thumbnail: './assets/diplome.jpg',
    ctaText: "Revoir la cérémonie",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Revivez les moments forts de notre cérémonie de remise des diplômes, marquant l'achèvement du parcours de nos talentueux diplômés.</p>
        </div>
      );
    },
  },
  {
    id: 3,
    type: "image",
    title: "Salle de mémoire",
    description: "Un espace dédié à la concentration.",
    category: "Campus",
    thumbnail:'./assets/atelier.jpg',
    ctaText: "Visiter la salle",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Notre salle de mémoire offre un cadre paisible et stimulant, idéal pour les études individuelles et la préparation aux examens.</p>
        </div>
      );
    },
  },
  {
    id: 4,
    type: "image",
    title: "Atelier pratique",
    description: "Apprentissage interactif et projets concrets.",
    category: "Étudiants",
    thumbnail: './assets/stage.jpg',
    ctaText: "Découvrir les ateliers",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Participez à des ateliers pratiques qui vous permettront de développer vos compétences techniques et créatives à travers des projets réels.</p>
        </div>
      );
    },
  },
  {
    id: 5,
    type: "image",
    title: "Stage en entreprise",
    description: "Première expérience professionnelle réussie.",
    category: "Réussite",
    thumbnail: './assets/stage.jpg',
    ctaText: "Témoignages de stagiaires",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Nos étudiants bénéficient d'opportunités de stage enrichissantes en entreprise, leur permettant d'appliquer leurs connaissances et de se préparer au monde professionnel.</p>
        </div>
      );
    },
  },
  {
    id: 6,
    type: "image",
    title: "Conférence IA",
    description: "À la pointe de l'intelligence artificielle.",
    category: "Événements",
    thumbnail: './assets/ia.jpg',
    ctaText: "Voir la conférence",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Assistez à nos conférences sur l'IA, animées par des experts du domaine, pour rester informé des dernières avancées et innovations.</p>
        </div>
      );
    },
  },
  {
    id: 7,
    type: "image",
    title: "Les Ecmaciennes luttent contre le cancer",
    description: "Engagement communautaire et solidarité.",
    category: "Campus",
    thumbnail: './assets/communaute1.jpg',
    ctaText: "Participer",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Nos étudiantes s'engagent activement dans des initiatives de sensibilisation et de lutte contre le cancer, démontrant l'esprit de communauté et la solidarité d'ECMAC.</p>
        </div>
      );
    },
  },
  {
    id: 8,
    type: "image",
    title: "Étudiants en groupe",
    description: "Travail collaboratif et synergie.",
    category: "Étudiants",
    thumbnail: './assets/etudiants1.jpg',
    ctaText: "Découvrir les projets",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Nos étudiants excellent dans le travail de groupe, favorisant l'échange d'idées, la résolution de problèmes et le développement de compétences interpersonnelles.</p>
        </div>
      );
    },
  },
  {
    id: 9,
    type: "image",
    title: "Bâtiment principal",
    description: "Le cœur de notre institution.",
    category: "Campus",
    thumbnail: './assets/images1.png',
    ctaText: "Visite virtuelle",
    ctaLink: "#",
    content: () => {
      return (
        <div>
          <p>Admirez le bâtiment principal d'ECMAC, un lieu emblématique où l'histoire rencontre la modernité, offrant un cadre inspirant pour l'éducation.</p>
        </div>
      );
    },
  },
];