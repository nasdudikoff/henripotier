import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Header.module.scss'
import Panier from './Panier/Panier'
import Link from 'next/link'

import {
	useAppDispatch,
	useAppSelector,
} from '../redux/hooks';

import {
	searchBook, selectPanier
} from '../redux/slices/bookSlice';
import { useRouter } from 'next/router'

var timeoutSearch: any;
const dimensionIcon = 20

export default function Header() {
	const dispatch = useAppDispatch()

	const panierList = useAppSelector(selectPanier)

	const router = useRouter()
	const [isPanierShow, setIsPanierShow] = useState(false)
	const [isSearchAvailable, setIsSearchAvailable] = useState(true)

	/**
	 * REMOVE SEARCH INPUT ON BOOK PAGE
	 */
	useEffect(() => {
		if (router.pathname.includes('/book/')) {
			setIsSearchAvailable(false)
		} else {
			setIsSearchAvailable(true)
		}
	}, [router.pathname])

	/**
	 * METHODS
	 */

	const clickShowCart = (): void => {
		setIsPanierShow(!isPanierShow)
	}

	const clickClosePanier = (): void => {
		setIsPanierShow(false)
	}

	/**
	 * DELAY SEARCH ON KEYUP on SEARCHINPUT
	 */
	const keyupSearchBooks = (e: any) => {
		var value = e.currentTarget.value
		if (timeoutSearch) {
			clearTimeout(timeoutSearch)
		}
		timeoutSearch = setTimeout(() => {
			dispatch(searchBook(value))
		}, 300);
	}

	return (
		<div className={styles.header}>
			<span className={styles.title}>
				<Link href="/" passHref>
					<a>
						La Bibliotheque d{"'"}Henri Potier
          			</a>
				</Link>
			</span>

			<input data-show={isSearchAvailable ? 1 : 0} type="text" onKeyUp={(e) => keyupSearchBooks(e)} placeholder="Rechercher" className={styles.rechercherLivre} />

			<div className={styles.panier}>
				<a onClick={() => clickShowCart()} >
					<FontAwesomeIcon height={dimensionIcon} width={dimensionIcon} icon={faShoppingCart} />
					{
						Object.keys(panierList).length
					}
				</a>
			</div>

			{
				<div className={styles.panierContainer} data-show={isPanierShow ? 1 : 0} >
					<Panier panierList={panierList} clickClosePanier={clickClosePanier}
					/>
				</div>
			}

		</div>
	)
}
