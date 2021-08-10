import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/styles';
import {
    Divider,
    Card,
    CardContent,
    SwipeableDrawer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
} from '@material-ui/core';
import { formatMoney } from 'accounting';

import { ItemImage, OneTimeItemTitle, Price } from './CheckoutItems'
import CartHeader from './Header'

import { addCoupon, removeCoupon, validateCoupon } from '../CheckoutApi'
import { Discounts } from './Discounts'

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'table',
        paddingLeft: '1.15385rem',
        paddingRight: '1.15385rem',
        margin: '0 auto',
    },
    root: {
        display: 'flex',
        color: '#333',
    },
    details: {
        display: 'inline-flex',
    },
    content: {
        flex: '1 0 auto',
        margin: 'auto',
    },
    cards: {
        width: 'auto',
    },
    cover: {
        width: '65px',
        height: 'fit-content',
    },

}))


export default function SideCart(props) {
    const classes = useStyles();
    const [discount, setDiscount] = useState(null)
    const [discountApplied, setDiscountApplied] = useState(false)
    const [couponError, setCouponError] =useState(null)
    const [discountAmount, setDiscountAmount] = useState(0)
    console.log({app: props.application})

    useEffect(() => {
            if(props.application.discounts.length !== 0 && discountApplied === false){
                setDiscountApplied(true)
                setDiscountAmount(formatMoney(props.application.discounts[0].value/100))
            }
            if(props.application.discounts.length === 0 && discountApplied === true){
                setDiscountApplied(false)
                setDiscountAmount(0)
            }
            // (() => {
            // })()

    }, [props])

    const handleCouponSubmit = async (e) => {
        if(props.application.discounts.length === 0){
            try {
                await validateCoupon(props.csrfToken, props.orderId, discount.toUpperCase())
                let couponResponse = await addCoupon(props.csrfToken, props.orderId, discount.toUpperCase())

                console.log({couponResponse: couponResponse})
            } catch (error) {
                console.log({error: error.response.data.errors[0].message})
                setCouponError(error.response.data.errors[0].message)
            }

            await props.handleRefresh()
        }else{
            await removeCoupon(props.csrfToken, props.orderId, discount.toUpperCase())
            await props.handleRefresh()

        }
    }

    const handleCouponInput = async (val) => {
        setCouponError(null)
        setDiscount(val)
    }

    return (
        <Paper className={classes.layout}>
            <CartHeader itemCount={props.items} />
            <TableContainer >

                <Table aria-label="caption table">
                <caption>Order total: {formatMoney(props.application.order_total/100)}</caption>

                    {props.items.map((item, index) => (
                        <div className={classes.content}>
                            <TableHead>
                                <TableRow className={classes.details}>
                                    <TableCell style={{boxShadow: '0'}}>
                                        <div className={classes.cover}>
                                            <ItemImage key={`item-image-${index}`} item={item.product_data} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Price key={`one-time-price-${index}`} item={item.product_data} />
                                    </TableCell>
                                    <TableCell>
                                        <OneTimeItemTitle key={`one-time-${index}`} item={item.product_data} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </div>
                    ))}
                    <TableBody>
                    <Discounts discountAmount={discountAmount} couponError={couponError} discountApplied={discountApplied} handleCouponSubmit={(e) => handleCouponSubmit(e)} handleCouponInput={(e) => handleCouponInput(e)} discount={discount}> </Discounts>
                    </TableBody>
                </Table>
                

            </TableContainer>
        </Paper>
    )

}