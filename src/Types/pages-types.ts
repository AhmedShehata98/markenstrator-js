export interface IClonedVariants {
  id: number | string;
  element: React.FunctionComponentElement<any>;
}
export interface IClonedMediaInput {
  id: number | string;
  element: React.FunctionComponentElement<any>;
}

export type VariantsType = {
  id: number | string;
  size: number;
  color: string;
  stock: number;
};

export type MediaType = {
  id: string;
  assest: object | string | undefined;
  fileLivePreview?: string | undefined;
};
export interface IProductFormData {
  productName: string;
  price: {
    unit: string;
    value: number;
  };
  sku: string;
  weight: {
    unit: string;
    value: number;
  };
  description: string;
  brand: string;
  category: string;
  collection: string;
  media: MediaType[];
  variants: VariantsType[];
}

export interface IAllProductsData extends IProductFormData {
  id: string | number;
  changes: string | number;
  sold: string | number;
  sales: string | number;
}

export type AddProductsProps = {
  initinalProductsData: Partial<IProductFormData>;
};

export interface SignupFormdata {
  fullname: string;
  email: string;
  phone: number;
  password: string;
  approval: boolean;
}

export interface ISettingPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface ISettingNotifications {
  orderConfirmation: boolean;
  orderDelivered: boolean;
  orderStateChanged: boolean;
  emailNotification: boolean;
}

export interface ISettingProfile {
  avatarUrl: string;
  fullname: string;
  email: string;
  password: string;
  company_store_Name: string;
  location: string;
  currency: string;
  phone: string;
  address: string;
}
export interface ICategoryData {
  id: number | string;
  icon: string;
  "category-name": string;
  "category-products-count": string;
}

export interface INotificationsMenu {
  id: number | string;
  type: "alert" | "success" | "warning" | "danger";
  icon: string;
  title: string;
  summury: string;
  date: string;
}
