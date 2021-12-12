import type { NextApiRequest, NextApiResponse } from 'next'

import { fetch } from '../../lib/fetch'

export const getOffreCommercial = (body: {
  [key: string] : Array<string>
}) => new Promise((resolve, reject) => {
  if (body.hasOwnProperty('isbn') && body.isbn && Array.isArray(body.isbn)) {

    const isbns = body.isbn.join(",")
    const urlGetCommercialOffers = `/books/${isbns}/commercialOffers`
    fetch(urlGetCommercialOffers).then(({ data }) => {
      resolve({ status: 200, data })
    }).catch(err => {
      resolve({ status: 500, data: [] })
    })
  } else {
    resolve({ status: 500, data: [] })
  }
})


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<string>>
) {
  getOffreCommercial(req.body).then((response : any) => {
    res.status(response.status).json(response.data)
  })
}