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
