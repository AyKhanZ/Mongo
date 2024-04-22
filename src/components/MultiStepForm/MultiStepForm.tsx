import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./MultiStepForm.module.css";
import {
  questionnaireReducer,
  initialState,
} from "@/reducers/questionnaireReducer";
import {
  selectHasErrors,
  selectHasErrorsStep2,
} from "@/components/utils/selectors";
import {
  validateAllFields,
  validateFormStep1,
  validateFormStep2,
} from "@/components/utils/validate";
import { FormInputErrorStep3 } from "@/types";
import {
  handleAddClick,
  handleChangeVoen,
  handleInputChange,
  handleRemoveClick,
  handleSubmitStep1,
  handleSubmitStep2,
  handleSubmitStep3,
} from "@/components/utils/formHandlers";
import {
  changeTab,
  goToNextStep,
  goToPreviousStep,
} from "@/components/utils/formActions";
import Step1Form from "@/components/Step1Form/Step1Form";
import Step2Form from "@/components/Step2Form/Step2Form";
import Step3Form from "@/components/Step3Form/Step3Form";
import Confetti from "@/components/Confetti/Confetti";
const MultiStepForm: React.FC = () => {
  const [state, dispatch] = useReducer(questionnaireReducer, initialState);
  const [errorsStep3, setErrorsStep3] = useState<FormInputErrorStep3[]>([{}]);
  const hasErrors = selectHasErrors(state);
  const hasErrorsStep2 = selectHasErrorsStep2(state);
  useEffect(() => {
    if (state.clickedCountStep1 != 0) {
      validateFormStep1(state, dispatch);
    }
    if (state.clickedCountStep2 != 0) {
      validateFormStep2(state, dispatch);
    }
    if (state.clickedCountStep3 != 0) {
      validateAllFields(state, setErrorsStep3);
    }
  }, [
    state.isSubmitted,
    state.clickedCountStep1,
    state.clickedCountStep2,
    state.clickedCountStep3,
    state.birthDate,
    state.password,
    state.confirmPassword,
    state.personalEmail,
    state.patronymic,
    state.phoneNumber,
    state.businessPhoneNumber,
    state.selectedOption,
    state.voen,
    state.inputs,
    dispatch,
  ]);

  return (
    <div className={styles.container}>
      <form action="#" method="POST" className={styles.form}>
        <div className={styles.steps}>
          <ul className={styles.stepTabItems}>
            <li
              className={`${styles.stepItem} ${
                state.activeTab === "step-01" ? styles.active : ""
              }`}
            >
              1
            </li>
            <li
              className={`${styles.stepItem} ${
                state.activeTab === "step-02" ? styles.active : ""
              }`}
            >
              2
            </li>
            <li
              className={`${styles.stepItem} ${
                state.activeTab === "step-03" ? styles.active : ""
              }`}
            >
              3
            </li>
          </ul>
          <div className={styles.stepTabs}>
            <div
              className={`${styles.stepTab} ${
                state.activeTab === "step-01" ? styles.active : styles.hidden
              }`}
              id="step-01"
            >
              <h4 className={styles.formTitleSc}>Personal Info</h4>
              <Step1Form
                {...{
                  state,
                  dispatch,
                  hasErrors,
                  changeTab: () => changeTab(dispatch, "step-02"),
                }}
              />

              <div className={styles.formSubmit}>
                <button
                  className={styles.formBtn}
                  type="button"
                  onClick={() =>
                    handleSubmitStep1(state, dispatch, hasErrors, (tabId) =>
                      changeTab(dispatch, tabId)
                    )
                  }
                >
                  Next
                </button>
              </div>
            </div>

            <div className={styles.container}>
              <div
                className={`${styles.stepTab} ${
                  state.activeTab === "step-02" ? styles.active : styles.hidden
                }`}
                id="step-02"
              >
                <h4 className={styles.formTitleSc}>Company Info</h4>
                <Step2Form
                  state={state}
                  handleChangeVoen={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => handleChangeVoen(event, dispatch)}
                  goToPreviousStep={() => goToPreviousStep(dispatch)}
                  handleSubmitStep2={() =>
                    handleSubmitStep2(state, dispatch, hasErrorsStep2, () =>
                      goToNextStep(dispatch)
                    )
                  }
                />
              </div>
              <div
                className={`${styles.stepTab} ${
                  state.activeTab === "step-03" ? styles.active : styles.hidden
                }`}
                id="step-03"
              >
                {!state.isSubmitted && (
                  <div className={styles.inviteContainer}>
                    <h4 className={styles.formTitleSc}>Invite new users</h4>
                    <Step3Form
                      state={state}
                      dispatch={dispatch}
                      errorsStep3={errorsStep3}
                      setErrorsStep3={setErrorsStep3}
                      handleInputChange={handleInputChange}
                      handleAddClick={handleAddClick}
                      handleRemoveClick={handleRemoveClick}
                      handleSubmitStep3={handleSubmitStep3}
                      goToPreviousStep={goToPreviousStep}
                    />
                  </div>
                )}
                {state.isSubmitted && <Confetti />}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
