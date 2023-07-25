import { ImSpinner8 } from "react-icons/im";
type Props = {
  updateCategory: boolean;
  isLoadingCategoryData: boolean;
};
function SubmitCategoryBtn({ isLoadingCategoryData, updateCategory }: Props) {
  return (
    <button
      type="submit"
      className={`submit-btn self-end mt-6 max-md:w-full w-1/3 ${
        updateCategory && "bg-blue-600"
      }`}
      disabled={isLoadingCategoryData}
    >
      {!isLoadingCategoryData && !updateCategory && "add category"}
      {!isLoadingCategoryData && updateCategory && "update category"}
      {isLoadingCategoryData && (
        <ImSpinner8 className="inline-block text-xl animate-spin" />
      )}
    </button>
  );
}

export default SubmitCategoryBtn;
