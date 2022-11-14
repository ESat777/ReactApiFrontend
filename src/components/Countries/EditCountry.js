import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Admin/AuthContext";

function EditCountry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [season_weather, setSeason_weather] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/v1/country/` + id)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setSeason_weather(result.season_weather);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      id: id,
      title: title,
      season_weather: season_weather,
    };
    fetch(`http://localhost:8000/api/v1/country/${id}`, {
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
        navigate("/countries");
      });
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <legend className="text-center fw-bolder">Update section</legend>
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <label className="fs-5">Title</label>
            <input
              value={title}
              key={id}
              className="form-control"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />{" "}
            <br />
            <label className="fs-5">Season weather</label>
            <input
              value={season_weather}
              key={id}
              className="form-control"
              onChange={(e) => {
                setSeason_weather(e.target.value);
              }}
            />{" "}
            <br />
            <button type="submit" className="upaddbtn btn btn-info mt-4">
              Update Country
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditCountry;
