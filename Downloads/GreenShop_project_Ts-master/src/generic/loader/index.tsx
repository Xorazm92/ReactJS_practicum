import { Avatar, Skeleton } from "antd";

const useLoader = () => {
  const Category_loader = () => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <div key={idx}>
        <Skeleton.Input active />
      </div>
    ));
  };

  const Card_Loader = () => {
    return Array.from({ length: 6 }).map((_, idx) => (
      <div className="flex-col flex items-start gap-2   " key={idx}>
        <Skeleton.Image className="!w-[270px] !h-[250px]" active />
        <Skeleton.Input active />
        <Skeleton.Input active />
      </div>
    ));
  };
  const Card_Order = () => {
    return Array.from({ length: 6 }).map((_, idx) => (
      <div className="flex-col flex items-start gap-2 w-full" key={idx}>
        <Skeleton.Input
          className="!w-full mb-2
        !h-[60px]"
          active
        />
      </div>
    ));
  };
  const BlogLoader = () => {
    <div className="flex items-center ">
      <Avatar />
      <div>
        <Skeleton.Input />
        <Skeleton.Input />
      </div>
    </div>;
  };
  return { Category_loader, Card_Loader, BlogLoader, Card_Order };
};

export default useLoader;
