import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Admin/AuthContext";

function Customers() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomer] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/customers")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result); // <--- check this out in the console
          setCustomer(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  function deleteCustomer(id) {
    fetch("http://localhost:8000/api/v1/customers/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    }).then((response) => {
      // console.log(response);
      if (response.status === 204) {
        const remaining = customers.filter((p) => id !== p.id);
        setCustomer(remaining);
        alert("Deleted successful.");
      }
    });
  }
  const editCustomer = (id) => {
    window.location = "/editCustomer/" + id;
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
              to="/addCustomer"
            >
              Add Customer
            </Link>
          </button>
        </div>
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr className="fs-4">
                <th>Customer ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Chosen hotel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.surname}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.hotel?.hotel_title}</td>
                  <td>
                    <button
                      onClick={(e) => deleteCustomer(customer.id, e)}
                      className="btn btn-danger m-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editCustomer(customer.id)}
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

export default Customers;
