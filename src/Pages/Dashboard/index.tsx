import DashboardWrapper from "Components/DashboardWrapper";
import Footers from "Components/Footers";
import Navbars from "Components/Navbars";
import styles from "./styles.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Navbars.Common />
      <DashboardWrapper />
      <Footers.Common />
    </div>
  );
};

export default Dashboard;
