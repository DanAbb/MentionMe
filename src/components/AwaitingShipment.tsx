import { useEffect, useState } from "react";

import { IOrder } from "../types";

interface IOwnProps {
  orders: IOrder[];
}

export const PendingShipment: React.FC<IOwnProps> = ({ orders }) => {
  const [awaitingShipment, setAwaitingShipment] = useState<number>(0);

  useEffect(() => {
    const awaiting = orders.reduce((acc: number, current: IOrder) => {
      if (current.shipped) {
        return acc;
      }

      return acc + 1;
    }, 0);

    setAwaitingShipment(awaiting);
  }, [orders]);

  return (
    <h2 className="mt-3" data-testid="awaiting-shipment-text">
      {awaitingShipment} order{awaitingShipment !== 1 ? "s" : ""} awaiting
      shipment
    </h2>
  );
};

export default PendingShipment;
