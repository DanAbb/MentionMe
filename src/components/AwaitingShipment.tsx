import { useEffect, useState } from "react";

import { IOrder } from "../types";

interface IOwnProps {
  orders: IOrder[];
}

export const AwaitingShipment: React.FC<IOwnProps> = ({ orders }) => {
  const [awaitingShipment, setAwaitingShipment] = useState<number>(0);

  useEffect(() => {
    setAwaitingShipment(
      orders.reduce((acc: number, current: IOrder) => {
        if (current.shipped) {
          return acc;
        }

        return acc + 1;
      }, 0)
    );
  }, [orders]);

  return (
    <h2 className="mt-3" data-testid="awaiting-shipment-text">
      {awaitingShipment} order{awaitingShipment !== 1 ? "s" : ""} awaiting
      shipment
    </h2>
  );
};

export default AwaitingShipment;
