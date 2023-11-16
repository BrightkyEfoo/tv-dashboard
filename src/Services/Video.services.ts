import { store } from "Store/store";
import { Category } from "Types/DataTypes/Category";
import { Video, VideoUpdate } from "Types/DataTypes/common/Video";
import { Id } from "Types/DataTypes/common/id";
import { findByKey, findIndexByKey } from "Utils/Common/ArrayOfObject";
import categoryService from "./Category.services";
import axios from "axios";

class VideoService {
  Videos: Video[] = [];
  video?: Video;
  category: Category = {
    id: "",
    name: "",
    Videos: [],
    description: "",
  };

  async getVideoById(id: Id, categoryId: Id) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;

    let video = await axios
      .get<Video>(`http://localhost:1337/api/v1/video/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });

    return video;
    // this.category = temp;
    // return findByKey(this.category.Videos, "id", id);
  }
  async deleteVideoById(id: Id, categoryId: Id) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;
    this.category = temp;
    const vidIdx = findIndexByKey(this.category.Videos, "id", id);
    if (vidIdx === -1) return;
    await axios
      .delete(`http://localhost:1337/api/v1/video/${id}`)
      .then((res) => {
        let tempVids = [...this.category.Videos];

        tempVids = tempVids.filter((el) => el.id !== id);
        categoryService.updateCategoryById(categoryId, {
          ...this.category,
          Videos: [...tempVids],
        });
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    // let tempVids = [...this.category.Videos];

    // tempVids = tempVids.filter((el) => el.id !== id);
    // categoryService.updateCategoryById(categoryId, {
    //   ...this.category,
    //   Videos : [...tempVids],
    // });
    // return;
  }

  async updateVideoById(
    id: Id,
    categoryId: Id,
    update: VideoUpdate,
    file: File,
    setLoadingPercentage: React.Dispatch<React.SetStateAction<number>>
  ): Promise<void>;
  async updateVideoById(
    id: Id,
    categoryId: Id,
    update: VideoUpdate
  ): Promise<void>;
  async updateVideoById(
    id: Id,
    categoryId: Id,
    update: VideoUpdate,
    file?: File,
    setLoadingPercentage?: React.Dispatch<React.SetStateAction<number>>
  ) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;

    if (file && setLoadingPercentage) {
      await this.updateVideoWithFile(
        id,
        categoryId,
        update,
        file,
        temp,
        setLoadingPercentage
      );
    } else {
      await this.updateVideoWithoutFile(id, categoryId, update, temp);
    }
    // this.category = temp;
    // const vidIdx = findIndexByKey(this.category.Videos, "id", id);

    // if (vidIdx === -1) return;
    // let tempVids = [...this.category.Videos];

    // tempVids[vidIdx] = {
    //   ...tempVids[vidIdx],
    //   ...update,
    // };
    // categoryService.updateCategoryById(categoryId, {
    //   ...this.category,
    //   Videos : [...tempVids],
    // });
  }

  async updateVideoWithFile(
    id: Id,
    categoryId: Id,
    update: VideoUpdate,
    file: File,
    category: Category,
    setLoadingPercentage: React.Dispatch<React.SetStateAction<number>>
  ) {
    let formData = new FormData();
    formData.append("file", file);
    if (update.author) {
      formData.append("author", JSON.stringify(update.author));
    }
    if (update.title) {
      formData.append("title", JSON.stringify(update.title));
    }
    if (update.videoUrl) {
      formData.append("videoUrl", JSON.stringify(update.videoUrl));
    }

    formData.append("CategoryId", JSON.stringify(categoryId.toString()));

    await axios
      .put(
        `http://localhost:1337/api/v1/video/${id}/?withFile=true`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            if (!data.total) console.log("data", data);
            else {
              console.log(
                "progress",
                Math.round((100 * data.loaded) / data.total),
                data
              );
              setLoadingPercentage(
                Math.round((100 * data.loaded) / data.total)
              );
            }
          },
        }
      )
      .then((res) => {
        console.log("res", res.data);
        this.category = category;
        const vidIdx = findIndexByKey(this.category.Videos, "id", id);

        if (vidIdx === -1) return;
        let tempVids = [...this.category.Videos];

        tempVids[vidIdx] = {
          ...tempVids[vidIdx],
          ...res.data,
        };
        categoryService.updateCategoryById(categoryId, {
          ...this.category,
          Videos: [...tempVids],
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async updateVideoWithoutFile(
    id: Id,
    categoryId: Id,
    update: VideoUpdate,
    category: Category
  ) {
    const obj: any = {};
    if (update.author) {
      obj.author = update.author;
    }
    if (update.videoUrl) {
      obj.videoUrl = update.videoUrl;
    }
    if (update.title) {
      obj.title = update.title;
    }
    await axios
      .put<Video>(
        `http://localhost:1337/api/v1/video/${id}/?withFile=true`,
        obj
      )
      .then((res) => {
        this.category = category;
        const vidIdx = findIndexByKey(this.category.Videos, "id", id);

        if (vidIdx === -1) return;
        let tempVids = [...this.category.Videos];

        tempVids[vidIdx] = {
          ...tempVids[vidIdx],
          ...res.data,
        };
        categoryService.updateCategoryById(categoryId, {
          ...this.category,
          Videos: [...tempVids],
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  async createVideoWithFile(
    video: Video,
    categoryId: Id,
    videoFile: File,
    setLoadingPercentage: React.Dispatch<React.SetStateAction<number>>
  ) {
    let formData = new FormData();
    formData.append("file", videoFile);
    if (video.author) {
      formData.append("author", JSON.stringify(video.author));
    }
    if (video.title) {
      formData.append("title", JSON.stringify(video.title));
    }
    if (video.videoUrl) {
      formData.append("videoUrl", JSON.stringify(video.videoUrl));
    }
    formData.append("CategoryId", JSON.stringify(categoryId.toString()));

    await axios
      .post("http://localhost:1337/api/v1/video/?withFile=true", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          if (!data.total) console.log("data", data);
          else {
            console.log(
              "progress",
              Math.round((100 * data.loaded) / data.total),
              data
            );
            setLoadingPercentage(Math.round((100 * data.loaded) / data.total));
          }
        },
      })
      .then((res) => {
        console.log("res", res.data);
        const data = res.data;
        let newVideo: Video = {
          author: data.author,
          id: data.id,
          title: data.name,
          videoUrl: data.videoUrl,
          imageUrl: data.imageUrl,
        };
        categoryService.updateCategoryById(categoryId, {
          ...this.category,
          Videos: [...this.category.Videos, newVideo],
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async createVideoWithoutFile(video: Video, categoryId: Id): Promise<void> {
    const obj: any = {};
    if (video.author) {
      obj.author = video.author;
    }
    if (video.videoUrl) {
      obj.videoUrl = video.videoUrl;
    }
    if (video.title) {
      obj.title = video.title;
    }
    axios
      .post<Video>("http://localhost:1337/api/v1/video/?withFile=false", obj)
      .then(async (res) => {
        await categoryService.updateCategoryById(categoryId, {
          ...this.category,
          Videos: [...this.category.Videos, res.data],
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    // await categoryService.updateCategoryById(categoryId, {
    //   ...this.category,
    //   Videos : [...this.category.Videos, video],
    // });
    return;
  }

  async createVideo(
    video: Video,
    categoryId: Id,
    videoFile: File,
    setLoadingPercentage: React.Dispatch<React.SetStateAction<number>>
  ): // imageFile: File
  Promise<void>;
  async createVideo(video: Video, categoryId: Id): Promise<void>;
  async createVideo(
    video: Video,
    categoryId: Id,
    videoFile?: File,
    // imageFile?: File
    setLoadingPercentage?: React.Dispatch<React.SetStateAction<number>>
  ) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;
    this.category = temp;
    if (videoFile && setLoadingPercentage) {
      await this.createVideoWithFile(
        video,
        categoryId,
        videoFile,
        setLoadingPercentage
      );
    } else {
      await this.createVideoWithoutFile(video, categoryId);
    }
  }

  async getAllVideos() {}
}

const videoService = new VideoService();
export default videoService;
