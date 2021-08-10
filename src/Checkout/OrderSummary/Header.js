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
     <div><Typography component="h5" variant="h5" style={{ float: 'left', display: 'table'  }} className={'product-title'}>
                    <strong>Order Summary</strong>
     </Typography></div>
        )
}
