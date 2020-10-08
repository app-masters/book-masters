const axios = require('axios').default;

/**
 * 
 * @param {string} isbn: isbn do livro a ser procurado
 * @return {promise} retorno do google com todas as informações disponíveis na api.
 *                      Os resultados são tratados no local em que a callback é chamada
 * 
 */
const fetchBookGoogle = async (isbn) => {
    return axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
    .then(function (response) {
        return response.data
    })
}

export default fetchBookGoogle;