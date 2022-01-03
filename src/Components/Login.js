import './../App.css';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Container } from '@mui/material';


const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter this feild"),
  password: yup
    .string()
    .min(6, "Password must be 6 digits long")
    .required("Please enter this feild")
});


function Login() {

  let history = useHistory();

  async function submit(values) {
    console.log("values", values)

    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log("user loginned")
        history.push("/admin")
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submit
  },
  );


  return (
    <>
      <Container>
        <div className="webadmin">
          <h1>KSL ADMIN LOGIN</h1>
          <br />
          <div className="adminlogin">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="outlined-basic"
                name="email"
                type="email"
                label="email"
                className="box"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
              />
              <br />
              <br />

              <TextField
                fullWidth
                id="outlined-basic"
                name="password"
                type="password"
                label="password"
                className="box"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
              />
              <br />
              <br />
              <Button id="btn" variant="contained" fullWidth color="primary" type="submit">
                submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Login;