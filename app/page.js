import Promise from "./components/promise";
import HeroCarousel from "./components/HeroCarousel";
import Filiere from "./components/filiere";

export default function Home() {
  return (
    <div className="">
     <HeroCarousel />
     <Promise />
     <Filiere />
    </div>
  );
}
