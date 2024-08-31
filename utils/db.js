import { MongoClient } from 'mongodb';
import envLoader from './env_loader';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        throw err; // Make sure the error is propagated
      });
  }

  /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    const db = this.client.db();
    return db.collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    const db = this.client.db();
    return db.collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the users collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    const db = this.client.db();
    return db.collection('users');
  }

  /**
   * Retrieves a reference to the files collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    const db = this.client.db();
    return db.collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
