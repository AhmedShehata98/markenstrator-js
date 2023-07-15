import { ChangeEvent, SetStateAction } from "react";
export const checkFormValidatiy = (
  ev: ChangeEvent<HTMLFormElement>,
  setIsEmptyFields: (value: SetStateAction<boolean>) => void
) => {
  if (ev.target.reportValidity()) {
    setIsEmptyFields(false);
  } else {
    setIsEmptyFields(true);
  }
};
