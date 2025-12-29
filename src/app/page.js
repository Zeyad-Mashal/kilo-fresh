import Image from "next/image";
import Hero from "./Components/Hero/Hero";
import AllCategories from "./Components/AllCategories/AllCategories";
import Offers from "./Components/Offers/Offers";
import Banner2 from "./Components/Banner2/Banner2";
import ChickenSection from "./Components/ChickenSection/ChickenSection";
import LocalBirdsSection from "./Components/LocalBirdsSection/LocalBirdsSection";
import DuckSection from "./Components/DuckSection/DuckSection";
import CutsSection from "./Components/CutsSection/CutsSection";
import Banner3 from "./Components/Banner3/Banner3";

export default function Home() {
  return (
    <div>
      <Hero />
      <AllCategories />
      <Offers />
      <Banner2 />
      <ChickenSection />
      <LocalBirdsSection />
      <Banner3 />
      <DuckSection />
      <CutsSection />
    </div>
  );
}
