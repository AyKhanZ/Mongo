export type Product = {
  id: number;
  id1C: string;
  name: string;
  description: string;
  combinedImage: string;
  productType: string;
  isPublic: boolean;
};

export type News = {
  id: string;
  title: string;
  description: string;
  img?: string;
  imageFile?: File;
};