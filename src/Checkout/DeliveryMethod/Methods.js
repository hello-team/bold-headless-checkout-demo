import React, { useState, useEffect } from "react";
import { Button, AppBar, Toolbar, Card, CardHeader, CardContent, RadioGroup, Radio, FormLabel, FormControl, FormControlLabel, Typography } from "@material-ui/core";
import { Grid, GridItem, Form, FormGroup } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StorefrontIcon from '@material-ui/icons/Storefront';


const useStyles = makeStyles(() => ({

    textField: {
        width: '100%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#c6c6c6',
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        color: '#545454',
        marginLeft: '0px !important',
    },
    textField2: {
        width: '100%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#c6c6c6',
        borderBottomRightRadius: '5px',
        borderBottomLeftRadius: '5px',
        color: '#545454',
        marginLeft: '0px !important',
    },
    selectedOption: {
        color: '#15789b'
    },
    availableOption: {
        color: '#545454'
    },
}));

export default function Methods(props) {
    const classes = useStyles()

    return (
        <div>
            <Card style={{ boxShadow: 'none' }}>
                <CardHeader
                    title={'Delivery method'}
                />
                <CardContent>
                <Form style={{padding: '1rem'}}>
                        <FormGroup>
                    <RadioGroup value={props.method} onChange={(e) => props.handleChangeMethod(e.target.value)} style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                        <FormControlLabel className={classes.textField} value="delivery" 
                         control={<Radio margin="dense" />} labelPlacement="end" label={<div style={{ display: 'flex' }}>
                            <Typography className={props.method === 'delivery' ? classes.selectedOption : classes.availableOption} style={{ paddingRight: '1rem' }} >
                                <LocalShippingIcon />
                            </Typography>
                            <Typography className={props.method === 'delivery' ? classes.selectedOption : classes.availableOption} >
                                Ship
                                </Typography>
                        </div>} />
                        <FormControlLabel className={classes.textField2} value="pickup" control={<Radio margin="dense"/>} labelPlacement="end" label={<div style={{ display: 'flex' }}>
                            <Typography className={props.method === 'pickup' ? classes.selectedOption : classes.availableOption} style={{ paddingRight: '1rem' }}>
                                <StorefrontIcon />
                            </Typography>
                            <Typography className={props.method === 'pickup' ? classes.selectedOption : classes.availableOption}>
                                Pick up
                                </Typography>
                        </div>} />
                    </RadioGroup>
                    </FormGroup>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )

}