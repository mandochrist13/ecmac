"use client"

import { useState } from "react";
import { GraduationCap, Clock, Users, ArrowRight, MapPin, BookOpen, Trophy, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";

const formations = [
  {
    id: 1,
    titre: "Licence Professionnelle Monétique et Sécurité des Systèmes (LP-MSS)",
    description: "La Licence Professionnelle Monétique et Sécurité des Systèmes forme des étudiants capables de gérer l’environnement de sécurité des automates bancaires, Administrer un serveur FO ou BO, configurer un GAB ou un TPE (Terminale de Paiement Electronique),appliquer une méthodologie, appliquer des procédures, s’intégrer dans une équipe projet.",
    duree: "3 ans",
    niveau: "Bac+3",
    effectif: "25 étudiants",
    badges: ["Bac+3", "Sécurité"],
    prerequis: "Etre titulaire d’un Bac série A1, B, C, D, F2, F3, etc.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    objectifs: [
      "Identifier les failles de sécurité sur les systèmes et proposer des solutions",
      "Utiliser les mécanismes cryptographiques avancés",
      "Rédiger des cahiers des charges et de faisabilité",
      "Définir des applications cartes bancaires et personneliser des cartes bancaires"
    ],
    debouches: [
      "Spécialiste en systèmes de paiement",
      "Consultant en sécurité monétique",
      "Gestionnaire de systèmes bancaires",
      "Expert en transactions électroniques"
    ],
    matieres: [
      "Systèmes de paiement",
      "Sécurité informatique",
      "Cryptographie",
      "Réglementation bancaire",
      "Technologies financières",
      "Gestion des risques"
    ]
  },
  {
    id: 2,
    titre: "Licence Professionnelle Monétique et Transactions Électroniques Sécurisées (LP-MTES)",
    description: "La Licence Professionnelle Monétique et Transactions Electroniques Sécurisées forme des étudiants experts junior en monétique et sécurité des transactions, capables d’avoir une bonne maîtrise des projets AMOA Monétique dans le cadre du déploiement des nouvelles solutions monétiques au niveau des banques d’Afrique centrale.",
    duree: "3 ans",
    niveau: "Bac+3",
    effectif: "25 étudiants",
    badges: ["Bac+3", "Transactions"],
    prerequis: "Etre titulaire d’un Bac série A1, B, C, D, F2, F3, etc.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    objectifs: [
      "Connaissances des méthodes de gestion de projet dans le domaine monétique et gestion de la fraude.",
      "Maitrise de l’écosystème réglementaire PCI DSS, EMV, ISO8583,",
      "Intégration des projets relatifs à l’activité monétique",
      "La maîtrise des progiciels monétique du marché."
    ],
    debouches: [
      "Développeur de solutions de paiement",
      "Architecte de sécurité",
      "Gestionnaire de plateformes e-commerce",
      "Consultant en transformation digitale"
    ],
    matieres: [
      "Transactions électroniques",
      "Sécurité des données",
      "Développement web sécurisé",
      "Architecture système",
      "Audit de sécurité",
      "Conformité réglementaire"
    ]
  },
  {
    id: 3,
    titre: "Licence Professionnelle Cybersécurité Monétique et Certification Numérique (LP-CSM-CN)",
    description: "La Licence Professionnelle CyberSécurité Monétique et Certification Numérique forme des étudiants experts en Cybersécurité Monétique, spécialisés en investigation informatique expertale en Cybercriminalité Financière.",
    duree: "3 ans",
    niveau: "Bac+3",
    effectif: "25 étudiants",
    badges: ["Bac+3", "Cybersécurité"],
    prerequis: "Etre titulaire d’un Bac série  C ou D",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    objectifs: [
      "Surveiller l’infrastructure Monétique pour identifier et bloquer des activités inhabituelles ou suspectes",
      "Protéger les systèmes d’information monétique de la banque",
      "Assurer une veille technologique et règlementaire.",
      "Effectuer des audits monétiques réguliers "
    ],
    debouches: [
      "Expert en cybersécurité",
      "Auditeur sécurité",
      "Responsable certification",
      "Consultant en sécurité numérique"
    ],
    matieres: [
      "Cybersécurité avancée",
      "Certification numérique",
      "Audit de sécurité",
      "Gestion des incidents",
      "Forensique numérique",
      "Conformité et réglementation"
    ]
  },
  {
    id: 4,
    titre: "Master Professionnel Monétique et Sécurité des Systèmes (MP-MSS)",
    description: "Le Master Professionnelle Monétique et Sécurité des Systèmes forme des étudiants capables de gérer l’environnement de sécurité des automates bancaires, déployer un serveur Front-Office et Back-Office Monétique, Administrer un serveur FO ou BO, configurer un GAB ou un TPE (Terminale de Paiement Electronique), rédiger des cahiers de recettes.",
    duree: "5 ans",
    niveau: "Bac+5",
    effectif: "25 étudiants",
    badges: ["Bac+5", "Expertise"],
    prerequis: "Etre titulaire d’un Bac série A1, B, C, D, F2, F3, etc.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    objectifs: [
      "Identifier les failles de sécurité sur les systèmes et proposer des solutions sécuritaires",
      "Diriger des projets de sécurité",
      "Concevoir des architectures sécurisées",
      "Manager des équipes techniques"
    ],
    debouches: [
      "Directeur technique",
      "Architecte en chef",
      "Consultant senior",
      "Chef de projet sécurité"
    ],
    matieres: [
      "Architecture système avancée",
      "Management de projet",
      "Recherche et développement",
      "Innovation technologique",
      "Leadership technique",
      "Stratégie d'entreprise"
    ]
  },
  {
    id: 5,
    titre: "Master Professionnel Monétique et Transactions Électroniques Sécurisées (MP-MTES)",
    description: "Le Master Professionnel Monétique et Transactions Electroniques Sécurisées forme des étudiants experts junior en monétique et sécurité des transactions, capables d’avoir une bonne maîtrise des projets AMOA Monétique dans le cadre du déploiement des nouvelles solutions monétiques au niveau des banques d’Afrique centrale.",
    duree: "2 ans",
    niveau: "Bac+5",
    effectif: "25 étudiants",
    badges: ["Bac+5", "Innovation"],
    prerequis: "Etre titulaire d’un Diplôme de Licence Professionnelle en Monétique, Informatique, Réseaux et Télécoms.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    objectifs: [
      "Innover en matière de paiements",
      "Développer des solutions fintech",
      "Diriger la transformation digitale",
      "Rechercher de nouvelles technologies"
    ],
    debouches: [
      "Directeur innovation",
      "CTO fintech",
      "Consultant stratégique",
      "Entrepreneur tech"
    ],
    matieres: [
      "Innovation fintech",
      "Blockchain et cryptomonnaies",
      "Intelligence artificielle",
      "Big data financier",
      "Stratégie numérique",
      "Entrepreneuriat tech"
    ]
  },
  {
    id: 6,
    titre: "Master Professionnel Cybersécurité Monétique et Certification Numérique (MP-CSM-CN)",
    description: "Le Master Professionnel CyberSécurité Monétique et Certification Numérique forme des étudiants experts en Cybersécurité Monétique, spécialisés en investigation informatique expertale en Cybercriminalité Financière.",
    duree: "5 ans",
    niveau: "Bac+5",
    effectif: "25 étudiants",
    badges: ["Bac+5", "Expert"],
    prerequis: "Etre titulaire d’un Bac série A1, B, C, D, F2, F3, etc.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    objectifs: [
      "Surveiller l’infrastructure Monétique ",
      "Effectuer des audits monétiques réguliers",
      "Assurer une veille technologique et règlementaire",
      "Protéger les systèmes d’information monétique de la banque"
    ],
    debouches: [
      "CISO (Chief Information Security Officer)",
      "Directeur cybersécurité",
      "Expert judiciaire",
      "Consultant international"
    ],
    matieres: [
      "Cybersécurité stratégique",
      "Gestion de crise",
      "Résilience organisationnelle",
      "Veille technologique",
      "Management de la sécurité",
      "Droit du numérique"
    ]
  }
];

