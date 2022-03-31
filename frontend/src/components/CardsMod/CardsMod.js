import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CardsMod.css";





function CardsMod(props) {

  let path = "../resources"
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top"  />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            {props.name}
          </Card.Text>
          {/* &nbsp;
          <Button variant="primary">+</Button>
          &nbsp;
          <Button variant="primary">-</Button> */}
         
          <label
            for="exampleFormControlInput1"
            class="form-label label-checkout"
          >
            {props.amount}
          </label>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardsMod;
