import React, { useState, useEffect, useRef } from "react";
import { Input, Button, AppBar, Toolbar, Card, CardHeader, CardContent, TextField } from "@material-ui/core";
import { Grid, GridItem, Form, FormGroup } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';
import { formatMoney } from 'accounting';


export const BASE_URL = `https://api.boldcommerce.com/checkout/storefront/escalcfylg`

const useStyles = makeStyles(() => ({

    textField: {
        width: '100%',
        borderRadius: '5px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        width: '100%',
        backgroundColor: '#000', 
        color: '#fff'
    },
}));

export default function PaymentIframe(props) {
    const [iframeHeight, setHeight] = useState(0)
    const classes = useStyles()


    const handleIframeLoad = (e) => {
        console.log(e)
        const iframeElement = document.querySelector('iframe#PIGI');
        const payload = {
            type: 'update_order'
        };
        iframeElement.contentWindow.postMessage(payload, '*')

    }

    const onMessageReceived = async (event) => {
        let message = event.data;

        if (message.payload && message.payload.height) {
            setHeight(message.payload.height)
        }

        console.log({type: message.responseType, payload: message.payload})

        if (message.responseType === 'PIGI_ADD_PAYMENT' && message.payload.success === true && props.checkout && props.checkout.payments.length === 0) {
            console.log('iframe', props.checkout)
            await props.handlePaymentSuccess()
        }
    }

    useEffect(() => {
        window.addEventListener('message', (event) => {

            onMessageReceived(event)

        })
        return () => {
            window.removeEventListener('message', onMessageReceived);
        }
    }, []);



    return (


        <div>
            <Card style={{ boxShadow: 'none' }}>
                <CardHeader
                    title={'Payment Method'}
                />
                <CardContent>
                    <div>
                        <iframe
                            title={'payments'}
                            id="PIGI"
                            onLoad={handleIframeLoad}
                            src={`${BASE_URL}/${props.order}/payments/iframe?token=${props.token}`}
                            style={{ width: '100%', border: 'none', height: iframeHeight }}
                        >
                        </iframe>
                        <Button type='submit' variant="outlined" onClick={(e) => props.handlePaymentNow(e)} className={classes.textField}>
                            Pay {formatMoney(props.orderTotal)}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

    )



}