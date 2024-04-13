import styles from './SmallCarousel.module.css'
import Image from 'next/image'

const SmallCarousel = () => {
  return (
    <div className='a fade-left'>
        <div className={styles.blueBlock}>
                <h2>Нас уже выбрали</h2>
                <div className={styles.slider}>
                    <div className={styles.slideTrack}>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/189.png' />
                        </div>
                    
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/aqrar.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/aqualife.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/caspian service.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/ceo.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/chint.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/cpm.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/elmando.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/pn.png' />
                        </div>
                        <div className={styles.slide}>
                            <Image className={styles.sliderImg} width={500} height={300} alt='1c' src='/ads/qdf.png' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SmallCarousel