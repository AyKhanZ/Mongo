import { useEffect } from "react";
import styles from './Plan.module.css';

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
        <div className="a fade-left">
          <div className={styles.plan}>
            <h2>Как мы работаем</h2>
            <div className={styles.threeColumns}>
              <div className={styles.col}>
                <h3>1</h3>
                <p>Выявляем потребности клиента посредством анализа</p>
              </div>
              <div className={styles.col}>
                <h3>2</h3>
                <p>Разрабатываем все модули клиента под ключ и представляем тест</p>
              </div>
              <div className={styles.col}>
                <h3>3</h3>
                <p>Переходим к внедрению</p>
              </div>
            </div>
          </div> 
        </div>
    </div>
    )
}