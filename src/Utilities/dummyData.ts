import { nanoid } from "@reduxjs/toolkit";
import { IAllProductsData, ICategoryData } from "./../Types/pages-types";
export type userAllDataTypes = {
  username: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
  email: string;
  role: string;
  phonenumber?: string;
  password: string;
};

export interface IOrders {
  id: number;
  orderState: "pending" | "paid" | "cancelled" | "refunded";
  userImg: string;
  username: string;
  paymentMethod: {
    method: "card" | "cash";
    info: string | "when dilivered";
  };
  orderID: string;
  orderDate: Date | string;
  price: string | number;
  ordersCount: number;
}

export const adminUserData = <userAllDataTypes>{
  avatarUrl: "https://picsum.photos/150",
  email: "admin@email.com",
  firstname: "ahmed",
  lastname: "shehata",
  role: "admin",
  username: "AhmedShehata123",
  phonenumber: "01234567123",
  password: "admin",
};

export const ordersList: IOrders[] = [
  {
    id: 0,
    orderState: "paid",
    userImg: "https://picsum.photos/150",
    username: "john doe 1",
    paymentMethod: {
      method: "card",
      info: "374245455400126",
    },
    orderID: "# 87-1341",
    orderDate: new Date().toISOString(),
    price: "1,250,000",
    ordersCount: 79,
  },
  {
    id: 1,
    orderState: "cancelled",
    userImg: "https://picsum.photos/151",
    username: "john doe 2",
    paymentMethod: {
      method: "card",
      info: "5425233430109903",
    },
    orderID: "# 22-4041",
    orderDate: new Date().toISOString(),
    price: "1,610,00",
    ordersCount: 29,
  },
  {
    id: 2,
    orderState: "pending",
    userImg: "https://picsum.photos/152",
    username: "john doe 3",
    paymentMethod: {
      method: "card",
      info: "4263982640269299",
    },
    orderID: "# 99-8910",
    orderDate: new Date().toISOString(),
    price: "1,811,05",
    ordersCount: 100,
  },
  {
    id: 3,
    orderState: "refunded",
    userImg: "https://picsum.photos/157",
    username: "john doe 4",
    paymentMethod: {
      method: "cash",
      info: "when dilivered",
    },
    orderID: "# 01-1181",
    orderDate: new Date().toISOString(),
    price: "8,120,09",
    ordersCount: 188,
  },
  {
    id: 4,
    orderState: "refunded",
    userImg: "https://picsum.photos/155",
    username: "john doe 5",
    paymentMethod: {
      method: "cash",
      info: "when dilivered",
    },
    orderID: "# 40-2701",
    orderDate: new Date().toISOString(),
    price: "4,025,09",
    ordersCount: 74,
  },
  {
    id: 5,
    orderState: "paid",
    userImg: "https://picsum.photos/159",
    username: "john doe 6",
    paymentMethod: {
      method: "cash",
      info: "when dilivered",
    },
    orderID: "# 42-1001",
    orderDate: new Date().toISOString(),
    price: "5,025,09",
    ordersCount: 44,
  },
  {
    id: 6,
    orderState: "pending",
    userImg: "https://picsum.photos/162",
    username: "john doe 7",
    paymentMethod: {
      method: "cash",
      info: "when dilivered",
    },
    orderID: "# 32-1001",
    orderDate: new Date().toISOString(),
    price: "2,000,05",
    ordersCount: 14,
  },
];

