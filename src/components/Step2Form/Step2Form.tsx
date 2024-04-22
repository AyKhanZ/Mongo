import styles from "../MultiStepForm/MultiStepForm.module.css";
import React from "react";
import { Step2FormProps } from "@/types";
const Step2Form: React.FC<Step2FormProps> = ({
  state,
  handleChangeVoen,
  goToPreviousStep,
  handleSubmitStep2,
}) => {
  return (
    <div className={styles.step2Container}>
      <div className={styles.formControll}>
        <div className={styles.formInput}>
          <input
            type="text"
            name="voen"
            id="voen"
            required
            value={state.voen}
            onChange={handleChangeVoen}
            className={styles.formInputField}
          />
          <label className={styles.required} htmlFor="voen">
            VOEN
          </label>
        </div>
        <p className={styles.errorText}>{state.errorsStep2.voen}</p>
      </div>

      <div className={styles.formSubmit}>
        <button className={styles.findBtn} type="button" onClick={() => {}}>
          Find Details
        </button>
      </div>

      <div className={styles.formControll}>
        <div className={styles.formInput}>
          <input
            type="text"
            name="companyName"
            id="companyName"
            required
            className={styles.formInputField}
          />
          <label htmlFor="companyName">Name of company </label>
        </div>
      </div>
      <div className={styles.formControll}>
        <div className={styles.formInput}>
          <input
            type="text"
            name="activity"
            id="activity"
            required
            className={styles.formInputField}
          />
          <label htmlFor="voen">Type of activity</label>
        </div>
      </div>

      <div className={styles.formControll}>
        <div className={styles.formInput}>
          <input
            type="tel"
            name="tel"
            id="tel"
            required
            className={styles.formInputField}
          />
          <label htmlFor="tel">Name of director</label>
        </div>
      </div>

      <div className={`${styles.formSubmit} ${styles.grid2}`}>
        <button
          type="button"
          className={styles.formBtn}
          onClick={goToPreviousStep}
        >
          Previous
        </button>
        <button
          type="button"
          className={styles.formBtn}
          onClick={handleSubmitStep2}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Form;
