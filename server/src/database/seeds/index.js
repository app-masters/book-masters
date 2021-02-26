import BookSeeder from './BookSeeder.js';
import UserSeeder from './UserSeeder.js';
import LendingSeeder from './LendingSeeder.js';

import mongoose from '../connection.js';

class Seeder {
  /**
   * Create many Skill objects
   */
  async run() {
    try {
      await new UserSeeder().run();
      await new BookSeeder().run();
      await new LendingSeeder().run();

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
