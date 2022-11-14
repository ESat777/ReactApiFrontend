import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Admin/AuthContext";

const AddCustomer = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    hotel_id: "",
  });
  // eslint-disable-next-line
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    fetch("http://127.0.0.1:8000/api/v1/customers", {
      method: "POST",
      headers: hs,
      body: JSON.stringify(data),
    }).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/customers");
          setStatus({ message: res.statusText });
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      },
      (err) => {
        setStatus(err);
      }
    );
  };

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/hotel")
      .then((res) => res.json())
      .then((result) => {
        setHotels(result);
        console.log(result);
      });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <legend className="text-center fw-bolder">Add Customer</legend>
            <label htmlFor="name" className="fs-5">
              Name:
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </label>
            <label htmlFor="surname" className="fs-5">
              Surname:
              <input
                name="surname"
                id="surname"
                type="text"
                className="form-control"
                onChange={(e) => setData({ ...data, surname: e.target.value })}
                required
              />
            </label>
            <label htmlFor="email" className="fs-5">
              Email:
              <input
                name="email"
                id="email"
                type="email"
                className="form-control"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </label>
            <label htmlFor="phone" className="fs-5">
              Phone:
              <input
                name="phone"
                id="phone"
                type="phone"
                className="form-control"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                required
              />
            </label>
            <label htmlFor="hotel_id" className="fs-5">
              Hotel
            </label>
            <select
              aria-label="Default select example"
              type="text"
              className="form-control"
              onChange={(e) => setData({ ...data, hotel_id: e.target.value })}
              required
            >
              <option value="0" required>
                Choose hotel
              </option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.hotel_title}
                </option>
              ))}
            </select>
            <button className="upaddbtn btn btn-info mt-4">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
