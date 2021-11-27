import { useState } from "react";

import { Point, PointContext } from '../'

const useProvidePoint = (): PointContext => {
    const _point = localStorage.getItem('point');

    const [point, setPoint] = useState<Point>(_point ? JSON.parse(_point) : undefined);

    const setNewPoint = (pointPath: Point) => {
        localStorage.setItem('point', JSON.stringify(pointPath));
        setPoint(pointPath);
    };

    return {
        point,
        setPoint: setNewPoint
    };
}

export { useProvidePoint }
