import React from 'react'

const ResetPassword = ({username,link}) => {
  return (
    `<div>
        <h1>Hi ${username}</h1>
        <p>Please click on this link to reset your password</p>
        <a href=${link}>Click Here</a>
    </div>`
  )
}

export default ResetPassword