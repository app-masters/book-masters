import BookSeeder from './BookSeeder.js';
import UserSeeder from './UserSeeder.js';
import LendingSeeder from './LendingSeeder.js';
import NotifyAvailability from './NotifyAvailability.js';

import mongoose from '../connection.js';

class Seeder {
  /**
   * Create many Skill objects
   */
  async run() {
    try {
      if (process.argv.length === 3 && process.argv[2] === '--fresh') {
        console.log('Cleaning Collections...');
        for (const table of Object.keys(mongoose.connection.collections)) {
          await mongoose.connection.collections[table].drop();
        }
      }
      await new UserSeeder().run();
      await new BookSeeder().run();
      await new LendingSeeder().run();
      await new NotifyAvailability().run();

      mongoose.connection.close();
      console.log('🎉  Finished!');
    } catch (e) {
      console.error('‼️‼️ Critical error during seed');
      console.error(e);
    }
    process.exit(0);
  }
}

new Seeder().run();

export default Seeder;
