import React from 'react'

export const Button = ({ text, onClick }) => {
  return (
    <button className="" onClick={onClick}>
      {text}
    </button>
  )
}
