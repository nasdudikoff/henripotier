import React from 'react'
import {  useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from '../redux/hooks';
import {
    selectBooks, loadBooks
} from '../redux/slices/bookSlice';
import Header from './Header';
import Head from 'next/head';

import styles from '../styles/Main.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Main({ children }: { children: any }) {

    const dispatch = useAppDispatch();
    const books = useAppSelector(selectBooks)

    useEffect(() => {
        dispatch(loadBooks())
    }, [])

    return books.length == 0 ?
        <div className={styles.loader}>
            <FontAwesomeIcon icon={faSpinner} spin />
        </div> :
        <div>
            <Head>
                <title>Henri Potier</title>
                <meta name="description" content="La bibliothéque d'Henri Potier" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {children}
        </div>
}
