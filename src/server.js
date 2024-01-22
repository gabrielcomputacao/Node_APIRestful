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

const users = []

const server = http.createServer((request, response) => {

    const {
        method,
        url
    } = request
    console.log(method, url)

    if (method === 'GET' && url === '/users') {
        //Early return
        return response
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {

        users.push({
            id: 1,
            name: 'John Doe',
            email: 'emailjson@hotmail.com'
        })

        return response.end('criação user')
    }



    return response.end('Hello Word')

})

server.listen(3333)