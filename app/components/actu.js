"use client" // Indique que ce composant est un Client Component dans Next.js, ce qui permet l'utilisation de hooks React et d'interactivité.

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Clock, Eye, MessageCircle } from "lucide-react" // Importation des icônes
import Image from "next/image" // Importation du composant Image de Next.js pour l'optimisation des images

import Diplome from "@/public/diplome.jpg"
import JpoImage from "@/public/jpo.jpg"
import FemmeImage from "@/public/femme.jpg"
import PaysImage from "@/public/pays.jpg"


export default function ActualitesPage() {

  const articles = [
    {
        id: 1, // Identifiant unique de l'article
        title: "Remise des diplômes", // Titre de l'article
        excerpt:
        "Cérémonie de remise des diplômes pour la première et deuxième cuvée de l'ECMAC.", // Court extrait de l'article
        date: "31 Mai 2025", // Date de publication
        author: "Service Communication", // Auteur de l'article
        category: "Événements", // Catégorie de l'article
        image: Diplome // Référence à l'image importée pour cet article
    },
    {
        id: 2,
        title: "Journée porte ouverte à l'ECMAC",
        excerpt:
        "L'ECMAC a ouvert ses portes au grand public pour présenter ses formations et ses projets innovants.",
        date: "17 Mai 2025",
        author: "Service Communication",
        category: "Événements",
        image: JpoImage
    },
    {
        id: 3,
        title: "Journée de la femme Gabonaise",
        excerpt:
        "L'ECMAC et toute sa communauté souhaite une excellente journée à toutes les femmes Gabonaises.",
        date: "07 mars 2024",
        author: "Service Communication",
        category: "", // Catégorie vide, conditionnellement affichée ci-dessous
        image: FemmeImage
    },
    {
        id: 4,
        title: "La communauté des Ecmaciens",
        excerpt: "Nous sommes une communauté basée dans l'Afrique centrale.",
        date: "09 juillet 2024",
        author: "Direction Qualité",
        category: "", // Catégorie vide
        image: PaysImage,
    },
  ]

  // Catégories utilisées pour le filtre des articles
  const categories = ["Tous", "Partenariats", "Événements", "Réussites"]

  return (
    <>

      {/* Section des filtres de catégorie */}
      <section className="py-8 bg-emerald-50 border-b">
        <div className="max-w-7xl mx-auto px-4"> {/* Conteneur centré et avec padding horizontal */}
          <div className="flex flex-wrap gap-2"> {/* Conteneur flexible pour les boutons de filtre */}
            {/* Itération sur les catégories pour créer des boutons de filtre */}
            {categories.map((category) => (
              <Button
                key={category} // Clé unique pour chaque bouton (requise pour les listes en React)
                variant={category === "Tous" ? "default" : "outline"} // Change le style du bouton "Tous"
                size="sm" // Taille du bouton
                className={category === "Tous" ? "bg-emerald-600 hover:bg-emerald-700" : ""} // Classes Tailwind pour le style du bouton "Tous"
              >
                {category} {/* Texte du bouton */}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Section principale des articles (article vedette et liste) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4"> {/* Conteneur centré */}
          <div className="grid lg:grid-cols-3 gap-8"> {/* Grille responsive avec 3 colonnes sur grand écran */}
            <div className="lg:col-span-2"> {/* Occupe 2 colonnes sur grand écran pour l'article vedette et la liste */}

              {/* Carte de l'article vedette (featured) */}
              <Card className="border-0 shadow-xl mb-12 overflow-hidden">
                {/* Conteneur de l'image de l'article vedette */}
                <div className="relative h-64"> {/* 'relative' est nécessaire pour que 'layout="fill"' de l'Image fonctionne */}
                  {/* Composant Image de Next.js pour l'image de fond */}
                  <Image
                    src={Diplome} // Source de l'image (l'import 'Diplome')
                    alt="Image de remise des diplômes" // Texte alternatif pour l'accessibilité
                    layout="fill" // L'image remplit le conteneur parent (div.relative)
                    objectFit="cover" // L'image couvre le conteneur en rognant si nécessaire
                    objectPosition="70% 30%" // Ajuste la position de l'image dans le conteneur (70% horizontal, 30% vertical)
                    className="z-0" // Place l'image en arrière-plan (z-index plus bas)
                  />
                  {/* Overlay optionnel pour le dégradé sur l'image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-50 z-10"></div>
                </div>
                <CardContent className="p-8"> {/* Contenu de la carte */}
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-emerald-100 text-emerald-700">Événements</Badge>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" /> {/* Icône calendrier */}
                      <span>31 Mai 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <User className="w-4 h-4" /> {/* Icône utilisateur */}
                      <span>Direction ECMAC</span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Remise des diplômes
                  </h2>

                  <p className="text-gray-600 mb-6 text-lg">
                    Cérémonie de remise des diplômes pour la première et deuxième cuvée de l'ECMAC.
                  </p>

                  <div className="flex items-center justify-between">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      Lire la suite
                      <ArrowRight className="w-4 h-4 ml-2" /> {/* Icône flèche droite */}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des autres articles */}
              <div className="space-y-8">
                {/* Itération sur tous les articles pour créer des cartes */}
                {articles.map((article) => (
                  <Card key={article.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="md:col-span-1"> {/* Colonne pour l'image de l'article */}
                          {/* Conteneur de l'image de l'article de la liste */}
                          <div className="relative h-32 w-full rounded-lg overflow-hidden">
                            {/* Affiche l'image seulement si 'article.image' est défini */}
                            {article.image && (
                              <Image
                                src={article.image} // Source de l'image de l'article courant
                                alt={article.title} // Texte alternatif
                                layout="fill" // L'image remplit le conteneur
                                objectFit="cover" // L'image couvre le conteneur
                                // objectPosition="center" // Optionnel: tu peux ajuster la position ici si chaque image a besoin d'un cadrage spécifique
                              />
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-3"> {/* Colonne pour le contenu textuel de l'article */}
                          <div className="flex items-center gap-4 mb-3">
                            {/* Affiche le badge de catégorie seulement si 'article.category' est non vide */}
                            {article.category && (
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                            )}
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <Calendar className="w-3 h-3" />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <User className="w-3 h-3" />
                              <span>{article.author}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600 cursor-pointer">
                            {article.title}
                          </h3>

                          <p className="text-gray-600 mb-4">{article.excerpt}</p>

                          <div className="flex items-center justify-between">
                            <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                              Lire plus
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Section de pagination  */}
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Précédent
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar (colonne latérale) */}
            <div className="space-y-8">


              {/* Carte des événements à venir */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Événements à venir</h3>
                  <div className="space-y-4">
                    {/* Événement 1 */}
                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">Rentrée académique</h4>
                      <p className="text-xs text-gray-500 mb-1">16 Septembre 2025</p>
                      <p className="text-xs text-gray-600">Début des cours et établissement des cartes d'étudiants.</p>
                    </div>
                    {/* Événement 2  
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">Conférence Blockchain</h4>
                      <p className="text-xs text-gray-500 mb-1">2 Juin 2024</p>
                      <p className="text-xs text-gray-600">L'avenir des cryptomonnaies en Afrique</p>
                    </div>*/}
                    {/* Événement 3
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">Forum Emploi</h4>
                      <p className="text-xs text-gray-500 mb-1">15 Juin 2024</p>
                      <p className="text-xs text-gray-600">Rencontrez nos partenaires recruteurs</p>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Carte d'inscription à la Newsletter */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-blue-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Newsletter ECMAC</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Recevez toutes nos actualités directement dans votre boîte mail.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm">S'abonner</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}