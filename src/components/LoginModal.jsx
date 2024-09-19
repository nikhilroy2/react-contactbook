import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoginNow } from "../redux/slice/loginSlice";
function LoginModal(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, SetPassword] = useState("");

  const handleLoginModal = async (event) => {
    event.preventDefault();
    const payload = {
      username,
      password,
    };

    try {
      const response = await fetch(
        "https://django-nikhil-api.vercel.app/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Send cookies with request if needed
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        localStorage.setItem("token", data.access); // Store the token in localStorage

        // ui update
        document.querySelector('#loginModal .btn-close').click() // close modal
        // Success alert
        alert("Login successful!");
        dispatch(isLoginNow(true)); // login success in redux store
      } else {
        const errorData = await response.json();
        // Handle different response status codes
        if (response.status === 401) {
          alert("Invalid username or password. Please try again.");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      alert("An error occurred. Please try again later.");
      console.error("Login error: ", error);
    }
  };


  function refreshTokenFunc() {
    const refreshToken = localStorage.getItem("refresh_token");

    axios
      .post("http://your-django-api-url/api/token/refresh", {
        refresh: refreshToken,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.access);
      })
      .catch((error) => {
        // Handle error (e.g., redirect to login)
      });
  }

  return (
    <div
      className="modal fade"
      data-mdb-backdrop="static"
      data-mdb-keyboard="true"
      id="loginModal"
    >
      <div className="modal-dialog">
        <form action="" onSubmit={handleLoginModal} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-black" id="exampleModalLabel">
              Please Login
            </h5>
            <button
              type="button"
              className="btn-close"
              data-mdb-ripple-init
              data-mdb-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="form-group mb-2">
              <label htmlFor="" className="form-label text-black fw-bold">
                Username:
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                name="username"
                className="form-control border"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="" className="form-label text-black fw-bold">
                Password:
              </label>
              <input
                onChange={(e) => SetPassword(e.target.value)}
                type="password"
                name="password"
                className="form-control border"
              />
            </div>
            <div className="form-group mb-2">
              <div className="text-center">
                <button className="btn btn-primary" type="submit">
                  <span className="text-capitalize fs-6">Login</span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <div className="text-center">
                <p>Not have Account?</p>
                <button className="btn btn-muted text-primary shadow-0">
                  <span className="text-capitalize fs-6">Create Account</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
