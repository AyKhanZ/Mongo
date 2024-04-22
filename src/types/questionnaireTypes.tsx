import {FormErrorsStep1, FormErrorsStep2,FormInputErrorStep3} from "@/types/index";

export interface QuestionnaireState {
    birthDate: string;
    patronymic: string;
    password: string;
    confirmPassword: string;
    personalEmail: string;
    phoneNumber: string;
    businessPhoneNumber: string;
    selectedOption: string;
    clickedCountStep1: number;
    clickedCountStep2: number;
    clickedCountStep3: number;
    errorsStep2: any;
    errors: any;
    errorsStep3: FormInputErrorStep3[];
    activeTab: string;
    passwordVisibility: boolean;
    confirmPasswordVisibility: boolean;
    isSubmitted: boolean;
    voen: string;
    voenIsValid: boolean;
    inputs: { id: number; name: string; lastName: string; email: string }[];
    stepOrder: string[];

}

export type QuestionnaireAction =
    | { type: 'SET_FIELD'; field: string; value: any }
    | { type: 'ADD_INPUT' }
    | { type: 'REMOVE_INPUT'; index: number }
    | { type: 'SET_ACTIVE_TAB'; tabId: string }
    | { type: 'SET_VOEN'; voen: string }
    | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
    | { type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' }
    | { type: 'GO_TO_NEXT_STEP' }
    | { type: 'GO_TO_PREVIOUS_STEP' }
    | { type: 'SET_ERRORS'; errors: FormErrorsStep1 }
    | { type: 'SET_ERRORS_STEP_2'; errorsStep2: FormErrorsStep2 }
    | { type: 'SET_ERRORS_STEP_3'; index: number;newErrors: FormInputErrorStep3; }
    | { type: 'SET_SELECTED_OPTION'; option: string }
    | { type: 'SET_PHONE_NUMBER'; phoneNumber: string }
    | { type: 'SET_BUSINESS_PHONE_NUMBER'; businessPhoneNumber: string }
    | { type: 'SET_INPUT'; index: number; name: string; value: string }
    | { type: 'SET_CLICKED_COUNT_STEP_1'; count: number }
    | { type: 'SET_CLICKED_COUNT_STEP_2'; count: number }
    | { type: 'SET_CLICKED_COUNT_STEP_3'; count: number }
    | { type: 'SET_IS_SUBMITTED'; isSubmitted: boolean }
    | { type: 'SET_BIRTH_DATE'; birthDate: string }
    | { type: 'SET_CONFIRM_PASSWORD'; confirmPassword: string }
    | { type: 'SET_PATRONYMIC'; patronymic: string }
    | { type: 'SET_PERSONAL_EMAIL'; personalEmail: string }
    | { type: 'SET_PASSWORD'; password: string };

