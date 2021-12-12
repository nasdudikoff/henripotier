import React from 'react'

import {
    useAppSelector, useAppDispatch
} from '../redux/hooks';
import {
    selectMontantFinal
} from '../redux/slices/bookSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function paiement() {

    const total = useAppSelector(selectMontantFinal)

    return (
        <div>
            Le montant total de votre paiement est de <FontAwesomeIcon icon={faDollarSign} width={30} height={30} /> {total}
        </div>
    )
}
