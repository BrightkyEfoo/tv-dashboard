import { Route, Routes } from "react-router-dom";
import Mains from ".";

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/category" element={<Mains.Categories />} />
      <Route
        path="/category/edit/:categoryId"
        element={<Mains.CategoryEdit />}
      />
      <Route
        path="/category/edit/:categoryId/video/create"
        element={<Mains.VideoEdit />}
      />
      <Route
        path="/category/edit/:categoryId/video/:videoId"
        element={<Mains.VideoEdit />}
      />

      <Route path="/program" element={<Mains.Programs />} />
      <Route path="/bouquet" element={<Mains.Bouquets />} />
      <Route path="/stats" element={<Mains.Stats />} />
      <Route path="/" element={<Mains.Home />} />
    </Routes>
  );  
};

export default DashboardRouter;
