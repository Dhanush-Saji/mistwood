import { getDateddmmyyy } from '@/services/Formatter'
import React from 'react'

const OrderDetails = ({username,orderid,orderdate,products,totalAmount}) => {

  return (
    `<div style="display: flex;flex-direction: column;padding: 1rem;">
        <h1 style="text-align: center;">Hurrayy.. Order placed!</h1>
        <p style="opacity: 0.7;">
            Hi ${username}, </br>
            Thanks for placing your order with us. Below are the details of your order. If you have any queries, feel free to get in touch with us at dhanusaji1@gmail.com
        </p>
    <div style="display: flex; gap: 0.5rem;align-items: center;opacity: 0.7;">
        <span style="margin: 0;">Order ID: </span>
        <span>${orderid}</span>
    </div>
    <div style="display: flex; gap: 0.5rem;align-items: center;opacity: 0.7;">
        <span style="margin: 0;">Order Date: </span>
    </div>
    <div style="display: flex;flex-direction: column; gap: 0.5rem;background-color: #c6f5ff;border-radius: 10px;">
   
    </div>
    <p style="text-align: right;">Shipping charge: ₹0</p>
    <div style="width: 100%;background-color: black;height: 1px;opacity: 0.2;"></div>
    <h3 style="text-align: right;">Total: ₹${totalAmount}</h3>
    </div>`
  )
}

export default OrderDetails