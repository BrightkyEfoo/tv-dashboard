import DashboardRouter from "Components/MainDashboard/Dashboard";
import Dashboard from "Components/Menus/Dashboard";

const DashboardWrapper = () => {
  return (
    <>
      <Dashboard.Menu />
      
      <DashboardRouter />
    </>
  );
};

export default DashboardWrapper;
