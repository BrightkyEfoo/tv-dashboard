import { Modal } from "@mui/material";
import Wrapper1 from "Components/Cards/Wrapper1";
import TextEditField from "Components/EditFields/TextEditField";
import {
  CategoriesEditContext,
  useCategoryEdit,
  useCategoryEditModal,
} from "Hooks/Components/Category";
import { Video } from "Types/DataTypes/common/Video";
import styles from "./CategoryEdit.module.css";
import { videoListRendererArgs } from "Types/Functions/categoryEdit";
import { Id } from "Types/DataTypes/common/id";
import { NavigateFunction } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const CategoryEdit = () => {
  const {
    categoryId,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    category,
    videoId,
    setVideoId,
    handleChange,
    name,
    handleSubmit,
    navigate,
    setCategory,
    handleCreateVideo
  } = useCategoryEdit();
  if (!categoryId) {
    return <div>Nothing go back</div>;
  } else {
    return (
      <CategoriesEditContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
          category,
          videoId,
          setVideoId,
          setCategory,
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
              setVideoId,
              setIsModalOpen,
              navigate,
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

const vidRendererHandleDeleteGen = ({
  setVideoId,
  setIsModalOpen,
  id,
}: {
  setVideoId: (v: Id) => void;
  setIsModalOpen: (v: boolean) => void;
  id: Id;
}) => {
  return () => {
    setVideoId(id);
    setIsModalOpen(true);
  };
};

const videRendererHandleEditGen = ({
  navigate,
  categoryId,
  videoId,
}: {
  navigate: NavigateFunction;
  categoryId: Id;
  videoId: Id;
}) => {
  return () => {
    navigate(`video/${videoId}`);
  };
};

const videoListRenderer = ({
  category,
  setVideoId,
  setIsModalOpen,
  navigate,
}: videoListRendererArgs) => {
  return category?.videos.map((video, idx) => {
    return (
      <Wrapper1
        key={idx}
        handleDelete={vidRendererHandleDeleteGen({
          setVideoId,
          id: video.id,
          setIsModalOpen,
        })}
        handleEdit={videRendererHandleEditGen({
          navigate,
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
  return (
    <div>
      <p>{author}</p>
      <img src={imageUrl} alt="video-thumb" />
    </div>
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
