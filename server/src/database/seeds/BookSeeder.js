import Book from '../../models/Book.js';
import User from '../../models/User.js';
import faker from 'faker';

/**
 * Seeds users database
 */
class BookSeeder {
  async run() {
    console.log('Seeding books...');
    const users = await User.find({});
    const usersIds = users.map((u) => u._id)
    const data = Array.apply(null, Array(5)).map((arr) => {
      return {
        idUser: faker.random.arrayElement(usersIds),
        isbn: faker.random.alphaNumeric(10),
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(2),
        author: faker.name.findName(),
        publishingCompany: faker.company.companyName(),
        tag: faker.random.arrayElements(['frontend', 'backend', 'node', 'database'], 2),
        imageUrl: faker.image.imageUrl(),
        publicationYear: faker.date.past().getFullYear(),
        edition: faker.random.number(10),
        status: faker.random.arrayElement(['Disponível', 'Emprestado', 'Reservado'])
      };
    });
    await Book.create(data);
  }
}

export default BookSeeder;
