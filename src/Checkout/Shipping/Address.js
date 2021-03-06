import React, { useState, useEffect } from "react";
import { Collapse, Button, AppBar, Toolbar, Card, CardHeader, CardContent, TextField, Select, MenuItem } from "@material-ui/core";
import { Grid, GridItem, Form, FormGroup } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(() => ({
    textField: {
        width: '100%',
        borderRadius: '5px',
    },
}));

export default function Address(props) {
    const classes = useStyles()



    return (
        <div>
            <Card style={{ boxShadow: 'none' }}>
                <CardHeader
                    title={'Address'}
                />
                <CardContent>
                    <Form>
                        <FormGroup>
                            <Select
                                className={classes.textField}
                                key={'country'}
                                value={props.country ? props.country.iso_code : ''}
                                margin="dense"
                                onChange={(e) => props.handleCountry(e.target.value)}
                                inputProps={{
                                    autoComplete: 'country',
                                }}
                            >
                                {props.country_info.length !== 0 ? props.country_info.map((x, index) => (
                                    <MenuItem key={x.name} value={x.iso_code}>
                                        {x.name}
                                    </MenuItem>
                                )) : []}
                            </Select>

                        </FormGroup>
                        <Grid gridColumns={`repeat(2, 1fr)`}>
                            <GridItem>
                                <TextField
                                    className={classes.textField}
                                    key={'firstname'}
                                    label={'First Name'}
                                    value={props.firstname}
                                    margin="dense"
                                    onChange={(e) => props.handleFirstName(e.target.value)}
                                    inputProps={{
                                        autoComplete: 'given-name',
                                    }}
                                >

                                </TextField>
                            </GridItem>
                            <GridItem>
                                <TextField
                                    className={classes.textField}
                                    key={'lastname'}
                                    label={'Last Name'}
                                    value={props.lastname}
                                    margin="dense"
                                    onChange={(e) => props.handleLastName(e.target.value)}
                                    onBlur={props.handleGuest}
                                    inputProps={{
                                        autoComplete: 'family-name',
                                    }}
                                >

                                </TextField>
                            </GridItem>
                        </Grid>
                        <FormGroup>
                            <TextField
                                className={classes.textField}
                                key={'address1'}
                                label={'Address'}
                                value={props.address}
                                margin="dense"
                                onChange={(e) => props.handleAddress(e.target.value)}
                                inputProps={{
                                    autoComplete: 'address-line1',
                                }}
                            >
                            </TextField>
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                className={classes.textField}
                                label={'Apartment, suite, etc. (optional)'}
                                key={'address2'}
                                value={props.address2}
                                margin="dense"
                                onChange={(e) => props.handleAddress2(e.target.value)}
                                inputProps={{
                                    autoComplete: 'address-line2',
                                }}
                            >
                            </TextField>
                        </FormGroup>
                        <FormGroup>
                            <Select
                                className={classes.textField}
                                key={'state'}
                                value={props.state ? props.state.iso_code : ''}
                                margin="dense"
                                onChange={(e) => props.handleState(e.target.value)}
                                inputProps={{
                                    autoComplete: 'address-level1',
                                }}
                            >
                                {props.country_info.length !== 0 ? props.country_info[props.country ? props.country.index : 0].provinces.map((x, index) => (
                                    <MenuItem key={x.name} value={x.iso_code}>
                                        {x.name}
                                    </MenuItem>
                                )) : []}
                            </Select>

                        </FormGroup>

                        <Grid gridColumns={`repeat(2, 1fr)`}>
                            <GridItem>
                            <TextField
                                className={classes.textField}
                                key={'city'}
                                label={'City'}
                                value={props.city}
                                margin="dense"
                                onChange={(e) => props.handleCity(e.target.value)}
                                inputProps={{
                                    autoComplete: 'address-level2',
                                }}
                            >
                            </TextField>
                            </GridItem>
                            <GridItem>

                            <TextField
                                className={classes.textField}
                                key={'zip'}
                                label={'Zip'}
                                value={props.zip}
                                margin="dense"
                                onChange={(e) => props.handleZip(e.target.value)}
                                inputProps={{
                                    autoComplete: 'postal-code',
                                }}
                            >
                            </TextField>
                            </GridItem>

                        </Grid>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}