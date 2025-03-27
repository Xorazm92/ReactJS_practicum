import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { DispatchType, Rootstore } from "../../redux/store";

export const useReduxSelector: TypedUseSelectorHook<Rootstore> = useSelector;
export const useReduxDispatch = () => useDispatch<DispatchType>();
