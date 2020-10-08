const fetchBookGoogle = (isbn) => {
    /** Fetch google API */
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => data)

/*
    if(responseData.totalItems > 0){
        console.log(responseData.items)
    }
    */
}

export default fetchBookGoogle;