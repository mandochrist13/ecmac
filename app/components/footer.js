"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const actualites = [
    {
      title: "Bonne journée nationale de la femme",
      date: "7 Mars, 2024",
      imgSrc: "/femme.jpg",
      link: "actualites.php",
    },
    {
      title: "La communauté des ECMACIENS",
      date: "09 Juillet, 2024",
      imgSrc: "/pays.jpg",
      link: "actualites.php",
    },
  ];

  const aboutLinks = [
    { text: "Accueil", href: "index.php" },
    { text: "À propos", href: "about.php" },
    { text: "Nos filières", href: "formations.php" },
    { text: "Nous contacter", href: "contact.php" },
    { text: "Actualités", href: "actualites.php" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/ecmac.ga",
      icon: <Icon className="text-xl text-white" icon="ri:facebook-fill" />,
    },
    {
      href: "#",
      icon: (
        <Icon className="text-xl text-white" icon="mingcute:instagram-line" />
      ),
    },
    {
      href: "#",
      icon: <Icon className="text-xl text-white" icon="prime:twitter" />,
    },
    {
      href: "#",
      icon: <Icon className="text-xl text-white" icon="ri:youtube-fill" />,
    },
    {
      href: "#",
      icon: <Icon className="text-xl text-white" icon="uil:linkedin" />,
    },
  ];

  const contactDetails = [
    {
      icon: <Icon className="text-xl" icon="line-md:phone-call-loop" />,
      content: (
        <span>
          <a href="tel:+24166546874">+241 66 54 68 74</a>
          <br />
          <a href="tel:+241283188">+241 62 28 31 88</a>
        </span>
      ),
    },
    {
      icon: <Icon className="text-xl" icon="line-md:email-twotone" />,
      content: <a href="mailto:info@ecmac-gabon.org">info@ecmac-gabon.org</a>,
    },
    {
      icon: <Icon icon="ph:map-pin-duotone" />,
      content: (
        <span>
          Quartier Kalikak, rue Laurent AKANDA KINGBELL,
          <br />
          Libreville, Gabon, BP 5621
        </span>
      ),
    },
  ];

  return (
    <footer className="bg-indigo-900 text-white ">
      <div className="container p-5 md:py-20 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Section A propos */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">À propos de nous</h2>
            <p>
              Bienvenue à l'ECMAC, 1ère Ecole en Afrique Centrale, Spécialisée
              dans la formation Monétique et Transactions Electroniques
              Sécurisées.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white hover:text-blue-400"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Section Nos liens */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Nos liens</h2>
            <ul className="space-y-2">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-blue-400">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Section Dernières actualités */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Dernières actualités</h2>
            <ul className="space-y-4">
              {actualites.map((actualite, index) => (
                <li key={index} className="flex space-x-4">
                  <Image
                    src={actualite.imgSrc}
                    alt={actualite.title}
                    width={160}
                    height={120}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <a href={actualite.link} className="hover:text-blue-400">
                      {actualite.title}
                    </a>
                    <span className="text-sm text-gray-400">
                      {actualite.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Section Contact */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Nous contacter</h2>
            <ul className="space-y-4">
              {contactDetails.map((detail, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <div className="text-xl">{detail.icon}</div>
                  <div>{detail.content}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="px-10 py-5 border-t flex flex-col md:flex-row gap-6 justify-between items-center bg-[#51be78] border-gray-700 text-center text-sm">
        <Image
          src="/Logo-removebg-preview.png"
          alt="ECMAC"
          width={120}
          height={30}
        />
        <p>
          Copyright &copy; {currentYear}{" "}
          <a
            href="https://mando-portfolio.netlify.app/"
            className="text-blue-900 hover:underline"
          >
            Christ-Of-Fair MANDO
          </a>{" "}
          . <span className="font-semibold">ECMAC</span> Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
