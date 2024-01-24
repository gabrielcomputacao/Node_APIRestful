export function buildRoutePath(path) {

    const routeParametersRegex = /:([a-zA-Z]+)/g

    /* 
        replaceAll retorna uma nova string com todas as ocorrencias de um padrao nesse caso o regex
    */
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    /* 
        Array.from converte a estrutura em array
        matchALL é possivel passar um regex e ele retorna quais buscas foram escontradas pela regex
    */

    console.log(Array.from(path.matchAll(routeParametersRegex)))

    /* ?<query> cria um grupo chamado query
       ? mostra que pode ser opcional o group

       . = qualquer caracter
       * = inumeras vezes
    */

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex


}