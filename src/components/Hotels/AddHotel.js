import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Admin/AuthContext";

const AddTown = () => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({
    town_title: "",
    days: "",
    price: "",
    country_id: "",
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
    fetch("http://127.0.0.1:8000/api/v1/hotel", {
      method: "POST",
      headers: hs,
      body: JSON.stringify(data),
    }).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/hotels");
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
  const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/country")
      .then((res) => res.json())
      .then((result) => {
        setCountry(result);
        console.log(result);
      });
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <legend className="text-center fw-bolder">Add Hotel</legend>
            <label htmlFor="country_id" className="fs-5">
              Country
            </label>
            <select
              className="form-control"
              onChange={(e) => setData({ ...data, country_id: e.target.value })}
            >
              <option value="0">Choose hotel</option>
              {country.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.title}
                </option>
              ))}
            </select>

            <label htmlFor="town_title" className="fs-5">
              Title:
              <input
                name="hotel_title"
                id="hotel_title"
                type="text"
                className="form-control"
                onChange={(e) =>
                  setData({ ...data, hotel_title: e.target.value })
                }
                required
              />
            </label>
            <label htmlFor="days" className="fs-5">
              Days:
              <input
                name="days"
                id="days"
                type="number"
                className="form-control"
                onChange={(e) => setData({ ...data, days: e.target.value })}
                required
              />
            </label>
            <label htmlFor="price" className="fs-5">
              Price EUR:
              <input
                name="price"
                id="price"
                type="number"
                className="form-control"
                onChange={(e) => setData({ ...data, price: e.target.value })}
                required
              />
            </label>
            <button className="upaddbtn btn btn-info mt-4"> Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTown;
