import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Navbar = () => {

  const router = useRouter()
  const [isPageActive, setisPageActive] = useState('')

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
  }, [])

  console.log(router.pathname)
  console.log(isPageActive)

  return (

    <nav className={`${styles.navbar_container}`}>
      <div className={`${styles.navbar_content}`}>
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
        <div className={`${styles.account}`}>
          <div className={`${styles.icon}`}>
            <Image src='/assets/img/icons/user-icon.png' alt='' width={30} height={25} />
          </div>
          <Link href={'/user/login'}>
            Login
          </Link>
        </div>
      </div>
    </nav>

  )
}

export default Navbar