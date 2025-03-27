import { Avatar, Tooltip } from "antd";
import { useQueryApi } from "../../../../../../hooks/useQuery";

const AvatarUser = ({ created_by }: { created_by: string }) => {
//   console.log(created_by);
  const { data} = useQueryApi({
    pathname: "user",
    url: `/user/by_id/${created_by}`,
  });
  console.log(data);
  
  return (
    <div>
      <Tooltip title={`${data?.name} ${data?.surname}`}>
        <Avatar className="w-[60px] h-[60px]" src={data?.profile_photo}  />
      </Tooltip>
    </div>
  );
};

export default AvatarUser;
