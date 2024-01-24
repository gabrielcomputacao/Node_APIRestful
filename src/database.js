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

    select(table) {
        /* vai procurar se existe uma chave com o nome do parametro table dentro do objeto */
        const data = this.database[table] ? this.database[table] : [];

        return data;
    }

}