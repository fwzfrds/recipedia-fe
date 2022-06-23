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
  style,
  className,
  defaultValue,
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
        style={style}
        className={className}
        defaultValue={defaultValue}
      />
      {children}
    </div>
  )
}

export default Input