import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../services/apiSettings";
import {
  CategoriesResponse,
  Category,
  CategoryResponse,
  Login,
  LoginResponse,
  OneProductResponse,
  Products,
  ProductsResponse,
  Signup,
  SignupError,
  SignupResponse,
  UploadProductImageResponse,
  UserDataResponse,
  productQueriesParameter,
} from "../../types";

// Fetchers methods
const accountLogin = async ({
  email,
  password,
}: Login): Promise<LoginResponse> => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.auth.login,
      data: {
        email,
        password,
      },
    });

    const data = res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const accountSignup = async ({
  email,
  fullname,
  password,
  phone,
}: Signup): Promise<SignupResponse | SignupError> => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.auth.signup,
      data: { email, fullname, password, phone },
    });
    const data = await res.data;
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
const getUserData = async (
  token: string | undefined
): Promise<UserDataResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.user.me,
      headers: {
        Authorization: token,
      },
    });
    const data = res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getAllProducts = async (): Promise<ProductsResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.products,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getProductById = async (id: string): Promise<OneProductResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.products}/${id}`,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const addProduct = async (
  product: Partial<Products>,
  token: string | undefined
): Promise<OneProductResponse> => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.products,
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: product,
    });

    return res.data;
  } catch (error) {
    throw (error as any).response.data;
  }
};

const getAllCategories = async (): Promise<CategoriesResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.category,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getCategoryById = async (id: string): Promise<CategoriesResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${API_BASE_URL}/${id}`,
      url: ENDPOINTS.category,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const addCategory = async (
  category: Partial<Category>,
  token: string | undefined
): Promise<CategoryResponse> => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.category,
      headers: {
        Authorization: token,
      },
      data: category,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const uploadProductImage = async (
  imageFile: FormData | null,
  token: string
): Promise<UploadProductImageResponse> => {
  console.log(imageFile);
  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.uploadImage.product,
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: imageFile,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const uploadCategoryImages = async (
  image: FormData,
  token: string | undefined
) => {
  console.log(image);

  try {
    const res = await axios({
      method: "POST",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.uploadImage.category,
      headers: {
        Authorization: token,
        // "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "multipart/form-data",
      },
      data: image,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  accountLogin,
  accountSignup,
  getUserData,
  getProductById,
  getAllProducts,
  addProduct,
  getAllCategories,
  getCategoryById,
  addCategory,
  uploadProductImage,
  uploadCategoryImages,
};
