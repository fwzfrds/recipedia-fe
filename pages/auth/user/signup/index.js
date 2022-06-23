import React, { useState } from 'react'
import styles from './UserRegister.module.css'
import Image from 'next/image'
import Head from 'next/head'
import Input from '../../../../components/base/input/input'
import Link from 'next/link'
import Button from '../../../../components/base/button/button'
import axios from 'axios'
import swal from 'sweetalert'
import { useRouter } from 'next/router'

const UserRegister = () => {

    const router = useRouter()

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })

    const [isConfirm, setIsConfirm] = useState(true)
    const [confirm, setConfirm] = useState('')

    const [isAgree, setIsAgree] = useState(false)

    const handleInput = (e) => {
        e.persist()
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }

    const handleConfirm = (e) => {
        e.persist()
        setConfirm(e.target.value)
    }

    const handleCheckbox = (e) => {
        setIsAgree(e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (isAgree) {

                if (confirm !== registerData.password) {
                    setIsConfirm(false)
                    swal({
                        title: "Warning",
                        text: `There is an error. Check your input data!`,
                        icon: "warning"
                    });
                    return
                }

                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/registration`, registerData)
                console.log(result.data.data);

                swal({
                    title: "Good job!",
                    text: `Registration Successful, Please Check your email for activation`,
                    icon: "success"
                });

                router.push('/auth/user/login')
            } else {
                swal({
                    title: "Warning",
                    text: `Anda harus menyetujui persyaratan kami terlebih dahulu untuk lanjut!`,
                    icon: "warning"
                });
                return
            }
        } catch (error) {
            console.log(error)
            swal({
                title: "Warning",
                text: `${error.response.data.message}`,
                icon: "warning"
            });
        }
    }

    console.log(registerData)
    console.log(confirm)

    return (
        <>
            <Head>
                <title>Recipedia | Sign Up</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.user_register}`}>
                <div className={`${styles.banner}`}>
                    <Image
                        className={`${styles.banner_img}`}
                        src={'/assets/img/banner/banner1.png'}
                        layout={'fill'}
                        alt={''}
                    />
                    <div className={`${styles.banner_bg}`}>
                        <Image
                            className={`${styles.logo}`}
                            src={'/assets/img/icons/recipedia.png'}
                            height={100}
                            width={88}
                            alt={''}
                        />
                        <p className={`${styles.name}`}>recipedia.</p>
                    </div>
                </div>
                <div className={`${styles.register_forms}`}>
                    <div className={`${styles.forms_container}`}>
                        <div className={`${styles.greeting}`}>
                            <h3>Let’s Get Started !</h3>
                            <p>Create new account to access all features</p>
                        </div>
                        <form id='register-form' onSubmit={handleSubmit} className={`${styles.input_forms}`}>
                            <Input
                                type={'text'}
                                id={'name'}
                                name={'name'}
                                label={'Name'}
                                onChange={handleInput}
                                placeholder={'John Doe'}
                            // value={value}
                            />
                            <Input
                                type={'text'}
                                id={'email'}
                                name={'email'}
                                label={'E-Mail'}
                                onChange={handleInput}
                                placeholder={'contohemail@gmail.com'}
                            // value={value}
                            />
                            <Input
                                type={'text'}
                                id={'phone'}
                                name={'phone'}
                                label={'Phone Number'}
                                onChange={handleInput}
                                placeholder={'0877832764xxx'}
                            // value={value}
                            />
                            <Input
                                type={'password'}
                                id={'password'}
                                name={'password'}
                                label={'Password'}
                                onChange={handleInput}
                                placeholder={'password'}
                            // value={value}
                            />
                            <Input
                                type={'password'}
                                id={'confirmPassword'}
                                name={'confirmPassword'}
                                label={'Confirm Password'}
                                onChange={handleConfirm}
                                placeholder={'Confirm Password'}
                            // value={value}
                            >
                                {isConfirm === false ? <p>Confirm Password did not matched</p> : <></>}
                            </Input>
                        </form>
                        <div className={`${styles.terms}`}>
                            <input type="checkbox" name="terms" id="terms" onChange={handleCheckbox} />
                            <Link href="/">
                                <a>I agree to terms & conditions</a>
                            </Link>
                        </div>
                        <Button
                            form={'register-form'}
                            type={'submit'}
                            text={'register'}
                            style={{
                                width: '100%',
                                height: 50,
                                marginTop: 30,
                                background: '#EFC81A',
                                borderRadius: 6,
                                border: 'none',
                                color: '#FFF',
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        />
                        <div className={`${styles.forget}`}>
                            <Link href="/auth/user/reset-password">
                                <a>Forgot Password ?</a>
                            </Link>
                        </div>
                        <div className={`${styles.direct}`}>
                            <p>Don’t have an account?</p>
                            <Link href="/auth/user/registration">
                                <a>Sign Up</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserRegister