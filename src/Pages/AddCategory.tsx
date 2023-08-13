import { useEffect } from "react";
import CategoryFormWrapper from "../features/addCategory/components/CategoryFormWrapper";
import { useLocation } from "react-router-dom";

const AddCategory = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.document.title = pathname
      .split("/")
      [pathname.split("/").length - 1].split("-")
      .join(" ")
      .toLocaleUpperCase();
  }, []);
  return (
    <section className="content-container">
      <CategoryFormWrapper />
    </section>
  );
};

export default AddCategory;
