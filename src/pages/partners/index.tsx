import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";
import CardsCarousel from "@/components/CardsCarousel/CardsCarousel";

const Partners = () => {
    const images = ['/bakinity.png','/qarabag.png', '/mobis.png', '/chint.jpg', '/cpm.jpg', '/ceo.jpg' ];

    return (
      <PositionRelative>
          <CardsCarousel cardType='partner' images={images} />
      </PositionRelative>
    )
}

export default Partners