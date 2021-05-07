const axios = require('axios').default;

/**
 * @param {string} isbn: isbn do livro a ser procurado
 * @return {promise} retorno da open library com todas as informações disponíveis na api.
 * Os resultados são tratados no local em que a callback é chamada
 */
const fetchBookOpenLibrary = async (isbn) => {
  try {
    const response = await axios.get(
      `https://openlibrary.org/isbn/${isbn}.json`
    );
    if (response.status !== 200) throw new Error('Erro ao buscar livro.');
    const bookData = response.data;

    const authors = await Promise.all(
      bookData.authors.map(async (author) => {
        return (await axios.get(`https://openlibrary.org${author.key}.json`))
          .data.name;
      })
    );

    const works = (
      await axios.get(`https://openlibrary.org${bookData.works[0].key}.json`)
    ).data;
    const bookResp = {};

    bookResp.title = bookData.title || '';
    bookResp.description = works.description || '';
    bookResp.author = authors ? authors.join(',') : '';
    bookResp.tags = works.subjects || [];
    bookResp.publishingCompany = bookData.publishers
      ? bookData.publishers.join(',')
      : '';
    bookResp.imageUrl = `http://covers.openlibrary.org/b/isbn/${isbn}.jpg`;
    bookResp.publicationYear = bookData.publish_date
      ? new Date(bookData.publish_date).getFullYear()
      : '';

    return bookResp;
  } catch (err) {
    console.log('Error fetching book on open library API', err);
    return {};
  }
};

export default fetchBookOpenLibrary;
