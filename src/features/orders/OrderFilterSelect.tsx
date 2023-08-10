import React, { useState } from "react";

type Props = {
  onChangeFilter: React.ChangeEventHandler;
};

export enum OrderStatusFilters {
  "all",
  "awaiting_fulfillment",
  "awaiting_shipment",
  "cancelled",
  "completed",
  "pending",
  "shipped",
}

function OrderFilterSelect({ onChangeFilter }: Props) {
  const filtersList = Object.values(OrderStatusFilters).filter(
    (valu) => typeof valu !== "number"
  );

  return (
    <select onChange={onChangeFilter}>
      {filtersList.map((filter) => (
        <option value={filter}>{filter.toString().split("_").join(" ")}</option>
      ))}
    </select>
  );
}

export default OrderFilterSelect;
