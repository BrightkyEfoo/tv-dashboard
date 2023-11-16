import { Modal } from "@mui/material";
import Wrapper1 from "Components/Cards/Wrapper1";
import TextEditField from "Components/EditFields/TextEditField";
import {
  CategoriesEditContext,
  useCategoryEdit,
  useCategoryEditModal,
} from "Hooks/Components/Category";
import { Video } from "Types/DataTypes/common/Video";
import { Id } from "Types/DataTypes/common/id";
import { videoListRendererArgs } from "Types/Functions/categoryEdit";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./CategoryEdit.module.css";
import Emitter from "Utils/EventEmitter/EventEmitter";

export const categoryEditEmitter = new Emitter();
export const categoryEditEventList = {
  // SET_IS_CREATE_CATEGORY_MODAL_OPEN: "SET_IS_CREATE_CATEGORY_MODAL_OPEN",
  // SET_CATEGORIES: "SET_CATEGORIES",
  NAVIGATE: "NAVIGATE",
  SET_IS_MODAL_OPEN: "SET_IS_MODAL_OPEN",
  SET_VIDEO_ID: "SET_VIDEO_ID",
  SET_CATEGORY: "SET_CATEGORY",
};

const CategoryEdit = () => {
  const {
    categoryId,
    isLoading,
    isModalOpen,
    category,
    videoId,
    handleChange,
    name,
    handleSubmit,
    handleCreateVideo,
  } = useCategoryEdit();
  if (!categoryId) {
    return <div>Nothing go back</div>;
  } else {
    return (
      <CategoriesEditContext.Provider
        value={{
          isModalOpen,
          category,
          videoId,
        }}
      >
        <div className={styles.container}>
          <button className={styles.addVideo} onClick={handleCreateVideo}>
            <FaPlus />
          </button>
          <h2 className={styles.title}>
            {name && (
              <TextEditField
                preText="Edit"
                setValue={handleChange}
                submit={handleSubmit}
                value={name}
              />
            )}
          </h2>
          <div className={styles.subContainer}>
            {videoListRenderer({
              category,
            })}
          </div>
          <CategoryEditModal />

          {isLoading && <p>Loading...</p>}
        </div>
      </CategoriesEditContext.Provider>
    );
  }
};

export default CategoryEdit;

const vidRendererHandleDeleteGen = ({ id }: { id: Id }) => {
  return () => {
    categoryEditEmitter.emit(categoryEditEventList.SET_VIDEO_ID, id);
    categoryEditEmitter.emit(categoryEditEventList.SET_IS_MODAL_OPEN, true);
  };
};

const videRendererHandleEditGen = ({
  categoryId,
  videoId,
}: {
  categoryId: Id;
  videoId: Id;
}) => {
  return () => {
    categoryEditEmitter.emit(
      categoryEditEventList.NAVIGATE,
      `video/${videoId}`
    );
  };
};

const videoListRenderer = ({ category }: videoListRendererArgs) => {
  return category?.Videos.map((video, idx) => {
    return (
      <Wrapper1
        key={idx}
        handleDelete={vidRendererHandleDeleteGen({
          id: video.id,
        })}
        handleEdit={videRendererHandleEditGen({
          categoryId: category.id,
          videoId: video.id,
        })}
        name={video.title}
      >
        <VideoContent {...video} />
      </Wrapper1>
    );
  });
};

const VideoContent = ({ author, id, imageUrl, title, videoUrl }: Video) => {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <div className={styles.videoContent}>
        <p>{author}</p>
        <img ref={imgRef} src={imageUrl} alt="video-thumb" />
      </div>
    </>
  );
};

const CategoryEditModal = () => {
  const { isModalOpen, handleClose, handleClick, video, isLoading } =
    useCategoryEditModal();
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalContainer}>
        {isLoading ? (
          <>Loading</>
        ) : (
          <>
            <p>You want delete {video?.title}</p>
            <button type="button" onClick={handleClick}>
              OK
            </button>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};
