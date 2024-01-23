import {
    Readable,

} from 'node:stream'


class OneToHundredStream extends Readable {

    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                /* push é utilizado para uma readable receber informações */
                this.push(null)
            } else {
                /* nao é possivel dado utilizar dados primitivos string,boolean,number */
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)


    }

}

/* json é inviavel ser consumido em pedaços 

    de forma parciavel é viavel consumir: videos,textos,musicas
*/

fetch('http://localhost:3334', {
    method: 'POST',
    /* no body da requisição é possivel passar stream */
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})
/* 
    primeiro a requisição e feita mandando dados
    then pega o retorno da requisição feita 
*/