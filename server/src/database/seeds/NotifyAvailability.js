import Book from '../../models/Book.js';
import User from '../../models/User.js';
import NotifyAvailability from '../../models/NotifyAvailability.js';
import faker from 'faker';

/**
 * Seeds users database
 */
class NotifyAvailabilitySeeder {
  async run() {
    console.log('Seeding notifyAvailabilities...');
    const users = await User.find({});
    const books = await Book.find({});
    const usersIds = users.map((u) => u._id);
    const booksIds = books.map((u) => u._id);
    const data = Array.apply(null, Array(5)).map(() => {
      return {
        idUser: faker.random.arrayElement(usersIds),
        idBook: faker.random.arrayElement(booksIds),
        notifiedAt: ''
      };
    });
    await NotifyAvailability.create(data);
  }
}

export default NotifyAvailabilitySeeder;
