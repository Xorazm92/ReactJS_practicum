import type {
  HeroSliderType,
  options,
  TitleCategory,
  user_bodyType,
} from "../@types";
import About from "../pages/user/body/About";
import Follower from "../pages/user/body/Followers";
import Likes from "../pages/user/body/Likes";
import Posts from "../pages/user/body/Posts";
import Products from "../pages/user/body/Products";

export const hero_mock: HeroSliderType[] = [
  {
    id: 0,
    title: "Le’s Make a Better",
    subTitle: "WELCOME TO GREENSHOP",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    buttonText: "SHOP NOW",
    big_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d",
    small_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower2.png?alt=media&token=905a94e2-1250-4e56-9dcb-d16bbb1a31ca",
  },
  {
    id: 1,
    title: "LET'S LIVE IN A BETTER",
    subTitle: "WELCOME TO GREENSHOP",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    buttonText: "LE'TS START",
    big_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d",
    small_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower2.png?alt=media&token=905a94e2-1250-4e56-9dcb-d16bbb1a31ca",
  },
  {
    id: 2,
    title: "LET'S OBSERVE A BETTER",
    subTitle: "WELCOME TO GREENSHOP",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    buttonText: "GET CREDITS",
    big_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662",
    small_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower2.png?alt=media&token=905a94e2-1250-4e56-9dcb-d16bbb1a31ca",
  },
];
export const Title_category: TitleCategory[] = [
  {
    id: 1,
    title: "All Plants",
    label: "all-plants",
  },
  {
    id: 2,
    title: "New Arrivals",
    label: "new-arrivals",
  },
  {
    id: 3,
    title: "Sale",
    label: "sale",
  },
];

export const SortOptions: options[] = [
  { id: 1, value: "default-sorting", label: "Default Sorting" },
  { id: 2, value: "the-cheapest", label: "The Cheapest" },
  { id: 3, value: "most-expensive", label: "Most Expensive" },
];
export const PriceFuction = (count: number, price: number) => {
  const result = count * price;

  return parseFloat(result.toFixed(2));
};

// export const path_profile: PathProfileType[] = [
//   {
//     id: 1,
//     path: "",
//     Component: Details,
//     Icon: UserOutlined,
//     title: "Account Details",
//   },
//   {
//     id: 2,
//     path: "my-products",
//     Component: ProductsProfile,
//     Icon: ShoppingOutlined,
//     title: "My Products",
//   },
//   {
//     id: 3,
//     path: "address",
//     Component: Adress,
//     Icon: EnvironmentOutlined,
//     title: "Adress",
//   },
//   {
//     id: 4,
//     path: "wishlist",
//     Component: Wishlist,
//     Icon: HeartOutlined,
//     title: "Wishlist",
//   },
//   {
//     id: 5,
//     path: "track-order",
//     Component: Order,
//     Icon: DashboardOutlined,
//     title: "Track Order",
//   },
// ];
export let user_body_title: user_bodyType[] = [
  {
    id: "1",
    title: "About",
    Component: About,
  },
  {
    id: "2",
    title: "Products",
    Component: Products,
  },
  {
    id: "3",
    title: "Posts",
    Component: Posts,
  },
  {
    id: "4",
    title: "Likes",
    Component: Likes,
  },
  {
    id: "5",
    title: "Followers",
    Component: Follower,
  },
];
