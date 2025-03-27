import React from "react";

export interface FieldType {
  email?: string;
  password?: string;
}
export interface RegisterType {
  name?: string;
  email?: string;
  password?: string;
  surname?: string;
}
export interface HeroSliderType {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  big_img_url: string;
  small_img_url: string;
  buttonText: string;
}
export interface useQueryTypes {
  pathname: string;
  url: string;
  params?: object;
}
export interface CategoryType {
  count: number;
  created_at: string;
  created_by: string;
  route_path: string;
  title: string;
  __v: number;
  _id: string;
}
export interface CardType {
  category: string;
  comments: string[];
  created_at: string;
  created_by: string;
  description: string;
  detailed_images: string[];
  discount: boolean;
  discount_price: string;
  main_image: string;
  price: number;
  rate: number;
  short_description: string;
  sold_times: number;
  tags: string[];
  title: string;
  views: number;
  __v: number;
  _id: string;
  count: number;
  user_price: number;
}

export interface CategoryType {
  count: number;
  created_at: string;
  created_by: string;
  route_path: string;
  title: string;
  __v: number;
  _id: string;
}

export interface TitleCategory {
  id: number;
  title: string;
  label: string;
}
export interface options {
  id: number;
  value: string;
  label: string;
}

export interface DataType {
  data?: CardType;
  isLoading: boolean;
  isError: boolean;
}
export interface CouponType {
  data: {
    code: string;
    discount_for: number;
    id: number;
    title: string;
  };
}

export interface Blogtype {
  content: string;
  created_at: string;
  created_by: string;
  reaction_length: number;
  short_description: string;
  title: string;
  views: number;
  __v: number;
  _id: string;
}
export interface MakeOrderType {
  name: string;
  surname: string;
  country: string;
  street: string;
  state: string;
  email: string;
  zip: string;
  appartment: string;
  town: string;
  phone_number: string;
  comment: string;
  payment_method: string;
}
export interface UserType {
  create_account_limit?: number;
  create_plant_limit?: number;
  create_post_limit?: number;
  created_at?: string;
  created_by?: string;
  email?: string;
  hashtags?: [];
  name?: string;
  order_list?: [];
  password?: string;
  profile_photo?: string;
  surname?: string;
  user_type?: string;
  username?: string;
  _id?: string;
  wishlist?: WishListItemType[];
  billing_address?: BillingAdres;
  followers?: string[];
  phone_number?: string;
  permission?: {
    create: boolean;
    update: boolean;
    delete: boolean;
    read: boolean;
  };
}
interface BillingAdres {
  country?: string;
  town?: string;
  street_address?: string;
  additional_street_address?: string;
  state?: string;
  zip?: string;
}

export interface WishListItemType {
  flower_id: string;
  route_path: string;
}

export interface OrderType {
  billing_address: BillingAdres;
  created_at: string;
  created_by: string;
  extra_shop_info: {
    total: number;
    method: string;
  };
  shop_list: CardType[];
  _id: string;
}

export interface UserTypeApi {
  data?: UserType;
  isLoading: boolean;
  isError: boolean;
}
export interface DataUserinfo {
  data?: Blogtype;
  isLoading: boolean;
  isError: boolean;
}
export interface PathProfileType {
  id: number;
  title: string;
  path: string;
  Component: React.FunctionComponent;
  Icon: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>;
}

export interface InputsType {
  name: string;
  username: string;
  phone_number: string;
  email: string;
  surname: string;
}
export interface user_bodyType {
  id: string;
  title: string;
  Component: React.FC;
}
