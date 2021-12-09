import React from 'react'
import Image from 'next/image'
import voca from 'voca'

import { panier } from '../types'
import styles from '../styles/Achats.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import {
    useAppDispatch,
    useAppSelector,
} from '../redux/hooks';
import {
    selectSearchBookText
} from '../redux/slices/bookSlice'
const bookDimensions = {
    height: 400,
    width: 300
}
export default function Achats({
    books
}: {
    books: Array<panier>
}) {
    const searchText = useAppSelector(selectSearchBookText)

    return (

        <div className={styles.achatsContainer}>
            {
                books.map((book, index) => {

                    return (book.title.toLowerCase().includes(searchText.toLowerCase()) || searchText == "") &&
                        (
                            <Link href={`/book/${book.isbn}`} key={index}>
                                <div className={styles.bookCard}>
                                    <label className={styles.bookTitle}>
                                        {book.title}
                                    </label>
                                    <div className={styles.swapPositionOddEven}>
                                        <Image
                                            alt={book.title}
                                            src={book.cover}
                                            width={bookDimensions.width}
                                            height={bookDimensions.height}
                                        />
                                        <blockquote className={styles.synopsis}>
                                            {voca.truncate(book.synopsis.join(' '), 300)}
                                        </blockquote>
                                    </div>

                                    <div className={styles.bookAction}>
                                        <div className={styles.price}>
                                            <span className={styles.iconPrice}>
                                                <FontAwesomeIcon icon={faDollarSign} width={15} height={15} />
                                            </span>
                                            <b className={styles.price}>
                                                {book.price}
                                            </b>
                                        </div>
                                        <div className={styles.buy}>
                                            <button className={styles.btnAjouterAuPanier}>
                                                <FontAwesomeIcon icon={faArrowRight} width={10} height={10} />{' '}
                                   Ajouter au  panier
                                </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                })
            }
        </div>

    )
}

