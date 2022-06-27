import React, { Fragment } from 'react'
import Card from '../module/card/card'
import styles from './UserRecipes.module.css'
import { useRouter } from 'next/router'

const UserRecipes = ({ onClickMenu, menuActive, recipesData }) => {

    const router = useRouter()

    console.log(recipesData)

    const handleRecipeClick = (recipeID) => {
        router.push(`/recipe/detail/${recipeID}`)
    }

    return (
        <div className={`${styles.user_recipes}`}>
            <div className={`${styles.menu}`}>
                <ul>
                    <li onClick={onClickMenu} className={menuActive === 'my_recipe' ? `${styles.my_recipe}` : undefined}>my recipe</li>
                    <li onClick={onClickMenu} className={menuActive === 'saved_recipe' ? `${styles.saved_recipe}` : undefined}>saved recipe</li>
                    <li onClick={onClickMenu} className={menuActive === 'liked_recipe' ? `${styles.liked_recipe}` : undefined}>liked recipe</li>
                </ul>
            </div>
            <hr />
            <div className={`${styles.recipes_cards}`}>
                {recipesData ? (recipesData.data).map((recipe, idx) => {
                    return (
                        <Fragment key={idx}>
                            <Card
                                recipeName={recipe.title}
                                photo={recipe.photo}
                                style={{
                                    width: 300,
                                    height: 300
                                }}
                                onClick={() => (recipe.id).length <= 36 ? handleRecipeClick(recipe.id) : handleRecipeClick(recipe.id_recipe)}
                            />
                        </Fragment>
                    )
                })
                    :
                    <h3>Empty, Let&apos;s add some recipes to this list</h3>}

            </div>
        </div>
    )
}

export default UserRecipes