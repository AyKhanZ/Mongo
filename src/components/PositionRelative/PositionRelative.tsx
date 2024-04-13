import NumbersIncrement from '../NumbersIncrement/NumbersIncrement'
import Plan from '../Plan/Plan'
import styles from './PositionRelative.module.css'
import TwoColumns from '../TwoColumns/TwoColumns'
import SmallCarousel from '../SmallCarousel/SmallCarousel'
import News from '../News/News'
import Modules from '../Modules/Modules'
import Footer from '../Footer/Footer'
import ChoiceForm from '../ChoiceForm/ChoiceForm'

const PositionRelative = () => {
  return (
    <div className={styles.relative}>
      <Plan />
      <TwoColumns />
      <SmallCarousel />
      <NumbersIncrement />
      <ChoiceForm />
      <News />
      <SmallCarousel />
      <Modules />
      <Footer />
    </div>
  )
}

export default PositionRelative