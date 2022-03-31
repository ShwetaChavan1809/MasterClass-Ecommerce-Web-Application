import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import CardsMod from "../CardsMod/CardsMod";
import "./Checkout.css";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"



function Checkout() {
  const [checkoutList, setCheckoutList] = useState([]);
  const [total, setTotal] = useState(0);
  const [cardNum, setCardNum] = useState(0);
  const [message, setMessage] = useState(false);

  const getCartId = () =>{

    let userId = sessionStorage.getItem("userId")

    return new Promise((resolve, reject)=> {

      Axios.get("http://localhost:3001/getCartId/"+userId).then((response)=>{
        resolve(response.data[0].id)
      })

    })
  }

  let checkout = async (cardNumber) => {

    let cartId = await getCartId()



    return new Promise((resolve, reject)=>{
      Axios.post(
        "http://localhost:3001/" + "postCardDetails",
        {
          cardNumber: cardNumber,
          cart_id: cartId
        }).then((response)=>{
          setMessage(response.data);
          getProducts().then((res) => {
            console.log(res);
            setCheckoutList(res);
            let total = 0;
      
            res.forEach((element) => {
              total += element.amount;
            });
      
            setTotal(total);
          });
        })       
    })
  }

  let getProducts = () => {
    let user_id = sessionStorage.getItem("userId");
    return new Promise((resolve, reject) => {
      Axios.get("http://localhost:3001/getCheckOutList/"+user_id).then(
        (response) => {
          resolve(response.data);
        }
      );
    });
  };

  useEffect(() => {
    console.log("page loaded");

    getProducts().then((res) => {
      console.log(res);
      setCheckoutList(res);
      let total = 0;

      res.forEach((element) => {
        total += element.amount;
      });

      setTotal(total);
    });
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <div className="container-fluid container-products">
        <div className="row">
          <p class="checkout-header">Receipt</p>
          {checkoutList.map((a) => (
            <div class="col-sm-3 checkout-div">
              <p className="checkout-items">
                {a.name} ......................................... {a.amount}$
              </p>
            </div>
          ))}
          <p>---------------------------------------------</p>
          <p>Total: {total}$</p>

          
          <Form.Group className="mb-3 checkout-form" controlId="formBasicEmail">
            
            <Form.Control type="input" placeholder="Card Number" className="checkout-input" onChange={(e)=>
                {
                  console.log("Card Num",e.target.value)
                  // setCardNum(e.target.value)
                }} />
          
            <Button variant="primary" onClick = {()=>{
              checkout(cardNum);
            }} className="checkout-button">Checkout</Button>{' '}
           
          </Form.Group>

            {message && <Alert variant="success checkout-alert">
              Succesfully made payment
            </Alert>}
          
        </div>
      </div>
    </div>
  );
}

export default Checkout;
