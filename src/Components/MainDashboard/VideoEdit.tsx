import TextEditField from "Components/EditFields/TextEditField";
import videoService from "Services/Video.services";
import { ButtonClickEvent } from "Types/CommonTypes/Events";
import { Video } from "Types/DataTypes/common/Video";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaTrash, FaVideo } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./VideoEdit.module.css";
import { nanoid } from "nanoid";

const VideoEdit = () => {
  const { categoryId, videoId } = useParams();
  const [video, setVideo] = useState<Video>();
  const navigate = useNavigate();
  const [videoInputFile, setVideoInputFile] = useState<
    | {
        preview: File;
        name: string;
      }
    | undefined
  >();
  const setVideoTitle = (v: string) => {
    setVideo((prev) =>
      prev
        ? { ...prev, title: v }
        : { title: v, author: "", videoUrl: "", id: nanoid(15), imageUrl: "" }
    );
  };
  const handleSubmitTitle = async (v: string) => {
    if (!categoryId || !video) return;
    else if (!videoId) return await videoService.createVideo(video, categoryId);
    await videoService.updateVideoById(videoId, categoryId, video);
  };
  useEffect(() => {
    if (!categoryId || !videoId) return;
    const asynchronusFn = async () => {
      const tempVid = await videoService.getVideoById(videoId, categoryId);
      setVideo((prev) => tempVid);
    };
    asynchronusFn();
  }, [categoryId, videoId]);

  const handleSave = (e: ButtonClickEvent) => {
    console.log("video", video);

    if (!video || !categoryId) return;
    
    // TO-DO change url of phot and videos in video object.
    if (!videoId) {
      return videoService.createVideo(video, categoryId).then((_) => {
        navigate(-1);
      });
    }
    videoService
      .updateVideoById(video?.id, categoryId, video)
      .then((_) => navigate(-1));
  };

  const handleCancel = (e: ButtonClickEvent) => {
    navigate(-1);
  };
  const handleDelete = (e: ButtonClickEvent) => {
    if (!video || !categoryId) return;

    videoService.deleteVideoById(video.id, categoryId);
    navigate(-1);
  };

  const handleChangeByTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => {
      if (!prev) {
        let temp = {
          author: "",
          id: nanoid(15),
          imageUrl: "",
          title: "New title",
          videoUrl: "",
        };
        // @ts-ignore
        temp[e.target.name] = e.target.value;
        return { ...temp };
      }
      let temp = { ...prev };
      // @ts-ignore
      temp[e.target.name] = e.target.value;
      return { ...temp };
    });
  };
  // const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoPlayer = useRef<HTMLVideoElement>(null);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <TextEditField
          preText="Edit"
          setValue={setVideoTitle}
          value={video?.title || "New title"}
          submit={handleSubmitTitle}
        />
      </h2>
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
          onChange={(e) => {
            console.log("changed video file");
            if (!e.target.files) return;
            console.log(e.target.files[0].type);
            if (!e.target.files[0].type.includes("video")) {
              console.log("not a video");
              return;
            }
            if (!videoPlayer.current) return;
            videoPlayer.current.src = URL.createObjectURL(e.target.files[0]);
            videoPlayer.current.load();
            setVideoInputFile({
              preview: e.target.files[0],
              name: e.target.files[0].name,
            });
          }}
        />
        <button
          type="button"
          onClick={(e) => {
            videoInputRef.current?.click();
          }}
        >
          <FaVideo />
        </button>
        <input type="url" placeholder={video?.videoUrl} />
      </div>
      {/* <div className={styles.imageContainer}>
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
      </div> */}

      {/* form */}
      <div className={styles.formContainer}>
        <button type="button" title="delete this video" onClick={handleDelete}>
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
    </div>
  );
};

export default VideoEdit;
