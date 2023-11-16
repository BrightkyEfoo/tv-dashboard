import videoService from "Services/Video.services";
import { ButtonClickEvent } from "Types/CommonTypes/Events";
import { Video } from "Types/DataTypes/common/Video";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useVideoEdit = () => {
  const { categoryId, videoId } = useParams();
  const [video, setVideo] = useState<Video>();
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
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

  return {
    isLoadingModalOpen,
    setLoadingPercentage,
    loadingPercentage,
    setIsLoadingModalOpen,
    handleSubmitTitle,
    video,
    setVideoTitle,
    videoInputFile,
    setVideoInputFile,
    setVideo,
    categoryId,
    videoId,
  };
};

type Propsuvc = {
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

export const useVideoContainer = ({ setVideoInputFile }: Propsuvc) => {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoPlayer = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };
  const handleClick = (e: ButtonClickEvent) => {
    videoInputRef.current?.click();
  };
  useEffect(() => {
    videoPlayer.current?.load();
  }, [videoPlayer.current?.src]);
  return {
    handleVideoChange,
    videoInputRef,
    videoPlayer,
    handleClick,
  };
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

export const useVideoEditForm = ({
  video,
  categoryId,
  videoId,
  videoInputFile,
  setVideo,
  setLoadingPercentage,
  setIsLoadingModalOpen,
}: Props2) => {
  const navigate = useNavigate();

  const handleDelete = (e: ButtonClickEvent) => {
    if (!video || !categoryId) return;

    videoService.deleteVideoById(video.id, categoryId);
    navigate(-1);
  };
  const handleCancel = (e: ButtonClickEvent) => {
    navigate(-1);
  };
  const handleSave = (e: ButtonClickEvent) => {
    console.log("video", video);

    if (!video || !categoryId) return;
    console.log("1");
    // TO-DO change url of phot and videos in video object.
    if (!videoId) {
      if (videoInputFile?.preview) {
        setIsLoadingModalOpen(true);

        return videoService
          .createVideo(
            video,
            categoryId,
            videoInputFile.preview,
            setLoadingPercentage
          )
          .then((_) => {
            setIsLoadingModalOpen(false);

            navigate(-1);
          });
      }
      return videoService.createVideo(video, categoryId).then((_) => {
        navigate(-1);
      });
    }
    console.log("2");

    if (videoInputFile?.preview) {
      console.log("3");
      setIsLoadingModalOpen(true);

      return videoService
        .updateVideoById(
          video?.id,
          categoryId,
          video,
          videoInputFile.preview,
          setLoadingPercentage
        )
        .then((_) => {
          setIsLoadingModalOpen(false);

          navigate(-1);
        });
    } else {
      videoService
        .updateVideoById(video?.id, categoryId, video)
        .then((_) => navigate(-1));
    }
  };

  const handleChangeByTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => {
      if (!prev) {
        let temp = {
          author: "",
          id: nanoid(21),
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
  return {
    handleDelete,
    handleChangeByTagName,
    handleCancel,
    handleSave,
  };
};
