// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

//import books from '../../books.json'
import { book } from '../../types'

import axios from 'axios'

const urlGetAllBooks = `https://henri-potier.techx.fr/books`

// var books:Array<panier> = []

// axios.get(urlGetAllBooks).then(({data})=>{
//   books = data
// })

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<book>>
) {

  axios.get(urlGetAllBooks).then(({ data }) => {
    res.status(200).json(data)
  })

}
