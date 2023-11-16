import Modal from "@mui/material/Modal";
import Cards from "Components/Cards";
import {
  CategoriesContext,
  useCategory,
  useCategoryModal,
  useCreateCategoryModal,
} from "Hooks/Components/Category";
import { Props } from "Types/ComponentsProps/CategoryContent";
import { Category } from "Types/DataTypes/Category";
import { renderCategoriesArgs } from "Types/Functions/category";
import { handleDeleteCategory, handleEditCategory } from "Utils/Category";
import { FaPlus } from "react-icons/fa";
import styles from "./Categories.module.css";
import Emitter from "Utils/EventEmitter/EventEmitter";

const THUMBS_MAX_NUMBER = 6;

export const categoryEmitter = new Emitter();
export const categoryEventList = {
  SET_IS_MODAL_OPEN: "SET_IS_MODAL_OPEN",
  SET_IS_CREATE_MODAL_OPEN: "SET_IS_CREATE_MODAL_OPEN",
  NAVIGATE: "NAVIGATE",
  DISPATCH: "DISPATCH",
  SET_CATEGORIES: "SET_CATEGORIES",
};
const Categories = () => {
  const {
    categories,
    isCreateCategoryModalOpen,
    isModalOpen,
    handleClick,
    isLoading,
    isError,
    error,
  } = useCategory();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occured {error.message}</div>;
  return (
    <CategoriesContext.Provider
      value={{
        isModalOpen,
        isCreateCategoryModalOpen,
      }}
    >
      <div className={styles.container}>
        <CategoryModal />
        <CreateCategoryModal />
        <button className={styles.addCategory} onClick={handleClick}>
          <FaPlus />
        </button>
        {renderCategories({
          categories,
        })}
      </div>
    </CategoriesContext.Provider>
  );
};

export default Categories;

const CategoryContent = (category: Props) => {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.title}>{category.Videos?.length} videos</p>
      <div className={styles.thumbsContainer}>{renderThumbs(category)}</div>
    </div>
  );
};

const CategoryModal = () => {
  const { isModalOpen, handleClose, handleClick, category } =
    useCategoryModal();

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalContainer}>
        <p>You want delete {category?.name}</p>
        <button type="button" onClick={handleClick}>
          OK
        </button>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

const CreateCategoryModal = () => {
  const {
    isCreateCategoryModalOpen,
    handleClose,
    handleClick,
    handleChange,
    title,
  } = useCreateCategoryModal();
  return (
    <Modal
      open={isCreateCategoryModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.createModalContainer}>
        <p>Category Name</p>
        <input type="text" value={title} onChange={handleChange} />
        <button type="button" onClick={handleClick}>
          OK
        </button>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

// renderers
const renderThumbs = (category: Category) =>
  category.Videos?.map((video, idx2) => {
    if (idx2 < THUMBS_MAX_NUMBER) {
      return (
        <img
          className={styles.thumbs}
          src={video.imageUrl}
          alt="category-video-thumbs"
          key={idx2}
        />
      );
    } else {
      return null;
    }
  });

const renderCategories = ({ categories }: renderCategoriesArgs) =>
  categories?.map((category, idx) => {
    return (
      <Cards.Wrapper1
        name={category.name}
        handleDelete={() => {
          handleDeleteCategory(category.id);
        }}
        handleEdit={() => {
          handleEditCategory(category.id);
        }}
        key={idx}
      >
        <CategoryContent key={idx} {...category} />
      </Cards.Wrapper1>
    );
  });
