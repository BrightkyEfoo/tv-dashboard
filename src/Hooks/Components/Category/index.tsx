import categoryService from "Services/Category.services";
import videoService from "Services/Video.services";
import { nanoid } from "nanoid";
import { RootState } from "Store/store";
import { ButtonClickEvent } from "Types/CommonTypes/Events";
import { Category } from "Types/DataTypes/Category";
import { Video } from "Types/DataTypes/common/Video";
import { Id } from "Types/DataTypes/common/id";
import { findByKey } from "Utils/Common/ArrayOfObject";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const CategoriesContext = createContext<{
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isCreateCategoryModalOpen: boolean;
  setIsCreateCategoryModalOpen: (value: boolean) => void;
  setCategories: (v: Category[]) => void;
}>({
  isModalOpen: false,
  setIsModalOpen: (v) => {},
  isCreateCategoryModalOpen: false,
  setIsCreateCategoryModalOpen: (v) => {},
  setCategories: (v) => {},
});

export const CategoriesEditContext = createContext<{
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  category: Category | null | undefined;
  videoId: Id;
  setVideoId: (v: Id) => void;
  setCategory: (v: Category) => void;
}>({
  isModalOpen: false,
  setIsModalOpen: (v) => {},
  videoId: "",
  category: null,
  setVideoId: (v) => {},
  setCategory: (v) => {},
});

export const useCategory = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [categories, setCategories] = useState<Category[]>();
  useEffect(() => {
    const asynchronusFn = async () => {
      const tempCategories = await categoryService.getAllCategories();
      setCategories(tempCategories);
    };
    asynchronusFn();
  }, []);
  const handleClick = (e: ButtonClickEvent) => {
    setIsCreateCategoryModalOpen(true);
  };
  return {
    categories,
    navigate,
    setIsModalOpen,
    isCreateCategoryModalOpen,
    setIsCreateCategoryModalOpen,
    dispatch,
    isModalOpen,
    handleClick,
    setCategories,
  };
};

export const useCategoryEdit = () => {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [videoId, setVideoId] = useState<Id>("");
  const [category, setCategory] = useState<Category | null | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    if (!categoryId) return;
    const asynchronusFn = async () => {
      const tempCategory = await categoryService.getCategoryById(categoryId);
      setCategory(tempCategory);
      setName(tempCategory?.name);
    };
    asynchronusFn().finally(() => setIsLoading(false));
  }, [categoryId]);
  const [name, setName] = useState(category?.name);
  const handleChange = (value: string) => {
    setName(value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = async () => {
    
    if (!categoryId) return;
    categoryService.updateCategoryById(categoryId, { name });
  };
  const handleCreateVideo = (e: ButtonClickEvent) => {
    navigate(`video/create`);
  };
  return {
    categoryId,
    videoId,
    setVideoId,
    setIsModalOpen,
    isModalOpen,
    isLoading,
    category,
    setCategory,
    handleChange,
    name,
    handleSubmit,
    navigate,
    handleCreateVideo,
  };
};

export const useCategoryModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(CategoriesContext);
  const handleClose = () => setIsModalOpen(false);
  const categoryId = useSelector(
    (state: RootState) => state.categoryDeleteModal.categoryId
  );
  const categories = useSelector((state: RootState) => state.category);
  const category = findByKey(categories, "id", categoryId);
  const handleClick = () => {
    categoryService.deleteCategoryById(categoryId);
  };
  return {
    isModalOpen,
    handleClose,
    handleClick,
    category,
  };
};

export const useCreateCategoryModal = () => {
  const {
    isCreateCategoryModalOpen,
    setIsCreateCategoryModalOpen,
    setCategories,
  } = useContext(CategoriesContext);
  const [title, setTitle] = useState("");
  const handleClose = () => setIsCreateCategoryModalOpen(false);
  const categoryId = useSelector(
    (state: RootState) => state.categoryDeleteModal.categoryId
  );
  const categories = useSelector((state: RootState) => state.category);
  const category = findByKey(categories, "id", categoryId);
  const handleClick = () => {
    categoryService
      .createCategory({
        name: title,
        id: nanoid(15),
        videos: [],
      })
      .then((_) => {
        setCategories(_);
        setIsCreateCategoryModalOpen(false);
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((prev) => e.target.value);
  };
  return {
    isCreateCategoryModalOpen,
    handleClose,
    handleClick,
    category,
    title,
    handleChange,
  };
};

export const useCategoryEditModal = () => {
  const { isModalOpen, setIsModalOpen, category, videoId, setCategory } =
    useContext(CategoriesEditContext);
  const [video, setVideo] = useState<Video>();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  useEffect(() => {
    const asynchronusFn = async () => {
      if (category?.id) {
        const temp = await videoService.getVideoById(videoId, category?.id);
        setVideo((prev) => temp);
      }
    };
    asynchronusFn();
  }, [category?.id, videoId]);

  const handleClick = () => {
    setIsLoading(true);
    videoService.deleteVideoById(videoId, category!.id).finally(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      categoryService.getCategoryById(category!.id).then((_) => {
        if (!_) {
          return;
        }
        setCategory(_);
      });
    });
  };
  // const video = findByKey(category.videos, "id", videoId);
  return {
    isModalOpen,
    handleClose,
    handleClick,
    category,
    video,
    isLoading,
  };
};
