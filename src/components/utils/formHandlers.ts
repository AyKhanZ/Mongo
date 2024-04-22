import {
  QuestionnaireAction,
  QuestionnaireState,
} from "@/types/questionnaireTypes";
import React from "react";
import { FormInputErrorStep3 } from "@/types";
import {
  formatPhoneNumber,
  validateAllFields,
  validateField,
} from "@/components/utils/validate";
export const handleSubmitStep1 = (
  state: QuestionnaireState,
  dispatch: React.Dispatch<QuestionnaireAction>,
  hasErrors: boolean,
  changeTab: (tab: string) => void
) => {
  dispatch({
    type: "SET_CLICKED_COUNT_STEP_1",
    count: state.clickedCountStep1 + 1,
  });
  if (!hasErrors) {
    changeTab("step-02");
  }
};

export const handleSubmitStep2 = (
  state: QuestionnaireState,
  dispatch: React.Dispatch<QuestionnaireAction>,
  hasErrorsStep2: boolean,
  goToNextStep: () => void
) => {
  dispatch({
    type: "SET_CLICKED_COUNT_STEP_2",
    count: state.clickedCountStep2 + 1,
  });
  if (!hasErrorsStep2) {
    goToNextStep();
  }
};

export const handleSubmitStep3 = async (
  state: QuestionnaireState,
  dispatch: React.Dispatch<QuestionnaireAction>,
  setErrorsStep3: React.Dispatch<React.SetStateAction<FormInputErrorStep3[]>>
) => {
  validateAllFields(state, setErrorsStep3);
  dispatch({
    type: "SET_CLICKED_COUNT_STEP_3",
    count: state.clickedCountStep3 + 1,
  });
  if (!validateAllFields(state, setErrorsStep3)) {
    dispatch({ type: "SET_IS_SUBMITTED", isSubmitted: true });
    try {
      const response = await fetch("/UpdateData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthDate: state.birthDate,
          password: state.password,
          confirmPassword: state.confirmPassword,
          personalEmail: state.personalEmail,
          patronymic: state.patronymic,
          phoneNumber: state.phoneNumber,
          businessPhoneNumber: state.businessPhoneNumber,
          voen: state.voen,
          gender: state.selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      dispatch({ type: "SET_IS_SUBMITTED", isSubmitted: true });

      const responseData = await response.json();
      console.log("Data updated successfully:", responseData);
    } catch (error: any) {
      console.error("Error updating data:", error.message);
    }
  }
};

export const handleInputChange = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<QuestionnaireAction>,
  state: QuestionnaireState,
  setErrorsStep3: React.Dispatch<React.SetStateAction<FormInputErrorStep3[]>>,
  errorsStep3: FormInputErrorStep3[]
) => {
  const { name, value } = event.target;
  dispatch({
    type: "SET_INPUT",
    index: index,
    name: name,
    value: value,
  });

  if (state.clickedCountStep3 !== 0) {
    const newErrors = validateField(name, value, index, errorsStep3);
    setErrorsStep3((currentErrors) =>
      currentErrors.map((error, i) => (i === index ? newErrors : error))
    );
  }
};

export const handleOptionChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<QuestionnaireAction>
) => {
  dispatch({ type: "SET_SELECTED_OPTION", option: event.target.value });
};
export const handleAddClick = (
  dispatch: React.Dispatch<QuestionnaireAction>
) => {
  dispatch({ type: "ADD_INPUT" });
};

export const handleRemoveClick = (
  index: number,
  dispatch: React.Dispatch<QuestionnaireAction>
) => {
  dispatch({ type: "REMOVE_INPUT", index });
};

export const handleChangeVoen = (
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<QuestionnaireAction>
) => {
  const { value } = event.target;
  if (/^\d*$/.test(value) && value.length <= 10) {
    dispatch({ type: "SET_VOEN", voen: value });
  }
};
export const handleChangeBirthDate = (
  dispatch: React.Dispatch<QuestionnaireAction>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  dispatch({ type: "SET_BIRTH_DATE", birthDate: e.target.value });
};

export const handleChangeConfirmPassword = (
  dispatch: React.Dispatch<QuestionnaireAction>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  dispatch({ type: "SET_CONFIRM_PASSWORD", confirmPassword: e.target.value });
};

export const handleChangePassword = (
  dispatch: React.Dispatch<QuestionnaireAction>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  dispatch({ type: "SET_PASSWORD", password: e.target.value });
};

export const handleChangePatronymic = (
  dispatch: React.Dispatch<QuestionnaireAction>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  dispatch({ type: "SET_PATRONYMIC", patronymic: e.target.value });
};

export const handleChangePersonalEmail = (
  dispatch: React.Dispatch<QuestionnaireAction>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  dispatch({ type: "SET_PERSONAL_EMAIL", personalEmail: e.target.value });
};
export const handleChangeInBusinessPhoneNum = (
  dispatch: React.Dispatch<any>,
  businessPhoneRef: React.MutableRefObject<HTMLInputElement | null>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { value } = e.target;
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 9) {
    const formattedInput = formatPhoneNumber(digits);
    dispatch({
      type: "SET_BUSINESS_PHONE_NUMBER",
      businessPhoneNumber: formattedInput,
    });

    const cursorPosition = e.target.selectionStart;
    if (cursorPosition !== null) {
      const diff = formattedInput.length - value.length;

      requestAnimationFrame(() => {
        if (businessPhoneRef.current) {
          const newCursorPosition = cursorPosition + diff;
          businessPhoneRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition
          );
        }
      });
    }
  }
};

export const handleChangeInPhoneNum = (
  dispatch: React.Dispatch<any>,
  phoneRef: React.MutableRefObject<HTMLInputElement | null>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { value } = e.target;
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 9) {
    const formattedInput = formatPhoneNumber(digits);
    dispatch({ type: "SET_PHONE_NUMBER", phoneNumber: formattedInput });

    const cursorPosition = e.target.selectionStart;
    if (cursorPosition !== null) {
      const diff = formattedInput.length - value.length;

      requestAnimationFrame(() => {
        if (phoneRef.current) {
          const newCursorPosition = cursorPosition + diff;
          phoneRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition
          );
        }
      });
    }
  }
};
