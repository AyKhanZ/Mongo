import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import NumberIncrement from "@/components/NumbersIncrement/NumberIncrement";
import NumbersIncrement from "@/components/NumbersIncrement/NumbersIncrement";
import PositionRelative from "@/components/PositionRelative/PositionRelative";
import WaveAnimation from "@/components/WaveAnimation/WaveAnimation";

const inter = Inter({ subsets: ["latin"] });

import Carousel from '../components/Carousel/Carousel';
import NavMenu from "@/components/NavMenu/NavMenu";
import Projects from "@/components/Plan/Plan";
import News from "@/components/News/News";

const HomePage = () => {
  const images = ['/BA.png', '/BA2.png', '/BA.png', '/BA2.png',];

  return (
    <> 
      <NavBar />
      <WaveAnimation />
      <Carousel images={images} />
      <PositionRelative />
      {/* <div className="positionRelative">
        <NumbersIncrement />
      </div> */}
    </>
  );
};

export default HomePage;

