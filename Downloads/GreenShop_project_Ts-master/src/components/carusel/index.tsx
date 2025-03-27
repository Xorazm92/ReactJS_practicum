import React from "react";
import { Carousel } from "antd";
import { hero_mock } from "../../utils";
import { HeroSliderType } from "../../@types";
import HeroItem from "./hero-item";
const CaruselComponent: React.FC = () => {
  return (
    <Carousel autoplay className=" py-3 px-[30px]">
      {hero_mock.map((value: HeroSliderType) => (
        <HeroItem key={value.id} {...value} />
      ))}
    </Carousel>
  );
};

export default CaruselComponent;
