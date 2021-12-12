export {}
import { getOffreCommercial } from '../pages/api/promotion'

import {calculRemise} from '../redux/slices/bookSlice'

describe("Calcul remise", () => {

    test('check if calcul remise is exact', async () => {

        const response: any = await getOffreCommercial({ isbn: ['c8fabf68-8374-48fe-a7ea-a00ccd07afff','a460afed-e5e7-4e39-a39d-c885c05db861'] })

        const remise = calculRemise(65, response.data.offers )
        expect(remise).toBeTruthy()
        expect(remise).toBe(15)
        
    });

})