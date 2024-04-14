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
  description: string;
  combinedImage: string;
};
export type News = {
  id: string;
  title: string;
  description: string;
  img?: string;
  imageFile?: File;
};

export type User = {
  id: string;
  id1C: string;
  age: number | 18;
  userName: string;
  lastName: string;
  patronimic: string;
  role: string;
  email: string;
  phoneNumber: string | null;
  emailConfirmed: boolean;
}
export type Company = {
  id: string;
  id1C: string| "";
  companyName: string| null;
  voen: string | null;
  typeOfActivity: string | null;
  startDate: string | null;
  address: string | null;
}

export type ClientWrapper = {
  id: number;
  userId: string;
  user: {
    id: string;
    id1C: string;
    userName: string;
    lastName: string;
    patronimic: boolean;
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
}

export type ResponseData = {
  totalUsersCount: number;
  users: ClientWrapper[];
};