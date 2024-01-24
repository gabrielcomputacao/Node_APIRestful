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

            console.log(req.query)

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
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {

            const {
                id
            } = req.params

            database.delete('users', id)

            /* 
                status code 204 = resposta de sucesso sem nenhum conteudo
            */

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {

            const {
                id
            } = req.params

            const {
                name,
                email
            } = req.body

            database.update('users', id, {
                name,
                email
            })

            /* 
                status code 204 = resposta de sucesso sem nenhum conteudo
            */

            return res.writeHead(204).end()
        }
    },

]