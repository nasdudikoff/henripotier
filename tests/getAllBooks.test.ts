export {}
import {fetch} from '../lib/fetch'
describe("Check url get all books", () => {

    test('check if url response 200 and there is data', async () => {

        const response = await fetch('/books')
        expect(response.status == 200).toBeTruthy()
        expect( response.data ).toBeTruthy()
        expect( Array.isArray(response.data) ).toBeTruthy()
    });

})