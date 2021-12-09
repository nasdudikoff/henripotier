import React from 'react'
import Image from 'next/image'

import styles from '../../styles/UnPanier.module.scss'

import {panier} from '../../types'

export default function UnPanier({
    data
}: {
    data: panier
}) {
    return (
        <li className={styles.unPanier}>
            <Image
                src={data.cover}
                width={20}
                height={30}
            />
            <span>
                {
                    data.title
                }
            </span>
            <span>
                {
                    data.price
                }
            </span>
        </li>
    )
}
