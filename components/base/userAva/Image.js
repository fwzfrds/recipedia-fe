import React from 'react'
import styles from './Image.module.css'
import Image from 'next/image'

const UserAva = ({source, style, children}) => {
  return (
    <div style={style}>
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