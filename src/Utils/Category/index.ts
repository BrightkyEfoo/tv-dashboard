import {
  categoryEmitter,
  categoryEventList,
} from "Components/MainDashboard/Categories";
import { categoryDeleteModalActions } from "Store/features/modal/categoryDeleteModalSlice";
import {
  TypeFnDelete,
  TypeFnEdit,
} from "Types/Functions/Utils/hndleEditCategory";

export const handleDeleteCategory: TypeFnDelete = (id) => {
  categoryEmitter.emit(
    categoryEventList.DISPATCH,
    categoryDeleteModalActions.setCategoryId(id)
  );
  categoryEmitter.emit(categoryEventList.SET_IS_MODAL_OPEN, true);
};

export const handleEditCategory: TypeFnEdit = (id) => {
  categoryEmitter.emit(
    categoryEventList.NAVIGATE,
    `/dashboard/category/edit/${id}`
  );
};
