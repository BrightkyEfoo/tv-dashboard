import styles from "./Home.module.css";
import {IoLibraryOutline} from "react-icons/io5"
const Home = () => {
  return (
    <div className={styles.container}>
      <h2>Welcome back</h2>
      <IoLibraryOutline size={50} />
    </div>
  );
};

export default Home;
