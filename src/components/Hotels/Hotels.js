import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Admin/AuthContext";

function Towns() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    getHotels();
  }, []);
  function getHotels() {
    fetch("http://127.0.0.1:8000/api/v1/hotel")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result); // <--- check this out in the console
          setHotels(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }

  function deleteHotel(id) {
    fetch("http://127.0.0.1:8000/api/v1/hotel/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 204) {
        const remaining = hotels.filter((p) => id !== p.id);
        setHotels(remaining);
        alert("Deleted successful.");
      } else {
        alert(
          "Delete not successful, because this town has asigned customers. Please delete customers first."
        );
      }
    });
  }

  const editHotel = (id) => {
    navigate("/editHotel/" + id);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="d-flex justify-content-end">
          <button className="btn btn-info addbtn m-4 ">
            <Link
              className="link text-light"
              style={{ textDecoration: "none" }}
              to="/addHotel"
            >
              Add Hotel
            </Link>
          </button>
        </div>
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr className="fs-4">
                <th>Hotel ID</th>
                <th>Hotel</th>
                <th>Country</th>
                <th>Days</th>
                <th>Price EUR</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.id}</td>
                  <td>{hotel.hotel_title}</td>
                  <td>{hotel.country?.title}</td>
                  <td>{hotel.days}</td>
                  <td>{hotel.price}</td>

                  <td>
                    <button
                      onClick={() => deleteHotel(hotel.id)}
                      className="btn btn-danger m-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editHotel(hotel.id)}
                      className="btn btn-warning m-1 "
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Towns;
