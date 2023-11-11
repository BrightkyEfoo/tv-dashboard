export type MenuItem = {
  link: string;
  icon: JSX.Element;
  title: string;
  action?: MenuAction;
};
export type MenuAction = (() => Promise<void>) | (() => void);
type MenuList = MenuItem[];
export default MenuList;

