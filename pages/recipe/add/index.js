import React, { useCallback, useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image'
import Layout1 from '../../../components/layout1'
import styles from './AddRecipe.module.css'
import { useDropzone } from 'react-dropzone'
import Input from '../../../components/base/input/input'
import Button from '../../../components/base/button/button'
import swal from 'sweetalert'
import axios from 'axios'

const AddRecipe = ({ isAuth, token }) => {

    const [files, setFiles] = useState([])
    const [video, setVideo] = useState([])
    const [photo, setPhoto] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0)
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: ''
    })

    console.log(isAuth)

    useEffect(() => {
        if (isAuth === false) {
            swal({
                title: "Warning!",
                text: `Please login to add recipe page!`,
                icon: "warning"
            });
            Router.push('/auth/user/login')
        }
    }, [isAuth])

    // useEffect(() => {
    //     const dataFromLocal = JSON.parse(localStorage.getItem('RecipediaUser'))
    //     console.log(dataFromLocal)
    //     if (dataFromLocal === null) {
    //         swal({
    //             title: "warning!",
    //             text: `You should login first to access this page`,
    //             icon: "warning",
    //         });
    //         Router.push('/auth/user/login')
    //         return
    //     }
    //     setAuthToken(dataFromLocal.token)
    // }, []);

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
    }
    // Handle Upload Video End

    // Handle Input Form
    const handleInput = (e) => {
        e.persist();
        setRecipeData({ ...recipeData, [e.target.name]: e.target.value })
    }
    // Handle Input Form End

    // Handle Submit Add Recipe
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (photo.length === 0) {
            return swal({
                title: "Warning",
                text: 'Insert Image Please!',
                icon: "warning",
            });
        } else if (video.length === 0) {
            return swal({
                title: "Warning",
                text: 'Insert Video Please!',
                icon: "warning",
            });
        } else {
            let formData = new FormData()
            formData.append('photo', photo)
            formData.append('video', video)

            formData.append('title', recipeData.title)
            formData.append('ingredients', recipeData.ingredients)

            try {
                const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/recipes/add`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                    // withCredentials: true,
                    onUploadProgress: progressEvent => {
                        let percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                        console.log(`${progressEvent.loaded}kb of ${progressEvent.total}kb | ${percent}%`)

                        if (percent < 98) {
                            setUploadProgress(percent)
                        }
                    }
                })
                const newRecipeID = result.data.data.id
                console.log(result.data.data)
                setUploadProgress(100)
                setTimeout(() => {
                    setUploadProgress(0)
                }, 1000)
                swal({
                    title: "Succes",
                    text: 'Post New Recipe Success',
                    icon: "success",
                });

                setPhoto([])
                setVideo([])

                e.target.reset()
                Router.push(`/recipe/detail/${newRecipeID}`)
            } catch (error) {
                console.log(error)
                swal({
                    title: "Error!",
                    text: `Add recipe error`,
                    icon: "error",
                });
            }
        }
    }
    // Handle Submit Add Recipe End

    // console.log(uploadProgress)

    return (
        <>
            <Head>
                <title>Recipedia | Add Recipe</title>
                <meta name="description" content="Generated by Recipedia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout1>
                <div className={`${styles.add_recipe}`}>
                    <form id='recipe-form' onSubmit={handleSubmit} className={`${styles.forms_container}`}>
                        <div className={`${styles.dropzone_container}`}>
                            {photo.length === 0 ?
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
                                <Image src={files[0].preview} alt="" layout='fill' />
                            }
                        </div>
                        <Input
                            type={'text'}
                            id={'title'}
                            name={'title'}
                            // label={''}
                            onChange={handleInput}
                            placeholder={'Title'}
                            className={`${styles.input_form}`}
                        // value={value}
                        />
                        <textarea
                            name="ingredients" id="ingredients" cols="30" rows="10"
                            className={`${styles.input_textarea}`}
                            placeholder='Tuliskan bahan-bahan dengan memisahkan dengan tanda koma (,) tanpa spasi. Contoh: 1 butir telur,1/2 kg Terigu,200ml air,...'
                            onChange={handleInput}
                        >
                        </textarea>
                        <div className={`${styles.input_form} ${styles.input_video}`}>
                            <label htmlFor="video"
                                style={{
                                    width: '100%',
                                    cursor: 'pointer'
                                }}
                            >
                                {video.length === 0 ? 'Video' : video.name}
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
                    <div className={`${styles.button_container}`}>
                        <Button
                            className={`${styles.form_button}`}
                            type={'submit'}
                            text={'Post'}
                            form={'recipe-form'}
                        />
                        {uploadProgress ?
                            <h3>Uploading... {uploadProgress}%</h3> : <></>
                        }
                    </div>
                </div>
            </Layout1>
        </>
    )
}

export const getServerSideProps = async (context) => {
    try {
        let isAuth = false
        // const { recipediaToken: token } = context.req.cookies
        let token = ''

        // if (context.req.headers.cookie) {
        if (context.req.cookies.recipediaToken) {
            isAuth = true
            token = context.req.cookies.recipediaToken
        }

        return {
            props: { isAuth, token }
        }

    } catch (error) {
        console.log(error)
    }
}

export default AddRecipe