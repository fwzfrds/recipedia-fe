import React from 'react'
import styles from './Input.module.css'

const Input = ({ 
  type, 
  id, 
  name, 
  onChange, 
  placeholder, 
  value, 
  label,
  children
}) => {
  return (
    <div className={`${styles.input_container}`}>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {children}
    </div>
  )
}

export default Input