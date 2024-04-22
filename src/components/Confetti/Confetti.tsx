import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../MultiStepForm/MultiStepForm.module.css";

const Confetti: React.FC = () => {
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    const generateConfetti = () => {
      for (let i = 0; i < 200; i++) {
        const randomRotation = Math.floor(Math.random() * 360);
        const randomWidth = Math.floor(
          Math.random() *
            Math.max(
              document.documentElement.clientWidth,
              window.innerWidth || 0
            )
        );
        const randomHeight = Math.floor(
          Math.random() *
            Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 0
            )
        );
        const randomAnimationDelay = Math.floor(Math.random() * 10);
        const colors: string[] = [
          "#0CD977",
          "#FF1C1C",
          "#FF93DE",
          "#5767ED",
          "#FFC61C",
          "#8497B0",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const confetti = document.createElement("div");
        confetti.classList.add(styles.confetti);
        confetti.style.top = `${randomHeight}px`;
        confetti.style.left = `${randomWidth}px`;
        confetti.style.backgroundColor = randomColor;
        confetti.style.transform = `skew(15deg) rotate(${randomRotation}deg)`;
        confetti.style.animationDelay = `${randomAnimationDelay}s`;
        document.getElementById("confetti-wrapper")?.appendChild(confetti);
      }
    };

    generateConfetti();

    return () => {
      const confettiElements = document.querySelectorAll(".confetti");
      confettiElements.forEach((element) => element.remove());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <span className={styles.emoji}>👏</span>
        <h1>You have successfully completed the form</h1>
        <h3>Thanks for taking the time!</h3>
        <button className={styles.modalBtn} onClick={handleGoHome}>
          Great, now take me to my profile
        </button>
      </div>
      <div id="confetti-wrapper" className={styles.confettiWrapper}></div>
    </div>
  );
};

export default Confetti;
