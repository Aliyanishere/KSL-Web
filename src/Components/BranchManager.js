import { doc, setDoc, db, getAuth, createUserWithEmailAndPassword, } from "../Firebase";
import './../App.css';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const validationSchema = yup.object({
    name: yup
        .string()
        .required("Please enter this feild"),
    email: yup
        .string()
        .email("Please enter valid email")
        .required("Please enter this feild"),
    password: yup
        .string()
        .min(8, "Password must be 8 digits long")
        .required("Please enter this feild"),
    branch: yup
        .string()
        .required("Please enter this feild")
});



function Addmanager() {

    async function submit(values) {
        console.log("values", values)

        try {
            let auth = getAuth()
            let { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
            let dataRef = doc(db, 'Branch Manager', user.uid)

            await setDoc(dataRef, {
                name: values.name,
                email: user.email,
                password: values.password,
                branch: values.branch,
                uid: user.uid,
            });

            console.log("done")
        } catch (err) {
            console.log(err.message)
        }
    }

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            name: '',
            email: '',
            password: '',
            branch: ''
        },
        onSubmit: submit
    },
    );


    return (
        <>
            <Navbar bg="dark" expand="md" style={{ width: "100%", textAlign: "center" }}>
                <Container>
                    <Navbar.Brand className="nav-main">KSL</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <li >
                                <Link to="/admin" className="nav-itms">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/Branchmanager" className="nav-itms">Branch Manager</Link>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="webadmin">
                <div className="adminlogin">
                    <h2 ><i>Add Branch Manager</i></h2>
                    <Container>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                name="name"
                                label="name"
                                type="text"
                                className="box"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                variant="outlined"
                            />

                            <TextField
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

                            <TextField
                                name="password"
                                type="password"
                                label="password"
                                className="box"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                variant="outlined" />

                            <TextField
                                id="outlined-basic"
                                name="branch"
                                type="text"
                                label="branch location"
                                className="box"
                                value={formik.values.branch}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.branch && Boolean(formik.errors.branch)}
                                helperText={formik.touched.branch && formik.errors.branch}
                                variant="outlined" />

                            <Button id="btn" variant="contained" color="primary" type="submit">
                                Add Branch Manger
                            </Button>
                        </form>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Addmanager;