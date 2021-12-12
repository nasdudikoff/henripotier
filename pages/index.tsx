import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import Achats from '../components/Achats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuidditch } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {

  const [isGoTopShow, setIsGoTopShow] = useState(false)
  
  useEffect(() => {
    
    window.addEventListener('scroll',(e:any)=>{

      if (window.scrollY >= 350) {
        setIsGoTopShow(true)
      } else {
        setIsGoTopShow(false)
      }

    })
  }, [])

  const goToTop = (e: any) => {
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.container}>
      <main>
        <Achats />
        <div data-show={isGoTopShow?1:0} className={styles.goToTop} onClick={(e) => {
          goToTop(e)
        }}>
          <FontAwesomeIcon icon={faQuidditch} width={25} height={25} />
        </div>
      </main>
    </div>
  )
}

export default Home
