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
import {
    routes
} from './routes.js'


/* unique universal ID */



const server = http.createServer(async (request, response) => {
    const {
        method,
        url
    } = request
    console.log(method, url)

    await json(request, response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {

        const routeParams = request.url.match(route.path)

        return route.handler(request, response)
    }

    return response.writeHead(404).end()

})

server.listen(3333)