export const productsDataList: IAllProductsData[] = [
  {
    id: 0,
    brand: "samsung",
    category: "smartphone",
    changes: 3_7,
    collection: "smartphone",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque impedit sapiente repellendus exercitationem eum perspiciatis labore natus commodi eveniet?",
    price: {
      value: 900,
      unit: "EGP",
    },
    weight: {
      value: 132,
      unit: "GS",
    },
    media: [
      {
        id: "0",
        assest: "https://picsum.photos/300",
        fileLivePreview: "https://picsum.photos/300",
      },
      {
        id: "1",
        assest: "https://picsum.photos/301",
        fileLivePreview: "https://picsum.photos/301",
      },
      {
        id: "2",
        assest: "https://picsum.photos/302",
        fileLivePreview: "https://picsum.photos/302",
      },
      {
        id: "3",
        assest: "https://picsum.photos/303",
        fileLivePreview: "https://picsum.photos/303",
      },
    ],
    productName: "samsung galaxy s10",
    sales: 11_258_40,
    sku: nanoid(9),
    sold: 40,
    variants: [
      {
        id: "0",
        color: "#145000",
        size: 140,
        stock: 1000,
      },
      {
        id: "1",
        color: "#FF6000",
        size: 110,
        stock: 100,
      },
    ],
  },
  {
    id: 0,
    brand: "Apple",
    category: "smartphone",
    changes: -5_1,
    collection: "smartphone",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque impedit sapiente repellendus exercitationem eum perspiciatis Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, labore natus commodi eveniet?",
    price: {
      value: 31000,
      unit: "EGP",
    },
    weight: {
      value: 148,
      unit: "GS",
    },
    media: [
      {
        id: "0",
        assest: "https://picsum.photos/401",
        fileLivePreview: "https://picsum.photos/401",
      },
      {
        id: "1",
        assest: "https://picsum.photos/400",
        fileLivePreview: "https://picsum.photos/400",
      },
      {
        id: "2",
        assest: "https://picsum.photos/402",
        fileLivePreview: "https://picsum.photos/402",
      },
      {
        id: "3",
        assest: "https://picsum.photos/403",
        fileLivePreview: "https://picsum.photos/403",
      },
    ],
    productName: "IPhone 12 pro max",
    sales: 21_258_400,
    sku: nanoid(9),
    sold: 27,

    variants: [
      {
        id: "0",
        color: "#DFF000",
        size: 140,
        stock: 50,
      },
      {
        id: "1",
        color: "#A11000",
        size: 100,
        stock: 70,
      },
    ],
  },
  {
    id: 0,
    brand: "LG",
    category: "smart TV",
    changes: 3_7,
    collection: "TV",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque impedit sapiente repellendus exer labore natus commodi eveniet?",
    price: {
      value: 19500,
      unit: "EGP",
    },
    weight: {
      value: 1.5,
      unit: "KGS",
    },
    media: [
      {
        id: "0",
        assest: "https://picsum.photos/310",
        fileLivePreview: "https://picsum.photos/310",
      },
      {
        id: "1",
        assest: "https://picsum.photos/311",
        fileLivePreview: "https://picsum.photos/311",
      },
      {
        id: "2",
        assest: "https://picsum.photos/312",
        fileLivePreview: "https://picsum.photos/312",
      },
      {
        id: "3",
        assest: "https://picsum.photos/313",
        fileLivePreview: "https://picsum.photos/313",
      },
    ],
    productName: "LG Smart TV LCD 2122",
    sales: 4_258_40,
    sku: nanoid(9),
    sold: 14,
    variants: [
      {
        id: "0",
        color: "#fff6f6",
        size: 110,
        stock: 200,
      },
      {
        id: "1",
        color: "#131313",
        size: 10,
        stock: 2170,
      },
    ],
  },
];

export const CategoryiesList: ICategoryData[] = [
  {
    id: 0,
    "category-name": "eleconics",
    "category-products-count": "76 products",
    icon: "fi fi-rr-screen",
  },
  {
    id: 1,
    "category-name": "games",
    "category-products-count": "26 products",
    icon: "fi fi-rr-gamepad",
  },
  {
    id: 2,
    "category-name": "beauty",
    "category-products-count": "106 products",
    icon: "fi fi-rr-barber-shop",
  },
  {
    id: 3,
    "category-name": "fashion",
    "category-products-count": "56 products",
    icon: "fi fi-rs-gem",
  },
  {
    id: 4,
    "category-name": "furniture",
    "category-products-count": "14 products",
    icon: "fi fi-rr-chair-office",
  },
  {
    id: 5,
    "category-name": "books",
    "category-products-count": "53 products",
    icon: "fi fi-rr-book-bookmark",
  },
  {
    id: 6,
    "category-name": "gadget",
    "category-products-count": "44 products",
    icon: "fi fi-rr-keyboard",
  },
  {
    id: 7,
    "category-name": "music",
    "category-products-count": "32 products",
    icon: "fi fi-rr-music",
  },
  {
    id: 8,
    "category-name": "health",
    "category-products-count": "20 products",
    icon: "fi fi-rr-stethoscope",
  },
  {
    id: 9,
    "category-name": "investment",
    "category-products-count": "12 products",
    icon: "fi fi-rr-lightbulb-dollar",
  },
  {
    id: 10,
    "category-name": "sports & gym ",
    "category-products-count": "12 products",
    icon: "fi fi-sr-gym",
  },
  {
    id: 11,
    "category-name": "food & market",
    "category-products-count": "12 products",
    icon: "fi fi-rr-hamburger-soda",
  },
];

export const usersDatabase: userAllDataTypes[] = [adminUserData];
