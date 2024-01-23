import http from 'node:http'
import {
    Transform,
} from 'node:stream'

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {

        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        /* primeiro parametro do callback é o erro caso tenha dados na transformação 
            Buffer - modelo com que o node usa para transacionar dados entre streams
        */
        callback(null, Buffer.from(String(transformed)))
    }
}


// req => Readable Stream
// res => Writeable Stream

const server = http.createServer(async (req, res) => {
    /* pedacinhos recebidos */
    const buffers = []

    /* o await espera ler todos os dados do array de buffer */
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    res.end(fullStreamContent)

    // return req.pipe(new InverseNumber()).pipe(res)

})

server.listen(3334)