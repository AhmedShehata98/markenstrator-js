let API_BASE_URL = "https://shoperz-api.vercel.app/api/v1/";

let ENDPOINTS = {
  auth: {
    signup: "auth/signup",
    login: "auth/login",
  },
  user: { me: "users/me" },
  products: "/products",
  category: "/categories",
  order: { orders: "orders" },
  uploadImage: {
    product: "upload/product",
    category: "upload/category",
  },
};
export { API_BASE_URL, ENDPOINTS };
