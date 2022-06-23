import React, { useCallback, useState, useEffect } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import Layout1 from '../../../components/layout1'
import styles from './EditRecipe.module.css'
import { useDropzone } from 'react-dropzone'
import Input from '../../../components/base/input/input'
import Button from '../../../components/base/button/button'
import swal from 'sweetalert'
import axios from 'axios'

const EditRecipe = () => {

    const router = useRouter()
    const { edit: id } = router.query

    const [files, setFiles] = useState([])
    const [video, setVideo] = useState([])
    const [photo, setPhoto] = useState([])
    const [prevVideo, setPrevVideo] = useState([])
    const [prevPhoto, setPrevPhoto] = useState([])
    const [authToken, setAuthToken] = useState([])
    const [recipeData, setRecipeData] = useState({})
    const [recipeUpdate, setRecipeUpdate] = useState({})
    const [ingredients, setIngredients] = useState(undefined)
    const [title, setTitle] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    // Get Auth Token From Local Storage
    useEffect(() => {
        const dataFromLocal = JSON.parse(localStorage.getItem('RecipediaUser'))
        // console.log(dataFromLocal)
        if (dataFromLocal === null) {
            swal({
                title: "warning!",
                text: `You should login first to access this page`,
                icon: "warning",
            });
            Router.push('/auth/user/login')
            return
        }
        setAuthToken(dataFromLocal.token)
    }, []);

    // Get Previous Recipe Data
    useEffect(() => {
        if (id) {
            const fetch = async () => {
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes/detail/${id}`)
                const data = result.data.data
                // data.ingredients = (data.ingredients).split(',')
                setRecipeData(data)
                console.log('set ingredients...')
                setIngredients(data.ingredients)
                console.log('set title...')
                setTitle(data.title)
                if (data.photo) {
                    setPrevPhoto(data.photo)
                }
                if (data.video) {
                    setPrevVideo(data.video)
                }
            }
            fetch()
        }
    }, [id])

    // Handle Upload Photo
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles[0].size > 2097152) {
            return swal({
                title: "Error!",
                text: `Image must be 2MB or lower`,
                icon: "error",
            });
        }
        if (acceptedFiles[0].type !== 'image/jpeg' && acceptedFiles[0].type !== 'image/jpg' && acceptedFiles[0].type !== 'image/png') {
            return swal({
                title: "Error!",
                text: `Image must be in .jpeg, .jpg, or .png format!`,
                icon: "error",
            });
        }
        setPhoto(
            acceptedFiles[0]
        )
        setFiles(
            acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        )
        setPrevPhoto(acceptedFiles[0].preview)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    // Handle Upload Photo End

    // Handle Upload Video
    const handleUploadVideo = (e) => {
        console.log(e.target.files[0]);
        let uploaded = e.target.files[0]
        if (uploaded.size > 104857600) { // 100mb
            return swal({
                title: "Error!",
                text: `Video must be 100MB or lower`,
                icon: "error",
            });
        }
        if (uploaded.type !== 'video/mp4') {
            return swal({
                title: "Error!",
                text: `Video must be in .mp4 format!`,
                icon: "error",
            });
        }
        setVideo(uploaded)
        console.log('Set Prev Video...')
        setPrevVideo(uploaded.name)
    }
    // Handle Upload Video End

    // Handle Input Form
    const handleInput = (e) => {
        e.persist();
        setRecipeUpdate({ ...recipeUpdate, [e.target.name]: e.target.value })
    }
    console.log(recipeUpdate)
    // Handle Input Form End

    // handleClickChange
    const handleClickChange = () => {
        setPrevPhoto([])
    }
    // handleClickChange End

    // Handle Submit Add Recipe
    const handleSubmit = async (e) => {
        e.preventDefault()


        let formData = new FormData()
        formData.append('photo', photo)
        formData.append('video', video)

        formData.append('title', recipeUpdate.title)
        formData.append('ingredients', recipeUpdate.ingredients)


        if (formData.get('title') === recipeData.title || formData.get('title') === 'undefined') {
            formData.set('title', [])
            console.log(typeof formData.get('title'))
        }
        if (formData.get('ingredients') === recipeData.ingredients || formData.get('ingredients') === 'undefined') {
            formData.set('ingredients', [])
        }

        try {
            if (formData.get('title').length === 0 && formData.get('ingredients').length === 0 && formData.get('photo').length === 0 && formData.get('video').length === 0) {
                swal({
                    title: "Warning",
                    text: 'tidak ada data yang diubah, buat apa klik update?',
                    icon: "warning",
                });
                return
            }

            setIsLoading(true)

            const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes/edit/${id}`, formData, {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            // const newRecipeID = result.data.data.id
            console.log(result.data.data)
            setIsLoading(false)

            swal({
                title: "Succes",
                text: 'Edit New Recipe Success',
                icon: "success",
            })

            // setPhoto([])
            // setVideo([])

            // nanti kalo sudah terupdate harusnya reload disini untuk dapat data terupdate cari caranya nanti

            // e.target.reset()
            // Router.push(`/recipe/detail/${newRecipeID}`)
        } catch (error) {
            console.log(error)
            swal({
                title: "Error!",
                text: `edit recipe error`,
                icon: "error",
            });
        }
        // }
    }
    // Handle Submit Add Recipe End

    return (
        <>
            <Head>
                <title>Recipedia | Edit Recipe</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout1>
                <div className={`${styles.add_recipe}`}>
                    <form id='recipe-form' onSubmit={handleSubmit} className={`${styles.forms_container}`}>
                        <div className={`${styles.dropzone_container}`}>
                            {prevPhoto.length === 0 ?
                                <div {...getRootProps()} className={`${styles.dropzone_img}`}>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Drop the files here ...</p> :
                                            <div>
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M50.6667 8H13.3333C10.3878 8 8 10.3878 8 13.3333V50.6667C8 53.6122 10.3878 56 13.3333 56H50.6667C53.6122 56 56 53.6122 56 50.6667V13.3333C56 10.3878 53.6122 8 50.6667 8Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M22.6667 26.6666C24.8759 26.6666 26.6667 24.8758 26.6667 22.6666C26.6667 20.4575 24.8759 18.6666 22.6667 18.6666C20.4576 18.6666 18.6667 20.4575 18.6667 22.6666C18.6667 24.8758 20.4576 26.6666 22.6667 26.6666Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M55.9999 40L42.6666 26.6666L13.3333 56" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p>Drag & drop some files here, or click to select files</p>
                                            </div>
                                    }
                                </div>
                                :
                                <>
                                    <Image priority src={prevPhoto.length === 0 ? '/assets/img/dummy-img.jpg' : prevPhoto} alt="" layout='fill' />
                                    <div className={`${styles.change_img}`}
                                        onClick={handleClickChange}
                                    >
                                        <h2>Change Picture</h2>
                                    </div>
                                </>
                            }
                        </div>
                        {/* <Input
                            type={'text'}
                            id={'title'}
                            name={'title'}
                            // label={''}
                            onChange={handleInput}
                            // placeholder={title ? title : 'Title'}
                            defaultValue={title ? `${title}` : `${title}`}
                            className={`${styles.input_form}`}
                        // value={value}
                        /> */}
                        <input
                            type={'text'}
                            id={'title'}
                            name={'title'}
                            // label={''}
                            onChange={handleInput}
                            // placeholder={title ? title : 'Title'}
                            defaultValue={title ? `${title}` : `${title}`}
                            className={`${styles.input_form}`}
                        // value={value}
                        />

                        <textarea
                            name="ingredients" id="ingredients" cols="30" rows="10"
                            className={`${styles.input_textarea}`}
                            placeholder='Tuliskan bahan-bahan dengan memisahkan dengan tanda koma (,) tanpa spasi. Contoh: 1 butir telur,1/2 kg Terigu,200ml air,...'
                            // placeholder={ingredients ? ingredients : 'Tuliskan bahan-bahan dengan memisahkan dengan tanda koma (,) tanpa spasi. Contoh: 1 butir telur,1/2 kg Terigu,200ml air,...'}
                            onChange={handleInput}
                            defaultValue={ingredients}
                        >
                        </textarea>
                        <div className={`${styles.input_form} ${styles.input_video}`}>
                            <label htmlFor="video"
                                style={{
                                    width: '100%',
                                    cursor: 'pointer'
                                }}
                            >
                                {prevVideo.length === 0 ? 'Video' : prevVideo}
                                <input
                                    type={'file'}
                                    id={'video'}
                                    name={'video'}
                                    style={{
                                        display: 'none'
                                    }}
                                    onChange={handleUploadVideo}
                                    placeholder={'Video'}
                                />
                            </label>
                        </div>
                    </form>
                    <Button
                        className={`${styles.form_button}`}
                        type={'submit'}
                        text={'Post'}
                        form={'recipe-form'}
                    />
                    {isLoading === true ? <p>Loading Update...</p> : ''}
                </div>
            </Layout1>
        </>
    )
}

export default EditRecipe