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

import { book } from '../types'
import Link from 'next/link';

export default function BookRepresentation({ book }: {
    book: book
}) {

    const addToCart = (e: any) => {
        e.stopPropagation()



    }

    return (
        <Link href={`/book/${book.isbn}`} passHref>
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
                        <button onClick={(e) => addToCart(e)} className={styles.btnAjouterAuPanier}>
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
