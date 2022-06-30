import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout1 from '../../../components/layout1'
import styles from './RecipeDetail.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
// import swal from 'sweetalert'
import Button from '../../../components/base/button/button'
// import Loading from '../../../components/base/loading/loading'

const RecipeDetail = ({ recipe }) => {

    const router = useRouter()
    const { detail: id } = router.query

    console.log(recipe)

    const [ingredients, setIngredients] = useState(undefined)
    const [isMyRecipe, setIsMyRecipe] = useState(false)
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        if (recipe) {
            // setRecipeData(recipe)
            setImage(recipe.photo)
            // console.log(recipe.photo)
            setTitle(recipe.title)
            setAuthor(recipe.recipe_by)
            setIngredients((recipe.ingredients).split(','))
            setVideo(recipe.video)
        }
    }, [recipe])

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                try {
                    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes/${id}`, {
                        withCredentials: true
                    })
                    console.log(result.data.data)
                    setIsMyRecipe(true)
                } catch (error) {
                    setIsMyRecipe(false)
                }
            }
            fetch()
        }
    }, [id])

    return (
        <>
            <Head>
                <title>Recipedia | Recipe Detail</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout1>
                <div className={`${styles.recipe_details}`}>
                    <div className={`${styles.details_container}`}>
                        <h1>{!title ? 'Loading...' : title}</h1>
                        <p>recipe by : {!author ? 'john doe' : author}</p>
                        <div className={`${styles.img_container}`}>
                            <Image src={image ? image : 'https://fakeimg.pl/800x450/?text=Recipedia'} priority alt='' layout='fill' />
                            <div className={`${styles.actions}`}>
                                <div className={`${styles.saved}`}>
                                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.1104 26.9994L11.9993 19.7772L1.88818 26.9994V3.88828C1.88818 3.1221 2.19255 2.3873 2.73432 1.84553C3.27609 1.30375 4.01089 0.99939 4.77707 0.99939H19.2215C19.9877 0.99939 20.7225 1.30375 21.2643 1.84553C21.806 2.3873 22.1104 3.1221 22.1104 3.88828V26.9994Z" stroke="#E9E9E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className={`${styles.liked}`}>
                                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.63705 34.9998H4.45482C3.53854 34.9998 2.6598 34.6416 2.01189 34.004C1.36399 33.3663 1 32.5015 1 31.5998V19.6999C1 18.7981 1.36399 17.9334 2.01189 17.2957C2.6598 16.6581 3.53854 16.2999 4.45482 16.2999H9.63705M21.7289 12.8999V6.09997C21.7289 4.74737 21.1829 3.45018 20.2111 2.49375C19.2392 1.53732 17.9211 1 16.5467 1L9.63705 16.2999V34.9998H29.1222C29.9554 35.0091 30.7639 34.7217 31.3988 34.1906C32.0337 33.6595 32.4521 32.9205 32.5771 32.1098L34.9609 16.8099C35.036 16.3226 35.0026 15.8251 34.863 15.3517C34.7234 14.8784 34.4808 14.4406 34.1522 14.0687C33.8236 13.6968 33.4167 13.3996 32.9598 13.1978C32.5029 12.996 32.0068 12.8943 31.5061 12.8999H21.7289Z" stroke="#EFC81A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.ingredients}`}>
                            <h3>Ingredients</h3>
                            {/* {(data.ingredients).map(ingredient => {
                                
                            })} */}
                            <ul>
                                {!ingredients ? <p>Loading...</p> :
                                    ingredients.map((ingredient, idx) => {
                                        return (
                                            <li key={idx}>{ingredient}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={`${styles.video_step}`}>
                            <h3>Video Step</h3>
                            {video &&
                                <video width="500" controls>
                                    <source src={video} type="video/mp4" />
                                </video>
                            }
                        </div>
                        {isMyRecipe &&
                            <div className={`${styles.edit_recipe}`}>
                                <Button
                                    text={'edit recipe'}
                                    onClick={() => router.push(`/recipe/edit/${id}`)}
                                />
                            </div>
                        }
                    </div>
                </div>
            </Layout1>
        </>
    )
}

export const getServerSideProps = async (context) => {
    try {
        // server side props cannot return object
        const recipeID = context.params.detail
        console.log(recipeID)
        const { data } = await axios.get(`http://localhost:4000/v1/recipes/detail/${recipeID}`)
        const result = data.data
        console.log(result)

        return {
            props: { recipe: result }
            // props: {}
        }
    } catch (error) {
        console.log(error)
    }
}

export default RecipeDetail