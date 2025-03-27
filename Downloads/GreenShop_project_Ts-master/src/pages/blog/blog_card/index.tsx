import { EyeOutlined, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import type { FC } from "react";
import { Blogtype } from "../../../@types";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";

const Blog_card: FC<Blogtype> = ({
  title,
  short_description,
  views,
  _id,
  created_by,
}) => {
  const navigate = useNavigate();
  const axios = useAxios();

  return (
    <Card
      className="mt-5"
      actions={[
        <div className="flex justify-center gap-2" key="setting">
          <EyeOutlined />
          <p>{views}</p>
        </div>,
        <div className="flex justify-center gap-2" key="edit">
          <MessageOutlined />
          <p>2</p>
        </div>,
        <div className="flex justify-center gap-2" key="like">
          <HeartOutlined />
          <p>3</p>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Avatar className="cursor-pointer" src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        }
        title={
          <h2
            className="cursor-pointer"
            onClick={() => {
              axios({ url: "/user/blog/view", method: "PUT", body: { _id } });
              navigate(`/blog/${_id}/${created_by}`);
            }}
          >
            {title}
          </h2>
        }
        description={short_description}
      />
    </Card>
  );
};

export default Blog_card;
