import { Typography } from "antd";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <Link to={"/login"}>
            <Typography.Title level={1}>Click me</Typography.Title>
        </Link>
    );
};
