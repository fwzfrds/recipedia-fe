import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (

    <nav className={`${styles.navbar_container}`}>
      <div className={`${styles.navbar_content}`}>
        <ul>
          <li>
            <Link href={'/'}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href={'/add-recipe'}>
              <a>Add Recipe</a>
            </Link>
          </li>
          <li>
            <Link href={'/user/profile'}>
              <a>Profile</a>
            </Link>
          </li>
        </ul>
        <div className={`${styles.account}`}>
          <div className={`${styles.icon}`}>
            <Image src='/assets/img/icons/user-icon.png' alt='' width={30} height={25} />
          </div>
          <Link href={'/user/login'}>
              <a>Login</a>
            </Link>
        </div>
      </div>
    </nav>

  )
}

export default Navbar