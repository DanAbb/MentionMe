import DatePicker from "react-datepicker";
import { IOrder } from "../types";
import { nanoid } from "nanoid";
import { useState } from "react";

interface IOwnProps {
  setOrders: React.Dispatch<any>;
  orders: any;
}

export const OrderForm: React.FC<IOwnProps> = ({ setOrders, orders }) => {
  const newOrder: IOrder = {
    id: nanoid(),
    date: new Date(),
    amount: "",
    shipped: false,
  };

  const [order, setOrder] = useState<IOrder>({ ...newOrder });

  const submitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOrders([...orders, order]);
    setOrder({ ...newOrder });
  };

  return (
    <form data-testid="order-form" onSubmit={(e) => submitOrder(e)}>
      <div className="mb-3">
        <label htmlFor="datepicker" className="form-label">
          Order Date
        </label>
        <DatePicker
          data-testid="date-picker"
          id="datepicker"
          selected={order.date}
          onChange={(date: Date) => setOrder({ ...order, date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="amount-input" className="form-label">
          Order Amount
        </label>
        <input
          data-testid="amount-input"
          id="amount-input"
          type="number"
          className="form-control"
          value={order.amount}
          onChange={(event) =>
            setOrder({ ...order, amount: event.target.value })
          }
        />
      </div>
      <div className="mb-3 form-check">
        <input
          data-testid="shipped-input"
          id="shipped-input"
          type="checkbox"
          className="form-check-input"
          name="shipped"
          checked={order.shipped}
          onChange={(event) =>
            setOrder({ ...order, shipped: event.target.checked })
          }
        />
        <label htmlFor="shipped-input" className="form-check-label">
          Shipped?
        </label>
      </div>
      <button
        data-testid="submit-button"
        type="submit"
        className="btn btn-primary"
      >
        Add order
      </button>
    </form>
  );
};

export default OrderForm;
