import React from 'react'

import {
    useAppSelector, 
} from '../redux/hooks';
import {
    selectMontantFinal
} from '../redux/slices/bookSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/Paiement.module.scss'

export default function Paiement()  {
 
    const total = useAppSelector(selectMontantFinal)

    return (
        <main>
        <div className={styles.paiement}>
            Le montant total de votre paiement est de <FontAwesomeIcon icon={faDollarSign} width={30} height={30} /> {total}
        </div>
        </main>
    )
}
