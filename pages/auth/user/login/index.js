import React, { useEffect, useState } from 'react'
import styles from './UserLogin.module.css'
import Image from 'next/image'
import Head from 'next/head'
import Input from '../../../../components/base/input/input'
import Link from 'next/link'
import Button from '../../../../components/base/button/button'
import axios from 'axios'
import swal from 'sweetalert'
import { useRouter } from 'next/router'

const UserLogin = () => {

    const router = useRouter()
    // console.log(router.query.activation)

    useEffect(() => {
        if (router.query.activation) {
            swal({
                title: "Congrats!",
                text: `Your account has been activated!`,
                icon: "success"
            })
        }
    }, [router.query.activation])


    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const [isAgree, setIsAgree] = useState(false)

    const handleInput = (e) => {
        e.persist();
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const handleCheckbox = (e) => {
        setIsAgree(e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (isAgree) {
                const result = await axios({
                    url: `${process.env.NEXT_PUBLIC_API_URL}/v1/users/login`,
                    method: 'POST',
                    // withCredentials: true,
                    data: loginData,
                    // crossDomain: true
                })
                // const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/login`, loginData, {withCredentials: true})
                const token = result.data.data.token
                const data = {
                    token: token
                }

                await fetch('/api/loginnext', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                // const isToken = await cookie.json()
                // if (!isToken) {
                //     return swal({
                //         title: 'warning',
                //         text: `Login Error`,
                //         icon: 'warning',
                //     })
                // }

                const dataLocal = {
                    name: result.data.data.name,
                    id: result.data.data.id,
                    email: result.data.data.email,
                    photo: result.data.data.photo,
                    status: result.data.data.status,
                    token: result.data.data.token,
                    refreshToken: result.data.data.RefreshToken,
                }
                console.log(dataLocal)
                localStorage.setItem('RecipediaUser', JSON.stringify(dataLocal))

                swal({
                    title: "Good job!",
                    text: `Anda berhasil login`,
                    icon: "success"
                });

                router.push('/')
            } else {
                swal({
                    title: "Warning",
                    text: `Anda harus menyetujui persyaratan kami terlebih dahulu untuk lanjut!`,
                    icon: "warning"
                });
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

    return (
        <>
            <Head>
                <title>Recipedia | Login</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.user_login}`}>
                <div className={`${styles.banner}`}>
                    <Image
                        priority
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
                        <p className={`${styles.name}`}
                            onClick={() => router.push('/')}
                        >recipedia.</p>
                    </div>
                </div>
                <div className={`${styles.login_forms}`}>
                    <div className={`${styles.forms_container}`}>
                        <div className={`${styles.greeting}`}>
                            <h3>Welcome</h3>
                            <p>Log in into your exiting account</p>
                        </div>
                        <form id='login-form' onSubmit={handleSubmit} className={`${styles.input_forms}`}>
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
                                type={'password'}
                                id={'password'}
                                name={'password'}
                                label={'Password'}
                                onChange={handleInput}
                                placeholder={'password'}
                            // value={value}
                            />
                        </form>
                        <div className={`${styles.terms}`}>
                            <input type="checkbox" name="terms" id="terms" onChange={handleCheckbox} />
                            <Link href="/">
                                <a>I agree to terms & conditions</a>
                            </Link>
                        </div>
                        <Button
                            form={'login-form'}
                            type={'submit'}
                            text={'Login'}
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
                            <Link href="/auth/user/signup">
                                <a>Sign Up</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin