import React, { useState } from "react";
import "./RegisterPage.css";
import { useRef } from "react";
import { errorAlert, successAlert } from "../../utility/alert";
import { TextField, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

function RegisterPage() {
  const [redirect, setRedirect] = useState(false);
  const name = useRef();
  const phone = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameVal = name.current.value;
    const phoneVal = Number(phone.current.value);
    const emailVal = email.current.value;
    const usernameVal = username.current.value;
    const passwordVal = password.current.value;

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameVal,
          phone: phoneVal,
          email: emailVal,
          username: usernameVal,
          password: passwordVal,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      successAlert("User Registered Successfully", "success");
      setRedirect(true);
    } else {
      errorAlert(data.error, "error");
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form">
          <h1>SIGN UP</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
              autoComplete="off"
              inputRef={name}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              autoComplete="off"
              inputRef={email}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="phone"
              label="Phone"
              variant="outlined"
              type="number"
              autoComplete="off"
              inputRef={phone}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="username"
              label="User Name"
              variant="outlined"
              autoComplete="off"
              inputRef={username}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="off"
              inputRef={password}
            />
            <Button
              variant="contained"
              sx={{
                marginTop: "10px",
                width: "100%",
                backgroundColor: "var(--primary-color)",
                color: "var(--ternary-color)",
                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              type="submit"
            >
              SIGN UP
            </Button>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              Already have an account ? {""}
              <Link to="/login" className="login-link">
                <span style={{ textDecoration: "underline" }}>LOGIN</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
