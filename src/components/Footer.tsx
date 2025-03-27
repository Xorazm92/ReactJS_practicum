
import Image from 'next/image'
import { MdOutlineLocationOn, MdOutlineMailOutline } from 'react-icons/md'
import { BsTelephoneOutbound } from 'react-icons/bs'

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-[#fbfbfb] py-[32px]">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-[18px] font-bold">Garden Care</h3>
          <div className="flex flex-col gap-[10px]">
            <span className="text-[14px] font-normal text-[grey] opacity-1">
              We are an online plant shop offering a wide range of cheap and trendy plants.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-[18px] font-bold">Plant Categories</h3>
          <div className="flex flex-col gap-[10px]">
            <span className="text-[14px] font-normal text-[grey] opacity-1">House Plants</span>
            <span className="text-[14px] font-normal text-[grey] opacity-1">Potter Plants</span>
            <span className="text-[14px] font-normal text-[grey] opacity-1">Seeds</span>
            <span className="text-[14px] font-normal text-[grey] opacity-1">Small Plants</span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-[18px] font-bold">Contact Us</h3>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <MdOutlineLocationOn />
              <span className="text-[14px] font-normal text-[grey] opacity-1">
                70 West Buckingham Ave. NY 11735
              </span>
            </div>
            <div className="flex items-center gap-[10px]">
              <BsTelephoneOutbound />
              <span className="text-[14px] font-normal text-[grey] opacity-1">+1 123-456-7890</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <MdOutlineMailOutline />
              <span className="text-[14px] font-normal text-[grey] opacity-1">info@greenshop.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
