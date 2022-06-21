import React from 'react'

const Button = ({ style, onClick, text, className, form, type }) => {

  return (
    <button
      style={style}
      onClick={onClick}
      className={className}
      form={form}
      type={type}
    >
      {text}
    </button>
  )
}

export default Button