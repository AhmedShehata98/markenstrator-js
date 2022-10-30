import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ordersList, IOrders } from "../../Utilities/dummyData";

interface IinitialState {
  pending: boolean;
  error: null | boolean;
  success: null | boolean;
  errorMessage: string;
  ordersList: IOrders[];
}
const initialState: IinitialState = {
  pending: false,
  error: null,
  success: null,
  errorMessage: "",
  ordersList: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    SET_ORDER: (state: IinitialState, action: PayloadAction) => {
      state.ordersList = ordersList;
    },
    DELETE_ORDER: (
      state: IinitialState,
      action: PayloadAction<{ id: number }>
    ) => {
      const newOrdersList = state.ordersList.filter(
        (order) => order.id !== action.payload.id
      );
      state.ordersList = newOrdersList;
    },
  },
});

export const { DELETE_ORDER, SET_ORDER } = ordersSlice.actions;
