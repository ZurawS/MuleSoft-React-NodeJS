import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar
      className=" sticky-top w-100 d-flex justify-content-between"
      bg="dark"
      variant="dark"
      style={{ height: "65px" }}
    >
      <Navbar.Brand href="/" style={{ margin: "20px" }}>
        <h1 style={{ fontSize: "36px", opacity: "700" }}>SweetTooth</h1>
      </Navbar.Brand>
      <Nav style={{ margin: "20px", fontSize: "22px" }}>
        <Nav.Link href="/addCourse">Add Course</Nav.Link>
      </Nav>
    </Navbar>
  );
}
