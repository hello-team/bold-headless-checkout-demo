import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/styles';
import {
    Divider,
    Card,
    CardContent,
    SwipeableDrawer,
} from '@material-ui/core';

import { ItemImage, OneTimeItemTitle } from './CheckoutItems'
import CartHeader from './Header'
const useStyles = makeStyles((theme) => ({
    root: {
        displsy: 'flex',
    },
    details: {
        display: 'inline-flex',
    },
    content: {
        flex: '1 0 auto',
        height: '1em',
    },
    cards: {
        width: 'auto',
    },
    cover: {
        width: '65px',
        height: 'fit-content',
    },

}))


export default function ResponsiveCart(props) {
    const classes = useStyles();
    return (
        <div>
            <CartHeader itemCount={props.items}/>
                {props.items.map(item => (
                    <div className={classes.root}>
                        <div className={classes.details}>
                        <div className={classes.cover}>
                                    <ItemImage key={'item-image'} item={item.product_data} />
                         </div>
                            <div className={classes.content}>
                                    <OneTimeItemTitle key={'one-time'} item={item.product_data} />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )

}