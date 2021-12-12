import {
    createSlice,
    PayloadAction,
    Dispatch,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'
import lodash from 'lodash'

import { book, panier } from '../../types'
// declaring the types for our state

export type BookState = {
    books: Array<book>;
    searchBookText: string;
    panierList: {
        [key: string]: panier
    };
    currentBook: any;
    offreCommercial: number;
    montantFinal: 0
};

const initialState: BookState = {
    books: [],
    searchBookText: "",
    panierList: {},
    currentBook: null,
    offreCommercial: 0,
    montantFinal: 0
};

const urlGetAllBooks = `http://localhost:3000/api/books`

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setSearchBookText: (state, action: PayloadAction<string>) => {
            state.searchBookText = action.payload
        },
        setBooks: (state, action: PayloadAction<Array<book>>) => {
            state.books = action.payload
        },
        setOffreCommercial: (state, action) => {
            state.offreCommercial = action.payload
        },
        setMontantFinal: (state, action) => {
            state.montantFinal = action.payload
        },
        setPanier: (state, action: PayloadAction<panier>) => {
            var isBookInPanier = state.panierList.hasOwnProperty(action.payload.isbn)
            if (isBookInPanier) {
                var newPanier = { ...state.panierList }
                newPanier[action.payload.isbn]["unite"] += action.payload.unite
                state.panierList = newPanier
            } else {
                var newPanier = { ...state.panierList }
                newPanier[action.payload.isbn] = {
                    ...action.payload
                }
                state.panierList = newPanier
            }
        },
        updatePanierProperties: (state, action) => {
            var newPanier = { ...state.panierList }
            if (newPanier.hasOwnProperty(action.payload.isbn)) {
                newPanier[action.payload.isbn] = {
                    ...newPanier[action.payload.isbn],
                    ...action.payload
                }
                state.panierList = newPanier
            }
        },
        removeOneBookFromPanier: (state, action) => {
            var newPanier = { ...state.panierList }
            if (newPanier.hasOwnProperty(action.payload)) {
                delete newPanier[action.payload]
                state.panierList = newPanier
            }
        },
        setCurrentBook: (state, action: PayloadAction<string>) => {

            if (!action.payload) {
                state.currentBook = null
            } else {
                const currentBook_ = state.books.find(item => item.isbn == action.payload)
                state.currentBook = { ...currentBook_ }
            }
        }
    },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
    setBooks, setSearchBookText, setPanier, setCurrentBook, updatePanierProperties, removeOneBookFromPanier, setOffreCommercial, setMontantFinal
} = bookSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectBooks = (state: RootState) => state.book.books;
export const selectOffreCommercial = (state: RootState) => state.book.offreCommercial;
export const selectBook = (state: RootState) => state.book.currentBook;
export const selectMontantFinal = (state: RootState) => state.book.montantFinal;
export const selectSearchBookText = (state: RootState) => state.book.searchBookText;
export const selectPanier = (state: RootState) => state.book.panierList;

export const searchBook = (value: string) => (dispatch: Dispatch) => {
    dispatch(setSearchBookText(value))
}

export const loadBooks = () => async (dispatch: Dispatch) => {
    const { data } = await axios.get(urlGetAllBooks)
    console.log("LOADED BOOKS", data);
    dispatch(setBooks(data))
}

export const calculOffreCommercial = (total: number, isbn: Array<string>) => async (dispatch: Dispatch) => {

    if (isbn && isbn.length > 0 && total > 0) {

        const urlOffreCommercial = `https://henri-potier.techx.fr/books/${isbn.join(",")}/commercialOffers`
        const { data } = await axios.get(urlOffreCommercial)
        const offers = data.offers;

        const reductionsSurLesOffres = []

        for (let index = 0; index < offers.length; index++) {
            const element = offers[index];
            const value = element.value
            const type = element.type
            if (type == "percentage") {
                reductionsSurLesOffres.push(total * value / 100)
            }
            if (type == "minus") {
                reductionsSurLesOffres.push(value)
            }
            if (type == "slice") {
                reductionsSurLesOffres.push(Math.floor(total / element.sliceValue) * value)
            }
        }
        if (reductionsSurLesOffres.length > 0) {
            const totalRemise: number = lodash.max(reductionsSurLesOffres)
            dispatch(setOffreCommercial(totalRemise))
        }
    } else {
        dispatch(setOffreCommercial(0))
    }
}

// exporting the reducer here, as we need to add this to the store
export default bookSlice.reducer;