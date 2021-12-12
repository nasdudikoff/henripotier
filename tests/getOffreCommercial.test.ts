export { }

import { getOffreCommercial } from '../pages/api/promotion'

describe("Check url get offre commercial on books", () => {

    test('check if url response 200 and there is data', async () => {

        const response: any = await getOffreCommercial({ isbn: ['c8fabf68-8374-48fe-a7ea-a00ccd07afff'] })
        expect(response.status == 200).toBeTruthy()
        expect(response.data).toBeTruthy()
        expect(response.data.hasOwnProperty('offers') && Array.isArray(response.data.offers)).toBeTruthy()
    });

    test('check error to be returned',async()=>{
        const response: any = await getOffreCommercial({ isbn: [] })
        expect(response.status == 500).toBeTruthy()
    })

    test('check error to be returned no isbn',async()=>{
        const response: any = await getOffreCommercial({  })
        expect(response.status == 500).toBeTruthy()
    })

})