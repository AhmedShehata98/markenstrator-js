type ApiResponse = {
  message: string;
  data: null;
  error: null;
};

/**
 *
 * User Auth
 */
interface UserDataResponse extends ApiResponse {
  data: UserData;
}
type UserData = {
  user: {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
  };
  userOrders: [];
};
type Signup = {
  fullname: string;
  phone: string;
  email: string;
  password: string;
};
interface SignupResponse extends ApiResponse {
  data: {
    token: string;
  };
}

interface SignupForm extends Signup {
  approval: boolean;
}

interface SignupError extends ApiResponse {
  error: {
    type: string;
    errors: [
      {
        message: string;
        path: [string];
        type: string;
        context: {
          regex: {};
          value: string;
          label: string;
          key: string;
        };
      }
    ];
  };
}

interface LoginResponse extends ApiResponse {
  data: { token: string };
}

export type Login = {
  email: string;
  password: string;
};

/**
 *
 * Products
 *
 */

type Products = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: Array<string>;
  thumbnail: string;
  category_id: {
    _id: string;
    name: string;
  };
  sku: string;
  brand: string;
  colors: Array<string>;
  stock: number;
  discount: number;
  rating: number;
  isInCart: boolean;
  createdAt: string;
  updatedAt: string;
  specifications: string;
  deliveryCost: ["free"] | number;
  __v: number;
};

interface ProductsResponse extends ApiResponse {
  data: {
    products: Array<Products>;
    pagination: {
      limit: string;
      remainingPages: number;
      length: number;
      actualProductsLength: number;
      currentPage: string;
    };
  };
}

type OneProductResponse = {
  data: {
    product: Products;
  };
  error: string | null;
  message: string;
};

type productQueriesParameter = {
  limit: number = 8;
  page?: number = 1;
  q?: string | undefined = undefined;
  parts?: "pagination" | "filter" | "pagination,filter" = "pagination,filter";
};

interface ProductUpdateResponse extends ApiResponse {
  data: { product: string };
}

type ProductForm = {
  name: string;
  sku: string;
  price: number;
  stock: number;
  category_id: string;
  discount: number;
  description: string;
  specifications: string;
  images: Array<string> | FileList | File[];
  thumbnail: string;
  deliveryCost: string;
  brand: string;
  colors: Array<string>;
};

/**
 *
 *
 * Categories Types
 *
 *
 */
interface CategoriesResponse extends ApiResponse {
  data: { categories: Categories[] };
}
type Categories = {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
};

type CategoryForm = {
  image: string;
  description: string;
  name: string;
};

type Category = {
  image: string;
  description: string;
  name: string;
  slug: string;
  _id: string;
};
interface CategoryResponse extends ApiResponse {
  data: { category: Category };
}
/**
 *
 *
 * Orders
 *
 */

interface OrderRequestParams {
  limit?: number;
  page?: number;
  token: Token;
  id?: Token;
}
interface OrdersResponse extends ApiResponse {
  data: {
    orders: Order[];
    pagination: {
      actualOrdersLength: number;
      currentPage: string;
      length: number;
      limit: string;
      remainingPages: number;
    };
  };
}
interface OrderByIdResponse extends ApiResponse {
  data: Order;
}

type Order = {
  addressId: string;
  createdAt: string;
  updatedAt: string;
  discountedTotal: number;
  totalPrice: number;
  payment: OrderPayment;
  products: { productId: Products; _id: string; quantity: number }[];
  status: OrderStatus;
  userId: { fullname: string; email: string; phone: string };
  __v: string;
  _id: string;
};
type OrderPayment = {
  method: string;
  status: OrderStatus;
};
type OrderStatus =
  | "pending"
  | "awaiting_fulfillment"
  | "awaiting_shipment"
  | "shipped"
  | "completed"
  | "cancelled";
/**
 *
 *
 * Uploads Types
 *
 */

interface UploadProductImageResponse extends ApiResponse {
  data: {
    images: ProductUploadImage[];
  };
}

interface UploadCategoryImageResponse extends ApiResponse {
  data: {
    image: {
      url: string;
      filePath: string;
    };
  };
}

type ProductUploadImage = {
  url: string;
  filePath: string;
};

/**
 *
 *
 * Others
 *
 */

type Token = string | undefined;
type Id = string | undefined;
