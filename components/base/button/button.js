import React from 'react'

const Button = ({ style, onClick, text, className, form, type, key, htmlFor }) => {

  return (
    <button
      style={style}
      onClick={onClick}
      className={className}
      form={form}
      type={type}
      key={key}
      htmlFor={htmlFor}
    >
      {text}
    </button>
  )
}

export default Button