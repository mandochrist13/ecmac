"use client"

import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Filiere from "../components/filiere"

export default function Sector() {
    return(
        <main>
            {/*Breadcrumb Area*/}
            <motion.section
            className="flex items-center bg-cover bg-center"
            style={{backgroundImage: 'url("/about.jpg")', height: "400px" }}
            >
            <div className="flex justify-center items-center bg-black w-full h-full bg-opacity-55">
                <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.5, duration: 0.8}}>
                    <h2 className="text-white text-3xl md:text-6xl font-bold">
                        Nos filières
                    </h2>
                </motion.div>
            </div>
            </motion.section>
            <motion.div
            className="text-white -mt-[30px] flex items-center justify-center"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay:0.8, duration: 0/8}}>
                <ol className="flex p-5 bg-[#21c45d] rounded-full">
                    <li className="px-2">
                        <a href="/" className="text-white font-bold hover:text-blue-500">
                            Accueil
                        </a>
                    </li>
                    <li className="px-2 border-l text-white">Nos filières</li>
                </ol>
            </motion.div>

            {/*Sector Section */}
            <Filiere/>

        </main>
    )
}