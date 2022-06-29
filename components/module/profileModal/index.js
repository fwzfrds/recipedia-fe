import React, { useEffect, useState, useContext } from 'react'
import Button from '../../base/button/button'
import Input from '../../base/input/input'
import UserAva from '../../base/userAva/Image'
import styles from './ProfileModal.module.css'
import { modalContext } from '../../../pages/user/profile/index'
import swal from 'sweetalert'
import axios from 'axios'

const ProfileModal = ({ style, userData }) => {

    const [isAvaHover, setisAvaHover] = useState(false)
    const [user, setUser] = useState('')
    const [userPhoto, setUserPhoto] = useState('')
    const [updatedData, setUpdatedData] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [updatedPhoto, setUpdatedPhoto] = useState('')
    const [previewPhoto, setPreviewPhoto] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isDeactive, setIsDeactive] = useState(false)
    const { isModalActive, handleModaldeactive, handleUserPhoto, handleUserName } = useContext(modalContext)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (userData.status === 1) {
                userData.status = 'active'
            }
            setUser(userData)
            setUserPhoto(userData.photo)
        }
    }, [userData])

    const handleChange = (e) => {
        e.persist()
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })
    }

    const handleChangePhoto = (e) => {
        // e.persist()
        const file = e.target.files[0]
        const urlPreview = URL.createObjectURL(file)
        setUserPhoto(urlPreview)
        // handleUserPhoto(urlPreview)
        setUpdatedPhoto(file)
        setPreviewPhoto(urlPreview)
    }

    console.log(updatedPhoto)

    const handleDelPrev = () => {
        // user.photo = ''
        setUserPhoto(user.photo)
        setPreviewPhoto('')
        setUpdatedPhoto('')
    }

    // Handle Submit Update
    const handleUpdate = async (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('photo', updatedPhoto)
        formData.append('name', updatedData.name)
        formData.append('email', updatedData.email)
        formData.append('phone', updatedData.phone)

        console.log(formData.get('photo'))
        console.log(formData.get('name'))
        console.log(formData.get('email'))
        console.log(formData.get('phone'))

        if (formData.get('name') === user.name || formData.get('name') === 'undefined') {
            formData.set('name', '')
            console.log(typeof formData.get('name'))
        }
        if (formData.get('email') === user.email || formData.get('email') === 'undefined') {
            formData.set('email', '')
            console.log(typeof formData.get('email'))
        }
        if (formData.get('phone') === user.phone || formData.get('phone') === 'undefined') {
            formData.set('phone', '')
            console.log(typeof formData.get('email'))
        }

        if (formData.get('photo') === '' && formData.get('name') === '' && formData.get('email') === '' && formData.get('phone') === '') {
            swal({
                title: "Warning",
                text: 'tidak ada data yang diubah, buat apa klik update?',
                icon: "warning",
            });
            return
        }

        try {
            const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/edit`, formData, {
                withCredentials: true,
                onUploadProgress: progressEvent => {
                    let percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                    console.log(`${progressEvent.loaded}kb of ${progressEvent.total}kb | ${percent}%`)

                    if (percent < 96) {
                        setUploadProgress(percent)
                    }
                }
            })
            const updatedResult = result.data.data
            console.log(result.data.data)
            setUploadProgress(100)
            setTimeout(() => {
                setUploadProgress(0)
            }, 1000)

            swal({
                title: "Succes",
                text: 'Edit Profile Success',
                icon: "success",
            })

            if (updatedResult.photo) {
                handleUserPhoto(updatedResult.photo)
            } else if (updatedResult.name) {
                handleUserName(updatedResult.name)
            }

        } catch (error) {
            console.log(error)
        }
    }
    // Handle Submit Update End

    return (
        <div className={`${styles.profile_modal}`}
            style={style}
        >
            <p onClick={
                () => {
                    handleModaldeactive()
                    setIsDeactive(true)
                }
            }>close</p>
            <div className={`${styles.modal_container}`}>
                <h1>Edit Profile</h1>
                <UserAva
                    source={userPhoto ? userPhoto : '/assets/img/dummy-img.jpg'}
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
                        <label
                            // text={'Edit'}
                            htmlFor={'photo'}
                        >
                            Change
                        </label>
                        {previewPhoto ?
                            <Button
                                text={'X'}
                                onClick={handleDelPrev}
                            />
                            :
                            <></>
                        }
                        <input
                            type={'file'}
                            id={'photo'}
                            name={'photo'}
                            style={{
                                display: 'none'
                            }}
                            onChange={handleChangePhoto}
                        />
                    </div>
                </UserAva>
                <h3>Status: {user ? user.status : 'not active'}</h3>
                <div className={`${styles.forms}`}>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='id'>ID</label>
                        <input type='text' id='id' name='id' defaultValue={user.id ? user.id : ''} disabled />
                    </div>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' defaultValue={user.name ? user.name : ''} onChange={handleChange} />
                    </div>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' id='email' name='email' defaultValue={user.email ? user.email : ''} onChange={handleChange} />
                    </div>
                    <div className={`${styles.form_input}`}>
                        <label htmlFor='phone'>Phone</label>
                        <input type='text' id='phone' name='phone' defaultValue={user.phone ? user.phone : ''} onChange={handleChange} />
                    </div>
                </div>
                {uploadProgress ?
                    <h3>{uploadProgress} %</h3>
                    :
                    <></>
                }
                <Button
                    type={'button'}
                    text={'Update'}
                    className={`${styles.update_btn}`}
                    onClick={handleUpdate}
                />
            </div>
        </div>
    )
}

export default ProfileModal