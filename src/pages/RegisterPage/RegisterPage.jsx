import React from "react";
import "./RegisterPage.css";
import { useRef } from "react";
import { errorAlert } from "../../utility/alert";
import { TextField, Button } from "@mui/material";

function RegisterPage() {
  const name = useRef();
  const phone = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();

    const nameVal = name.current.value;
    const phoneVal = Number(phone.current.value);
    const emailVal = email.current.value;
    const usernameVal = username.current.value;
    const passwordVal = password.current.value;

    const emailFormat=(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const usernameFormat=(/^[A-Za-z][A-Za-z0-9_]{1,29}$/);
    const passwordFormat=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;

    if (nameVal.length < 2 || nameVal.length > 50) {
      errorAlert("Invalid Name");
      return;
    }
    if (phoneVal < 1000000000) {
      errorAlert("Invalid Phone Number");
      return;
    }
    if (!emailFormat.test(emailVal)){
      errorAlert("Invalid Email Address");
      return;
    }
    if(!usernameFormat.test(usernameVal)){
      errorAlert("Invalid User-Name");
      return;
    }
    if(!passwordFormat.test(passwordVal)){
      errorAlert("Password requires: 1 number, 1 uppercase, 1 lowercase, 1 special, 6+ characters");
      return;

    }
  };
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} >
            <TextField
            sx={{ marginBottom: "10px" }}
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              inputRef={name}
              required
            />
            <TextField
             sx={{ marginBottom: "10px" }}
              fullWidth
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              type="number"
              inputRef={phone}
              required
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              inputRef={email}
              required
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              inputRef={username}
              required
            />
            <TextField
              sx={{ marginBottom: "10px" }}
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              inputRef={password}
              required
            />
            <Button
              variant="contained"
              sx={{ marginTop: "20px", width: "100%" , backgroundColor: "var(--primary-color)",
              color: "var(--ternary-color)",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
              },}}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
