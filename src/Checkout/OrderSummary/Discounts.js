import React from "react";
import {
    Button,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    TextField,
    Input,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { formatMoney } from 'accounting';

import { Grid, GridItem } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles(() => ({
    textField: {
        width: '100%',
        borderRadius: '5px',
        height: '3.45rem',
        margin: '0 auto',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
}));


export const Discounts = (props) => {
    const classes = useStyles()

    return (
        <CardContent key={'discount'} style={{ flex: '1 0 auto' }}>
            {props.discountAmount === 0 ?
                <Grid gridColumns={`repeat(2, 1fr)`}>
                    <GridItem>

                        <TextField
                            error={props.couponError === null ? false : true}
                            helperText={props.couponError === null ? '' : props.couponError}
                            disabled={props.discountApplied}
                            className={classes.textField}
                            key={'discount'}
                            label={'Coupon Code'}
                            value={props.discount}
                            margin="dense"
                            onChange={(e) => props.handleCouponInput(e.target.value)}
                        ></TextField>
                    </GridItem>
                    <GridItem>

                        <Button onClick={(e) => props.handleCouponSubmit(e.target.value)} style={{ borderColor: '#ccc', backgroundColor: '#267f81', color: '#fff' }} className={classes.textField}>
                            Apply
                         </Button>
                    </GridItem>
                </Grid>
                : 
                <Grid gridColumns={`repeat(2, 1fr)`}>
                <GridItem>
                    <Typography>
                     <LoyaltyIcon /> Coupon <strong>{props.discount} </strong> applied!
                     <br></br>
                     <em>You save {props.discountAmount}!</em>
                    </Typography>
                    </GridItem>
                    <GridItem>
                        
                    <Button onClick={(e) => props.handleCouponSubmit(e.target.value)} style={{borderColor: '#ccc', backgroundColor: '#dc1439', color: '#fff'}} className={classes.textField}>
                        Remove 
                    </Button>
                    </GridItem>
                    </Grid>
                }
        </CardContent>
    )
}