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
  id: number;
  id1C: string;
  userName: string;
  lastName: string;
  email: string;
  role: string;
  action?: string;
};
