import React from "react";
import { useRef, useState } from "react";
import "./LoginPage.css";
import { errorAlert, successAlert } from "../../utility/alert";
import { TextField, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

function LoginPage() {
  const [redirect, setRedirect] = useState(false);
  const username = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameVal = username.current.value;
    const passwordVal = password.current.value;

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameVal,
          password: passwordVal,
        }),
        credentials: "include",
      }
    );

    const data = await response.json();
    if (response.ok) {
      successAlert(data.success, "success");
      setRedirect(true);
    } else {
      errorAlert(data.error, "error");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="username"
              label="User Name"
              variant="outlined"
              autoComplete="true"
              inputRef={username}
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="true"
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
              LOGIN
            </Button>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              Don't have an account ? {""}
              <Link to="/register" className="login-link">
                <span style={{ textDecoration: "underline" }}>SIGN UP</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
