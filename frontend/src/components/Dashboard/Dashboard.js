import React, { useEffect,useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./Dashboard.css";
import axios from 'axios';



function Dashboard() {

  const [userID,setUserID]= useState("");
  const [btnState, setbtnState] = useState(true);

//   const buttonHandler = () => {
//     setCondition(true);
// };


  const handleCreateID=(e)=>
  {
    let data={
      user_id:userID
    }

    sessionStorage.setItem("userId", userID)
    console.log("GOT DATA",data)
    axios.post("http://localhost:3001/createCart",data).then((response) => {
    console.log('Got response data', response);
    console.log("STATUS",response.status)

    if(response.data.message=="User Id already exists.")
    {
       
        setbtnState(true)
        //alert("User cart already exists!Proceed to add to cart");
    }
    else
    {
      setbtnState(false)
      alert("User cart created!");
    }
  });
  }
  return (
    <div>
      <Navigation></Navigation>
      <div className="container-fluid page container-checkout">
        <div className="container">
          <div className="row input-checkout">
            <div className="col-sm-3">
              <label
                for="exampleFormControlInput1"
                class="form-label label-checkout"
              >
                Enter user id
              </label>
            </div>
            <div class="col-sm-7">
              <input
                type="input"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e)=>
                {
                  console.log("USER ID",e.target.value)
                  setUserID(e.target.value)
                }}
              />
            </div>
            <div class="col-sm-2">
              {/* <button type="button" class="btn btn-primary">
                Submit
              </button> */}
            </div>
            <div></div>
          </div>
          <div className="row buttons-checkout">
              <div className="col-sm-3"><button type="button" class="btn btn-primary" onClick={(e)=>{
        handleCreateID(e);
    }}>Create</button></div>
              <div className="col-sm-6"><button type="button" disabled = {btnState} class="btn btn-primary" >Add To Cart</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
