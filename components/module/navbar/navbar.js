import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'
import axios from 'axios'

const Navbar = () => {

  const router = useRouter()
  const [isPageActive, setisPageActive] = useState('')
  const [isExpand, setIsExpand] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [profileImg, setProfileImg] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dataFromLocal = localStorage.getItem('RecipediaUser')
      const data = JSON.parse(dataFromLocal)
      if (dataFromLocal) {
        setProfileImg(data.photo)
        setIsLogin(true)
      }
    }
  }, [])

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

  const handleLogout = async () => {

    swal({
      title: "Are you sure",
      text: `Want to logout?`,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(async (isOkay) => {
      if (isOkay) {
        try {
          await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/logout`, {
            withCredentials: true
          })
          localStorage.removeItem('RecipediaUser')
          setIsLogin(false)
          swal({
            title: "Good job!",
            text: `Anda berhasil logout`,
            icon: "success"
          })
          router.push('/auth/user/login')
        } catch (error) {
          console.log(error)
        }
      } else {
        swal({
          title: 'warning',
          text: `You cancel logout`,
          icon: 'warning',
        })
      }
    })
  }

  return (
    <>
      <Head>
        <link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
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
              <Image src={profileImg ? profileImg : '/assets/img/icons/user-icon.png'} alt='' layout='fill' />
            </div>
            {isLogin ?
              <p onClick={handleLogout}
                style={{
                  cursor: 'pointer'
                }}
              >
                Logout
              </p>
              :
              <Link href={'/auth/user/login'}>
                login
              </Link>
            }
          </div>

          <div className={`${styles.expand_toggler}`}>
            <div className={`${styles.toggler_icon}`}
              style={{
                // background: 'blue'
              }}
            >
              {isExpand ?
                <i className="fa-solid fa-xmark"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                ></i>
                :
                <i className="fa-solid fa-bars"
                  style={{
                    width: 40,
                    height: 40
                  }}
                ></i>}
            </div>


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