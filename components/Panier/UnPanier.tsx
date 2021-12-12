import React, { FormEvent, SyntheticEvent } from 'react'
import Image from 'next/image'

import styles from '../../styles/UnPanier.module.scss'
import { panier } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faTrash } from '@fortawesome/free-solid-svg-icons'

import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks';

import {
    updatePanierProperties , removeOneBookFromPanier
} from '../../redux/slices/bookSlice';

export default function UnPanier({
    data
}: {
    data: panier
}) {

    const dispatch = useAppDispatch()

    const addUnite = (e: any) => {
        const value = e.target.value;

        if (data.isbn) {
            dispatch(updatePanierProperties({
                isbn: data.isbn,
                unite: Number(value)
            }))
        }
    }

    const deletePanier = (e:any)=>{
        e.preventDefault()

        if (data.isbn) {
            dispatch(removeOneBookFromPanier(data.isbn))
        }

    }

    return (
        <li className={styles.unPanierContainer}>
            <div className={styles.unPanier}>
                <Image
                    src={data.cover}
                    width={80}
                    height={80}
                    alt={data.title}
                />
                <div className={styles.informations}>
                    <span className={styles.title}>
                        {
                            data.title
                        }
                    </span>
                    <span className={styles.price}>
                        <FontAwesomeIcon icon={faDollarSign} />
                        <b>
                            {data.price}
                        </b>
                    </span>
                    <div className={styles.action}>
                        <input onChange={e => addUnite(e)} className={styles.unite} type="number" value={data.unite} />
                        <button onClick={e=>deletePanier(e)} className={styles.supprimer}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}
