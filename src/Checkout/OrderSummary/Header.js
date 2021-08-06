import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    LinearProgress
} from '@material-ui/core';



export default function CartHeader(props) {
    return (
        <Card>
            <CardHeader
                title={<div><Typography component="h5" variant="h5" style={{ float: 'left' }} className={'product-title'}>
                    <em>Order Summary</em>
                </Typography></div>}
            />
            <CardContent>
            </CardContent>
        </Card>
        )
}
