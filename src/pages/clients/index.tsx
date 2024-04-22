import CardsCarousel from "@/components/CardsCarousel/CardsCarousel"
import PositionRelative from "@/components/PositionRelativeLayout/PositionRelativeLayout";

const Clients = () => {
  const images = ['/qarabag.png', '/caspian.jpg', '/chint.jpg', '/cpm.jpg', '/ceo.jpg', '/elmanado.jpg' ];

  return (
    <PositionRelative>
        <CardsCarousel  cardType='client' images={images} />
    </PositionRelative>
  )
}

export default Clients 