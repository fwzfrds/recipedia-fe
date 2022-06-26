import React, { useEffect, useState } from 'react'
import styles from './footer.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer = () => {

  const router = useRouter()
  const [isBanner, setIsBanner] = useState(false);

  useEffect(() => {
    if (router.pathname === '/recipe/add' || router.pathname === '/user/profile' || router.pathname === '/recipe/detail/[id]') {
      setIsBanner(true)
    }
  }, [router.pathname])


  return (
    <>
      {isBanner &&
        <div className={`${styles.footer_banner}`}>
          <h1>Eat, Cook, Repeat</h1>
          <p><Link href={'/recipe/add'}>Share your best recipe by uploading here !</Link></p>
        </div>
      }
      <div className={`${styles.footer}`}>
        <div className={`${styles.footer_menu}`}>
          <ul>
            <li><Link href={'/'}>Product</Link></li>
            <li><Link href={'/'}>Company</Link></li>
            <li><Link href={'/'}>Learn more</Link></li>
            <li><Link href={'/'}>Get in touch</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer