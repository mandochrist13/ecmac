import Image from "next/image";
import { Icon } from "@iconify/react";
import HamburgerMenu from "../components/BurgerMenu";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="">
      <div className="hidden lg:flex justify-between bg-[#130159]  h-20">
        <div className="flex items-center justify-between w-[30%] gap-2 relative">
          <div className="relative w-full h-full flex items-center justify-center ">
            <div className="absolute top-0 left-[-25px] w-full h-20 bg-[#51be78] skew-x-[30deg] z-10"></div>
            <div className="relative z-20 flex items-center gap-3">
              <p className="text-base text-white">Nous suivre :</p>
              <Icon className="text-xl text-white" icon="ri:facebook-fill" />
              <Icon className="text-xl text-white" icon="mingcute:instagram-line" />
              <Icon className="text-xl text-white" icon="prime:twitter" />
              <Icon className="text-xl text-white" icon="ri:youtube-fill" />
              <Icon className="text-xl text-white" icon="uil:linkedin" />
            </div>
          </div>
        </div>

        <div className="flex  w-[70%] items-center justify-center pl-[100px]">
          <div className="flex items-center gap-3 justify-center px-5">
            <Image
              src="/phone-call.png"
              alt="Logo ECMAC"
              width={1000}
              height={1000}
              className="w-8 bg-cover bg-center h-8"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm text-white">Appelez-nous !</p>
              <div className="flex">
                <span className="text-sm text-white font-bold hover:text-[#51be78]/80">
                  <a href="tel:+24166546874">+241 66 54 68 74 /</a>
                </span>
                <span className="text-sm text-white font-bold hover:text-[#51be78]/80">
                  <a href="tel:+24162283188">+241 62 28 31 88</a>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center border-l border-[#33246e] px-5">
            <Image
              src="/mailing.png"
              alt="Logo ECMAC"
              width={1000}
              height={1000}
              className="w-8 bg-cover bg-center h-8"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm text-white">Envoyez-nous un mail!</p>
              <div className="flex">
                <span className="text-sm text-white font-bold hover:text-[#51be78]/80">
                  <a href="mailto:info@ecmac-gabon.org">
                    {" "}
                    info@ecmac-gabon.org{" "}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:justify-around items-center px-3 py-6 shadow-md">
        <Image
          src="/Logo-removebg-preview.png"
          alt="ECMAC"
          width={120}
          height={30}
        />
        <div className="flex gap-20 items-center">
          <HamburgerMenu />
          <ul className="hidden font-medium lg:flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a
                href="/"
                className="text-[#162542] pb-1 relative font-bold hover:text-[#51be78] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#51be78] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#51be78] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="#section1"
                className="text-[#162542] pb-1 relative font-bold hover:text-[#51be78] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#51be78] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#51be78] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              >
                A propos
              </a>
            </li>
            <li>
              <a
                href="#section2"
                className="text-[#162542] pb-1 relative font-bold hover:text-[#51be78] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#51be78] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#51be78] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              >
                Filières
              </a>
            </li>
            <li>
              <a
                href="#section3"
                className="text-[#162542] pb-1 relative font-bold hover:text-[#51be78] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#51be78] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#51be78] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              >
                Admission
              </a>
            </li>
            <li>
              <a
                href="#section4"
                className="text-[#162542] pb-1 relative font-bold hover:text-[#51be78] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#51be78] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#51be78] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              >
                Actualités
              </a>
            </li>
            <li>
              <a
                href="#section4"
                className="text-[#162542] pb-1 relative font-bold hover:text-[#51be78] cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#51be78] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#51be78] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
              >
                Galerie
              </a>
            </li>
          </ul>
           <Button className="hidden lg:flex" variant="default">
            <span className="absolute inset-0 w-full h-full bg-[#130159] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
            <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-[#ffffff]">
              S'inscrire
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
