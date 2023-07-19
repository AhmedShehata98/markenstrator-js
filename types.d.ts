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
  category_id:
    | {
        _id: string;
        name: string;
      }
    | string;
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

type ProductsResponse = {
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
  error: string | null;
  message: string;
};

type OneProductResponse = {
  data: {
    products: Products;
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

/**
 *
 *
 * Uploads Types
 *
 */

interface UploadProductImageResponse extends ApiResponse {
  data: {
    images: {
      url: string;
      filePath: string;
    }[];
  };
}
