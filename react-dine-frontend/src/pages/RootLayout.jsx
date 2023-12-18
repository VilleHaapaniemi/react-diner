import { Outlet } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";

const RootLayout = () => {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
