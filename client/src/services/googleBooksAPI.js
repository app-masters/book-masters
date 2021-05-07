const axios = require('axios').default;

/**
 * @param {string} isbn: isbn do livro a ser procurado
 * @return {promise} retorno do google com todas as informações disponíveis na api.
 * Os resultados são tratados no local em que a callback é chamada
 */
const fetchBookGoogle = async (isbn) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn
    );
    if (response.status !== 200) throw new Error('Erro ao buscar livro.');
    const bookData = await response.data;
    const bookResp = {};
    if (bookData.totalItems > 0) {
      const {
        title,
        description,
        authors,
        publisher,
        imageLinks,
        categories,
        publishedDate,
      } = bookData.items[0].volumeInfo;

      bookResp.title = title ? title : '';
      bookResp.description = description ? description : '';
      bookResp.author = authors ? authors.join(',') : '';
      bookResp.tags = categories ? categories : [];
      bookResp.publishingCompany = publisher ? publisher : '';
      bookResp.imageUrl = imageLinks?.thumbnail ? imageLinks.thumbnail : '';
      bookResp.publicationYear = publishedDate
        ? new Date(publishedDate).getFullYear()
        : '';
    }
    return bookResp;
  } catch (err) {
    console.log('Error fetching book on google API', err);
  }
};

export default fetchBookGoogle;
