import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Navbar = () => {

  const router = useRouter()
  const [isPageActive, setisPageActive] = useState('')
  const [isExpand, setIsExpand] = useState(false)

  useEffect(() => {
    switch (router.pathname) {
      case '/':
        setisPageActive('home')
        break;
      case '/recipe/add':
        setisPageActive('add')
        break;
      case '/user/profile':
        setisPageActive('profile')
        break;

      default:
        break;
    }
  }, [router.pathname])

  const handleCheckbox = (e) => {
    setIsExpand(e.target.checked)
  }

  return (
    <>
      <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>
      <nav className={`${styles.navbar_container}`}>
        <div className={`${styles.navbar_content}`}>
          <ul className={`${styles.navbar_lg}`}>
            <li
              className={isPageActive === 'home' ? `${styles.navbar_active}` : ''}
            >
              <Link href={'/'}>
                <a>Home</a>
              </Link>
            </li>
            <li
              className={isPageActive === 'add' ? `${styles.navbar_active}` : ''}
            >
              <Link href={'/recipe/add'}>
                Add Recipe
              </Link>
            </li>
            <li
              className={isPageActive === 'profile' ? `${styles.navbar_active}` : ''}
            >
              <Link href={'/user/profile'}>
                Profile
              </Link>
            </li>
          </ul>

          <div className={`${styles.account}`}>
            <div className={`${styles.icon}`}>
              <Image src='/assets/img/icons/user-icon.png' alt='' width={30} height={25} />
            </div>
            <Link href={'/user/login'}>
              Login
            </Link>
          </div>

          <div className={`${styles.expand_toggler}`}>
            {isExpand ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}


            <input
              type='checkbox'
              onChange={handleCheckbox}
            // onClick={onExpandClick}
            />
          </div>
        </div>
        <div
          className={`${styles.navbar_expand}`}
          style={isExpand ? { display: 'block' } : { display: 'none' }}
        >
          <ul>
              <li
                className={isPageActive === 'home' ? `${styles.navbar_active}` : ''}
              >
                <Link href={'/'}>
                  <a>Home</a>
                </Link>
              </li>
              <li
                className={isPageActive === 'add' ? `${styles.navbar_active}` : ''}
              >
                <Link href={'/recipe/add'}>
                  Add Recipe
                </Link>
              </li>
              <li
                className={isPageActive === 'profile' ? `${styles.navbar_active}` : ''}
              >
                <Link href={'/user/profile'}>
                  Profile
                </Link>
              </li>
          </ul>
        </div>
      </nav>
    </>

  )
}

export default Navbar