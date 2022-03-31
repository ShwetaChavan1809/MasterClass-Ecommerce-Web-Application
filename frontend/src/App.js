import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import bootstrap from 'bootstrap'

import Dashboard from "./components/Dashboard/Dashboard.js"
import Checkout from "./components/Checkout/Checkout.js"
import Products from "./components/Products/Products.js"



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
