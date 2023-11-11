import useCommonNavbarLinks from "Hooks/Components/Navbars/useCommonNavbarLinks";
import logo from "../../Assets/Images/Logo-DMServices.png";
import styles from "./styles.module.css";

const CommonNavbar = () => {
  const { links } = useCommonNavbarLinks();
  return (
    <div className={styles.container}>
      <a href="https://dmservices.cm/home" target="_blank" rel="noreferrer">
        <img className={styles.logo} src={logo} alt="dms-logo" />
      </a>
      <ul className={styles.links}>
        {links.map((link, idx) => {
          return (
            <li key={link.title + idx}>
              <a href={link.path}>{link.title}</a>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommonNavbar;
