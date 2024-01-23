export async function json(req, res) {

    const buffers = []

    /* o await espera ler todos os dados do array de buffer */
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
        req.body = null
    }

    res.setHeader('Content-type', 'application/json')

}