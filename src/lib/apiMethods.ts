import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../services/apiSettings";
import {
  CategoriesResponse,
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
const getProductById = async (
  id: string,
  querys: productQueriesParameter
): Promise<OneProductResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${API_BASE_URL}/${id}`,
      url: ENDPOINTS.products,
      params: { ...querys },
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
    throw error.response.data;
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

export {
  accountLogin,
  accountSignup,
  getUserData,
  getProductById,
  getAllProducts,
  addProduct,
  getAllCategories,
  getCategoryById,
  uploadProductImage,
};
