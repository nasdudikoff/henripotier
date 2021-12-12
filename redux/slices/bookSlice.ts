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
};

const initialState: BookState = {
    books: [],
    searchBookText: "",
    panierList: {},
    currentBook: null
};

const urlGetAllBooks = `http://localhost:3000/api/books`

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions. 
    // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app. 
    // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
    reducers: {
        setSearchBookText: (state, action: PayloadAction<string>) => {
            state.searchBookText = action.payload
        },
        setBooks: (state, action: PayloadAction<Array<book>>) => {
            state.books = action.payload
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
        updatePanierProperties: (state, action ) => {
            var newPanier = {...state.panierList}
            if (newPanier.hasOwnProperty(action.payload.isbn)) {
                newPanier[action.payload.isbn] = {
                    ...newPanier[action.payload.isbn],
                    ...action.payload
                }
                state.panierList = newPanier
            }
        },
        removeOneBookFromPanier :(state, action ) => {
            var newPanier = {...state.panierList}
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
    setBooks, setSearchBookText, setPanier, setCurrentBook , updatePanierProperties , removeOneBookFromPanier
} = bookSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectBooks = (state: RootState) => state.book.books;
export const selectBook = (state: RootState) => state.book.currentBook;
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

// exporting the reducer here, as we need to add this to the store
export default bookSlice.reducer;