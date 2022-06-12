import { IOrder } from "../types";
import format from "date-fns/format";

interface IOwnProps {
  orders: IOrder[];
  deleteOrder: (id: string) => void;
  shipOrder: (id: string) => void;
}

export const OrdersTable: React.FC<IOwnProps> = ({
  orders,
  deleteOrder,
  shipOrder,
}) => {
  return (
    <table
      className="table table-striped mt-3"
      style={{ verticalAlign: "middle" }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Shipped</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td data-testid="table-cell-id">{order.id}</td>
            <td data-testid="table-cell-date">
              {format(order.date, "dd/MM/yyyy")}
            </td>
            <td data-testid="table-cell-amount">{order.amount}</td>
            <td data-testid="table-cell-shipped">
              {order.shipped ? "Yes" : "No"}
            </td>
            <td style={{ width: "200px" }}>
              <button
                data-testid="delete-order-button"
                className="btn btn-sm btn-danger me-1"
                onClick={() => deleteOrder(order.id)}
              >
                Delete
              </button>
              {!order.shipped && (
                <button
                  data-testid="ship-order-button"
                  className="btn btn-sm btn-success"
                  onClick={() => shipOrder(order.id)}
                >
                  Ship
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
