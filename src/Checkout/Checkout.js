import React, { useState, useEffect } from "react";
import { Grid, GridItem } from '@bigcommerce/big-design'
import { makeStyles } from '@material-ui/styles';
import Customer from './Customer/Customer'
import Methods from './DeliveryMethod/Methods'
import Address from './Shipping/Address'
import { addGuest, setShippingAddress, getShippingLines, setShippingLine, updateShippingLine, getCheckoutState, submitOrder} from './CheckoutApi'
import PaymentIframe from './Payments/PaymentIframe'
export default function Checkout(props) {
    const [email, setEmail] = useState(props.customer ? props.customer.email_address : '')
    const [context, setContext] = useState(null)
    const [jwtToken, setJwt] = useState(null)
    const [csrfToken, setCsrfToken] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [deliveryMethod, setMethod] = useState('delivery')
    const [firstname, setFirst] = useState(props.customer ? props.customer.first_name : '')
    const [lastname, setLast] = useState(props.customer ? props.customer.last_name : '')
    const [address, setAddress] = useState(props.customer ? props.customer.saved_addresses[0].address_line_1 : '')
    const [address2, setAddress2] = useState(props.customer ? props.customer.saved_addresses[0].address_line_2 : '')
    const [city, setCity] = useState(props.customer ? props.customer.saved_addresses[0].city : '')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [zip, setZip] = useState(props.customer ? props.customer.saved_addresses[0].zip : '')
    const [orderStatus, setOrderStatus] = useState('order_pending')
    const [orderTotal, setOrderTotal] = useState(0)
    const [checkoutState, setCheckoutState] = useState({})

    useEffect(() => {

            setContext(props.context)
            setCsrfToken(props.context.csrf_token)
            setOrderId(props.context.public_order_id)
            setJwt(props.context.jwt_token)
            setOrderStatus('order_initialized')
            let appstate = props.application
            if(appstate.customer.saved_addresses && appstate.customer.saved_addresses.length !== 0){
                handleLoggedInCustomer(appstate.customer.saved_addresses[0])
            }
            setCheckoutState(appstate)
            setOrderTotal(appstate.order_total/100)
            console.log({ context: props.context })

    }, [props])

   const handleLoggedInCustomer = (address) => {

      let countryVal = props.context.initial_data.country_info.filter(x => x.iso_code === address.country_code)[0]
      let countryIndex = props.context.initial_data.country_info.findIndex(x => x.iso_code === address.country_code)

      countryVal.index = countryIndex

      setCountry(countryVal)

      let stateVal = props.context.initial_data.country_info[countryIndex].provinces.filter(x => x.iso_code === address.province_code)[0]

      let stateIndex = props.context.initial_data.country_info[countryIndex].provinces.findIndex(x => x.iso_code === address.province_code)

      stateVal.index = stateIndex
      console.log(stateVal)

      setState(stateVal)

    }
    


    useEffect(() => {
        (async () => {
           
            let refresh = await props.handleRefresh()
            await setCheckoutState(refresh)
            await setOrderTotal(refresh.order_total/100)
        })()

    }, [orderStatus])

    const handleGuest = async () => {
        let refresh = await props.handleRefresh()
        setCheckoutState(refresh)
        if (refresh.customer.email_address.length === 0) {
            await addGuest(csrfToken, orderId, { email_address: email, first_name: firstname, last_name: lastname })
            let orderstate = await getCheckoutState(csrfToken, orderId)
            console.log(orderstate)
            setOrderStatus('guest_added')
        }
    }

    const handleSetAddress = async () => {
        let refresh = await props.handleRefresh()
        setCheckoutState(refresh)
        if (refresh.addresses.shipping.length === 0) {
            await setShippingAddress(csrfToken, orderId, { first_name: firstname, last_name: lastname, address_line_1: address, address_line_2: address2, country: country.name, country_code: country.iso_code, province: state.name, province_code: state.iso_code, city: city, postal_code: zip })
            await setShippingLine(csrfToken, orderId, deliveryMethod === 'pickup' ? 0 : 1)
            let orderstate = await getCheckoutState(csrfToken, orderId)
            console.log(orderstate)
            await setOrderStatus('payment_initialized')
        }
    }

    const handleChangeMethod = async (val) => {
        await setMethod(val)
        await setShippingLine(csrfToken, orderId, val === 'pickup' ? 0 : 1)
        let orderstate = await getCheckoutState(csrfToken, orderId)
        console.log(orderstate)
    }

    const handleCountry = (c) => {
        let countryVal = props.context.initial_data.country_info.filter(x => x.iso_code === c)[0]
        let countryIndex = props.context.initial_data.country_info.findIndex(x => x.iso_code === c)

        countryVal.index = countryIndex
        console.log(countryVal)

        setCountry(countryVal)
    }

    const handleState = (s) => {

        let stateVal = props.context.initial_data.country_info[country.index].provinces.filter(x => x.iso_code === s)[0]

        let stateIndex = props.context.initial_data.country_info[country.index].provinces.findIndex(x => x.iso_code === s)

        stateVal.index = stateIndex
        console.log(stateVal)

        setState(stateVal)
    }



    const handlePaymentNow = async (event) => {
        event.preventDefault()
        await handleSetAddress()
        const iframeElement = document.querySelector('iframe#PIGI');

        let refresh = await getCheckoutState(csrfToken, orderId)
         await setCheckoutState(refresh)
        if(refresh.payments.length === 0){

            iframeElement.contentWindow.postMessage({
                actionType: 'PIGI_ADD_PAYMENT'
            }, '*');
    
            iframeElement.contentWindow.postMessage({
                actionType: 'PAYMENT_GATEWAY_FRAME_PRE_AUTHORIZE_CARD'
            }, '*');
    
        }

    }

    const handlePaymentSuccess = async () => {
        let refresh = await props.handleRefresh()
        console.log({payment: refresh})
        let { order } = await submitOrder(csrfToken, orderId)
        let application_state = order.data.application_state
        console.log('application_state', application_state)

        await setCheckoutState(application_state)
    }



    return (
        <div>
            {csrfToken && orderId ?
                <Grid>
                    <GridItem>
                        <Customer handleChangeEmail={(val) => setEmail(val)} email={email} />
                        <Methods handleChangeMethod={(val) => handleChangeMethod(val)} method={deliveryMethod} />
                        <Address
                            country_info={props.context.initial_data.country_info}
                            initial_data={props.context.initial_data}
                            handleGuest={handleGuest}
                            handleFirstName={(val) => setFirst(val)}
                            handleLastName={(val) => setLast(val)}
                            handleAddress={(val) => setAddress(val)}
                            handleAddress2={(val) => setAddress2(val)}
                            handleCity={(val) => setCity(val)}
                            handleState={(val) => handleState(val)}
                            handleCountry={(val) => handleCountry(val)}
                            handleZip={(val) => setZip(val)}
                            firstname={firstname}
                            lastname={lastname}
                            address={address}
                            address2={address2}
                            city={city}
                            country={country}
                            state={state}
                            zip={zip}
                        />
                        <PaymentIframe order={orderId} token={jwtToken} checkout={checkoutState} handlePaymentNow={handlePaymentNow} handlePaymentSuccess={handlePaymentSuccess} orderTotal={orderTotal}/>
                    </GridItem>

                </Grid>
                : ''}
        </div>
    )

}