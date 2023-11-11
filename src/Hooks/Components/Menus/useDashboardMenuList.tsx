import MenuList from "Types/CommonTypes/MenuList";
import loginLogout from "Utils/register/loginLogout";
import { FaFilm, FaHome, FaMailBulk, FaWhatsapp } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
const menuList: MenuList = [
  {
    title: "home",
    icon: <FaHome />,
    link: "/dashboard",
  },
  {
    title: "categories",
    icon: <MdCategory />,
    link: "/dashboard/category",
  },
  {
    title: "programs",
    icon: <FaFilm />,
    link: "/dashboard/program",
  },
  {
    title: "bouquets",
    icon: <PiTelevisionBold />,
    link: "/dashboard/bouquet",
  },
];

const menuButtons: MenuList = [
  {
    icon: <FaEarthAmericas />,
    title: "logout",
    link: "https://dmservices.cm/home",
    action: loginLogout,
  },
  {
    icon: <FaWhatsapp />,
    title: "settings",
    link: "https://wa.me/237620015157",
  },
  {
    icon: <FaMailBulk />,
    title: "help",
    link: "mailto:contact@dmservices.cm",
  },
];

const useDashboardMenuList = () => {
  return { menuList, menuButtons };
};

export default useDashboardMenuList;
