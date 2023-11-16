import { categoryEmitter } from "Components/MainDashboard/Categories";
import { categoryDeleteModalActions } from "Store/features/modal/categoryDeleteModalSlice";
import {
  TypeFnDelete,
  TypeFnEdit,
} from "Types/Functions/Utils/hndleEditCategory";

export const handleDeleteCategory: TypeFnDelete = (
  id,
  setIsModalOpen,
  dispatch
) => {
  dispatch(categoryDeleteModalActions.setCategoryId(id));
  categoryEmitter.emit("set-is-modal-open", true)
  // setIsModalOpen(true);
};

export const handleEditCategory: TypeFnEdit = (id, navigate) => {
  navigate(`/dashboard/category/edit/${id}`);
};
