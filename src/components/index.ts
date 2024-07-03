import { lazy } from "react";

export { default as Items } from "./item/item";
export { default as Input } from "./input/input";
export { default as Button } from "./button/button";
export { default as Container } from "./container/container";

export const Modal = lazy(() => import("./modal/modal"))
