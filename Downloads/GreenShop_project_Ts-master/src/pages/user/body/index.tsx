import { Tabs } from "antd";
import { user_body_title } from "../../../utils";
import { FC } from "react";

const BodyUser: FC = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={user_body_title.map(({ id, Component, title }) => ({
          label: title,
          key: id,
          children: <Component />,
        }))}
      />
    </div>
  );
};

export default BodyUser;
