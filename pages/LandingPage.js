import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout1 from "../components/layout1"
import Card from '../components/module/card/card'
import styles from '../styles/LandingPage.module.css'
import axios from 'axios'
import Button from '../components/base/button/button'

const LandingPage = ({ products }) => {

  console.log(products)

  const router = useRouter()
  const [data, setData] = useState('')
  const [serverSideData, setSeverSideData] = useState('')
  const [recipes, setRecipes] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes`)
      setData(result.data)
      setRecipes(result.data.data)
      // setSeverSideData(result.data.data)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (products) {
      setSeverSideData(products)
    }
  }, [products])

  const handleRecipeClick = (id) => {
    router.push(`/recipe/detail/${id}`)
  }

  const handleSearchInput = (e) => {
    e.persist()
    setSearchValue(e.target.value)
  }

  const onSubmitSearch = (e) => {
    e.preventDefault()

    router.push(`/recipe/search?keyword=${searchValue}`)
  }

  return (
    <>
      <Head>
        <title>Recipedia | Home</title>
        <meta name="description" content="Generated by Recipedia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout1>
        <div className={`${styles.box1}`}>

        </div>
        <div className={`${styles.landing_container}`}>
          <main className={`${styles.main_section}`}>
            <div className={`${styles.discover}`}>
              <h3>Discover Recipe & Delicious Food</h3>
              <form onSubmit={onSubmitSearch}>
                <input
                  type='text'
                  placeholder='Search your favorite food'
                  onChange={handleSearchInput}
                />
                <Button
                  type={'submit'}
                  style={{
                    display: 'none'
                  }}
                />
              </form>
            </div>
            <div className={`${styles.banner1}`}>
              <div className={`${styles.img_container}`}>
                <Image src={'/assets/img/landing/landing1.png'} alt={''} layout={'fill'} priority />
              </div>
            </div>
          </main>
          <div className={`${styles.popular}`}>
            <h3>Popular Recipes</h3>
            <div className={`${styles.cards}`}>
              {!serverSideData ? <h4>Loading...</h4> : serverSideData.map((recipe, idx) => {
                return (
                  <Card
                    recipeName={recipe.title}
                    photo={!recipe.photo ? 'https://fakeimg.pl/500x500/?text=Hello' : recipe.photo}
                    key={idx}
                    onClick={() => handleRecipeClick(recipe.id)}
                  />
                )
              })

              }

            </div>
          </div>
          {/* <video src="https://res.cloudinary.com/muhislah/video/upload/v1655942686/nono/ykjjtzjreoda2oprrrvk.mp4"></video> */}
          {/* <video controls>
            <source src="https://res.cloudinary.com/muhislah/video/upload/v1655942686/nono/ykjjtzjreoda2oprrrvk.mp4" type="video/mp4" />
          </video> */}
        </div>
      </Layout1>
    </>
  )
}

export default LandingPage