import { categoryActions } from "Store/features/category/categorySlice";
import { store } from "Store/store";
import { Category, CategoryUpdate } from "Types/DataTypes/Category";
import { Id } from "Types/DataTypes/common/id";
import { findByKey } from "Utils/Common/ArrayOfObject";

class CategoryService {
  categories: Category[] = [];
  constructor() {
    const { category } = store.getState();
    this.categories = category;
  }
  async getCategoryById(id: Id) {
    this.categories = store.getState().category;
    return findByKey(this.categories, "id", id);
  }
  async deleteCategoryById(id: Id) {}
  async updateCategoryById(id: Id, update: CategoryUpdate) {
    const category = await this.getCategoryById(id);
    if (!category) return;
    store.dispatch(categoryActions.setCategory({ ...category, ...update }));
    this.categories = store.getState().category;
  }
  async createCategory(category: Category) {
    store.dispatch(categoryActions.addCategory(category));
    this.categories = store.getState().category;
    return this.categories;
  }
  async getAllCategories() {
    return this.categories;
  }
}

const categoryService = new CategoryService();
export default categoryService;
