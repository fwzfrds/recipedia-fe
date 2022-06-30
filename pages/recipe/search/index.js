import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout1 from '../../../components/layout1'
import Head from 'next/head'
import styles from './Search.module.css'
import Card from '../../../components/module/card/card'
// import Button from '../../../components/base/button/button'
import axios from 'axios'
import swal from 'sweetalert'

const SearchRecipe = () => {

    const router = useRouter()
    const [recipes, setRecipes] = useState('')
    const [data, setData] = useState('')
    const [search, setSearch] = useState('')
    const [pageActive, setPageActive] = useState(1)
    // const [sortBy, setSortBy] = useState('')
    // const [sortOrder, setSortOrder] = useState('')
    const [sort, setSort] = useState({
        sortBy: '',
        sortOrder: ''
    })

    const fetchData = async (page) => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes?search=${router.query.keyword}&page=${page}`)
        setData(result.data)
        setRecipes(result.data.data)
    }

    const fetchSort = async ({ sortBy, sortOrder }) => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes?search=${router.query.keyword}&sortby=${sortBy}&sortorder=${sortOrder}&page=1`)
        setData(result.data)
        setRecipes(result.data.data)
    }

    // const fetchSearch = async () => {
    //     const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes?search=${router.query.keyword}`)
    //     setData(result.data)
    //     setRecipes(result.data.data)
    //     setSearch(router.query.keyword)
    // }

    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes?search=${router.query.keyword}`)
            setData(result.data)
            setRecipes(result.data.data)
            setSearch(router.query.keyword)
        }
        if (router.query.keyword !== undefined) {
            console.log(router.query.keyword)
            fetch()
        }
    }, [router.query.keyword])

    const handlePage = (page) => {
        fetchData(page)
        setPageActive(page)
    }

    const handleSelectBy = (e) => {
        // setSortBy(e.target.value)
        setSort({ ...sort, sortBy: e.target.value })
    }

    const handleSelectOrder = (e) => {
        // setSortOrder(e.target.value)
        setSort({ ...sort, sortOrder: e.target.value })
    }

    const handleSubmitSort = (e) => {
        e.preventDefault()

        fetchSort(sort)
    }

    const handleRecipeClick = (id) => {
        router.push(`/recipe/detail/${id}`)
    }

    const handleSearchInput = (e) => {
        e.persist()
        setSearch(e.target.value)
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault()
        if (search === router.query.keyword) {
            return swal({
                title: "Warning!",
                text: `This is the result of ${search}`,
                icon: "warning"
            })
        }

        // if (search === '') {
        //     return swal({
        //         title: "Warning!",
        //         text: `Enter the keyword`,
        //         icon: "warning"
        //     })
        // }
        router.push(`/recipe/search?keyword=${search}`)
    }

    console.log(search)

    return (
        <>
            <Head>
                <title>Recipedia | Search</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout1>
                <div className={`${styles.search_page}`}>
                    <div className={`${styles.recipes}`}>
                        <div className={`${styles.actions}`}>
                            {/* <h3>Result :</h3> */}
                            <form
                                id='search-input' className={`${styles.search_container}`}
                                onSubmit={handleSubmitSearch}
                            >
                                <input
                                    className={`${styles.search_recipe}`} type="text" placeholder='search' defaultValue={router.query.keyword} onChange={handleSearchInput}
                                />
                                <button
                                    type='submit' form='search-input'
                                >
                                    Search
                                </button>
                            </form>
                            <form id='sort-form' className={`${styles.sort_form}`} onSubmit={handleSubmitSort}>
                                <div className={`${styles.sort_by}`}>
                                    <h3>Sort by : </h3>
                                    <select name="cars" id="cars" onChange={handleSelectBy} defaultValue='sort by'>
                                        <option>Sort By</option>
                                        <option value="category">Category</option>
                                        <option value="created_at">Created At</option>
                                    </select>
                                </div>
                                <div className={`${styles.sort_order}`}>
                                    <h3>Sort Order : </h3>
                                    <select name="cars" id="cars" onChange={handleSelectOrder} defaultValue='sort order'>
                                        <option>Sort Order</option>
                                        <option value="asc">Oldest</option>
                                        <option value="desc">Newest</option>
                                    </select>
                                </div>
                                <button
                                    form='sort-form'
                                    type='submit'
                                // style={{
                                //     display: 'none'
                                // }}

                                >Sort</button>
                            </form>
                        </div>
                        <div className={`${styles.cards}`}>
                            {!data ? <p>Loading</p> : recipes.map((recipe, idx) => {
                                return (
                                    <Card
                                        recipeName={recipe.title}
                                        photo={!recipe.photo ? 'https://fakeimg.pl/500x500/?text=Hello' : recipe.photo}
                                        key={idx}
                                        onClick={() => handleRecipeClick(recipe.id)}
                                    />
                                )
                            })}

                        </div>
                        <div className={`${styles.pagination}`}>
                            {data ? new Array(data.pagination.totalPage).fill().map((item, idx) =>
                                <button
                                    className={pageActive === idx + 1 ? `${styles.page} ${styles.page_active}` : `${styles.page}`}
                                    key={idx}
                                    onClick={() => handlePage(idx + 1)}
                                >
                                    {idx + 1}
                                </button>
                            ) : <p>Loading...</p>}
                        </div>
                    </div>
                </div>
            </Layout1>
        </>
    )
}

export default SearchRecipe