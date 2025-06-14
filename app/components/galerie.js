"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Download, Eye, Calendar, Users, GraduationCap, Building, Camera } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { HoverEffect } from "./hover"
 import { InteractiveCardsGrid} from "./cardeffect"



export default function GaleriePage() {
  const [activeFilter, setActiveFilter] = useState("Tous")

  const filters = ["Tous", "Campus", "Étudiants", "Événements", "Diplômes", "Partenaires"]

  const mediaItems = [
    {
      id: 1,
      type: "image",
      // title: "Campus ECMAC - Vue d'ensemble", // Commenté : Si tu ne veux plus ce titre pour aucune utilisation
      category: "Campus",
      // date: "Mai 2024",
      // thumbnail: About2Image,
    },
    {
      id: 2,
      type: "image",
      // title: "Cérémonie de remise des diplômes", // Commenté
      category: "Diplômes",
      // date: "Mai 2025",
      // thumbnail: DiplomeImage,
    },
    {
      id: 3,
      type: "image",
      // title: "Salle de mémoire", // Commenté
      category: "Campus",
      // thumbnail: MemoireImage,
    },
    {
      id: 4,
      type: "image",
      // title: "Atelier pratique", // Commenté
      category: "Étudiants",
      // thumbnail: AtelierImage,
    },
    {
      id: 5,
      type: "image",
      // title: "Stage en entreprise", // Commenté
      category: "Réussite",
      // thumbnail: StageImage,
    },
    {
      id: 6,
      type: "image",
      // title: "Conférence IA", // Commenté
      category: "Événements",
      // thumbnail: IAImage,
    },
    {
      id: 7,
      type: "image",
      // title: "Les Ecmaciennes luttent contre le cancer", // Commenté
      category: "Campus",
      // thumbnail: Communaute1Image,
    },
    {
      id: 8,
      type: "image",
      // title: "Étudiants en groupe", // Commenté
      category: "Étudiants",
      // thumbnail: Etudiants1Image,
    },
    {
      id: 9,
      type: "image",
      // title: "Bâtiment principal", // Commenté
      category: "Campus",
      // thumbnail: Image1Png,
    },
  ]

  const filteredItems =
    activeFilter === "Tous" ? mediaItems : mediaItems.filter((item) => item.category === activeFilter)

  return (
      <div>
      {/* Filters Section (inchangée) */}
      {/* <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center ">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "font-bold bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Gallery Section */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden "
            >
                <div className="relative">
                  <div className="h-64 relative overflow-hidden rounded-t-lg">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail} */}
                        // L'attribut alt est important pour l'accessibilité même si le titre n'est pas affiché
                        {/* alt={item.title || item.category || `Image de la galerie ${item.id}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105" */}
                      {/* />
                    )} */}
                    {/* Overlay de dégradé sur l'image */}
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 opacity-20"></div> */}

                    {/* Overlay pour les vidéos (si le type est video) - inchangé car c'est un bouton de lecture */}
                    {/* {item.type === "video" && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors z-10">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-gray-900 ml-1" />
                        </div>
                      </div>
                    )} */}

                    {/* Durée pour les vidéos (si le type est video et duration existe) - inchangé */}
                    {/* {item.type === "video" && item.duration && (
                      <div className="absolute bottom-4 right-4 z-20">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          {item.duration}
                        </Badge>
                      </div>
                    )}
 */}
                    {/* Overlay hover (Voir/Télécharger) - inchangé */}
                    {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-30">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        <a
                        href="/about2.jpg"
                        download
                        className="bg-white/90 border-white/90 text-gray-900 hover:bg-white px-3 py-2 rounded-md"
                        >
                        {item.type === "image" && (
                <Download className="w-4 h-4" />
                        
                        )}
                          </a>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs bg-[#130159] text-white">
                      {item.category}
                    </Badge>
                    {/* Afficher la date seulement si elle existe */}
                    {/* {item.date && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                        </div>
                    )}
                  </div>
 */} 
                  {/* TITRE DE L'ARTICLE - RETIRÉ ICI */}
                  {/*
                  <h3 className="font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {item.title || "Titre non défini"}
                  </h3>
                  */}

                  {/* <div className="flex items-center justify-between text-sm text-gray-500"> */}
                    {/* Afficher les vues seulement si elles existent */}
                    {/* {item.views !== undefined && (
                        <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views} vues</span>
                        </div>
                    )}


                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
 */}
          {/* Load More Button (inchangé) */}
          {/* <div className="text-center mt-12">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
            <span className="absolute inset-0 w-full h-full bg-[#130159] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-[#ffffff]">
              Charger plus de contenu
            </span>
              </Button>
          </div>
        </div>
      </section> */}
       <div className="max-w-5xl mx-auto px-8">
      {/* <HoverEffect items={mediaItems}/> */}
      <InteractiveCardsGrid />
       </div>
      </div>
  )
}