import User from '../../models/User.js';
import faker from 'faker';

/**
 * Seeds users database
 */
class UserSeeder {
  async run() {
    console.log('Seeding users...');
    const data = Array.apply(null, Array(5)).map((arr) => {
      return {
        email: faker.internet.email(),
        name: faker.name.findName(),
        phoneNumber: faker.phone.phoneNumber(),
        role: faker.random.arrayElement(['admin', 'common'])
      };
    });
    await User.create(data);
  }
}

export default UserSeeder;
