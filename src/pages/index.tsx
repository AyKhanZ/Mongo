import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import PositionRelative from "@/components/PositionRelative/PositionRelative";
import WaveAnimation from "@/components/WaveAnimation/WaveAnimation";
import { Nunito } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

import Carousel from "../components/Carousel/Carousel";

const HomePage = () => {
  const images = ["/BA.png", "/BA2.png", "/BA2.png", "/BA.png"];

  return (
    <div className={nunito.className}>
      <NavBar />
      <WaveAnimation />
      <Carousel images={images} />
      <PositionRelative />
    </div>
  );
};

export default HomePage;
