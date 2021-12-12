// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { book } from '../../types'
import { fetch } from '../../lib/fetch'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<book>>
) {

  fetch('/books').then(({ data }) => {
    res.status(200).json(data)
  }).catch(err => {
    console.error("error on get all books", new Error(err).message);
    res.status(500).json([])
  })
}