export interface book {
    isbn: string;
    title: string;
    price: number;
    cover: string;
    synopsis: Array<any>
}
export type panier = {
    isbn: string;
    unite: number;
    title: string;
    price: number;
    cover: string;
}
export type offer = {
    type: string;
    value:number;
    sliceValue?:number|any
}