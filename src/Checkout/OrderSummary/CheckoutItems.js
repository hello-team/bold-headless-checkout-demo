import React from "react";
import {
    Button,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { formatMoney } from 'accounting';

import { Grid, GridItem } from '@bigcommerce/big-design'

export const SubscriptionTitle = (props) => {
    return (
        <div>
            <Typography key={"title"} style={{ float: 'left' }} className={'product-title'}>
                <em style={{ color: 'red' }} >{props.item.interval_text}</em><em style={{ color: 'red' }} > Subscription!</em>
                <br />
                <em>{props.item.name}</em> <br />
            </Typography>
        </div>
    )
}

export const OneTimeItemTitle = (props) => {
    return (
        <div>
            <Typography key={props.item.id} style={{ float: 'right', display: 'flex' }} className={'product-title'}>
                {props.item.name}
            </Typography>
        </div>
    )
}

export const Price = (props) => {
    return (
        <Typography>
            <em>{formatMoney(props.item.price / 100)} x {props.item.quantity}</em> <br />
        </Typography>
    )
}

export const ItemImage = (props) => {
    return (
        <CardMedia
            component="img"
            src={props.item.image_url}
            alt={props.item.name}
            key={`image-${props.item.id}`}
        />
    )
}

export const CartQuantityActions = (props) => {
    return (
        <CardContent key={props.item.name} style={{ flex: '1 0 auto' }}>
            <GridItem key={`grid-item-actions-${props.item.id}`} style={{ display: 'inline-flex', marginBottom: 0 }}>
                <span className={'MuiButtonBase-root'}>
                    <RemoveIcon onClick={() => props.handleQntyRules(props.item, parseInt(props.item.quantity - 1))} />
                </span>

                <span className={'MuiButtonBase-root'}>
                    <Typography data-cart-totals data-product-id={props.item.id}>
                        {props.item.quantity}
                    </Typography>
                </span>
                <span className={'MuiButtonBase-root'}>
                    <AddIcon onClick={() => props.handleQntyRules(props.item, parseInt(props.item.quantity + 1))} />
                </span>
            </GridItem>
        </CardContent>
    )
}


