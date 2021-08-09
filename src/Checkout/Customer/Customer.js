import React, { useState, useEffect } from "react";
import { Collapse, Card, CardHeader, CardContent, TextField } from "@material-ui/core";
import { Form, FormGroup } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    textField: {
        width: '100%',
        borderRadius: '5px',
    },
}));

export default function Customer(props) {
    const classes = useStyles()

    const [customer, setCustomer] = useState(null)
    

    return (
        <div>
            <Card style={{boxShadow: 'none'}}>
                <CardHeader
                    title={'Contact information'}
                />
                <CardContent>
                    <Form>
                        <FormGroup>
                            <TextField
                                key={'email'}
                                className={classes.textField}
                                label={'Email'}
                                value={props.email}
                                margin="dense"
                                onChange={(e) => props.handleChangeEmail(e.target.value)}
                                type={'email'}
                                inputProps={{
                                    autoComplete: 'email',
                                }}
                            >
                            </TextField>
                        </FormGroup>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}