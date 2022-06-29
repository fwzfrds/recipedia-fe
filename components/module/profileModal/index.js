import React, { useEffect, useState, useContext } from 'react'
import Button from '../../base/button/button'
import Input from '../../base/input/input'
import UserAva from '../../base/userAva/Image'
import styles from './ProfileModal.module.css'
import { modalContext } from '../../../pages/user/profile/index'

const ProfileModal = ({ style, userData }) => {

    const [isAvaHover, setisAvaHover] = useState(false)
    const [user, setUser] = useState('')
    // const [first, setfirst] = useState('')
    const {isModalActive, handleModaldeactive} = useContext(modalContext)
    // terakhir sampai sini 

    // console.log(isModalActive)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (userData.status === 1) {
                userData.status = 'active'
            }
            setUser(userData)
        }
    }, [userData])

    // console.log(name)

    return (
        <div className={`${styles.profile_modal}`}
            style={style}
        >
            <p onClick={handleModaldeactive}>close</p>
            <div className={`${styles.modal_container}`}>
                <h1>Edit Profile</h1>
                <UserAva
                    source={user.phoro ? user.photo : '/assets/img/dummy-img.jpg'}
                    style={{
                        width: 150,
                        height: 150,
                        position: 'relative',
                        borderRadius: '50%',
                        marginTop: 50
                    }}
                    onMouseOver={() => setisAvaHover(true)}
                    onMouseLeave={() => setisAvaHover(false)}
                >
                    <div className={`${styles.edit_ava}`}
                        style={isAvaHover ? {} : { display: 'none' }}
                    >
                        <Button
                            text={'Edit'}
                        />
                    </div>
                </UserAva>
                <h3>Status: {user ? user.status : 'not active'}</h3>
                <div className={`${styles.forms}`}>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='id'>ID</label>
                        <input type='text' id='id' name='id' defaultValue={user.id ? user.id : {}} />
                    </div>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' defaultValue={user.name ? user.name : {}} />
                    </div>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' name='email' defaultValue={user.email ? user.email : {}} />
                    </div>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='phone'>Phone</label>
                        <input type='text' id='phone' name='phone' defaultValue={user.phone ? user.phone : {}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal