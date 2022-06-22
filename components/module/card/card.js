import React from 'react'
import styles from './Card.module.css'
import Image from 'next/image'

const Card = ({ recipeName, photo, style, onClick }) => {

    

    return (
        <div
            className={`${styles.card}`}
            style={style}
            onClick={onClick}
        >
            <Image priority src={photo} alt={''} layout={'fill'} />
            <div className={`${styles.card_name}`}>
                <p>{recipeName}</p>
            </div>
        </div>
    )
}

export default Card