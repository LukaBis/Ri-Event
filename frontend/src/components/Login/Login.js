import React, { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Typography } from "@mui/material";
import CustomTextField from "../../styles/CustomTextField";
import useStyles from "../../styles/UseStyles";

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // if there is a cookie with laravel session that means we are logged in
    // and it should redirect to home page
    if (Cookies.get("laravel_session")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (isSubmitting) return; // Provjera stanja isSubmitting kako bi se spriječilo duplo slanje zahtjeva

    setIsSubmitting(true); // Postavljanje stanja isSubmitting na true prije slanja zahtjeva

    try {
      const response = await axios.get("http://localhost/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      await axios.post(
        "/login",
        {
          password: password,
          email: email,
        },
        {
          headers: {
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );

      navigate("/");
    } catch (error) {
      setError(true);
      setErrorMessage("Incorrect email or password.");
      console.error(error);
    } finally {
      setLoading(false);
      setIsSubmitting(false); // Postavljanje stanja isSubmitting na false nakon završetka zahtjeva
    }
  };

  return (
    <>
      <Navbar />

      <div className={classes.form}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          fontFamily="Roboto "
        >
          Login
        </Typography>
        <form>
          <CustomTextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            marginbottom={classes.textField}
            error={error}
          />
          <CustomTextField
            className={classes.textField}
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error}
            helperText={errorMessage}
          />
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting} // Onemogućavanje gumba ako je isSubmitting true
          >
            {loading ? <BeatLoader size={10} color={"#ffffff"} /> : "Log in"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
