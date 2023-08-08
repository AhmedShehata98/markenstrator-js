import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../services/apiSettings";
import {
  AddressByIdResponse,
  ApiResponse,
  CategoriesResponse,
  Category,
  CategoryResponse,
  Id,
  Login,
  LoginResponse,
  OneProductResponse,
  Order,
  OrderByIdResponse,
  OrderRequestParams,
  OrdersResponse,
  ProductForm,
  ProductUpdateResponse,
  Products,
  ProductsResponse,
  Signup,
  SignupError,
  SignupResponse,
  Token,
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
const getUserData = async (token: Token): Promise<UserDataResponse> => {
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
  product: ProductForm,
  token: Token
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

const updateProduct = async (
  product: ProductForm,
  id: Id,
  token: Token
): Promise<ProductUpdateResponse> => {
  try {
    const res = await axios({
      method: "PUT",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.products}/${id}`,
      headers: { Authorization: token },
      data: product,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id: Id, token: Token): Promise<ApiResponse> => {
  try {
    let res = await axios({
      method: "DELETE",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.products}/${id}`,
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
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
const getCategoryById = async (id: Id): Promise<CategoryResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.category}/${id}`,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const addCategory = async (
  category: Partial<Category>,
  token: Token
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
const updateCategory = async (
  newCategory:
    | Omit<Category, "slug" | "_id">
    | Omit<Category, "slug" | "_id" | "image">,
  token: Token,
  id: Id
) => {
  try {
    const response = await axios({
      method: "PUT",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.category}/${id}`,
      headers: { Authorization: token },
      data: newCategory,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const deleteCategory = async (
  id: string | undefined,
  token: Token
): Promise<ApiResponse> => {
  try {
    const res = await axios({
      method: "DELETE",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.category}/${id}`,
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getOrders = async ({
  token,
  limit,
  page,
}: OrderRequestParams): Promise<OrdersResponse> => {
  try {
    const { data } = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: ENDPOINTS.order.orders,
      headers: { authorization: token },
      params: { limit, page },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getOrdersById = async ({
  id,
  token,
}: OrderRequestParams): Promise<OrderByIdResponse> => {
  try {
    const { data } = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.order.orders}/${id}`,
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
const removeOrder = async ({
  id,
  token,
}: OrderRequestParams): Promise<OrderByIdResponse> => {
  try {
    const { data } = await axios({
      method: "DELETE",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.order.orders}/${id}`,
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getAddressById = async ({
  id,
  token,
}: {
  id: Id;
  token: Token;
}): Promise<AddressByIdResponse> => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: API_BASE_URL,
      url: `${ENDPOINTS.address}/${id}`,
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const uploadProductImage = async (
  imageFile: FormData | null,
  token: Token
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
const uploadCategoryImages = async (image: FormData, token: Token) => {
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
    throw new Error(error.response.data.message);
  }
};

export {
  accountLogin,
  accountSignup,
  getUserData,
  getProductById,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  getOrders,
  getOrdersById,
  removeOrder,
  getAddressById,
  uploadProductImage,
  uploadCategoryImages,
};
