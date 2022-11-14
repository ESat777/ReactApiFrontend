import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const url = "http://127.0.0.1:8000/";
  const hs = { Accept: "application/json", "Content-Type": "application/json" };
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    fetch(url + "api/v1/login", {
      method: "POST",
      headers: hs,
      body: JSON.stringify(creds),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 422) return setErr({ message: res.statusText });
        else if (res.status === 401) {
          return setErr({ message: "Bad credentials" });
        }
      })
      .then((res) => {
        auth.login(res.user, res.token);
        navigate("/");
      });
  };
  return (
    <div className="mx-auto  my-5 col-6 d-flex aligns-items-center justify-content-center">
      <div className="card w-50">
        <div className="card-header text-center fw-bolder bg-info fs-4">
          Login
        </div>
        <div className="card-body">
          {err !== null && <div className="text-danger">{err.message}</div>}
          <form onSubmit={(e) => login(e)}>
            <div className="my-2 text-danger"></div>
            <div className="form-group d-grid gap-2">
              <label className="form-label mt-2 mb-0 fs-5">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              />
              <label className="form-label mt-2 mb-0 fs-5">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
              />
              <input
                className="btn btn-info mt-4"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
