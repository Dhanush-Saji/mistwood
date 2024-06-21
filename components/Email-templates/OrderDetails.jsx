import { getDateddmmyyy } from '@/services/Formatter'
import React from 'react'

const OrderDetails = ({username,orderid,orderdate,products,totalAmount}) => {
  const customOrderdate =orderdate?getDateddmmyyy(orderdate?.split('T')[0]):''
  const productList = products.map(product => `
    <div class="product-div">
            <img height="150px" style="mix-blend-mode: multiply;" src=${product?._id?.product_image?.img1?.url} alt="image">
            <div style="display: flex;gap: 0.5rem;align-items: center;width: 100%;justify-content: space-between;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <h3 style="margin: 0;">${product?._id?.product_name}</h3>
                    <p style="margin: 0;">Quantity: ${product?.quantity}</p>
                </div>
                <h3 style="margin: 0;">₹${product?.checkoutPrice}</h3>
            </div>
        </div>
  `).join('');

  return (
    `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <title>Mail</title>
    <style>
        body{
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
        }
        .product-div{
            display: flex;
            align-items: center;
            flex-direction: row;
            padding: 1rem 2rem;
        }
        @media only screen and (max-width: 600px) {
            .product-div{
                flex-direction: column;
            }
        }
    </style>
</head>
<body >
    <div style="display: flex;flex-direction: column;padding: 1rem;">
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
        <p>${customOrderdate}</p>
    </div>
    <div style="display: flex;flex-direction: column; gap: 0.5rem;background-color: #c6f5ff;border-radius: 10px;">
        ${productList}
    </div>
    <p style="text-align: right;">Shipping charge: ₹0</p>
    <div style="width: 100%;background-color: black;height: 1px;opacity: 0.2;"></div>
    <h3 style="text-align: right;">Total: ₹${totalAmount}</h3>
    </div>
</body>
</html>`
  )
}

export default OrderDetails