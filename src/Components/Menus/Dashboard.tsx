import useDashboardMenuItem from "Hooks/Components/Menus/useDashboardMenuItem";
import useDashboardMenuList from "Hooks/Components/Menus/useDashboardMenuList";
import { ClickEvent } from "Types/CommonTypes/Events";
import { MenuItem } from "Types/CommonTypes/MenuList";
import styles from "./Dashbord.module.css";

const Menu = () => {
  const { menuList, menuButtons } = useDashboardMenuList();

  return (
    <div className={styles.container}>
      {menuList.map((menu, index) => {
        return <Item key={index} {...menu} />;
      })}
      <p className={styles.contactTitle}>Nous contacter</p>
      {menuButtons.map((menu, index) => {
        return <Button key={index} {...menu} />;
      })}
    </div>
  );
};

const Item = ({ icon, link, title, action }: MenuItem) => {
  const { isSelected, handleClick } = useDashboardMenuItem({ link, action });
  return (
    <div
      className={styles.item + " " + (isSelected ? styles.selected : "")}
      onClick={handleClick}
    >
      <span>{title}</span> {icon}
    </div>
  );
};

const Button = ({ icon, link, title, action }: MenuItem) => {
  const handleClick = async (e: ClickEvent) => {
    window.open(link, "_blank");
    if (action) await action();
  };
  return (
    <div className={styles.button} onClick={handleClick}>
      {icon}
    </div>
  );
};

const Dashboard = {
  Menu,
  Item,
  Button,
};

export default Dashboard;
