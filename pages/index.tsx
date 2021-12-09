import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import Achats from '../components/Achats'

import {
  useAppDispatch,
  useAppSelector,
} from '../redux/hooks';

import {
  selectBooks, loadBooks
} from '../redux/slices/bookSlice';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks)
  const [mode, setMode] = useState("white")

  useEffect(() => {
    dispatch(loadBooks())
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Henri Potier</title>
        <meta name="description" content="La bibliothéque d'Henri Potier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Achats books={books} />
      </main>
    </div>
  )
}

export default Home
