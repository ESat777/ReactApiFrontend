import "../components.css";
import React, { useState, useEffect } from "react";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotels, setHotels] = useState([]);

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="container bg-info ">
          <table className="table table-striped mt-4">
            <thead>
              <tr className="fs-4">
                <th>Hotel</th>
                <th>Country</th>
                <th>Days</th>
                <th>Price EUR</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.hotel_title}</td>
                  <td>{hotel.country?.title}</td>
                  <td>{hotel.days}</td>
                  <td type="price">{hotel.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="bg-light text-center text-lg-start container-fluid b-0 p-0 fixed-bottom">
          <div className="text-center text-white p-3 bg-primary">
            © 2022 Copyright
            <a className="text-white" style={{ textDecoration: "none" }}>
              EDISON
            </a>
          </div>
        </footer>
      </>
    );
  }
}

export default Home;
