import axios from 'axios'

export function fetch( url :string ) {
    return axios.create({
        baseURL : 'https://henri-potier.techx.fr',
    }).get(url)
}