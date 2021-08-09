import React, { useState, useEffect } from "react";
import { Grid, GridItem } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';
import Checkout from './Checkout'
import SideCart from './OrderSummary/SideCart'

export default function CheckoutLayout(props) {
    const [width, setWindowWidth] = useState(0)

    console.log('items', props.feed.cart_items)


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
                    <Checkout context={props.feed} customer={props.feed.application_state.customer && props.feed.application_state.customer.saved_addresses && props.feed.application_state.customer.saved_addresses.length !== 0  ? props.feed.application_state.customer : null}/>
                </GridItem>
                <GridItem style={{ backgroundColor: '#fafafa', float: 'left' }}>
                    <SideCart items={props.feed ? props.feed.cart_items : []}/>
                </GridItem>
            </Grid>
            : 
            <div>
                <Checkout context={props.feed} customer={props.feed.application_state.customer && props.feed.application_state.customer.saved_addresses && props.feed.application_state.customer.saved_addresses.length !== 0 ? props.feed.application_state.customer : null} />
            </div>}
        </div>
    )

}