const axios = require('axios').default;


const fetchBookGoogle = async (isbn) => {

    return axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
    .then(function (response) {
        return response.data
    })


}

export default fetchBookGoogle;