const Formations = () => {
  const [selectedFormation, setSelectedFormation] = useState(formations[0]);

  return (
    <div className="min-h-screen">
      

      {/* Formations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Liste des formations */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-[#21c45d] flex gap-3">
                <Icon
                className="w-[30px] text-[#51be78]  h-[30px]"
                icon="icons8:student"
                        />{" "}
                
                Nos filières professionnelles</h2>
              <div className="space-y-4">
                {formations.map((formation) => (
                  <Card
                    key={formation.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedFormation.id === formation.id ? 'border-[#21c45d] shadow-md' : ''
                    }`}
                    onClick={() => setSelectedFormation(formation)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <Badge className="text-[#21c45d] bg-emerald-100">{formation.niveau}</Badge>
                      </div>
                      <CardTitle className="text-lg ">{formation.titre}</CardTitle>
                      <CardDescription className="text-sm text-justify text-gray-500">
                        {formation.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Détails de la formation sélectionnée */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <div className="relative">
                  <img
                    src={selectedFormation.image}
                    alt={selectedFormation.titre}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="text-[#21c45d] bg-white">{selectedFormation.niveau}</Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedFormation.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl">{selectedFormation.titre}</CardTitle>
                  <CardDescription className="text-lg">
                    {selectedFormation.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2 mb-8">
                    <div className="flex justify-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Durée</p>
                        <p className="text-sm text-muted-foreground">{selectedFormation.duree}</p>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Effectif</p>
                        <p className="text-sm text-muted-foreground">{selectedFormation.effectif}</p>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="objectifs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="debouches">Débouchés</TabsTrigger>
                      <TabsTrigger value="admission">Admission</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="debouches" className="mt-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Briefcase className="w-5 h-5 mr-2 text-primary" />
                          Débouchés professionnels
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {selectedFormation.debouches.map((debouche, index) => (
                            <Card key={index} className="p-4">
                              <div className="flex items-center space-x-2">
                                <Briefcase className="w-4 h-4 text-primary" />
                                <span className="font-medium">{debouche}</span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="admission" className="mt-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-primary" />
                          Conditions d'admission
                        </h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-medium mb-2">Prérequis académiques</h4>
                            <p className="text-muted-foreground">
                              {selectedFormation.prerequis}
                            </p>
                          </div>
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-medium mb-2">Procédure d'inscription</h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>• Dossier de candidature complet</li>
                                <li>• Validation par la commission pédagogique</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Separator className="my-8" />

                    <div className="sm:flex-row gap-4 flex flex-col justify-center">
                        <Button className="" variant="default">
                            <span className="absolute inset-0 w-full h-full bg-[#130159] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 flex flex-col"></span>
                            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-[#ffffff] flex flex-row items-center justify-center">
                                Candidater maintenant
                            <ArrowRight className="w-4 h-4 ml-2" />
                            </span>
                        </Button>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Formations;
