process.stdin.pipe(process.stdout)

import {
    Readable,
    Transform,
    Writable
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

/* a stream de transformação ela precisa ler dados de algum lugar e escrever dados em algum lugar obrigatoriamente */
class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {

        const transformed = Number(chunk.toString()) * -1

        /* primeiro parametro do callback é o erro caso tenha dados na transformação 
            Buffer - modelo com que o node usa para transacionar dados entre streams
        */
        callback(null, Buffer.from(String(transformed)))
    }
}


class MultiplyByTenStream extends Writable {
    /*  uma stream de escrita apenas processa o dado, e nao transforma em algo, a stream de transformação é outra*/
    _write(chunk, encoding, callback) {

        console.log(Number((chunk.toString()) * 10))
        callback()

    }

}

/* enquanto o node vai lendo a informação o procees.stdout ja vai escrevendo */
// new OneToHundredStream().pipe(process.stdout)



/* 
    1º stream de leitura
    2º stream de escrita

    estou lendo dados de uma stream que retorna numeros de um a cem e depois escrevendo dentro de uma stream que processa dados
*/
new OneToHundredStream()
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream())

/* estamos lendo dados de segundo em segundo 
    e ja é possivel trabalhar com esses dados enquanto o arquivo esta sendo lido
*/