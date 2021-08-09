import axios from "axios";
import 'regenerator-runtime/runtime'

let staging = 'http://localhost:9000'
let prod = 'https://bold-up.herokuapp.com'
export const BASE_URL = `https://api.boldcommerce.com/checkout/storefront/escalcfylg`


export const createCart = (cartItems) => {
    return fetch(`${prod}/api/checkout/escalcfylg/init`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartItems),
    })
        .then(response => response.json());
};



export const startCheckout = async (token, order) => {
    axios.defaults.withCredentials = true
    let { data } = await axios.post(`${BASE_URL}/${order}/session/start?token=${token}`)
    console.log({ start: data })
    return data;
}

export const addGuest = async (csrf, order, customer) => {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    axios.defaults.withCredentials = true
    let { data } = await axios.post(`${BASE_URL}/${order}/customer/guest`, customer)
    return data;
}

export const setShippingAddress = async (csrf, order, shippingData) => {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    axios.defaults.withCredentials = true
    console.log({ csrf: csrf })
    await axios.post(`${BASE_URL}/${order}/addresses/billing`, shippingData)
    let { data } = await axios.post(`${BASE_URL}/${order}/addresses/shipping`, shippingData)
    return { cart: data.data }
}

export const getShippingLines = async (csrf, order) => {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    axios.defaults.withCredentials = true
    console.log({ csrf: csrf })
    let { data } = await axios.get(`${BASE_URL}/${order}/shipping_lines`)
    console.log({ shipping_lines: data })

    return { shipping_lines: data }
}


export const setShippingLine = async (csrf, order, index) => {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    let { data } = await axios.post(`${BASE_URL}/${order}/shipping_lines`, {index: index.toString()})
        return data
  };

  export const updateShippingLine = async (csrf, order, index) => {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    let { data } = await axios.put(`${BASE_URL}/${order}/shipping_lines`, {index: index.toString()})
        return data
  };

export const getCheckoutState = async (csrf, order) => {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    axios.defaults.withCredentials = true
    console.log({ csrf: csrf })
    let { data } = await axios.get(`${BASE_URL}/${order}/refresh`)

    return data.data.application_state
}

export const getPaymentIframe = async (csrf, order, token) => {
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN' : csrf,   
       'Content-Type': 'application/json',
      'Accept': 'application/json',
  };
  axios.defaults.withCredentials = true
    let {data} = await axios.get(`${BASE_URL}/${order}/payments/iframe?token=${token}`)
    console.log({ payments: data })
  
    return {payment_iframe: data}
  }


  export const submitOrder = async (csrf, order) => {
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    axios.defaults.withCredentials = true
    console.log({ csrf: csrf })
    let {data} = await axios.post(`${BASE_URL}/${order}/process_order`)
    return { order: data }
}