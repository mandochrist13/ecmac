import Promise from "./components/promise";
import HeroCarousel from "./components/HeroCarousel";
import Filiere from "./components/filiere";
import TariffGrid from "./components/TariffGrid";
import PartnersSection from "./components/partenaire";

export default function Home() {
  return (
    <div className="">
     <HeroCarousel />
     <Promise />
     <Filiere />
     <TariffGrid />
     <PartnersSection />
    </div>
  );
}
