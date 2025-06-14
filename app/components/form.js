import { GraduationCap, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formations = [
  {
    id: 1,
    titre: "BTS Commerce International",
    description: "Formation complète aux techniques du commerce international et de l'import-export",
    duree: "2 ans",
    niveau: "Bac+2",
    effectif: "25 étudiants max",
    badges: ["Très demandé", "Stage obligatoire"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    titre: "Licence Management",
    description: "Développez vos compétences en gestion d'équipe et stratégie d'entreprise",
    duree: "3 ans",
    niveau: "Bac+3",
    effectif: "30 étudiants max",
    badges: ["Leadership", "Projet entreprise"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    titre: "Master Communication",
    description: "Maîtrisez les outils de communication digitale et traditionnelle",
    duree: "2 ans",
    niveau: "Bac+5",
    effectif: "20 étudiants max",
    badges: ["Digital", "Alternance possible"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop"
  }
];

const FormationsSection = () => {
  return (
    <section id="formations" className="py-20 bg-muted/30">
              <div className="flex items-center gap-2">
                <Icon
                  className="w-[30px] text-[#51be78]  h-[30px]"
                  icon="icons8:student"
                />{" "}
                <h2 className="text-[#51be78] font-bold text-lg">
                  Toutes nos filières
                </h2>
              </div>
              <h1 className="text-[#130159] mt-2 font-bold text-4xl md:text-5xl">
                Nos filières Professionnelles
              </h1>
        
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Nos Formations</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Des parcours d'excellence pour votre réussite
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos formations reconnues par l'État et adaptées aux besoins du marché gabonais et africain
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation) => (
            <Card key={formation.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={formation.image}
                  alt={formation.titre}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary">{formation.niveau}</Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span>{formation.titre}</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  {formation.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formation.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formation.duree}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{formation.effectif}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full group">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">
            Voir toutes les formations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
