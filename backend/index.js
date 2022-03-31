const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = mysql.createPool({
  host: "masterclassecommercedb.cg3qlih9hbah.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "adminpassword",
  database: "MasterClassDB",
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

app.post("/createCart", (req, res) => {
  const userid = req.body.user_id;
  console.log("body: ", req.body);
  console.log(userid);

  db.query("INSERT into Cart (user_id) VALUES (?)", [userid], (err, result) => {
    console.log(err);
    if (err) {
      res.send({ message: "User Id already exists." });
    } else {
      res.send(result);
    }
  });
});

app.get("/getCartId/:user_id", (req, res)=> {
  const user_id = req.params.user_id;
  db.query("select id from Cart where user_id = ?",[user_id], (err, result)=>{
    console.log(result);
    res.send(result);
  })
})

app.post("/addToCart", (req, res) => {
  const cartid = req.body.cart_id;
  const productid = req.body.product_id;
  console.log("body: ", req.body);
  console.log(cartid);
  console.log(productid);

  db.query(
    "INSERT into CartProduct (product_id, cart_id ) VALUES (?,?)",
    [productid, cartid],
    (err, result) => {
      console.log(err);
      if (err) {
        res.send({ message: "Product not added to the cart" });
      } else {
        res.send(result);
        //res.send({ message: "Product added to the cart" });
      }
    }
  );
});

app.get("/getProducts", (req, res) => {
  db.query("SELECT * FROM Product ", (err, result) => {
    console.log(err);
    if (err) {
      res.send({ message: "Products cannot be displayed" });
    } else {
      res.send(result);
      //  res.send({message : "Products displayed"});
    }
  });
});

app.get("/getCheckOutList/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  db.query(
    "SELECT A.name, A.amount FROM ((MasterClassDB.Product AS A LEFT JOIN MasterClassDB.CartProduct AS B ON A.id = B.product_id) LEFT JOIN MasterClassDB.Cart AS C ON B.cart_id = C.id) WHERE C.user_id = ?  ",
    [user_id],
    (err, result) => {
      console.log(err);
      if (err) {
        res.send({ message: "Cart Products cannot be displayed" });
      } else {
        res.send(result);
        //  res.send({message : "Cart Products displayed"});
        console.log(result);
      }
    }
  );
});

app.post("/postCardDetails", (req, res) => {
  console.log(req.body.card_number);
  let cartId = req.body.cart_id;
  

  db.query("Delete from CartProduct where cart_id = ?",[cartId], (err, result)=>{
    if(!err){
      res.send(true);
    }
    else{
      res.send(false);
    }
    
  })
 
});


