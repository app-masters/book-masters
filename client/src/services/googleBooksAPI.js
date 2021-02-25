const axios = require('axios').default;

/**
 * @param {string} isbn: isbn do livro a ser procurado
 * @return {promise} retorno do google com todas as informações disponíveis na api.
 * Os resultados são tratados no local em que a callback é chamada
 */
const fetchBookGoogle = async (isbn) => {
  try {
    const response = await axios.get(process.env.BOOKS_API + '?q=isbn:' + isbn);
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
      bookResp.authors = authors ? authors.join(',') : '';
      bookResp.tags = categories ? categories : '';
      bookResp.editor = publisher ? publisher : '';
      bookResp.coverURL = imageLinks.thumbnail ? imageLinks.thumbnail : '';
      bookResp.year = publishedDate
        ? new Date(publishedDate).getFullYear()
        : '';
    }
    return bookResp;
  } catch (err) {
    console.error('Error fetching book on google API', error);
    
  }
};

export default fetchBookGoogle;
