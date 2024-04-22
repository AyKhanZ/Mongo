import { useEffect } from "react";
import styles from './Plan.module.css';
import Image from "next/image";

export default function Plan() {
    useEffect(() => {
      const reveal = () => { 
        const reveals = document.querySelectorAll(".a");
  
        for (var i = 0; i < reveals.length; i++) { 
          let windowHeight = window.innerHeight;
          let elementTop = reveals[i].getBoundingClientRect().top;
          let elementVisible = 150;
  
          if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
          } else {
            reveals[i].classList.remove("active");
          }
        }
      };

      window.addEventListener("scroll", reveal);
  

      return () => {
        window.removeEventListener("scroll", reveal);
      };
    }, []); 

    return (
      <div className={styles.container}>
        <div>
          <div className={styles.plan}>
            <h2 className={styles.heading}>Как мы работаем</h2>
            <div className={styles.threeColumns}>
              <div className={styles.col}>
                <div className={styles.column}>
                  <Image className={`${styles.ico} a first`} src='/analysis.png' alt='analysis' width={200} height={200} />
                  <h3>1</h3>
                  <p>Выявляем потребности клиента посредством анализа</p>
                </div>
              </div>

              <div className={styles.vertical}></div>
              
              <div className={styles.col}>
                <div className={styles.column}>
                  <Image className={`${styles.ico} a sec`} src='/test.png' alt='analysis' width={200} height={200} />
                  <h3>2</h3>
                  <p>Разрабатываем все модули клиента под ключ и представляем тест</p>
                </div>
              </div>

              <div className={styles.vertical}></div>
        
              <div className={styles.col}>
                <Image className={`${styles.ico} a third`} src='/deploy.png' alt='analysis' width={200} height={200} />
                  <h3>3</h3>
                  <p>Переходим к внедрению</p>
              </div>
            </div>
          </div> 
        </div>
    </div>
    )
}