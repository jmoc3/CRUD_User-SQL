import {createPool} from 'mysql2/promise'

export const connection = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba',
    port:3306
})