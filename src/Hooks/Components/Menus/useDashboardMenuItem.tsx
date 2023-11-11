import { ClickEvent } from "Types/CommonTypes/Events";
import { ArgsType } from "Types/Hooks/useDashboardMenuItemArgs";
import { useLocation, useNavigate } from "react-router-dom";

const useDashboardMenuItem = ({ link, action }: ArgsType) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = async (e: ClickEvent) => {
    if (action) await action();
    navigate(link);
  };
  let isSelected = false;
  if (link === "/dashboard") isSelected = location.pathname === link;
  else isSelected = location.pathname.includes(link);
  return {
    isSelected,
    handleClick,
  };
};

export default useDashboardMenuItem;
