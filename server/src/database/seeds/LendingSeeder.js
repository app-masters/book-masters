import Lending from '../../models/Lending.js';
import User from '../../models/User.js';
import Book from '../../models/Book.js';
import faker from 'faker';

/**
 * Seeds lending database
 */
class LendingSeeder {
  async run() {
    console.log('Seeding lendings...');
    const users = await User.find({});
    const books = await Book.find({});
    const usersIds = users.map((u) => u._id);
    const booksIds = books.map((u) => u._id);

    const data = Array.apply(null, Array(5)).map(() => {
      return {
        idUser: faker.random.arrayElement(usersIds),
        idBook: faker.random.arrayElement(booksIds),
        status: faker.random.arrayElement(['reserved', 'borrowed', 'returned']),
        returnedAt: faker.date.past(),
        lendingStartedAt: faker.date.past(),
        lendingEndAt: faker.date.past(),
        reservationStartedAt: faker.date.past(),
        reservationEndAt: faker.date.past()
      };
    });
    await Lending.create(data);
  }
}

export default LendingSeeder;
