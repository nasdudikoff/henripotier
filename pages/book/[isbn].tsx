import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    useAppSelector, useAppDispatch
} from '../../redux/hooks';
import {
    selectBook, setCurrentBook,setPanier
} from '../../redux/slices/bookSlice'


import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/Book.module.scss'

const bookDimensions = {
    width: 300,
    height: 400
}

export default function Book() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const isbn: any = router.query.isbn

    const currentBook = useAppSelector(selectBook)

    const [unite, setUnite] = useState(1)

    useEffect(() => {
        dispatch(setCurrentBook(isbn))
        return () => {
            dispatch(setCurrentBook(""))
        }
    }, [])

    const addToCart = (e: any) => {

        dispatch(setPanier({
            isbn ,
            unite,
            cover: currentBook.cover,
            price : currentBook.price,
            title : currentBook.title
        }))

    }

    return currentBook && (
        <div className={styles.bookContent}>
            <h2 className={styles.title} >
                {currentBook.title}
            </h2>
            <div className={styles.presentation}>
                <div className={styles.leftPresentation}>
                    <Image
                        alt={currentBook.title}
                        src={currentBook.cover}
                        width={bookDimensions.width}
                        height={bookDimensions.height}
                    />
                </div>
                <div className={styles.rightPresentation}>

                    <div className={styles.priceUnity}>
                        <div className={styles.unite}>
                            <label className={styles.uniteTitle}>Unité</label>
                            <input onChange={e=>setUnite(Number(e.target.value))} type="number" min="1" value={unite} className={styles.uniteValue}/>
                        </div>
                        <div className={styles.prix}>
                            <label className={styles.prixTitle}>Prix</label>
                            <div className={styles.prixValue}>
                                <FontAwesomeIcon icon={faDollarSign} width={15} height={15} />
                                &nbsp;<b>
                                    {currentBook.price}
                                </b>
                            </div>
                        </div>
                    </div>
                    
                    <button className={styles.ajouterAuPanier} onClick={(e) => addToCart(e)}  >
                        Ajouter au  panier
                    </button>
                </div>

            </div>
            <div className={styles.synopsis}>
                <label className={styles.synopsisTItle}>Synopsis</label>
                <div className={styles.synopsisContent}>
                    {currentBook.synopsis.map((paragraph: string,index:number) => {
                        return <p key={index}>{paragraph}</p>
                    })}
                </div>
            </div>

        </div>
    )
}
