import type { FC } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";


interface Pathtype {
    pathName :string
}

const BreadcrumbItem: FC<Pathtype> = ({pathName}) => {

  return (
    <Breadcrumb
      items={[
        {
          path: "/Home",
          title: <Link className="flex items-center  gap-5" to={"/Home"}>Home</Link>,
        },
        { path: "/Blog", 
          title: pathName 
        },
      ]}
    >
      <HomeOutlined />
    </Breadcrumb>
  );
};

export default BreadcrumbItem;
