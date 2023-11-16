import TextEditField from "Components/EditFields/TextEditField";
import {
  useVideoContainer,
  useVideoEdit,
  useVideoEditForm,
} from "Hooks/Components/Category/Video";
import { Video } from "Types/DataTypes/common/Video";
import { FaCheck, FaTrash, FaVideo } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import styles from "./VideoEdit.module.css";
import { LinearProgress, Modal } from "@mui/material";
import { useState } from "react";

const VideoEdit = () => {
  const {
    handleSubmitTitle,
    video,
    setVideoTitle,
    videoInputFile,
    setVideoInputFile,
    setVideo,
    categoryId,
    videoId,
    isLoadingModalOpen,
    setIsLoadingModalOpen,
    loadingPercentage,
    setLoadingPercentage,
  } = useVideoEdit();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <TextEditField
          preText="Edit title :"
          setValue={setVideoTitle}
          value={video?.title || ""}
          submit={handleSubmitTitle}
        />
      </h2>
      {/* video container */}
      <VideoContainer setVideoInputFile={setVideoInputFile} video={video} />

      {/* form */}
      <VideoEditForm
        categoryId={categoryId}
        setVideo={setVideo}
        video={video}
        videoId={videoId}
        videoInputFile={videoInputFile}
        setLoadingPercentage={setLoadingPercentage}
        setIsLoadingModalOpen={setIsLoadingModalOpen}
      />
      <LoadingModal
        isLoadingModalOpen={isLoadingModalOpen}
        setIsLoadingModalOpen={setIsLoadingModalOpen}
        loadingPercentage={loadingPercentage}
      />
    </div>
  );
};

type Props1 = {
  video?: Video;
  setVideoInputFile: React.Dispatch<
    React.SetStateAction<
      | {
          preview: File;
          name: string;
        }
      | undefined
    >
  >;
};

const VideoContainer = ({ setVideoInputFile, video }: Props1) => {
  const { videoInputRef, videoPlayer, handleVideoChange, handleClick } =
    useVideoContainer({ setVideoInputFile });

  return (
    <div className={styles.videoContainer}>
      <p>Video</p>
      <video controls ref={videoPlayer}>
        <source src={video?.videoUrl} />
      </video>
      <input
        type="file"
        ref={videoInputRef}
        id="videoFile"
        hidden
        accept=".mp4,.mkv,.avi"
        onChange={handleVideoChange}
      />
      <button type="button" onClick={handleClick}>
        <FaVideo />
      </button>
      <input
        className="soon-input"
        type="url"
        disabled
        placeholder={video?.videoUrl || "video url"}
        title="soon"
      />
    </div>
  );
};

type Props2 = {
  video?: Video;
  categoryId?: string;
  videoId?: string;
  videoInputFile:
    | {
        preview: File;
        name: string;
      }
    | undefined;
  setVideo: React.Dispatch<React.SetStateAction<Video | undefined>>;
  setLoadingPercentage: React.Dispatch<React.SetStateAction<number>>;
  setIsLoadingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoEditForm = ({
  video,
  categoryId,
  videoId,
  videoInputFile,
  setVideo,
  setLoadingPercentage,
  setIsLoadingModalOpen,
}: Props2) => {
  const { handleDelete, handleChangeByTagName, handleCancel, handleSave } =
    useVideoEditForm({
      video,
      categoryId,
      videoId,
      videoInputFile,
      setVideo,
      setLoadingPercentage,
      setIsLoadingModalOpen,
    });
  return (
    <div className={styles.formContainer}>
      <button
        type="button"
        style={{ visibility: videoId ? "visible" : "hidden" }}
        title="delete this video"
        onClick={handleDelete}
      >
        <FaTrash />
      </button>
      <p>Title</p>
      <input
        type="text"
        value={video?.title}
        onChange={handleChangeByTagName}
        // onKeyUp={handleKeyUp}
        name="title"
      />
      <p>Author</p>
      <input
        type="text"
        value={video?.author}
        onChange={handleChangeByTagName}
        name="author"
      />
      <button type="button" onClick={handleSave}>
        <FaCheck /> Save
      </button>
      <button type="button" onClick={handleCancel}>
        <FaXmark /> Cancel
      </button>
    </div>
  );
};

const LoadingModal = ({
  isLoadingModalOpen,
  setIsLoadingModalOpen,
  loadingPercentage: lodaingPercentage,
}: {
  isLoadingModalOpen: boolean;
  setIsLoadingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadingPercentage: number;
}) => {
  // const handleClose = (e: ButtonClickEvent) => {

  // };
  return (
    <Modal
      open={isLoadingModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.LoadingModal}>
        <p>Please wait until end</p>

        <p>
          <LinearProgress
            value={lodaingPercentage}
            color="success"
            variant="determinate"
          />
        </p>
        <p>{lodaingPercentage} %</p>
      </div>
    </Modal>
  );
};

export default VideoEdit;

/* <div className={styles.imageContainer}>
        <p>Image</p>
        <img
          src={
            imageInputFile?.preview
              ? URL.createObjectURL(imageInputFile?.preview)
              : video.imageUrl
          }
          alt={video.title}
        />
        <input
          type="file"
          id="imageFile"
          ref={imageInputRef}
          hidden
          accept=".jpg,.png"
          onChange={(e) => {
            console.log("changed image file");
            if (!e.target.files) return;
            if (!e.target.files[0].type.includes("image")) {
              console.log("not an image");
              return;
            }
            setImageInputFile({
              preview: e.target.files[0],
              name: e.target.files[0].name,
            });
          }}
        />
        <button
          type="button"
          onClick={(e) => {
            imageInputRef.current?.click();
          }}
        >
          <FaImages />
        </button>
        <input onChange={(e) => {}} type="url" placeholder={video?.imageUrl} />
      </div> */
