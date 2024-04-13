import React, { useState, useEffect } from 'react';
import styles from './Carousel2.module.css'; 
import Image from 'next/image';

const Carousel = ({ images }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval); 
  }, [currentImageIndex, images]);

  const handleCircleClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className='call'>
      <div className='call'>
        {images.map((image: string, index: number) => (
          <Image
            key={index}
            style={{ display: index === currentImageIndex ? 'block' : 'none' }}
            className={styles.carouselImages}
            objectFit="cover"
            width={800}
            height={400}
            alt={`Slide ${index + 1}`}
            src={image}
          />
        ))}
      </div>
      <div className={styles.carouselCircles}>
        {images.map((image: string, index: number) => (
          <span
            key={index}
            className={index === currentImageIndex ? styles.activeCircle : styles.circle}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
