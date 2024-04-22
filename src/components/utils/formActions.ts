import React from "react";
import {QuestionnaireAction} from "@/types/questionnaireTypes";

export const changeTab = (dispatch: React.Dispatch<QuestionnaireAction>, tabId: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', tabId });
};

export const togglePasswordVisibility = (dispatch: React.Dispatch<QuestionnaireAction>) => {
    dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' });
};

export const toggleConfirmPasswordVisibility = (dispatch: React.Dispatch<QuestionnaireAction>) => {
    dispatch({ type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' });
};

export const goToNextStep = (dispatch: React.Dispatch<QuestionnaireAction>) => {
    dispatch({ type: 'GO_TO_NEXT_STEP' });
};

export const goToPreviousStep = (dispatch: React.Dispatch<QuestionnaireAction>) => {
    dispatch({ type: 'GO_TO_PREVIOUS_STEP' });
};
