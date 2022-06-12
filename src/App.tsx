import "./App.css";

import AwaitingShipment from "./components/AwaitingShipment";
import { IOrder } from "./types";
import OrderForm from "./components/OrderForm";
import OrdersTable from "./components/OrdersTable";
import { useState } from "react";

const App = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const deleteOrder = (id: string): void => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const shipOrder = (id: string): void => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          order.shipped = true;
        }

        return order;
      })
    );
  };

  return (
    <main className="container mt-3">
      <h1>Ordering System</h1>
      <OrderForm setOrders={setOrders} orders={orders} />
      {orders.length ? (
        <>
          <AwaitingShipment orders={orders} />
          <OrdersTable
            orders={orders}
            deleteOrder={deleteOrder}
            shipOrder={shipOrder}
          />
        </>
      ) : null}
    </main>
  );
};

export default App;
