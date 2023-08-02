import React from 'react'
import "./RegisterPage.css"
import { FormControl,TextField,Button } from '@mui/material'

function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form">
          <h1>Sign Up</h1>
        <FormControl fullWidth>
        <TextField id="filled-basic" label="Name" variant="filled" required/>
        <TextField id="filled-basic" label="Phone" variant="filled" type="number" required/>
        <TextField id="filled-basic" label="Email" variant="filled" type="email" required/>
        <TextField id="filled-basic" label="User Name" variant="filled" required/>
        <TextField id="filled-basic" label="Password" variant="filled" type="password" required/>
        <Button
              variant="contained"
              sx={{ marginTop: "20px", width: "100%" }}
              type="submit"
            >
              Sign Up
            </Button>
      
        </FormControl>
        </div>
        
   
       </div>
      
    </div>
  )
}

export default RegisterPage
