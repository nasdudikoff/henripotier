import React from 'react'
import voca from 'voca';

import styles from '../styles/Achats.module.scss'
import Link from 'next/link'
import {
    useAppDispatch,
    useAppSelector,
} from '../redux/hooks';
import {
    selectSearchBookText, selectBooks
} from '../redux/slices/bookSlice'
import { useRouter } from 'next/router';
import BookRepresentation from './BookRepresentation';

export default function Achats() {

    const router = useRouter()
    const searchText = useAppSelector(selectSearchBookText)

    const books = useAppSelector(selectBooks)

    const slugifyText = (text: string) => voca.chain(text).slugify().lowerCase().value()

    return (

        <div className={styles.achatsContainer}>
            {
                books.map((book, index) => {

                    return (slugifyText(book.title).includes(slugifyText(searchText)) || searchText == "") &&
                        (
                            <BookRepresentation key={index} book={book} />
                        )
                })
            }
        </div>

    )
}

