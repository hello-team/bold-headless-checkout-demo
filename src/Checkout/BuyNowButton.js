import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CheckoutLayout from './Layout'
import cartItems from '../cart.json'
import { createCart, startCheckout} from './CheckoutApi'

export default function BuyNowButton() {
const [checkoutData, setCheckoutData] = useState(null)

const handleBuyNow = async () => {
    const {
        jwt_token, public_order_id, application_state, initial_data, store_identifier,
      }  = await createCart(cartItems)
    console.log(JSON.parse(application_state))

    let items = application_state ? JSON.parse(application_state).line_items.map(x => {
       let imageurl = cartItems.cart_items.filter(item => item.line_item_key === x.product_data.line_item_key)[0].image
       let name = cartItems.cart_items.filter(item => item.line_item_key === x.product_data.line_item_key)[0].title
        x.product_data.image_url = imageurl
        x.product_data.name = name
        return x
    }) : null

        let startData = await startCheckout(`${jwt_token}`, public_order_id)
        await setCheckoutData({csrf_token: startData.data.csrf_token ,cart_items: items, jwt_token: jwt_token, public_order_id, application_state: JSON.parse(application_state), initial_data: JSON.parse(initial_data), store_identifier})

        
}

    return (
        <div>
            {checkoutData === null ?
    <Button onClick={handleBuyNow} variant="outlined" >
        Buy Now
    </Button>
    : <CheckoutLayout feed={checkoutData}/>}
        </div>
    )

}