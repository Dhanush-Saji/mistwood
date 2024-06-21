import { getDateddmmyyy } from '@/services/Formatter'
import React from 'react'

const OrderDetails = ({username,orderid,orderdate,products,totalAmount}) => {
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
    fgfg
</body>
</html>`
  )
}

export default OrderDetails