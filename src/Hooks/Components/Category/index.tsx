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
import { useQuery } from "react-query";
import {
  categoryEmitter,
  categoryEventList,
} from "Components/MainDashboard/Categories";
import {
  categoryEditEmitter,
  categoryEditEventList,
} from "Components/MainDashboard/CategoryEdit";

export const CategoriesContext = createContext<{
  isModalOpen: boolean;
  isCreateCategoryModalOpen: boolean;
}>({
  isModalOpen: false,
  isCreateCategoryModalOpen: false,
});

export const CategoriesEditContext = createContext<{
  isModalOpen: boolean;
  category: Category | null | undefined;
  videoId: Id;
}>({
  isModalOpen: false,
  videoId: "",
  category: null,
});

export const useCategory = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategory = () => {
    return new Promise<Category[]>(async (resolve, reject) => {
      try {
        const tempCategories = await categoryService.getAllCategories();
        setCategories(tempCategories);

        resolve(tempCategories);
      } catch (error: any) {
        // resolve([])
        reject(error);
      }
    });
  };

  const { isLoading, isError, data, error } = useQuery<
    Category[],
    any,
    Category[],
    "categories"
  >("categories", fetchCategory);

  const handleClick = (e: ButtonClickEvent) => {
    // setIsCreateCategoryModalOpen(true);
    categoryEmitter.emit(categoryEventList.SET_IS_CREATE_MODAL_OPEN, true);
  };

  // handle events
  categoryEmitter.on(categoryEventList.SET_IS_MODAL_OPEN, (data: boolean) => {
    setIsModalOpen((prev) => data);
  });
  categoryEmitter.on(categoryEventList.NAVIGATE, (route: any) => {
    navigate(route);
  });
  categoryEmitter.on(
    categoryEventList.SET_IS_CREATE_MODAL_OPEN,
    (data: boolean) => {
      setIsCreateCategoryModalOpen((prev) => data);
    }
  );
  categoryEmitter.on(
    categoryEventList.SET_CATEGORIES,
    (categories: Category[]) => {
      setCategories(categories);
    }
  );
  categoryEmitter.on(categoryEventList.DISPATCH, (data: any) => {
    dispatch(data);
  });

  // emit events

  return {
    categories,
    isCreateCategoryModalOpen,
    dispatch,
    isModalOpen,
    handleClick,
    isLoading,
    isError,
    data,
    error,
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
    categoryService.updateCategoryById(categoryId, { name }).then((res) => {
      console.log("resC", res);
      setCategory(res);
    });
  };
  const handleCreateVideo = (e: ButtonClickEvent) => {
    navigate(`video/create`);
  };

  // HANDLE EVENTS
  categoryEditEmitter.on(categoryEditEventList.NAVIGATE, (data: any) => {
    navigate(data);
  });

  categoryEditEmitter.on(
    categoryEditEventList.SET_CATEGORY,
    (data: Category | null | undefined) => {
      setCategory((prev) => data);
    }
  );

  categoryEditEmitter.on(
    categoryEditEventList.SET_IS_MODAL_OPEN,
    (data: boolean) => {
      setIsModalOpen(data);
    }
  );

  categoryEditEmitter.on(categoryEditEventList.SET_VIDEO_ID, (data: Id) => {
    setVideoId(data);
  });

  

  // EMIT EVENTS
  return {
    categoryId,
    videoId,
    isModalOpen,
    isLoading,
    category,
    handleChange,
    name,
    handleSubmit,
    handleCreateVideo,
  };
};

export const useCategoryModal = () => {
  // const dispatch()
  const { isModalOpen } = useContext(CategoriesContext);
  const handleClose = () =>
    categoryEmitter.emit(categoryEventList.SET_IS_MODAL_OPEN, false);
  const categoryId = useSelector(
    (state: RootState) => state.categoryDeleteModal.categoryId
  );
  const categories = useSelector((state: RootState) => state.category);
  const category = findByKey(categories, "id", categoryId);
  const handleClick = () => {
    categoryService.deleteCategoryById(categoryId).then(() => {
      categoryService.getAllCategories().then((tempCategories) => {
        categoryEmitter.emit(categoryEventList.SET_CATEGORIES, tempCategories);

        console.log("tempCategories", tempCategories);
        categoryEmitter.emit(categoryEventList.SET_IS_MODAL_OPEN, false);
      });
    });
  };
  return {
    isModalOpen,
    handleClose,
    handleClick,
    category,
  };
};

export const useCreateCategoryModal = () => {
  const { isCreateCategoryModalOpen } = useContext(CategoriesContext);
  const [title, setTitle] = useState("");
  const handleClose = () =>
    categoryEmitter.emit(categoryEventList.SET_IS_CREATE_MODAL_OPEN, false);
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
        Videos: [],
        description: "a description",
      })
      .then((_) => {
        // setCategories(_);
        categoryEmitter.emit(categoryEventList.SET_CATEGORIES, _);
        console.log("_", _);
        categoryEmitter.emit(categoryEventList.SET_IS_CREATE_MODAL_OPEN, false);
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
  const { isModalOpen, category, videoId } = useContext(CategoriesEditContext);
  const [video, setVideo] = useState<Video>();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () =>
    categoryEditEmitter.emit(categoryEditEventList.SET_IS_MODAL_OPEN, false);
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
      categoryEditEmitter.emit(categoryEditEventList.SET_IS_MODAL_OPEN, false);
      categoryService
        .getCategoryById(category!.id)
        .then((_) => {
          if (!_) {
            return;
          }
          categoryEditEmitter.emit(categoryEditEventList.SET_CATEGORY, _);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  return {
    isModalOpen,
    handleClose,
    handleClick,
    category,
    video,
    isLoading,
  };
};
