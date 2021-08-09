import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CheckoutLayout from './Layout'
import cart from '../cart.json'
import { createCart, startCheckout} from './CheckoutApi'

export default function CheckoutButton(props) {
const [checkoutData, setCheckoutData] = useState(null)
const [customerLoggedIn, setLoggedInCustomer] = useState(false)
const handleBuyNow = async () => {
    const {
        jwt_token, public_order_id, application_state, initial_data, store_identifier,
      }  = await createCart(cart)
    console.log(JSON.parse(application_state))



    let items = application_state ? JSON.parse(application_state).line_items.map(x => {
       let imageurl = cart.cart_items.filter(item => item.line_item_key === x.product_data.line_item_key)[0].image
       let name = cart.cart_items.filter(item => item.line_item_key === x.product_data.line_item_key)[0].title
        x.product_data.image_url = imageurl
        x.product_data.name = name
        return x
    }) : null

        let startData = await startCheckout(`${jwt_token}`, public_order_id)
        await setCheckoutData({csrf_token: startData.data.csrf_token ,cart_items: items, jwt_token: jwt_token, public_order_id, application_state: JSON.parse(application_state), initial_data: JSON.parse(initial_data), store_identifier})
        await props.handleFlow('checkout')
}

    return (
        <div>
            {checkoutData === null ?
        
    <Button onClick={handleBuyNow}  variant="outlined" style={{display: props.flow === 'buynow' ? 'none': 'flex'}}>
        Checkout
    </Button>
    : <CheckoutLayout feed={checkoutData}/>}
        </div>
    )

}