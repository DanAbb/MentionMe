import { useState } from "react";

import "./App.css";

const App = () => {
  const [orders, setOrders] = useState<any>([]);

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [shipped, setShipped] = useState(false);

  const pendingShipment = () => {
    var c = 0;
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].shipped) c++;
    }
    return c;
  };

  const getItems = () => {
    var r = [];

    for (var i = 0; i < orders.length; i++) {
      let index = i;

      r.push(
        <tr key={index}>
          <td>{index}</td>
          <td>{orders[index].amount}</td>
          <td>{orders[index].shipped ? "Yes" : "No"}</td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                setOrders(orders[index].filter((value, id) => index !== id));
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }

    return r;
  };

  return (
    <div className="container mt-3">
      <form>
        <div className="mb-3">
          <label className="form-label">Order Date</label>
          <input
            className="form-control"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <label className="form-label">Order Amount</label>
          <input
            type="amount"
            className="form-control"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="shipped"
            checked={shipped}
            onChange={(event) => setShipped(event.target.checked)}
          />
          <label className="form-check-label">Shipped?</label>
        </div>
        <button
          type="button"
          onClick={(event) => {
            setOrders([
              ...orders,
              {
                date,
                amount,
                shipped,
              },
            ]);

            setAmount("");
            setShipped(false);
            setDate("");
          }}
          className="btn btn-primary"
        >
          Add order
        </button>
      </form>
      <h3 className="mt-3">Oders {pendingShipment()} awaiting shipment</h3>
      <table className="table table-striped mt-3">
        <thead>
          <th>ID</th>
          <th>Amount</th>
          <th>Shipped</th>
          <th>Actions</th>
        </thead>
        <tbody>{getItems()}</tbody>
      </table>
    </div>
  );
};

export default App;
