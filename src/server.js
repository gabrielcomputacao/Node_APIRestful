/* CommonJS => require 
    ESModules => import/require
*/


/* 
    HTTP 

        - METODO HTTP ( GET,POST, PUT, PATCH, DELETE)
            Get: Buscar informações
            Post: criar Informações
            Put: Atualizar um recurso no backend, como varios dados
            Patch: Atualizar um dado especifico, um dado em particular e atualizado
            Delete: deletar, apagar algo do backend


        - URL

*/

/* 
    JSON - Javascript Object Notation
*/

import http from 'node:http'
import {
    json
} from './middlewares/json.js'

const users = []

const server = http.createServer(async (request, response) => {
    const {
        method,
        url
    } = request
    console.log(method, url)



    await json(request, response)




    if (method === 'GET' && url === '/users') {
        //Early return
        return response.end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const {
            name,
            email
        } = request.body


        users.push({
            id: 1,
            name,
            email,
        })

        /* 
            201 usado em criações como post
        */
        return response.writeHead(201).end()
    }



    return response.writeHead(404).end()

})

server.listen(3333)