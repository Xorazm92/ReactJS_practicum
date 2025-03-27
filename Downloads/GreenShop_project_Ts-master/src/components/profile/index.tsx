import type { FC } from "react";
import { Outlet } from "react-router-dom";
import DashboardProfile from "./dashboard";

const Profile: FC = () => {
  return (
    <div className="flex gap-6 items-start">
      <div>
        <DashboardProfile />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
