import NumbersIncrement from '../NumbersIncrement/NumbersIncrement'
import Plan from '../Plan/Plan'
import styles from './PositionRelative.module.css'
import TwoColumns from '../TwoColumns/TwoColumns'
import SmallCarousel from '../SmallCarousel/SmallCarousel'
import News from '../News/News'
import Modules from '../Modules/Modules'
import Footer from '../Footer/Footer2'
import ChoiceForm from '../ChoiceForm/ChoiceForm'
import CrmForm from '../CrmForm/CrmForm'

const PositionRelative = () => {
  return (
    <div className={styles.relative}>
      <NumbersIncrement />
      <Plan />
      <SmallCarousel />
      <TwoColumns /> 
      <ChoiceForm />
      <News />
      <SmallCarousel />
      <CrmForm />
      <div className={styles.empty}></div>
      <Modules />
      <Footer />
    </div>
  )
}

export default PositionRelative