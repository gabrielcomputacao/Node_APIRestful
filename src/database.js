import fs from 'node:fs/promises'

/* 
    import.meta.url = devolve exatamente o caminho do arquivo em que esta sendo chamado, todo o caminho do computador ate o arquivo
*/

const databasePath = new URL('../db.json',
    import.meta.url)

export class Database {

    database = {}
    /* propriedade privada coloca o # */

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.database = JSON.parse(data)
        }).catch(() => {
            this.persist()
        })
    }


    persist() {
        fs.writeFile(databasePath, JSON.stringify(this.database))
    }

    insert(table, data) {
        /* se ja existe um arraz dentro dessa propriedade do objeto */
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }

        this.persist()

        return data
    }

    select(table, search) {
        /* vai procurar se existe uma chave com o nome do parametro table dentro do objeto */

        /* let it change */
        let data = this.database[table] ? this.database[table] : [];

        if (search) {
            data = data.filter(row => {

                /* 
                    Object.entries converte objetos em arrays para ser possivel percorrer com alguma estrutura de repetição
                    EXEMPLO: 
                    {name:"gabriel", email:"gab@hotmail"}
                    [ [ 'name' , 'gabriel'] [ 'email' , 'gab@hotmail'] ]

                    some = percorre algum array e se pelo uma vez foi encontrado o que procura no array, entao ele deve ser acrescentado no array
                */
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data;
    }

    delete(table, id) {
        const rowIndex = this.database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.database[table].splice(rowIndex, 1)
            this.persist()
        }
    }
    update(table, id, data) {
        const rowIndex = this.database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.database[table][rowIndex] = {
                id,
                ...data
            }
            this.persist()
        }
    }

}