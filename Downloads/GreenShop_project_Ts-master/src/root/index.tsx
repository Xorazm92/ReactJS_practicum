import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import Blog from "../pages/blog";
import { Empty } from "antd";
import Karzinka from "../pages/karzinka";
import { SearchComponent } from "../pages/home/categories/cards/searchCardID";
import Product_chekout from "../pages/navbar/product_checkout";
import User_comments_blog from "../pages/blog/Usercomments";
import Profile from "../components/profile";
// import { path_profile } from "../utils";
import Order from "../components/profile/pages_profile/Track-order";
import Adress from "../components/profile/pages_profile/Address";
import My_products from "../components/profile/pages_profile/My_products";
import Wishlist from "../components/profile/pages_profile/Wishlist";
import Details from "../components/profile/pages_profile/Details";
import User from "../pages/user";

export const root = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Blog",
        element: <Blog />,
      },
      {
        path: "/Karzinka",
        element: <Karzinka />,
      },
      {
        path: "/search/:category/:id",
        element: <SearchComponent />,
      },
      {
        path: "/product-checkout",
        element: <Product_chekout />,
      },
      {
        path: "/blog/:id/:user_id",
        element: <User_comments_blog />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/Order",
            element: <Order />,
          },
          {
            path: "/profile/Address",
            element: <Adress />,
          },
          {
            path: "/profile/My_product",
            element: <My_products />,
          },
          {
            path: "/profile/Wishlist",
            element: <Wishlist />,
          },
          {
            path: "/profile/Details",
            element: <Details />,
          },
        ],
      },
      {
        path: "/user/:id",
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: <Empty />,
  },
]);
