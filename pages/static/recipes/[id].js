import React from 'react'
import axios from 'axios';

const StaticDetailRecipe = ({recipe}) => {

    console.log(recipe)
    // console.log(recipe)

    return (
        <div>
            <h1>Static Recipe Detail</h1>
            <ul>
                <li>{recipe && recipe.title}</li>
                <li>recipe by : {recipe && recipe.recipe_by}</li>
            </ul>
        </div>
    )
}

export async function getStaticPaths() {
    // const id = context.params.id
    // const { data: respData } = await axios.get(`http://localhost:4000/v1/recipes`)
    const { data: respData } = await axios.get(`http://localhost:4000/v1/recipes`)
    // console.log(respData)

    const dataRecipes = respData.data
    console.log(dataRecipes)

    const paths = dataRecipes.map((recipe) => {
        return {
            params: {
                id: recipe.id + ''
            }
        }
    })

    console.log(paths)

    return {
        // paths: [],
        paths: paths,
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {
    const id = context.params.id
    // const { data: RespData } = await axios.get(`http://localhost:4000/v1/recipes/detail/${id}`)
    const { data: RespData } = await axios.get(`http://localhost:4000/v1/recipes/detail/${id}`)
    const recipe = RespData.data

    console.log(recipe) // test test

    return {
        props: {
            recipe
        }
    }
}

export default StaticDetailRecipe