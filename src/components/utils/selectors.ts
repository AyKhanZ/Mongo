import {QuestionnaireState} from "@/types/questionnaireTypes";

export const selectHasErrors = (state: QuestionnaireState) => {
    return state.clickedCountStep1 === 0 || Object.keys(state.errors).length > 0;
};

export const selectHasErrorsStep2 = (state: QuestionnaireState) => {
    return state.clickedCountStep2 === 0 || Object.keys(state.errorsStep2).length > 0;
};

