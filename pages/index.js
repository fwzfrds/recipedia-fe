import React from 'react'
import LandingPage from './LandingPage'
import axios from 'axios'

export default function Home({ products }) {
  return (
    <LandingPage
      products={products}
    ></LandingPage>
  )
}

export const getServerSideProps = async () => {
  try {
    // server side props cannot return object
    const { data } = await axios.get(`http://localhost:4000/v1/recipes`)
    const result = data.data

    return {
      props: {
        products: result
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        products: ''
      }
    }
  }
}
