import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import Layout1 from '../../../components/layout1'
import styles from './StaticUsers.module.css'
import Card from '../../../components/module/card/card'
import Router from 'next/router'

const StaticUsers = ({ users }) => {

    const handleRecipeClick = (id) => {
        Router.push(`/static/users/${id}`)
    }

    return (
        <>
            <Head>
                <title>Recipedia | Static Users</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.static_recipes}`}>
                <Layout1>
                    <h1>Static Recipes</h1>
                    <div className={`${styles.cards}`}>
                        {users && users.map((user, idx) => {
                            return (
                                <Card
                                    recipeName={user.name}
                                    photo={!user.photo ? 'https://fakeimg.pl/500x500/?text=Hello' : user.photo}
                                    key={idx}
                                    onClick={() => handleRecipeClick(user.id)}
                                />
                            )
                        })

                        }
                    </div>
                </Layout1>
            </div>
        </>
    )
}

export const getStaticProps = async () => {
    // const { data: RespData } = await axios.get("http://localhost:4000/v1/recipes")
    const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    const dataUsers = response.data
    console.log(dataUsers)
    return {
        props: {
            users: dataUsers
        }
    }
}

export default StaticUsers