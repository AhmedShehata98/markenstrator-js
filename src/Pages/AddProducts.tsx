import React from "react";
import AddProductFormWrapper from "../features/addProducts/components/AddProductFormWrapper";

const AddProducts = () => {
  return (
    <main className="w-full lg:w-5/6 xl:w-[88%] h-screen max-h-screen overflow-y-auto max-lg:px-3 lg:px-4 lg:py-3 mt-20 lg:mt-14 lg:ml-auto">
      <section className="w-full max-md:w-full">
        <AddProductFormWrapper />
      </section>
      {/* <section className="max-md:w-full w-1/4"></section> */}
    </main>
  );
};

export default React.memo(AddProducts);
