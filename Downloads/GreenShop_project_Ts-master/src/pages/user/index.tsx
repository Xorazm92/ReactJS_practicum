import type { FC } from "react";

import HeaderUser from "./header";
import BodyUser from "./body";

const User: FC = () => {
 

  //   let isload = isLoading || isError;

  return (
    <div>
      <div className="w-[90%] m-auto py-5">
        <HeaderUser />
        <BodyUser />
      </div>
    </div>
  );
};

export default User;
