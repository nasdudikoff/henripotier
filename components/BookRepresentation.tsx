import React from 'react'
import voca from 'voca';

import styles from '../styles/BookRepresentation.module.scss'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faArrowRight } from '@fortawesome/free-solid-svg-icons'
const bookDimensions = {
    height: 400,
    width: 300
}
import Link from 'next/link';

import {
    useAppDispatch,
} from '../redux/hooks';

import {
     setPanier
} from '../redux/slices/bookSlice';


import { book } from '../types'

export default function BookRepresentation({ book }: {
    book: book
}) {

    const dispatch = useAppDispatch()
    const addToCart = (e: any) => {
        e.stopPropagation()

        dispatch(setPanier({
            isbn : book.isbn ,
            unite : 1,
            cover: book.cover,
            price : book.price,
            title : book.title
        }))
    }

    return (
        <Link href={`/book/${book.isbn}`} passHref>
            <div className={styles.bookCard} data-class="bookCard">
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
                        <button name="ajouterAuPanier" data-id={book.isbn} onClick={(e) => addToCart(e)} className={styles.btnAjouterAuPanier}>
                            <FontAwesomeIcon icon={faArrowRight} width={10} height={10} />{' '}
                            <span>
                                Ajouter au  panier
                    </span>
                        </button>
                    </div>
                </div>
            </div>

        </Link>
    )
}
