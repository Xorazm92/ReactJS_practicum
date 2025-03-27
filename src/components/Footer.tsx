
import Image from 'next/image'
import { MdOutlineLocationOn, MdOutlineMailOutline } from 'react-icons/md'
import { BsTelephoneOutbound } from 'react-icons/bs'

const Footer: React.FC = () => {
  return (
    <div className="mt-[2vh]">
      <div className="flex text-[14px] font-normal px-4 py-[26px] bg-[#edf6ef] cursor-pointer justify-between items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={35} />
        <p className="flex items-center gap-3">
          <MdOutlineLocationOn />
          70 West Buckingham Ave. Farmingdale, NY 11735
        </p>
        <p className="flex items-center gap-3">
          <MdOutlineMailOutline />
          contact@greenshop.com
        </p>
        <p className="flex items-center gap-3">
          <BsTelephoneOutbound />
          +88 01911 717 490
        </p>
      </div>
      <footer className="flex bg-[#FBFBFB] py-3 px-3 justify-between items-start mt-[5vh]">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[19px] font-bold">My Account</h3>
          <p className="text-[14px] font-normal">My Account</p>
          <p className="text-[14px] font-normal">Our stores</p>
          <p className="text-[14px] font-normal">Contact us</p>
          <p className="text-[14px] font-normal">Career</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[19px] font-bold">Help & Guide</h3>
          <p className="text-[14px] font-normal">Help Center</p>
          <p className="text-[14px] font-normal">How to Buy</p>
          <p className="text-[14px] font-normal">Shipping & Delivery</p>
        </div>
      </footer>
      <div className="w-full h-[1px] bg-[#e1e1e1] mt-[14px]">
        <p className="text-center font-normal text-[14px] mt-3">
          © 2021 GreenShop. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
