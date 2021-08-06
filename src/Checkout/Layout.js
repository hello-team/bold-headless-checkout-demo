import React, { useState, useEffect } from "react";
import { Grid, GridItem } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';
import Checkout from './Checkout'
import SideCart from './OrderSummary/SideCart'

export default function CheckoutLayout(props) {

    console.log('items', props.feed.cart_items)


    return (
        <div >
            <Grid gridColumns={`repeat(2, 1fr)`}>
                <GridItem style={{ width: '90%', margin: 'auto', float: 'right' }}>
                    <Checkout context={props.feed} />
                </GridItem>
                <GridItem style={{ backgroundColor: '#fafafa', float: 'left' }}>
                    <SideCart items={props.feed ? props.feed.cart_items : []}/>
                </GridItem>
            </Grid>
        </div>
    )

}