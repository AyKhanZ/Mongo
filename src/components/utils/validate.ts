import {QuestionnaireAction, QuestionnaireState} from "@/types/questionnaireTypes"; // Adjust the path as needed
import {FormErrorsStep1, FormErrorsStep2, FormInputErrorStep3} from "@/types";
import React from "react";
export const validateAllFields = (state: QuestionnaireState, setErrorsStep3: React.Dispatch<React.SetStateAction<FormInputErrorStep3[]>>): boolean => {
    const allNewErrors: FormInputErrorStep3[] = state.inputs.map(input => {
        const errors: FormInputErrorStep3 = {};
        if (!input.name.trim()) {
            errors.name = 'Name is required.';
        }
        if (!input.lastName.trim()) {
            errors.lastName = 'Last name is required.';
        }
        if (!input.email.trim()) {
            errors.email = 'Email is required.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.email)) {
                errors.email = 'Invalid email format.';
            }
        }

        return errors;
    });

    setErrorsStep3(allNewErrors);
    console.log(allNewErrors);

    const hasErrors = allNewErrors.some(errorObject => {
        return Object.values(errorObject).some(value => value !== undefined && value !== '');
    });
    return hasErrors;
};
export const validateEmail = (input: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
};

export const validateField = (name: string, value: string, index: number, errorsStep3: FormInputErrorStep3[]): FormInputErrorStep3 => {
    const newErrors = { ...errorsStep3[index] };

    if (value.trim() === '') {
        newErrors[name] = 'This field is required';
    } else {
        delete newErrors[name];
    }

    if (name === 'email' && !validateEmail(value)) {
        newErrors.email = 'Please enter a valid email';
    }

    return newErrors;
};
export const validatePhoneNumber = (input: string): boolean => {
    const prefixRegex = /^(10|50|51|55|99|70|77)/;
    return prefixRegex.test(input);
};
export const validateBirthDate = (date: string): boolean => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 130;
};
export const isFutureDate = (date: string): boolean => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate > today;
};
export const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    const match = digits.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (!match) return '';

    return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
};
export const validateFormStep1 = (state: QuestionnaireState, dispatch: React.Dispatch<QuestionnaireAction>) => {
    let newErrors: FormErrorsStep1 = {};
    if (!state.phoneNumber) {
        newErrors.phoneNumber = "This field is required";
    }
    if (!validatePhoneNumber(state.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (state.businessPhoneNumber){if (!validatePhoneNumber(state.businessPhoneNumber)) {
        newErrors.businessPhoneNumber = "Please enter a valid phone number";
    }}
    if (!state.patronymic) {
        newErrors.patronymic = "This field is required";
    }
    if(state.personalEmail){
        if (!validateEmail(state.personalEmail)) {
            newErrors.personalEmail = "Please enter a valid email";
        }
    }

    if (!state.selectedOption) {
        newErrors.gender = "This field is required";

    }
    if (!validatePhoneNumber(state.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!validatePhoneNumber(state.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (state.birthDate==="") {
        newErrors.birthDate = "This field is required";
    }
    if (isFutureDate(state.birthDate)) {
        newErrors.birthDate = "The birth date cannot be in the future";
    } else if (!validateBirthDate(state.birthDate)) {
        newErrors.birthDate = "The birth date is invalid";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    if(!state.password){
        newErrors.password = "This field is required";
    }
    if (!passwordRegex.test(state.password)) {
        newErrors.password = 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number';
    }

    if (state.password !== state.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
    }
    dispatch({ type: 'SET_ERRORS', errors: newErrors });

}
export const validateFormStep2=(state: QuestionnaireState, dispatch: React.Dispatch<QuestionnaireAction>)=>{
    let newErrors: FormErrorsStep2 = {};
    if(state.voen.length===0){
        newErrors.voen = "VOEN is required";
    }
    else if(!state.voenIsValid || state.voen.length !==10){
        newErrors.voen = "VOEN is invalid"
    }
    dispatch({ type: 'SET_ERRORS_STEP_2', errorsStep2: newErrors });

}