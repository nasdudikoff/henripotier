import React, { useState, useEffect } from 'react'

import styles from '../../styles/Panier.module.scss'
import { faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UnPanier from './UnPanier'

import { panier } from '../../types'
import Image from 'next/image'

const dimensionIcon = 20

type panierList = { [key: string]: panier }

export default function Panier({ panierList, clickClosePanier }: {
    panierList: panierList,
    clickClosePanier: () => void
}) {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let total = 0
        for (let index = 0; index < Object.values(panierList).length; index++) {
            const item = Object.values(panierList)[index];
            total += item.unite * item.price
        }
        setTotal(total)
    }, [panierList])

    const validerAchat = (e:any) =>{
        
    }

    return (
        <>
            <div className={styles.panierHeader}>
                <a style={{
                    cursor: 'pointer'
                }} onClick={() => clickClosePanier()} >
                    <FontAwesomeIcon height={dimensionIcon} width={dimensionIcon} icon={faTimes} />
                </a>
                <label className={styles.titlePanier}>
                    <Image
                        src="/sorting-hat-icon-24.jpg"
                        width={30}
                        height={30}
                        alt="Choixpeau"
                    />
                       Vos achats
                    </label>
            </div>
            <div className={styles.panierContainer}>

                <ul className={styles.panierContent}>
                    {
                        Object.values(panierList).map((data, index) => {
                            return <UnPanier key={index} data={data} />
                        })
                    }
                </ul>
            </div>
            <div className={styles.panierBottom}>
                <div>
                    <span>Total : </span>
                    <FontAwesomeIcon icon={faDollarSign} width={20} height={20} />&nbsp;
                    <b>{total}</b>
                </div>
                <button onClick={(e)=>validerAchat(e)} className={styles.valider}>
                    VALIDER ACHAT
                </button>
            </div>
        </>
    )
}
