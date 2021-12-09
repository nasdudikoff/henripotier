import {
    createSlice,
    PayloadAction,
    Dispatch,
} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios'

import { panier } from '../../types'
// declaring the types for our state
export type CounterState = {
    books: Array<panier>;
    searchBookText : string;
    panier : Array<panier|any>
};

const initialState: CounterState = {
    books: [],
    searchBookText: "",
    panier : []
};

const urlGetAllBooks = `https://henri-potier.techx.fr/books`

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
        setBooks: (state, action: PayloadAction<Array<panier>>) => {
            state.books = action.payload
        },
        setPanier: (state, action: PayloadAction<Array<panier|any>>) => {
            state.panier = action.payload
        }
    },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
    setBooks , setSearchBookText , setPanier
} = bookSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectBooks = (state: RootState) => state.book.books;
export const selectSearchBookText = (state: RootState) => state.book.searchBookText;
export const selectPanier = (state: RootState) => state.book.panier;

export const searchBook = (value:string )=> (dispatch:Dispatch) => {
    dispatch(setSearchBookText(value))
}

export const loadBooks = () => async (dispatch:Dispatch) => {
    const { data } = await axios.get(urlGetAllBooks)
    console.log("LOADED BOOKS", data);
    dispatch(setBooks(data))
}

// exporting the reducer here, as we need to add this to the store
export default bookSlice.reducer;