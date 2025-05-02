import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

const ShoppingLayout = () => {
  return (
    <div className=" relative flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
