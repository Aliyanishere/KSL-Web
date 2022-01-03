import { collection, query, onSnapshot, db } from "../Firebase";
import './../App.css';
import React, { useEffect, useState } from 'react';
import { Card, Button } from "react-bootstrap";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Dashboard() {

  const [data, setData] = useState([])

  useEffect(() => {
    const q = query(collection(db, "Rashan"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      let temp = [];
      snapshot.forEach((doc) => {
        let data = doc.data();

        temp.unshift({
          name: data.name,
          fname: data.fname,
          email: data.email,
          dob: data.dob,
          fmember: data.fmember,
          income: data.income,
          selectedValue: data.selectedValue,
        });
      })
      setData(temp)
    });

    return () => {
      unsubscribe()
      console.log("unsub")
    };
  }, []);


  return (
    <>
      <Navbar bg="dark" expand="md" style={{ width: "100%", textAlign: "center"}}>
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

      <div className="container requestcards">
        <h1 id="title">Applications for Kahana</h1>
        <div className="cards">
          {data.map((eachUser, i) => {
            return (<div key={i}>
              <Card style={{ width: '18rem', margin: "15px 30px" }}>
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bold", textAlign: "center", color: "rgb(93,183,67)" }}>Application</Card.Title>
                  <br />
                  <Card.Text>
                    Name: {eachUser.name}
                  </Card.Text>
                  <Card.Text>
                    Fname: {eachUser.fname}
                  </Card.Text>
                  <Card.Text>
                    CNIC: {eachUser.email}
                  </Card.Text>
                  <Card.Text>
                    DOB: {eachUser.dob}
                  </Card.Text>
                  <Card.Text>
                    Family members: {eachUser.fmember}
                  </Card.Text>
                  <Card.Text>
                    Monthly income: {eachUser.income}
                  </Card.Text>
                  <Card.Text>
                    Ration type: {eachUser.selectedValue}
                  </Card.Text>

                  <div className="buttons">
                    <Button variant="success" className="btn">Accept</Button>
                    <Button variant="success" className="btn">Reject</Button>
                  </div>
                </Card.Body>
              </Card>
              <br />
            </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Dashboard;