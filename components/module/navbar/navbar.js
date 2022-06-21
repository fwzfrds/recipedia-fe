import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (

    <nav className={`${styles.navbar_container}`}>
      <div className={`${styles.navbar_content}`}>
        <ul>
          <li>
            <Link href={'/home'}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href={'/recipe/add'}>
              Add Recipe
            </Link>
          </li>
          <li>
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