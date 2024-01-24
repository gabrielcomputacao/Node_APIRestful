import {
    Database
} from './database.js'
import {
    randomUUID
} from 'node:crypto'
import {
    buildRoutePath
} from './utils/build-route-path.js'


const database = new Database

export const routes = [{
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')

            //Early return
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const {
                name,
                email
            } = req.body


            const user = {
                id: randomUUID(),
                name,
                email,
            }


            database.insert('users', user)

            /* 
                201 usado em criações como post
            */
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users:id'),
        handler: (req, res) => {


        }
    }

]