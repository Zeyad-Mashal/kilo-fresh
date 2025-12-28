import Image from "next/image";
import Hero from "./Components/Hero/Hero";
import AllCategories from "./Components/AllCategories/AllCategories";
import Offers from "./Components/Offers/Offers";

export default function Home() {
  return (
    <div>
      <Hero />
      <AllCategories />
      <Offers />
    </div>
  );
}
