import {
  QuestionnaireAction,
  QuestionnaireState,
} from "@/types/questionnaireTypes";
import React, { Dispatch, SetStateAction } from "react";

export interface FormErrorsStep1 {
  birthDate?: string;
  patronymic?: string;
  password?: string;
  confirmPassword?: string;
  personalEmail?: string;
  phoneNumber?: string;
  businessPhoneNumber?: string;
  gender?: string;
}
export interface FormErrorsStep2 {
  voen?: string;
}
export interface FormInputStep3 {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface FormInputErrorStep3 {
  name?: string;
  lastName?: string;
  email?: string;
}

export interface Step2FormProps {
  state: {
    voen: string;
    errorsStep2: {
      voen: string;
    };
  };
  handleChangeVoen: (event: React.ChangeEvent<HTMLInputElement>) => void;
  goToPreviousStep: () => void;
  handleSubmitStep2: () => void;
}
export interface Step1FormProps {
  state: QuestionnaireState;
  dispatch: Dispatch<QuestionnaireAction>;
  hasErrors: boolean;
  changeTab: (tabId: string) => void;
}

export interface Step3FormProps {
  state: QuestionnaireState;
  dispatch: Dispatch<QuestionnaireAction>;
  errorsStep3: FormInputErrorStep3[];
  setErrorsStep3: Dispatch<SetStateAction<FormInputErrorStep3[]>>; // Ensure correct type here
  handleInputChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    dispatch: Dispatch<QuestionnaireAction>,
    state: QuestionnaireState,
    setErrorsStep3: Dispatch<SetStateAction<FormInputErrorStep3[]>>, // Correct type here
    errorsStep3: FormInputErrorStep3[]
  ) => void;
  handleAddClick: (dispatch: Dispatch<QuestionnaireAction>) => void;
  handleRemoveClick: (
    index: number,
    dispatch: Dispatch<QuestionnaireAction>
  ) => void;
  handleSubmitStep3: (
    state: QuestionnaireState,
    dispatch: Dispatch<QuestionnaireAction>,
    setErrorsStep3: Dispatch<SetStateAction<FormInputErrorStep3[]>>
  ) => void;
  goToPreviousStep: (dispatch: Dispatch<QuestionnaireAction>) => void;
}

export type Product = {
  id: number;
  id1C: string;
  name: string;
  description: string;
  combinedImage: string;
  productType: string;
  isPublic: boolean;
};
export type Partner = {
  id: number;
  id1C: string;
  name: string;
  typeOfActivity: string;
  description: string;
  combinedImage: string;
};
export type News = {
  _id?: string;
  _id1C?: string;
  title: string;
  description: string;
  img?: string;
  imageFile?: File;
  isPublic: boolean;
};

export type User = {
  id: string;
  id1C: string;
  age: number | 18;
  userName: string;
  password?: string;
  lastName: string;
  patronimic: string;
  role: string;
  email: string;
  phoneNumber: string | null;
  emailConfirmed: boolean;
  accessFailedCount?: number;
};
export type Company = {
  id: string;
  id1C: string | "";
  companyName: string | null;
  voen: string | null;
  typeOfActivity: string | null;
  startDate: string | null;
  address: string | null;
};

export type ClientWrapper = {
  id: number;
  userId: string;
  user: {
    id: string;
    id1C: string;
    userName: string;
    lastName: string;
    patronimic?: string;
    image: any;
    role: string;
    email: string;
    phoneNumber?: string;
    emailConfirmed: boolean;
  };
  businessPhoneNumber: string;
  personalEmail: string;
  isDirector: boolean;
  company: {
    id: number;
    id1C?: string;
    companyName?: string;
    voen?: string;
    typeOfActivity?: string;
    startDate: string | null;
    address: string | null;
  };
  isPublic: boolean;
  clientFeedback?: any;
  clientConfirm?: any;
  youtubeLink?: string;
};

export type ResponseData = {
  totalUsersCount: number;
  users: ClientWrapper[];
};

export type StaffWrapper = {
  id: number;
  userId: string;
  user: {
    id: string;
    id1C: string;
    userName: string;
    lastName: string;
    patronimic?: string;
    image: any;
    role: string;
    email: string;
    phoneNumber?: string;
    emailConfirmed: boolean;
  };
  isDismissed: boolean;
  Experience?: number;
  certificates?: string;
  position?: string;
};
export type employer = {
  employer: StaffWrapper;
};

export interface FormErrorsStep1 {
  birthDate?: string;
  patronymic?: string;
  password?: string;
  confirmPassword?: string;
  personalEmail?: string;
  phoneNumber?: string;
  businessPhoneNumber?: string;
  gender?: string;
}
export interface FormErrorsStep2 {
  voen?: string;
}
export interface FormInputStep3 {
  id: number;
  name: string;
  lastName: string;
  email: string;
}
export interface FormInputErrorStep3 {
  [key: string]: string | undefined;
  name?: string;
  lastName?: string;
  email?: string;
}

export interface Vacancy {
  id: string;
  appointment: string;
  skills: string;
  salary: string;
  conditions: string;
  responsibilities: string;
  employmentType: "Full" | "Temporary" | "Partial";
  minimumExperience: "Any" | "Internship" | "Junior" | "Middle" | "Senior";
  companyName: string;
  companyCity: string;
  createdDate: Date;
}
