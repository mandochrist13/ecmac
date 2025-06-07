import React from 'react'
import {motion} from "framer-motion"

function Procedure() {
  return (
    <motion.section
    className="flex flex-col justify-center items-center  ">
        <div className="flex flex-col justify-center p-20 w-50">
            <h3 className="font-bold text-[#51be78] mb-2">
                Procédure d&apos;Admission à l&apos;ECMAC
            </h3>
            <p className="text-gray-400 text-justify mb-4">
                L&apos;Ecole Communautaire de Monétique d&apos;Afrique Centrale délivre tois diplômes de Licence Professionnelle de niveau Bac+3 accrédités<br/>
                 par la commission des titres du Ministère de l&apos;Enseignement Supérieur, de la Recherche Scientifique, et de l&apos;Innovation Technologique.<br/>
            </p>
            <h3 className="font-bold text-[#51be78] mb-2">
                Prérequis d&apos;admission
            </h3>
            <h2 className="text-black  text-xl font-bold mb-2">
                1ère Etape
            </h2>
            <h3 className="font-bold mb-1">
                Admission en 1ère Année de Licence Professionnelle en Monétique et Sécurité des Systèmes (LP1-MMS) :
            </h3>
            <p className="text-gray-400">
                Être titulaire d'un Bac A1, B, C, D, F2, F3, etc.
            </p> <br/>
            <h3 className="font-bold mb-1">
                Admission en 1ère Année de Licence Professionnelle en Monétique et Transactions Electroniques Sécurisées (LP1-MTES) :
            </h3>
            <p className="text-gray-400">
                Être titulaire d'un Bac A1, B, C, D, F2, F3, etc.
            </p> <br/>
            <h3 className="font-bold mb-1">
                Admission en 1ère Année de Licence Professionnelle en Cybersécurité Monétique et Certification Numérique (CSM-CN) :
            </h3>
            <p className="text-gray-400">
                Être titulaire d'un Bac C ou D
            </p> <br/>
            <h3 className="font-bold mb-1">
                Admission en Master Professionnelle 1 (*) en Monétique et Transactions Electroniques (MP1-MTES) :
            </h3>
            <p className="text-gray-400">
                Être titulaire d'un Diplôme de Licence Professionnelle en Monétique, Informatique, Réseaux et Télécoms .
            </p> <br/>

            <p className="text-gray-400 text-justify mb-2">
                (*) Le Master Professionnel Monétique et Transactions Electroniques Sécurisées s’effectue sur une durée de 2 ans, Master Pro 1 et 2.
            </p> 

            <h3 className="font-bold mb-1">
                Inscription
            </h3>
            <p className="text-gray-400 text-justify">
                Prise de contact avec le service de la scolarité pour avoir toutes les informations nécessaires à la procédure d’inscription et sur les filières <br/>
                de formation choisies.
            </p> <br/>

            <h3 className="font-bold mb-1">
                Contact du service de la scolarité
            </h3>
            <p className="text-gray-400 text-justify mb-2">
                Mlle Alexia DAMBASSA <br/>
                Tél : +241 (0)66 54 68 74
                </p>

            <h2 className="text-black  text-xl font-bold mb-1">
                2ème Etape
            </h2>
            <h3 className="font-bold mb-1">
                Constitution des dossiers de candidature :
            </h3>
            <p className="text-gray-400 text-justify mb-2">
                Pièces à joindre au dossier de candidature :
            </p>
                <ol className="text-gray-400">
                    <li className="">Acte de naissance légalisé</li>
                    <li className="">Attestation de réussite au Bac</li>
                    <li className="">3 bulletins de la classe de terminale</li>
                    <li className="">Un certificat médical</li>
                    <li className="">Deux photos d’identité.</li>
                    <li className="">Lettre de motivation adressée au Président Fondateur de l’ECMAC</li>
                    <li className="">Relevé de note du bac</li>
                </ol>
            <br/>

        </div>
    </motion.section>
  )
}

export default Procedure