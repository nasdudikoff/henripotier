import React, { useState, useEffect } from 'react'

import styles from '../../styles/Panier.module.scss'
import { faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UnPanier from './UnPanier'

import { panier } from '../../types'
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { calculOffreCommercial, selectOffreCommercial , setMontantFinal } from '../../redux/slices/bookSlice'
import { useRouter } from 'next/router'

const dimensionIcon = 20

type panierList = { [key: string]: panier }

function Money({ value, title }: { title: string, value: number }) {
    return (
        <>
            <span>{title} : </span>
            <FontAwesomeIcon icon={faDollarSign} width={20} height={20} />&nbsp;
            <b>{value}</b>
        </>
    )
}

export default function Panier({ panierList, clickClosePanier }: {
    panierList: panierList,
    clickClosePanier: () => void
}) {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const offreCommercial = useAppSelector(selectOffreCommercial)

    const [total, setTotal] = useState(0)
    const [totalRemise, setTotalRemise] = useState(0)

    useEffect(() => {
        let total = 0
        for (let index = 0; index < Object.values(panierList).length; index++) {
            const item = Object.values(panierList)[index];
            total += item.unite * item.price
        }
        setTotal(total)

        /**
         * Envoi des isbn selectionnés pour calcul de l'offre commercial
         */
        dispatch(calculOffreCommercial(total, Object.keys(panierList)))

    }, [panierList])

    useEffect(() => {
        let totalRemise = total-offreCommercial
        setTotalRemise(totalRemise)
        dispatch(setMontantFinal(totalRemise))

    }, [offreCommercial,total])

    const validerAchat = (e: any) => {
        router.push('/paiement')
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
                <div className={styles.totalOffreCommercial}>
                    <div>
                        <Money title="Sous-total" value={total} />
                    </div>
                    <div>
                        <Money title="Réduction" value={offreCommercial} />
                    </div>
                    <div>
                        <Money title="Total" value={totalRemise} />
                    </div>
                </div>
                <button onClick={(e) => validerAchat(e)} className={styles.valider}>
                    VALIDER L{"'"}ACHAT
                </button>
            </div>
        </>
    )
}
