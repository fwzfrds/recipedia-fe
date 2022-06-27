import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout1 from '../../../components/layout1'
import styles from './Profile.module.css'
import Image from 'next/image'
import UserAva from '../../../components/base/userAva/Image'
import UserRecipes from '../../../components/layout2'
import swal from 'sweetalert'
import { useRouter } from 'next/router'
import axios from 'axios'

const Profile = () => {

    const router = useRouter()
    const [authToken, setAuthToken] = useState('')
    const [userData, setUserData] = useState('')
    const [recipesData, setRecipesData] = useState('')
    const [menuActive, setMenuActive] = useState('my_recipe')

    useEffect(() => {
        const dataFromLocal = JSON.parse(localStorage.getItem('RecipediaUser'))
        if (dataFromLocal === null) {
            swal({
                title: "warning!",
                text: `You should login first to access this page`,
                icon: "warning",
            });
            router.push('/auth/user/login')
            return
        }
        setAuthToken(dataFromLocal.token)
    }, [router])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/profile`, {
                //     headers: { Authorization: `Bearer ${authToken}` }
                // })
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/profile`, {
                    // headers: { Authorization: `Bearer ${authToken}` },
                    withCredentials: true
                })
                const data = result.data.data
                setUserData(data)
            } catch (error) {
                console.log(error)
                swal({
                    title: "warning!",
                    text: `${error.response.data.message}`,
                    icon: "warning",
                })

                // router.push('/auth/user/login')
            }

        }
        if (authToken) {
            fetchUser()
        }
    }, [authToken])

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                console.log(authToken)
                if (menuActive === 'my_recipe') {
                    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes/user-recipe`, {
                        // headers: { Authorization: `Bearer ${authToken}` },
                        withCredentials: true
                    })
                    const data = result.data
                    setRecipesData(data)
                } else if (menuActive === 'liked_recipe') {
                    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes/liked?page=1&limit=4`, {
                        // headers: { Authorization: `Bearer ${authToken}` }
                        withCredentials: true
                    })
                    const data = result.data
                    setRecipesData(data)
                } else if (menuActive === 'saved_recipe') {
                    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes/saved?page=1&limit=4`, {
                        // headers: { Authorization: `Bearer ${authToken}` }
                        withCredentials: true
                    })
                    const data = result.data
                    setRecipesData(data)
                }
            } catch (error) {
                if (error.response.data.message === 'Data not found') {
                    setRecipesData('')
                } else {
                    console.log(error)
                }
            }
        }
        if (menuActive && authToken) {
            fetchRecipes()
        }
    }, [menuActive, authToken])

    const handleClickMenu = (e) => {
        const data = (e.target.innerText).toLowerCase()
        setMenuActive(data.replace(' ', '_'))
    }

    console.log(menuActive)
    console.log(recipesData)

    return (
        <>
            <Head>
                <title>Recipedia | User Profile</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout1>
                <div className={`${styles.user_profile}`}>
                    <div className={`${styles.ava_container}`}>
                        <div className={`${styles.user_ava}`}>
                            <UserAva
                                source={userData ? userData.photo : '/assets/img/dummy-img.jpg'}
                                style={{
                                    width: 100,
                                    height: 100,
                                    position: 'relative',
                                    borderRadius: '50%',
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 20H21" stroke="#EFC81A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z" stroke="#EFC81A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </UserAva>
                        </div>
                        <h3>{userData?.name}</h3>
                    </div>

                    <UserRecipes
                        onClickMenu={handleClickMenu}
                        menuActive={menuActive}
                        recipesData={recipesData ? recipesData : ''}
                    />
                </div>
            </Layout1>
        </>
    )
}

// export const getServerSideProps = async (context) => {
//     try {
//       // const { id } = context.params
//       console.log(context.params)
//       const { data: RespData } = await axios.get(`http://localhost:4000/v1/recipes`)
//       const result = RespData.data
//       console.log('test server side')
//       // console.log(result)
//       return {
//         props: { products: RespData.data }
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

export default Profile