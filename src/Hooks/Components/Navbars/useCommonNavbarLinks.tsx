import { NavbarLinks } from "Types/CommonTypes/Links";

const useCommonNavbarLinks = () => {
  const links: NavbarLinks = [
    {
      title: "Dashboard",
      path: "/",
    },
    {
      title: "About",
      path: "#",
    },
    {
      title: "Contact",
      path: "#",
    },
  ];

  return { links };
};

export default useCommonNavbarLinks;
