import React from 'react'
import axios from 'axios';

const StaticDetailRecipe = ({recipe}) => {

    console.log(recipe)

    return (
        <div>
            <h1>Static Recipe Detail</h1>
            <ul>
                <li>{recipe && recipe.name}</li>
                <li>{recipe && recipe.email}</li>
            </ul>
        </div>
    )
}

export async function getStaticPaths() {
    // const id = context.params.id
    // const { data: respData } = await axios.get(`http://localhost:4000/v1/recipes`)
    const { data: respData } = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    // console.log(respData)

    const dataRecipes = respData

    const paths = dataRecipes.map((recipe) => {
        return {
            params: {
                id: recipe.id + ''
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

    console.log(RespData)

    return {
        props: {
            recipe: RespData
        }
    }
}

export default StaticDetailRecipe