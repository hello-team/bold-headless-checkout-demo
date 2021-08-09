import React, { useState, useEffect } from "react";
import CheckoutLayout from './Checkout/Layout'
import CheckoutButton from './Checkout/CheckoutButton'
import BuyNowButton from './BuyNow/BuyNowButton'
export default function App(props) {
  const [flow, setFlow] = useState(null)
  const handleFlow = (name) => {
    setFlow(name)
    console.log({flow: name})
  }
  return (
    <div className="App">
        <div style={{display: flow === 'buynow' ? 'none' : ''}}>
          <CheckoutButton feed={props} handleFlow={(e) => handleFlow(e)} />
        </div>
        {/* <div style={{display: flow === 'checkout' ? 'none' : ''}}>
        <BuyNowButton feed={props}  handleFlow={(e) => handleFlow(e)} />
        </div> */}
    </div>
  );
}

