import React from 'react'
import './errorMessage.css'

const ErrorMessage = () => {
    return (
        <>
        <img className='image' src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img>
        <span>Something  goes wrong</span>
        </>
    )
}

export default ErrorMessage