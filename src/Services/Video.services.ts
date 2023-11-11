import { store } from "Store/store";
import { Category } from "Types/DataTypes/Category";
import { Video, VideoUpdate } from "Types/DataTypes/common/Video";
import { Id } from "Types/DataTypes/common/id";
import { findByKey, findIndexByKey } from "Utils/Common/ArrayOfObject";
import categoryService from "./Category.services";

class VideoService {
  videos: Video[] = [];
  video?: Video;
  category: Category = {
    id: "",
    name: "",
    videos: [],
  };
  //   constructor() {
  //     // const { category } = store.getState();
  //     // this.categories = category;
  //   }

  async getVideoById(id: Id, categoryId: Id) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;
    this.category = temp;
    return findByKey(this.category.videos, "id", id);
  }
  async deleteVideoById(id: Id, categoryId: Id) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;
    this.category = temp;
    const vidIdx = findIndexByKey(this.category.videos, "id", id);
    if (vidIdx === -1) return;
    let tempVids = [...this.category.videos];

    tempVids = tempVids.filter((el) => el.id !== id);
    categoryService.updateCategoryById(categoryId, {
      ...this.category,
      videos: [...tempVids],
    });
    return;
  }
  async updateVideoById(id: Id, categoryId: Id, update: VideoUpdate) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;
    this.category = temp;
    const vidIdx = findIndexByKey(this.category.videos, "id", id);
    if (vidIdx === -1) return;
    let tempVids = [...this.category.videos];

    tempVids[vidIdx] = {
      ...tempVids[vidIdx],
      ...update,
    };
    categoryService.updateCategoryById(categoryId, {
      ...this.category,
      videos: [...tempVids],
    });
  }
  async createVideo(video: Video, categoryId: Id) {
    const temp = findByKey(store.getState().category, "id", categoryId);
    if (!temp) return;
    this.category = temp;
    categoryService.updateCategoryById(categoryId, {
      ...this.category,
      videos: [...this.category.videos, video],
    });
    return;
  }
  async getAllVideos() {}
}

const videoService = new VideoService();
export default videoService;
