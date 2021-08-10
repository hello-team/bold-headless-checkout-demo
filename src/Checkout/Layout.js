import React, { useState, useEffect } from "react";
import { Grid, GridItem } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';
import Checkout from './Checkout'
import SideCart from './OrderSummary/SideCart'
import { getCheckoutState } from './CheckoutApi'

export default function CheckoutLayout(props) {
    const [width, setWindowWidth] = useState(0)
    const [appstate, setAppState] = useState(props.feed.application_state)
    console.log('items', props.feed.cart_items)

    useEffect(() => {
        setAppState(props.feed.application_state)
    }, [props])

    const handleRefresh = async () => {
        let refresh = await getCheckoutState(props.feed.csrf_token, props.feed.public_order_id)
        setAppState(refresh)
        return refresh
    }

    useEffect(() => {

        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () =>
            window.removeEventListener('resize', updateDimensions);
    }, [])


    const updateDimensions = () => {
        setWindowWidth(document.querySelector('#checkout').offsetWidth)
    }

    return (
        <div >
            {width > 900 ?
                <Grid gridColumns={`repeat(2, 1fr)`}>
                    <GridItem style={{ width: '90%', margin: 'auto', float: 'right' }}>
                        <Checkout handleRefresh={handleRefresh} application={appstate} context={props.feed} customer={appstate.customer && props.feed.application_state.customer.saved_addresses && appstate.customer.saved_addresses.length !== 0 ? appstate.customer : null} />
                    </GridItem>
                    <GridItem style={{ backgroundColor: '#fafafa' }}>
                        <SideCart handleRefresh={handleRefresh} orderId={props.feed.public_order_id} csrfToken={props.feed.csrf_token} items={props.feed ? props.feed.cart_items : []} application={appstate} />
                    </GridItem>
                </Grid>
                :
                <div>
                    <Checkout handleRefresh={handleRefresh} application={appstate} context={props.feed} customer={appstate.customer && appstate.customer.saved_addresses && appstate.customer.saved_addresses.length !== 0 ? appstate.customer : null} />
                </div>}
        </div>
    )

}