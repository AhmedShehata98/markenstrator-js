import React, { ButtonHTMLAttributes } from "react";

type UserBtnPannlProps = {
  className: string;
  icon: React.ReactNode;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function UserPannelBtn({ clickHandler, icon, className }: UserBtnPannlProps) {
  console.log(clickHandler);
  return (
    <button
      className={className}
      type="button"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
        clickHandler(event)
      }
    >
      {icon}
    </button>
  );
}

export default UserPannelBtn;
