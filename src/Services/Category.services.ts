import { categoryActions } from "Store/features/category/categorySlice";
import { store } from "Store/store";
import { Category, CategoryUpdate } from "Types/DataTypes/Category";
import { Id } from "Types/DataTypes/common/id";
import { findByKey } from "Utils/Common/ArrayOfObject";
import axios from "axios";

class CategoryService {
  categories: Category[] = [];
  constructor() {
    try {
      axios
        .get<Category[]>("http://localhost:1337/api/v1/category")
        .then((res) => {
          const temp = res.data;
          this.categories = temp;
          store.dispatch(categoryActions.setCategories(temp));
        });
    } catch (error) {
      console.log("error", error);
    }
  }
  async getCategoryById(id: Id) {
    const category = await axios
      .get<Category>(`http://localhost:1337/api/v1/category/${id}`)
      .then((res) => {
        const temp = res.data;
        store.dispatch(categoryActions.setCategory(temp));
        return temp;
      })
      .catch((err) => {
        return findByKey(this.categories, "id", id);
      })
      .finally(() => {
        this.categories = store.getState().category;
      });
    // return findByKey(this.categories, "id", id);
    return category;
  }
  async deleteCategoryById(id: Id) {
    await axios
      .delete(`http://localhost:1337/api/v1/category/${id}`)
      .then((res) => {
        store.dispatch(categoryActions.deleteCategory(id));
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }
  async updateCategoryById(id: Id, update: CategoryUpdate) {
    const category = await this.getCategoryById(id);
    if (!category) return;
    const obj: any = {};
    if (update.name) {
      obj.name = update.name;
    }
    if (update.description) {
      obj.description = update.description;
    }
    // if(update.name){
    //   obj.name = update.name
    // }
    console.log("obj", obj);
    const temp = await axios
      .put<Category>(`http://localhost:1337/api/v1/category/${id}`, obj)
      .then((res) => {
        const tempCategory = res.data;
        store.dispatch(
          categoryActions.setCategory({ ...category, ...tempCategory })
        );
        return tempCategory;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      })
      .finally(() => {
        this.categories = store.getState().category;
      });
    return temp;
  }
  async createCategory(category: Category) {
    const obj: any = {};
    if (category.name) {
      obj.name = category.name;
    }
    if (category.description) {
      obj.description = category.description || "a description";
    }
    console.log("obj", obj);
    await axios
      .post<Category>("http://localhost:1337/api/v1/category", obj)
      .then((res) => {
        const temp = res.data;
        store.dispatch(categoryActions.addCategory(temp));
        this.categories = store.getState().category;
        console.log("this.categories", this.categories);
      })
      .catch((err) => {
        console.log(err);
        return;
      })
      .finally(() => {
        this.categories = store.getState().category;
      });
    // this.categories = store.getState().category;
    return this.categories;
  }
  async getAllCategories() {
    let temp = await axios
      .get<Category[]>("http://localhost:1337/api/v1/category")
      .then((res) => {
        this.categories = res.data;
        store.dispatch(categoryActions.setCategories(this.categories));
        return this.categories;
      })
      .catch((err) => {
        console.log(err);
        return this.categories;
      })
      .finally(() => {
        this.categories = store.getState().category;
      });
    return temp;
  }
}

const categoryService = new CategoryService();
export default categoryService;
