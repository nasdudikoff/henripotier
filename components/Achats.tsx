import React, { useEffect, useState } from 'react'
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

    const searchText = useAppSelector(selectSearchBookText)

    const books = useAppSelector(selectBooks)

    const slugifyText = (text: string) => voca.chain(text).slugify().lowerCase().value()

    const [match, setMatch] = useState(true)

    useEffect(() => {
        if (books.length > 0) {
            const elementMatchLength = books.filter((book, index) => {
                return slugifyText(book.title).includes(slugifyText(searchText))
            }).length
            if (elementMatchLength == 0) {
                setMatch(false)
            } else {
                setMatch(true)
            }
        }
    }, [searchText])

    return (

        <div className={styles.achatsContainer}>
            {
                match ?
                books.map((book, index) => {

                    return (slugifyText(book.title).includes(slugifyText(searchText)) || searchText == "") &&
                        (
                            <BookRepresentation key={index} book={book} />
                        )
                }) : <p>Aucune livre ne correspond à votre recherche</p>
            }
        </div>

    )
}

