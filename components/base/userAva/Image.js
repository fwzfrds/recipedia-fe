import React from 'react'
import styles from './Image.module.css'
import Image from 'next/image'

const UserAva = ({source, style, onMouseOver, onMouseLeave, children}) => {
  return (
    <div 
      style={style}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
        <Image 
            src={source} 
            alt=''
            layout='fill' 
            className={`${styles['image']}`}
        />
        {children}
    </div>
  )
}

export default UserAva