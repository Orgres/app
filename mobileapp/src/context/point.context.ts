import { createContext } from "react";

export type Point = {
    name: string,
    guid: string
} | undefined;

export type PointContext = {
    point: Point,
    setPoint: (point: Point) => void,
}

const pointContext = createContext<PointContext | undefined>(undefined);

export { pointContext }
