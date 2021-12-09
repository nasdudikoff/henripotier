import React from 'react'

import styles from '../../styles/Panier.module.scss'
import {  faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UnPanier from './UnPanier'
import { panier } from '../../types'

export default function Panier({ panierList, clickClosePanier }: {
    panierList: Array<object>,
    clickClosePanier: () => void
}) {

    const dimensionIcon = 20

    return (
        <div>
            <div className={styles.panierHeader}>
                <a style={{
                    cursor: 'pointer'
                }} onClick={() => clickClosePanier()} >
                    <FontAwesomeIcon height={dimensionIcon} width={dimensionIcon} icon={faTimes} />
                </a>
                <label>
                    Vos achats
                </label>
            </div>
            <ul className={styles.panierContent}>
                {
                    panierList.map((data,index) => {
                        return <UnPanier key={index} data={data} />
                    })
                }
            </ul>
            <div>
                <label>
                    Total:
                </label>
                
            </div>
        </div>
    )
}
