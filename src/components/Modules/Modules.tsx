import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Modules.module.css'

const Modules = () => {
  const cModules = ['/warehouse.gif', '/hr-22.gif', '/accountant.gif', '/sales.gif'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cModules.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cModules.length]);

  return (
    <section className={styles.textAndImg}>
      <div className='a fade-left'>
        <div className={styles.list}>
          <h2 className={styles.heading}>Какие модули автоматизирует 1С:</h2>
          <ul>
            <li className={styles.widthContent} style={currentIndex == 0 ? {backgroundColor: '#326b6a', color: 'white'} : {backgroundColor: 'transparent'}}>Склад</li>
            <li className={styles.widthContent} style={currentIndex == 1 ? {backgroundColor: '#326b6a', color: 'white'} : {backgroundColor: 'transparent'}}>HR</li>
            <li className={styles.widthContent} style={currentIndex == 2 ? {backgroundColor: '#326b6a', color: 'white'} : {backgroundColor: 'transparent'}}>Финансы и бухгалтерия</li>
            <li className={styles.widthContent} style={currentIndex == 3 ? {backgroundColor: '#326b6a', color: 'white'} : {backgroundColor: 'transparent'}}>Закупки и продажи</li>
          </ul>
        </div>
      </div>
      <div className='a fade-right'>
        <div className={styles.module}>
          <Image className={styles.lstImg} width={400} height={250} src={cModules[currentIndex]} alt={cModules[currentIndex]} />
        </div>
      </div>
    </section>
  );
};

export default Modules;
