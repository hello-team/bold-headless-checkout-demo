import React, { useState, useEffect } from "react";
import CheckoutLayout from './Checkout/Layout'
import CheckoutButton from './Checkout/CheckoutButton'
import BuyNowButton from './BuyNow/BuyNowButton'
export default function Flow(props) {
  const [flow, setFlow] = useState(null)
  const handleFlow = (name) => {
    setFlow(name)
  }
  return (
    <div className="App">
        <div>
          <CheckoutButton feed={props} handleFlow={(e) => handleFlow(e)} flow={flow}/>
          <BuyNowButton feed={props}  handleFlow={(e) => handleFlow(e)} flow={flow}/>
        </div>
    </div>
  );
}

