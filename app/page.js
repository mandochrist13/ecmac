import Promise from "./components/promise";
import HeroCarousel from "./components/HeroCarousel";
import Filiere from "./components/filiere";
import TariffGrid from "./components/TariffGrid";

export default function Home() {
  return (
    <div className="">
     <HeroCarousel />
     <Promise />
     <Filiere />
     <TariffGrid />
    </div>
  );
}
