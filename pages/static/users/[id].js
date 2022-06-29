import React from 'react'
import axios from 'axios';

const StaticDetailUser = ({user}) => {

    // console.log(recipe)

    return (
        <div>
            <h1>Static User Detail</h1>
            <ul>
                <li>{user && user.name}</li>
                <li>{user && user.email}</li>
            </ul>
        </div>
    )
}

export async function getStaticPaths() {
    // const id = context.params.id
    // const { data: respData } = await axios.get(`http://localhost:4000/v1/recipes`)
    const { data: respData } = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    // console.log(respData)

    const dataUsers = respData

    const paths = dataUsers.map((user) => {
        return {
            params: {
                id: user.id + ''
            }
        }
    })

    console.log(paths)

    return {
        paths: paths,
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const id = context.params.id
    // const { data: RespData } = await axios.get(`http://localhost:4000/v1/recipes/detail/${id}`)
    const { data: RespData } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

    console.log(RespData) // test test

    return {
        props: {
            user: RespData
        }
    }
}

export default StaticDetailUser