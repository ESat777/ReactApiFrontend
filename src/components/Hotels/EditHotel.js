import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Admin/AuthContext";

function EditHotel() {
  const navigate = useNavigate();

  const [hotel_title, setHotel_title] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [country_id, setCountry_id] = useState("");
  const { id } = useParams();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/hotel/` + id)
      .then((res) => res.json())
      .then((result) => {
        setHotel_title(result.hotel_title);
        setDays(result.days);
        setPrice(result.price);
        setCountry_id(result.country_id);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      id: id,
      hotel_title: hotel_title,
      days: days,
      price: price,
      country_id: country_id,
    };
    fetch(`http://localhost:8000/api/v1/hotel/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        navigate("/hotels");
      });
    });
  };

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);
  function getCountries() {
    fetch("http://127.0.0.1:8000/api/v1/country")
      .then((res) => res.json())
      .then((result) => {
        setCountries(result);
      });
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <legend className="text-center fw-bolder">Update section</legend>
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="form-group d-grid gap-2">
              <label className="form-label fs-5 mb-0">Hotel</label>
              <input
                className="form-control"
                type="text"
                value={hotel_title}
                onChange={(e) => {
                  setHotel_title(e.target.value);
                }}
              />
              <label className="fs-5">Country</label>
              <select
                className="form-control"
                value={country_id}
                onChange={(e) => setCountry_id(e.target.value)}
              >
                <option value="0" required>
                  Choose country
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.title}
                  </option>
                ))}
              </select>
              <label className="fs-5">Days</label>
              <input
                className="form-control"
                type="text"
                value={days}
                onChange={(e) => {
                  setDays(e.target.value);
                }}
              />
              <label className="fs-5">Price</label>
              <input
                className="form-control"
                type="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <button type="submit" className="upaddbtn btn btn-info mt-4">
                Update info
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditHotel;
